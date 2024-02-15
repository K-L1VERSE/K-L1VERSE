// WaggleServiceImpl
package com.KL1verse.Waggle.service;

import com.KL1verse.Board.dto.req.BoardDTO;
import com.KL1verse.Board.dto.req.SearchBoardConditionDto;
import com.KL1verse.Board.repository.BoardRepository;
import com.KL1verse.Board.repository.entity.Board;
import com.KL1verse.Comment.repository.CommentRepository;
import com.KL1verse.Waggle.dto.req.WaggleDTO;
import com.KL1verse.Waggle.repository.WaggleLikeRepository;
import com.KL1verse.Waggle.repository.WaggleRepository;
import com.KL1verse.Waggle.repository.WaggleUserHashTagRepository;
import com.KL1verse.Waggle.repository.entity.Waggle;
import com.KL1verse.Waggle.repository.entity.WaggleLike;
import com.KL1verse.Waggle.repository.entity.WaggleUserHashTag;
import com.KL1verse.kafka.dto.res.BoardNotificationResDto;
import com.KL1verse.kafka.producer.KafkaBoardCleanbotProducer;
import com.KL1verse.kafka.producer.KafkaBoardNotificationProducer;
import com.KL1verse.s3.repository.entity.File;
import com.KL1verse.s3.service.BoardImageService;
import com.KL1verse.s3.service.FileService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.PriorityQueue;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WaggleServiceImpl implements WaggleService {

  private final WaggleRepository waggleRepository;
  private final BoardRepository boardRepository;

  private final FileService fileService;

  private final BoardImageService boardImageService;
  private final WaggleLikeRepository waggleLikeRepository;

  private final CommentRepository commentRepository;
  private final KafkaBoardCleanbotProducer kafkaBoardCleanbotProducer;
  private final KafkaBoardNotificationProducer kafkaBoardNotificationProducer;
  private final WaggleUserHashTagRepository waggleUserHashTagRepository;


  @Override
  public List<WaggleDTO> getWagglesByUser(Integer userId, Pageable pageable) {
    List<Waggle> waggles = waggleRepository.findAllByBoard_UserId(userId, pageable);

    List<Object[]> userInfo = waggleRepository.findUserNicknameAndProfileAndMainBadge(userId);
    String userNickname = (String) userInfo.get(0)[0];
    String userProfile = (String) userInfo.get(0)[1];
    String userMainBadge = (String) userInfo.get(0)[2];

    return waggles.stream().map(waggle -> {
      WaggleDTO waggleDTO = convertToDTO(waggle);

      waggleDTO.getBoard().setNickname(userNickname);
      waggleDTO.getBoard().setProfile(userProfile);
      if(userMainBadge != null) {
          waggleDTO.getBoard().setMainBadge(userMainBadge);
      }

      // 사용자의 게시글에 대한 댓글 수 가져오기
      int commentCount = commentRepository.countCommentsByBoardId(waggle.getBoard().getBoardId());
      waggleDTO.getBoard().setCommentCount(commentCount);

      // 사용자의 게시글에 대한 좋아요 수 가져오기
      int likeCount = waggleLikeRepository.findByWaggleIdWaggleId(waggle.getWaggleId()).size();
      waggleDTO.setLikesCount(likeCount);

      return waggleDTO;
    }).collect(Collectors.toList());
  }

  @Override
  public List<WaggleDTO> getWagglesByHashtags(List<String> hashtags, Pageable pageable) {
    Set<Long> visitedBoardIds = new HashSet<>(); // 이미 방문한 게시글의 ID를 추적하기 위한 Set
    List<WaggleDTO> uniqueWaggles = new ArrayList<>(); // 중복된 게시글을 필터링한 결과를 저장할 리스트

    // 각 해시태그별로 해당하는 게시글들을 검색하고 중복을 제거하여 uniqueWaggles에 추가
    for (String hashtag : hashtags) {
      // 대괄호 제거
      hashtag = hashtag.replaceAll("[\\[\\]]", "");
      log.info("hashtag: {}", hashtag);
      Page<Waggle> waggles = waggleRepository.findByHashtagsContaining(hashtag, pageable);

      List<WaggleDTO> waggleDTOList = convertToDTOList(waggles.getContent());
      for (WaggleDTO waggleDTO : waggleDTOList) {
        if (!visitedBoardIds.contains(waggleDTO.getBoard().getBoardId())) { // 이미 포함되어 있는 게시글인지 확인
          waggleDTO.getBoard().setCommentCount(
              commentRepository.countCommentsByBoardId(
                  waggleDTO.getBoard().getBoardId()));
          waggleDTO.setLikesCount(
              waggleLikeRepository.findByWaggleIdWaggleId(waggleDTO.getWaggleId()).size());

          List<Object[]> userInfo = waggleRepository.findUserNicknameAndProfileAndMainBadge(waggleDTO.getBoard().getUserId());
          String userNickname = (String) userInfo.get(0)[0];
          String userProfile = (String) userInfo.get(0)[1];
          String userMainBadge = (String) userInfo.get(0)[2];
          waggleDTO.getBoard().setNickname(userNickname);
          waggleDTO.getBoard().setProfile(userProfile);
          if(userMainBadge != null) {
              waggleDTO.getBoard().setMainBadge(userMainBadge);
          }

          uniqueWaggles.add(waggleDTO); // 포함되어 있지 않다면 uniqueWaggles에 추가
          visitedBoardIds.add(waggleDTO.getBoard().getBoardId()); // 방문한 게시글로 표시
        }
      }
    }

    Map<String, Integer> hashtagCounts = new HashMap<>();
    // 상위 5개의 해시태그를 조회
    List<WaggleUserHashTag> allWaggleUserHashTags = waggleUserHashTagRepository.findAll();
    for (WaggleUserHashTag waggleUserHashTag : allWaggleUserHashTags) {
      String[] tags = waggleUserHashTag.getHashtags().replaceAll("[\\[\\]]", "").split(",\\s*");
      for (String tag : tags) {
        hashtagCounts.put(tag, hashtagCounts.getOrDefault(tag, 0) + 1);
      }
    }

    // 등장 횟수를 기준으로 상위 5개의 해시태그를 추출
    List<String> top5Hashtags = getTop5Hashtags(hashtagCounts);


    // 각 상위 단어별로 해당하는 게시글들을 검색하고 중복을 제거하여 uniqueWaggles에 추가
    for (String topWord : top5Hashtags) {
      log.info("topWord: {}", topWord);
      // 각 단어별로 해당하는 게시글들을 검색하고 중복을 제거하여 uniqueWaggles에 추가
      Page<Waggle> waggles = waggleRepository.findByHashtagsContaining(topWord, pageable);
      List<WaggleDTO> waggleDTOList = convertToDTOList(waggles.getContent());
      for (WaggleDTO waggleDTO : waggleDTOList) {
        if (!visitedBoardIds.contains(waggleDTO.getBoard().getBoardId())) { // 이미 포함되어 있는 게시글인지 확인
          waggleDTO.getBoard().setCommentCount(
              commentRepository.countCommentsByBoardId(waggleDTO.getBoard().getBoardId()));
          waggleDTO.setLikesCount(
              waggleRepository.getLikesCountForEachWaggle().stream()
                  .filter(result -> ((Waggle) result[0]).getWaggleId()
                      .equals(waggleDTO.getWaggleId()))
                  .map(result -> ((Long) result[1]).intValue())
                  .findFirst()
                  .orElse(0));
          waggleDTO.getBoard().setNickname(
              (String) waggleRepository.findUserNickname(waggleDTO.getBoard().getUserId())
                  .get(0)[0]);
          uniqueWaggles.add(waggleDTO); // 포함되어 있지 않다면 uniqueWaggles에 추가
          visitedBoardIds.add(waggleDTO.getBoard().getBoardId()); // 방문한 게시글로 표시
        }
      }
    }

    return uniqueWaggles;
  }
  private List<String> getTop5Hashtags(Map<String, Integer> hashtagCounts) {
    PriorityQueue<Map.Entry<String, Integer>> minHeap = new PriorityQueue<>(
        (a, b) -> a.getValue().equals(b.getValue()) ? a.getKey().compareTo(b.getKey()) : a.getValue() - b.getValue());

    // 모든 해시태그를 우선순위 큐에 삽입
    for (Map.Entry<String, Integer> entry : hashtagCounts.entrySet()) {
      minHeap.offer(entry);
      if (minHeap.size() > 10) { // 큐의 크기가 5을 초과하면 가장 작은 등장 횟수를 갖는 해시태그를 제거
        minHeap.poll();
      }
    }

    // 큐에서 상위 5개의 해시태그를 추출하여 리스트에 저장
    List<String> top5Hashtags = new ArrayList<>();
    while (!minHeap.isEmpty()) {
      top5Hashtags.add(0, minHeap.poll().getKey()); // 큐는 오름차순으로 정렬되어 있으므로 리스트의 첫 번째 인덱스에 추가
    }
    return top5Hashtags;
  }



  @Override
  public WaggleDTO getWaggleById(Long boardId, Integer loginUserId) {
    Waggle waggle = findWaggleByBoardId(boardId);

    WaggleDTO waggleDTO = convertToDTO(waggle);

    boolean isLiked = waggleLikeRepository
        .findByUserIdAndWaggleId_WaggleId(loginUserId, waggle.getWaggleId())
        .isPresent();
    waggleDTO.setLiked(isLiked);

    int likesCount = waggleLikeRepository.findByWaggleIdWaggleId(waggle.getWaggleId()).size();
    waggleDTO.setLikesCount(likesCount);

    int commentCount = commentRepository.countCommentsByBoardId(boardId);
    waggleDTO.getBoard().setCommentCount(commentCount);

    Integer userId = waggleDTO.getBoard().getUserId();
    List<Object[]> userInfo = waggleRepository.findUserNicknameAndProfileAndMainBadge(userId);

    String userNickname = (String) userInfo.get(0)[0];
    String userProfile = (String) userInfo.get(0)[1];
    String mainBadge = (String) userInfo.get(0)[2];
    waggleDTO.getBoard().setNickname(userNickname);
    waggleDTO.getBoard().setProfile(userProfile);
    if(mainBadge != null) {
      waggleDTO.getBoard().setMainBadge(mainBadge);
    }

    WaggleUserHashTag waggleUserHashTag = WaggleUserHashTag.builder()
        .userId(loginUserId)
        .hashtags(waggle.getHashtags().toString())
        .waggle(waggle)
        .isLiked(isLiked)
        .build();
    waggleUserHashTagRepository.save(waggleUserHashTag);

    return waggleDTO;
  }


  @Override
  public void removeHashtagsFromUnlikedWaggle(Long waggleId) {
    Waggle waggle = waggleRepository.findById(waggleId).get();
//    Waggle waggle = findWaggleByBoardId(waggleId);
    removeHashtags(waggle);
  }


  public void saveHashtags(WaggleDTO waggleDTO) {
    Long waggleUserHashTagId = waggleDTO.getWaggleUserHashTagId();
    if (waggleUserHashTagId != null) {
      Optional<WaggleUserHashTag> optionalHashTag = waggleUserHashTagRepository.findById(
          waggleUserHashTagId);
      log.info("optionalHashTag: {}", optionalHashTag);
      if (optionalHashTag.isPresent()) {
        updateExistingHashTag(optionalHashTag.get());
      } else {
        log.error("해시태그 정보를 찾을 수 없습니다. id: {}", waggleUserHashTagId);
      }
    }
  }

  private void updateExistingHashTag(WaggleUserHashTag hashTag) {
    hashTag.setLiked(true);
    waggleUserHashTagRepository.save(hashTag);
  }


  private void removeHashtags(Waggle waggle) {
    Integer userId = waggle.getBoard().getUserId();
    List<WaggleUserHashTag> userHashTags = waggleUserHashTagRepository
        .findByUserIdAndWaggle_Board_BoardIdAndIsLiked(userId, waggle.getBoard().getBoardId(),
            true);

    waggleUserHashTagRepository.deleteAll(userHashTags);
  }

  public Map<String, Integer> calculateHashtagWeights(Integer loginUserId) {
    List<WaggleUserHashTag> userHashTags = waggleUserHashTagRepository.findAllByUserId(loginUserId);

//    List<WaggleUserHashTag> userHashTags = waggleUserHashTagRepository.findByUserIdOrderByCreatedAtDesc(
//        loginUserId);

    // 가중치를 저장할 맵
    Map<String, Integer> hashtagWeights = new HashMap<>();

    // 최근 조회한 해시태그에 가장 높은 가중치를 부여하기 위한 변수
    int maxWeight = userHashTags.size();

    for (WaggleUserHashTag userHashTag : userHashTags) {
      String[] tags = userHashTag.getHashtags().split(",");
      for (String tag : tags) {
        tag = tag.trim().replaceAll("[\\[\\]]", ""); // 수정된 부분

        int weightToAdd = maxWeight;
        if (hashtagWeights.containsKey(tag)) {
          int existingWeight = hashtagWeights.get(tag);
          if (userHashTag.isLiked()) {
            weightToAdd *= 0.2;
          }
          hashtagWeights.put(tag, existingWeight + weightToAdd);

        } else {

          if (userHashTag.isLiked()) {
            weightToAdd *= 0.2;
          }

          hashtagWeights.put(tag, weightToAdd);
        }
      }
      maxWeight--; // 가중치를 낮춰감
    }
    log.info("hashtagWeights: {}", hashtagWeights);
    return hashtagWeights;
  }


  public List<String> getTopHashtags(Integer loginUserId, int topCount) {
    // 로그인한 유저의 해시태그 정보를 가져와 가중치를 계산
    Map<String, Integer> hashtagWeights = calculateHashtagWeights(loginUserId);

    // 가중치를 기준으로 내림차순으로 정렬된 해시태그 맵 엔트리 리스트 생성
    List<Map.Entry<String, Integer>> sortedHashtags = new ArrayList<>(
        hashtagWeights.entrySet());
    sortedHashtags.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

    // 상위 해시태그 추출
    List<String> topHashtags = new ArrayList<>();
    for (int i = 0; i < Math.min(topCount, sortedHashtags.size()); i++) {
      topHashtags.add(sortedHashtags.get(i).getKey());
    }
    return topHashtags;
  }


  private List<WaggleDTO> convertToDTOList(List<Waggle> waggles) {
    List<WaggleDTO> waggleDTOList = new ArrayList<>();
    for (Waggle waggle : waggles) {
      waggleDTOList.add(convertToDTO(waggle));
    }
    return waggleDTOList;
  }


  @Transactional
  @Override
  public WaggleDTO createWaggle(WaggleDTO waggleDto) {
    Waggle waggle = convertToEntity(waggleDto);
    Set<String> hashtags = extractHashtags(waggleDto.getBoard().getContent());
    waggle.setHashtags(hashtags);

    Board board = saveBoard(waggle.getBoard());

    File file = null;
    if(waggleDto.getBoard().getBoardImage() != null) {
      board.setBoardImage(waggleDto.getBoard().getBoardImage());
      file = fileService.saveFile(waggleDto.getBoard().getBoardImage());
      boardImageService.saveBoardImage(board, file);
    }

    Integer userId = waggleDto.getBoard().getUserId();
    List<Object[]> nicknameResult = waggleRepository.findUserNickname(userId);
    String userNickname = nicknameResult.isEmpty() ? null : (String) nicknameResult.get(0)[0];

    Waggle createdWaggle = waggleRepository.save(waggle);

    WaggleDTO createdWaggleDTO = convertToDTO(createdWaggle);
    createdWaggleDTO.getBoard().setNickname(userNickname);
    if(waggleDto.getBoard().getBoardImage() != null) {
      createdWaggleDTO.getBoard().setBoardImage(waggleDto.getBoard().getBoardImage());
    }

    kafkaBoardNotificationProducer.boardNotification(BoardNotificationResDto.builder()
            .type(BoardNotificationResDto.BoardNotificationType.GOAL)
            .userId(userId)
            .message("글 작성 보상으로 10골을 지급 받았습니다.")
            .uri("/waggle/" + String.valueOf(board.getBoardId()))
            .profile(null)
            .nickname(null)
            .build());

//        BoardCleanbotCheckReqDto boardCleanbotCheckReqDto = BoardCleanbotCheckReqDto.builder()
//            .id(createdWaggle.getBoard().getBoardId())
//            .content(createdWaggle.getBoard().getContent())
//            .domain("board")
//            .build();
//        kafkaBoardCleanbotProducer.boardCleanbotCheck(boardCleanbotCheckReqDto);

    return createdWaggleDTO;
  }

  @Transactional
  @Override
  public WaggleDTO updateWaggle(Long boardId, WaggleDTO waggleDto) {
    Waggle existingWaggle = findWaggleByBoardId(boardId);
    updateExistingWaggle(existingWaggle, waggleDto);

    Board board = existingWaggle.getBoard();

    Set<String> hashtags = extractHashtags(waggleDto.getBoard().getContent());
    existingWaggle.setHashtags(hashtags);

    Waggle updatedWaggle = waggleRepository.save(existingWaggle);
    File file = fileService.saveFile(waggleDto.getBoard().getBoardImage());
    boardImageService.saveBoardImage(board, file);

    board.setBoardImage(file.getUri());

//        BoardCleanbotCheckReqDto boardCleanbotCheckReqDto = BoardCleanbotCheckReqDto.builder()
//            .id(boardId)
//            .content(waggleDto.getBoard().getContent())
//            .domain("board")
//            .build();
//        kafkaBoardCleanbotProducer.boardCleanbotCheck(boardCleanbotCheckReqDto);

    return convertToDTO(updatedWaggle);
  }

  // extractHashtags 메서드 추가
  private Set<String> extractHashtags(String content) {
    Set<String> hashtags = new HashSet<>();
    Pattern pattern = Pattern.compile("#([\\p{L}0-9_]+)");
    Matcher matcher = pattern.matcher(content);

    while (matcher.find()) {
      hashtags.add(matcher.group(1));
    }

    return hashtags;
  }

  @Transactional
  @Override
  public void deleteWaggle(Long boardId) {
    Waggle waggleToDelete = findWaggleByBoardId(boardId);

    if (waggleToDelete != null) {
      waggleToDelete.getBoard().setDeleteAt(LocalDateTime.now());
    }
    List<WaggleUserHashTag> waggleUserHashTag = waggleUserHashTagRepository.findByWaggleWaggleId(waggleToDelete.getWaggleId());
    waggleUserHashTagRepository.deleteAll(waggleUserHashTag);

    List<WaggleLike> waggleLikes = waggleLikeRepository.findByWaggleIdWaggleId(waggleToDelete.getWaggleId());
    waggleLikeRepository.deleteAll(waggleLikes);
    waggleRepository.deleteById(waggleToDelete.getWaggleId());

  }


  @Override
  public Page<WaggleDTO> searchWagglesWithLikes(SearchBoardConditionDto searchCondition,
      Pageable pageable) {
    Page<Waggle> waggles;

    if (searchCondition != null && searchCondition.getKeyword() != null) {
      waggles = waggleRepository.findByBoard_TitleContainingOrBoard_ContentContaining(
          searchCondition.getKeyword(),
          searchCondition.getKeyword(),
          pageable
      );
    } else {
      waggles = waggleRepository.findAll(pageable);
    }

    List<Object[]> likesCounts = waggleRepository.getLikesCountForEachWaggle();

    return waggles.map(waggle -> {
      WaggleDTO waggleDTO = convertToDTO(waggle);

      Long boardId = waggle.getBoard().getBoardId();
      Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

      waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);

      for (Object[] result : likesCounts) {
        Waggle waggleResult = (Waggle) result[0];
        if (waggleResult.getWaggleId().equals(waggle.getWaggleId())) {
          Long totalLikes = (Long) result[1];
          int likesCount = (totalLikes != null) ? totalLikes.intValue() : 0;
          waggleDTO.setLikesCount(likesCount);
          break;
        }
      }

      Integer userId = waggleDTO.getBoard().getUserId();
      List<Object[]> nicknameResult = waggleRepository.findUserNickname(userId);

      String userNickname = (String) nicknameResult.get(0)[0];
      waggleDTO.getBoard().setNickname(userNickname);
      waggleDTO.getBoard().setBoardImage(waggle.getBoard().getBoardImage());

      return waggleDTO;
    });
  }

  @Override
  public Page<WaggleDTO> getAllWaggleList(Pageable pageable) {
    Page<Waggle> waggles = waggleRepository.findByBoard_BoardType(Board.BoardType.WAGGLE,
        pageable);

    return waggles.map(waggle -> {
      WaggleDTO waggleDTO = convertToDTO(waggle);

      Long boardId = waggle.getBoard().getBoardId();
      Integer commentCount = commentRepository.countCommentsByBoardId(boardId);

      Integer likesCount = waggleRepository.getLikesCountForEachWaggle().stream()
          .filter(result -> ((Waggle) result[0]).getWaggleId().equals(waggle.getWaggleId()))
          .map(result -> ((Long) result[1]).intValue())
          .findFirst()
          .orElse(0);

      waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
      waggleDTO.setLikesCount(likesCount);

      Integer userId = waggleDTO.getBoard().getUserId();
      List<Object[]> nicknameResult = waggleRepository.findUserNickname(userId);
      String userNickname =
          nicknameResult.isEmpty() ? null : (String) nicknameResult.get(0)[0];
      waggleDTO.getBoard().setNickname(userNickname);
      waggleDTO.getBoard().setBoardImage(waggle.getBoard().getBoardImage());

      return waggleDTO;
    });
  }


  private Waggle findWaggleByBoardId(Long boardId) {
    Page<Waggle> waggles = waggleRepository.findByBoard_BoardId(boardId, Pageable.unpaged());
    if (waggles.isEmpty()) {
      throw new RuntimeException("Waggle not found with boardId: " + boardId);
    }
    return waggles.getContent().get(0);
  }

  private Board saveBoard(Board board) {
    return boardRepository.save(board);
  }

  private void updateExistingWaggle(Waggle existingWaggle, WaggleDTO waggleDto) {
    existingWaggle.getBoard().setTitle(waggleDto.getBoard().getTitle());
    existingWaggle.getBoard().setContent(waggleDto.getBoard().getContent());
  }


  @Override
  public List<WaggleDTO> getAllWagglesWithLikes(Pageable pageable) {

    List<Waggle> waggles = waggleRepository.findAllBy(pageable);

    List<WaggleDTO> wagglesWithLikes = waggles.stream()
        .map(waggle -> {
          WaggleDTO waggleDTO = convertToDTO(waggle);

          List<Object[]> profileAndMainBadge = waggleRepository.findUserNicknameAndProfileAndMainBadge(waggle.getBoard().getUserId());

          String userNickname = (String) profileAndMainBadge.get(0)[0];
          String userProfile = (String) profileAndMainBadge.get(0)[1];
          String mainBadge = (String) profileAndMainBadge.get(0)[2];
          waggleDTO.getBoard().setNickname(userNickname);
          waggleDTO.getBoard().setProfile(userProfile);
          if(mainBadge != null) {
            waggleDTO.getBoard().setMainBadge(mainBadge);
          }

          Long boardId = waggle.getBoard().getBoardId();
          Integer commentCount = commentRepository.countCommentsByBoardId(boardId);
          int likeCount = waggleLikeRepository.findByWaggleIdWaggleId(waggle.getWaggleId()).size();
          waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
          waggleDTO.setLikesCount(likeCount);

          return waggleDTO;
        })
        .collect(Collectors.toList());

//    return new PageImpl<>(wagglesWithLikes, pageable, waggles.getTotalElements());
    return wagglesWithLikes;
  }


  private List<WaggleDTO> convertToDTOListWithLikes(List<Object[]> likesCounts) {
    List<WaggleDTO> wagglesWithLikes = new ArrayList<>();
    for (Object[] result : likesCounts) {
      Waggle waggle = (Waggle) result[0];
      Long totalLikes = (Long) result[1];
      Integer commentCount = commentRepository.countCommentsByBoardId(
          waggle.getBoard().getBoardId());

      int likesCount = (totalLikes != null) ? totalLikes.intValue() : 0;

      WaggleDTO waggleDTO = convertToDTO(waggle);
      waggleDTO.setLikesCount(likesCount);
      waggleDTO.getBoard().setCommentCount(commentCount != null ? commentCount : 0);
      wagglesWithLikes.add(waggleDTO);
    }
    return wagglesWithLikes;
  }


  private WaggleDTO convertToDTO(Waggle waggle) {
    WaggleDTO waggleDTO = new WaggleDTO();
    BeanUtils.copyProperties(waggle, waggleDTO);

    waggleDTO.setBoard(BoardDTO.builder()
        .boardId(waggle.getBoard().getBoardId())
        .boardType(waggle.getBoard().getBoardType())
        .title(waggle.getBoard().getTitle())
        .content(waggle.getBoard().getContent())
        .createAt(waggle.getBoard().getCreateAt())
        .updateAt(waggle.getBoard().getUpdateAt())
        .deleteAt(waggle.getBoard().getDeleteAt())
        .boardImage(waggle.getBoard().getBoardImage())
        .commentCount(0)
        .userId(waggle.getBoard().getUserId())
        .boardType(waggle.getBoard().getBoardType())
        .build());
    waggleDTO.setHashtags(new ArrayList<>(waggle.getHashtags()));
    return waggleDTO;
  }

  private Waggle convertToEntity(WaggleDTO waggleDTO) {
    Waggle waggle = new Waggle();
    BeanUtils.copyProperties(waggleDTO, waggle);
    waggle.setBoard(Board.builder()
        .boardId(waggleDTO.getBoard().getBoardId())
        .boardType(waggleDTO.getBoard().getBoardType())
        .title(waggleDTO.getBoard().getTitle())
        .content(waggleDTO.getBoard().getContent())
        .createAt(waggleDTO.getBoard().getCreateAt())
        .updateAt(waggleDTO.getBoard().getUpdateAt())
        .deleteAt(waggleDTO.getBoard().getDeleteAt())
        .userId(waggleDTO.getBoard().getUserId())
        .boardType(waggleDTO.getBoard().getBoardType())
        .build());
    return waggle;

  }

  @Override
  public List<WaggleDTO> getMostRecentWaggles(int count) {
    List<Waggle> recentWaggles = waggleRepository.findAll(
        PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "board.createAt"))
    ).getContent();

    return recentWaggles.stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  @Override
  public void blockedByCleanbotCheck(Long boardId) {
    Waggle waggle = findWaggleByBoardId(boardId);
    waggle.getBoard().setDeleteAt(LocalDateTime.now());
    waggleRepository.save(waggle);
  }
}
