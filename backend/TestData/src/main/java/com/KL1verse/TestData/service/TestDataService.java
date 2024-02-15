package com.KL1verse.TestData.service;

import com.KL1verse.TestData.dto.res.TestDataResDto;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TestDataService {

    @AllArgsConstructor
    private static class Member {
        private String name;
        private int backNo;
    }

    private static class TeamInfo {
        private String name;
        private int teamId;
        private List<Member> members;
    }

    private final TeamInfo homeTeam = new TeamInfo();
    private final TeamInfo awayTeam = new TeamInfo();

    @PostConstruct
    public void init() {
        homeTeam.name = "서울";
        homeTeam.teamId = 5;
        homeTeam.members = new ArrayList<>();
        homeTeam.members.add(new Member("백종범", 1));
        homeTeam.members.add(new Member("서주환", 23));
        homeTeam.members.add(new Member("강상희", 91));
        homeTeam.members.add(new Member("권완규", 3));
        homeTeam.members.add(new Member("김주성", 30));
        homeTeam.members.add(new Member("김진야", 17));
        homeTeam.members.add(new Member("고요한", 13));
        homeTeam.members.add(new Member("기성용", 6));
        homeTeam.members.add(new Member("김성민", 77));
        homeTeam.members.add(new Member("김윤겸", 28));
        homeTeam.members.add(new Member("백상훈", 35));
        homeTeam.members.add(new Member("강성진", 11));
        homeTeam.members.add(new Member("김경민", 19));
        homeTeam.members.add(new Member("김신진", 9));
        homeTeam.members.add(new Member("나상호", 7));


        awayTeam.name = "수원";
        awayTeam.teamId = 11;
        awayTeam.members = new ArrayList<>();
        awayTeam.members.add(new Member("노동건", 17));
        awayTeam.members.add(new Member("곽동준", 32));
        awayTeam.members.add(new Member("김주엽", 24));
        awayTeam.members.add(new Member("박병현", 66));
        awayTeam.members.add(new Member("박철우", 3));
        awayTeam.members.add(new Member("오인표", 13));
        awayTeam.members.add(new Member("김규형", 19));
        awayTeam.members.add(new Member("김선민", 55));
        awayTeam.members.add(new Member("김예성", 34));
        awayTeam.members.add(new Member("서승우", 35));
        awayTeam.members.add(new Member("김재현", 91));
        awayTeam.members.add(new Member("로페즈", 10));
        awayTeam.members.add(new Member("이광혁", 22));
        awayTeam.members.add(new Member("이승우", 11));
        awayTeam.members.add(new Member("장재웅", 29));
        awayTeam.members.add(new Member("정은우", 77));
    }


    private final List<TestDataResDto>[] testDataResDtoList = new ArrayList[1000];
    private final int[] timelineIdArray = new int[1000];
    private String[] eventNames = new String[]{"경기시작", "경기종료", "유효슈팅", "득점", "경고", "퇴장", "교체"};
    private String[] homeOrAway = new String[]{"HOME", "AWAY"};

    private final Map<Integer, Integer> hashmap = new HashMap<>();

        public List<TestDataResDto> getTimelines(int matchId) {

            if(!hashmap.containsKey(matchId)) {
                testDataResDtoList[matchId] = new ArrayList<>();
                timelineIdArray[matchId] = 0;
                hashmap.put(matchId, 1);
                testDataResDtoList[matchId].add(TestDataResDto.builder()
                                .timelineId(++timelineIdArray[matchId])
                                .eventName("경기시작")
                                .timeMin(0)
                                .homeOrAway("AWAY")
                                .build());
            } else {
                hashmap.put(matchId, hashmap.get(matchId) + 1);

                if(timelineIdArray[matchId] == 19) {
                    testDataResDtoList[matchId].add(TestDataResDto.builder()
                            .timelineId(++timelineIdArray[matchId])
                            .eventName("경기종료")
                            .timeMin(90)
                            .homeOrAway("AWAY")
                            .build());
                } else if(timelineIdArray[matchId] < 19) {

                    String eventName = eventNames[(int)(Math.random() * 5) + 2];

                    TestDataResDto testDataResDto = TestDataResDto.builder()
                            .timelineId(++timelineIdArray[matchId])
                            .eventName(eventName)
                            .build();

                    String isHomeOrAway = homeOrAway[(int)(Math.random() * 2)];
                    if(isHomeOrAway.equals("HOME")) {
                        testDataResDto.setHomeOrAway("HOME");
                        testDataResDto.setTeamId(homeTeam.teamId);
                        testDataResDto.setTeamName(homeTeam.name);
                        Member member = homeTeam.members.get((int)(Math.random() * 15));
                        testDataResDto.setBackNo(member.backNo);
                        testDataResDto.setPlayerName(member.name);

                        if(eventName.equals("교체")) {
                            Member member2 = homeTeam.members.get((int)(Math.random() * 15));
                            while(member.backNo == member2.backNo) {
                                member2 = homeTeam.members.get((int)(Math.random() * 15));
                            }
                            testDataResDto.setBackNo(member2.backNo);
                            testDataResDto.setPlayerName2(member2.name);
                        }
                    } else {
                        testDataResDto.setHomeOrAway("AWAY");
                        testDataResDto.setTeamId(awayTeam.teamId);
                        testDataResDto.setTeamName(awayTeam.name);
                        Member member = awayTeam.members.get((int)(Math.random() * 16));
                        testDataResDto.setBackNo(member.backNo);
                        testDataResDto.setPlayerName(member.name);

                        if(eventName.equals("교체")) {
                            Member member2 = homeTeam.members.get((int)(Math.random() * 15));
                            while(member.backNo == member2.backNo) {
                                member2 = homeTeam.members.get((int)(Math.random() * 15));
                            }
                            testDataResDto.setBackNo(member2.backNo);
                            testDataResDto.setPlayerName2(member2.name);
                        }
                    }

                    testDataResDto.setTimeMin((int)(Math.random() * 4) + (4*timelineIdArray[matchId]));

                    testDataResDtoList[matchId].add(testDataResDto);
                }
                else {
                    testDataResDtoList[matchId] = new ArrayList<>();
                    timelineIdArray[matchId] = 0;
                    return null;
                }
            }

            return testDataResDtoList[matchId];
        }
}
