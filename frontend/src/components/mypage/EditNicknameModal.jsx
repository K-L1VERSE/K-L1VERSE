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

  useEffect(() => {
    const checkNicknameAvailability = async () => {
      try {
        const response = await axios.post("/user/users/check-nickname", {
          nickname: newNickname,
        });
        setIsNicknameAvailable(response.data);
      } catch (error) {
        console.error("Error checking nickname availability:", error);
        setIsNicknameAvailable(false);
      } finally {
        setIsCheckingAvailability(false);
      }
    };

    if (isCompleteWord(newNickname) && newNickname.length >= 2) {
      checkNicknameAvailability();
    } else {
      setIsCheckingAvailability(true);
      setIsNicknameAvailable(false);
    }
  }, [newNickname]);

  const isCompleteWord = (word) => {
    const lastChar = word.charAt(word.length - 1);
    return Hangul.isComplete(lastChar);
  };

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
    console.log("저장");
    if (isNicknameAvailable) {
      console.log("저장");
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
          setModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
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
          <SaveButton
            onClick={saveEdit}
            disabled={newNickname.length < 2 || !isNicknameAvailable}
          >
            저장
          </SaveButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EditNicknameModal;
