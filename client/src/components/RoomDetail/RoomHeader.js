import React from "react";
import { useNavigate } from "react-router-dom";

const RoomHeader = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header__logo">
        <img
          alt="header-logo"
          id="header__logo-image"
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
        />
      </div>
      <div className="header__search-bar-room">
        <button className="search-bar-button" id="button-where">
          검색 시작하기
        </button>
        <img
          alt="search-bar"
          id="search-bar-icon"
          src="./assets/home-search.png"
        />
      </div>
      <div className="header__setting">
        <div
          className="header__setting-description"
          onClick={() => navigate("/host")}
        >
          당신의 공간을 에어비앤비하세요
        </div>
        <div className="header__setting-icon">
          <img alt="setting" src="../assets/home-setting.png" />
        </div>
        <div className="header__setting-profile">
          <div className="profile-list">
            <img
              alt="profile list"
              src="./assets/home-list.png"
              id="profile-list-img"
            />
          </div>
          <div className="profile-icon">
            <img
              alt="profile icon"
              src="./assets/home-my.png"
              id="profile-icon-img"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default RoomHeader;
