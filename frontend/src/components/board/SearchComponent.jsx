import React, { useState } from "react";
import { getSearchWaggleList } from "../../api/waggle";

function SearchComponent({ onSearch }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    setShowSearchBar(true);
  };

  const handleSearch = () => {
    getSearchWaggleList(
      searchKeyword,
      0,
      10,
      (response) => {
        if (response && response.data && response.data.content) {
          const waggleList = response.data.content.map((item) => item.waggle);

          onSearch(waggleList);
        } else {
        }
        setShowSearchBar(false);
      },
      () => {},
    );
  };

  return (
    <div>
      <button onClick={handleSearchClick}>검색</button>
      {showSearchBar && (
        <div>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
