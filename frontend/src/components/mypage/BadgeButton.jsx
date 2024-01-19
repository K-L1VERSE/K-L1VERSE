import { useState } from "react";

function BadgeButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badgeList, setBadgeList] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
    /* axios로 가지고 있는 뱃지 코드 리스트 가져오기 */
    setBadgeList([1, 4]);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button type="button" onClick={openModal}>
        뱃지
      </button>
      {isModalOpen && (
        <div className="modal">
          {/* 모달 내용 */}
          <div>
            <button type="button" onClick={closeModal}>
              &times;
            </button>
            <p>
              {badgeList.map((badge) => (
                /* Todo... 이미지 엑박 해결하기 */
                <img src="../../logo.svg" alt={badge} />
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BadgeButton;
