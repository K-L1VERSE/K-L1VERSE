import React, { useState } from "react";
import { getSearchWaggleList } from "../../api/waggle";

function SearchComponent({ onSearch }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
    console.log(searchKeyword, "!!!!!!!!!!!!!!!!!!!");
    console.log(e);
    console.log(e.target.value);
  };

  const handleSearchClick = () => {
    setShowSearchBar(true);
  };

  const handleSearch = () => {
    getSearchWaggleList(
      searchKeyword,
      0,
      10,
      ({ data }) => {
        onSearch(data.content); // data에 'content' 속성이 있는지 확인
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
