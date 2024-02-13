import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import Hangul from "hangul-js";
import Swal from "sweetalert2";
import { UserState, ModifyingState } from "../../global/UserState";
import axios from "../../api/axios";
import {
  ModalBackground,
  ModalContainer,
  ModalTopItems,
  ModalClose,
  MyInfoInput,
  ButtonContainer,
  CancleButton,
  SaveButton,
} from "../../styles/mypage-styles/EditNicknameModel";

const EditNicknameModal = ({ type, setModalOpen, user, setUser }) => {
  const [newNickname, setNewNickname] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(true);
  const setUserState = useSetRecoilState(UserState);
  const setModifyingState = useSetRecoilState(ModifyingState);

  const isHangul = (input) => {
    return Hangul.isComplete(input);
  };

  const isAlphaNumeric = (input) => {
    return /^[0-9a-zA-Z]*$/.test(input);
  };

  const isValidNickname = (nickname) => {
    if (nickname.trim() === "") {
      return false;
    }

    for (let i = 0; i < nickname.length; i++) {
      const char = nickname.charAt(i);
      if (!isHangul(char) && !isAlphaNumeric(char)) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const checkNicknameAvailability = async () => {
      try {
        const response = await axios.post("/user/users/check-nickname", {
          nickname: newNickname,
        });
        setIsNicknameAvailable(response.data);
      } catch (err) {
        setIsNicknameAvailable(false);
      } finally {
        setIsCheckingAvailability(false);
      }
    };

    if (
      isValidNickname(newNickname) &&
      newNickname.length >= 2 &&
      newNickname.length <= 5
    ) {
      checkNicknameAvailability();
    } else {
      setIsCheckingAvailability(true);
      setIsNicknameAvailable(false);
    }
  }, [newNickname]);

  const closeModal = () => {
    setModifyingState((prev) => ({
      ...prev,
      modifyingNickname: false,
    }));
    setModalOpen(false);
  };

  const getInput = (e) => {
    setNewNickname(e.target.value);
  };

  const cancelEdit = () => {
    closeModal();
  };

  const saveEdit = () => {
    if (isNicknameAvailable) {
      if (type === "modify") {
        axios
          .put("/user/users/nickname", {
            nickname: newNickname,
          })
          .then((res) => {
            if (res.data.code === 1002) {
              Swal.fire({
                icon: "error",
                title: "포인트가 부족합니다.",
              });
              closeModal();
              return;
            }
            setUser(() => {
              const prev = { ...user };
              prev.nickname = newNickname;
              prev.goal -= 1000;
              return prev;
            });
            setUserState((prev) => ({
              ...prev,
              nickname: newNickname,
            }));
            Swal.fire({
              html: `<p style='font-size:1.2rem; font-family:Pretendard-Bold;'>닉네임이 변경되었습니다.</p>`,
              width: "20rem",
              imageUrl:
                "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Ghost.png",
              imageWidth: 100,
            });
            closeModal();
          })
          .catch(() => {});
      } else if (type === "signUp") {
        axios
          .post("/user/users/nickname", {
            nickname: newNickname,
          })
          .then(() => {
            setUserState((prev) => ({
              ...prev,
              nickname: newNickname,
            }));
          });
        Swal.fire({
          text: "닉네임이 설정되었습니다.",
          width: "20rem",
          imageUrl:
            "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Ghost.png",
          imageWidth: 100,
        });
        setModalOpen(false);
      }
    }
  };
  const isNicknameLengthShorterThanTwo = newNickname.length >= 2;
  const isNicknameLengthLongerThanFive = newNickname.length <= 5;
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalTopItems>
          <div className="title">
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Revolving%20Hearts.png"
              alt="Revolving Hearts"
              width="25"
              height="25"
            />
            {type === "signUp" && <div>닉네임 설정</div>}
            {type === "modify" && <div>닉네임 변경</div>}
          </div>
          {type === "modify" && <ModalClose onClick={closeModal}>X</ModalClose>}
        </ModalTopItems>
        <MyInfoInput
          onChange={getInput}
          value={newNickname}
          maxLength={10}
          placeholder="닉네임을 입력해주세요."
        />
        {!isNicknameLengthShorterThanTwo && (
          <p
            style={{
              color: "red",
              position: "absolute",
              fontSize: "12px",
              top: "48%",
              marginTop: "10px",
              left: "28%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            2글자 이상 입력해주세요.
          </p>
        )}
        {!isNicknameLengthLongerThanFive && (
          <p
            style={{
              color: "red",
              position: "absolute",
              fontSize: "12px",
              top: "48%",
              marginTop: "10px",
              left: "28%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            5글자 이하 입력해주세요.
          </p>
        )}
        {type === "modify" && (
          <div
            className="info"
            style={{
              fontSize: "0.6.5rem",
              fontStyle: "italic",
              transform: "translateX(-4.3rem)",
            }}
          >
            * 변경 시 1000골이 차감됩니다.
          </div>
        )}
        {newNickname.length >= 2 &&
          !isCheckingAvailability &&
          !isNicknameAvailable && (
            <p
              style={{
                color: "red",
                position: "absolute",
                fontSize: "12px",
                top: "50%",
                marginTop: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              사용중인 닉네임 입니다.
            </p>
          )}
        <ButtonContainer>
          {type === "modify" && (
            <CancleButton onClick={cancelEdit}>취소</CancleButton>
          )}
          <SaveButton onClick={saveEdit} $abled={isNicknameAvailable}>
            저장
          </SaveButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EditNicknameModal;
