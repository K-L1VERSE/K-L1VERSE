import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Hangul from "hangul-js";
import Swal from "sweetalert2";
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

const EditNicknameModal = ({ setModalOpen, user, setUser }) => {
  const [newNickname, setNewNickname] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(true);

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

    if (isValidNickname(newNickname) && newNickname.length >= 2) {
      checkNicknameAvailability();
    } else {
      setIsCheckingAvailability(true);
      setIsNicknameAvailable(false);
    }
  }, [newNickname]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const getInput = (e) => {
    setNewNickname(e.target.value);
  };

  const cancelEdit = () => {
    setModalOpen(false);
  };

  const saveEdit = () => {
    if (isNicknameAvailable) {
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
            setModalOpen(false);
            return;
          }
          setUser(() => {
            const prev = { ...user };
            prev.nickname = newNickname;
            prev.goal -= 1000;
            return prev;
          });
          Swal.fire({
            text: "1000골이 차감되었습니다.",
            width: "20rem",
            imageUrl:
              "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Ghost.png",
          });
          setModalOpen(false);
        })
        .catch(() => {});
    }
  };

  const isNicknameLengthValid = newNickname.length >= 2;

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalTopItems>
          <h3>닉네임 변경</h3>
          <ModalClose onClick={closeModal}>X</ModalClose>
        </ModalTopItems>

        <MyInfoInput
          onChange={getInput}
          value={newNickname}
          maxLength={10}
          placeholder="닉네임을 입력해주세요."
        />
        {!isNicknameLengthValid && (
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
            2글자 이상 입력해주세요.
          </p>
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
          <CancleButton onClick={cancelEdit}>취소</CancleButton>
          <SaveButton onClick={saveEdit} $abled={isNicknameAvailable}>
            저장
          </SaveButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EditNicknameModal;
