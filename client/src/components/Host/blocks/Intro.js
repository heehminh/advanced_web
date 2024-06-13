import React, { useState, useRef, useCallback, useEffect } from "react";
import { InputLabel, Slider } from "@mui/material";
import styled from "styled-components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import StartButton from "../atoms/StartButton";

const Intro = () => {
  const [city, setCity] = useState("");
  const mapElement = useRef(null);

  // 컴포넌트가 마운트될때 수동으로 스크립트를 넣어줌
  // script보다 window.initMap이 먼저 선언되도록
  const loadScript = useCallback((url) => {
    const firstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  const [currentPosition, setCurrentPosition] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setCurrentPosition(position);

        // 현재 위치의 시 정보 가져오기
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_MAP_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            const cityObj = data.results.find((result) =>
              result.types.includes("locality")
            );
            const city = cityObj?.address_components[0].long_name;
            setCity(city);
            console.log(city);
          });
      },
      (error) => {
        console.log(error);
        setCurrentPosition({
          coords: {
            latitude: 37.5,
            longitude: 126.5,
          },
        });
      }
    );
  }, []);

  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google || !currentPosition) return;

    const map = new google.maps.Map(
      document.getElementById("intro__map"),
      {
        center: {
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
        },

        zoom: 13,
      },
      [currentPosition]
    );

    const markers = [
      {
        label: 290773,
        lat: 37.5174315,
        lng: 126.7383733,
        loc: "부평구 삼산1동",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
      {
        label: 290773,
        lat: 37.50988,
        lng: 126.736315,
        loc: "부평구 삼산2동",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
      {
        label: 290773,
        lat: 37.5036839,
        lng: 126.7522461,
        loc: "원미구 상동",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
      {
        label: 290773,
        lat: 37.530279,
        lng: 126.722516,
        loc: "작전역",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
      {
        label: 290773,
        lat: 37.571594,
        lng: 126.7363805,
        loc: "계양역",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
      {
        label: 290773,
        lat: 37.584334,
        lng: 126.919561,
        loc: "서대문구 남가좌동",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
      {
        label: 290773,
        lat: 37.58285165,
        lng: 126.93564645,
        loc: "서울 서대문구",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
      {
        label: 290773,
        lat: 37.61679171,
        lng: 126.92298495,
        loc: "서울 은평구",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
      {
        label: 290773,
        lat: 37.56301011,
        lng: 126.90894547,
        loc: "서울 마포구",
        star: 4.73,
        when: "4월 6일-11일",
        plus: "안뜰 전망",
        standard: "박",
        img: "https://a0.muscache.com/im/pictures/miso/Hosting-20197171/original/e91e7c20-3cce-468a-922c-3166726fa228.jpeg?im_w=720",
      },
    ];

    const infoWindow = new google.maps.InfoWindow();

    markers.forEach(
      ({ label, lat, lng, img, loc, star, when, plus, standard }) => {
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          label: {
            // id: `marker-${index}`, // id 설정
            text: `₩${label.toLocaleString("ko-KR")}`,
            className: "icon-label",
          },
          icon: {
            url: "",
            size: new google.maps.Size(50, 20),
          },
          clickable: true, // 마커 및 라벨 클릭 가능하도록 설정
        });

        marker.addListener("click", () => {
          console.log(marker);

          const content = `
          <div class="map__item">
            <div>
              <img class="imgBox" src=${img} />
              
            </div>
            <div class="room__item__textBox">
              <div class="textBox__1">
                <div class="textBox__1__loc">${loc}</div>
                <div class="textBox__1__star">★ ${star}</div>
              </div>
              <div class="textBox__2">${plus}</div>
              <div class="textBox__2">${when}</div>
              <div class="textBox__3">
                ₩${label.toLocaleString("ko-KR")} /${standard}
              </div>
            </div>
          </div>
        `;

          infoWindow.setContent(content);
          infoWindow.open({
            anchor: marker,
            map,
          });
        });
      }
    );
    map.addListener("click", () => {
      infoWindow.close();
    });
  }, [currentPosition]);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&callback=initMap`
    );

    window.initMap = initMap;
  }, [initMap, loadScript]);

  // slider
  const [day, setDay] = useState(12);
  const [income, setIncome] = useState(12 * 77153);

  const handleSliderChange = (e, value) => {
    setDay(value);
    setIncome(value * 77153);
  };

  // 가까운 숙소 요금 확인하기
  const setPosition = () => {
    initMap();
  };

  // 에어비앤비가 수입을 산정하는 방법 - 모달창
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const modalRef = useRef();
  useOnClickOutside(modalRef, () => {
    setShowModal(false);
  });

  return (
    <IntroWrapper>
      <Left>
        <Description>
          <Title>
            <Text>당신의 공간을</Text>
            <Text>에어비앤비하세요.</Text>
          </Title>
          <Income>
            <IncomeTitle>예상 수입</IncomeTitle>
            <IncomeNumber>₩{income.toLocaleString("ko-KR")}</IncomeNumber>
            <div className="intro__income__slider">
              <InputLabel className="intro__income__description">
                <string>
                  <u>{day}</u>
                </string>
                박에 대한 예상 수입(1박 요금이 ₩77,153일 경우)
              </InputLabel>
              <Slider
                className="slider"
                defaultValue={day}
                onChange={handleSliderChange}
                aria-label="Default"
                min={1}
                max={30}
                valueLabelFormat={(value) => `${value}박`}
                valueLabelDisplay="auto"
              />
            </div>
            <div>
              <IncomeWay onClick={handleOpenModal}>
                에어비앤비가 예상 수입을 산정하는 방법
              </IncomeWay>

              {showModal && (
                <ModalOverlay>
                  <ModalWrapper ref={modalRef}>
                    <ModalHeader>
                      <ModalCloseButton onClick={handleCloseModal}>
                        X
                      </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                      <Wrapper>
                        <div className="text-32 font-bold mb-15">
                          에어비앤비가 예상 수입을
                          <br />
                          산정하는 방법
                        </div>
                        <div>
                          에어비앤비는 비슷한 에어비앤비 숙소의 지난 12개월간
                          예약 데이터를 검토하여 예상 수입을 계산합니다. 비슷한
                          숙소는 숙소에 대해 알려주신 정보를 바탕으로
                          선정됩니다. 숙소 주소를 입력하면 가까운 거리에 있는
                          숙소들을 기준으로 더 구체적인 예상 요금을 확인하실 수
                          있습니다. 지역을 입력하면 해당 지역 내 비슷한 숙소 중
                          수입 기준 상위 50% 숙소를 기준으로 한 예상 수입이
                          표시됩니다. <br />
                          <br />
                          에어비앤비는 비슷한 숙소를 기준으로 평균 1박 수입을
                          예상한 후 여기에 호스트가 호스팅할 예정이라고 표시한
                          숙박 일수를 곱합니다. 또한, 그달에 모든 에어비앤비
                          숙소가 매일 예약 가능하다는 가정하에 해당 지역의 한 달
                          평균 예약 일수를 안내해드립니다. (1박당 호스팅 수입은
                          각 호스트가 정한 요금에서{" "}
                          <u>
                            <strong>에어비앤비 호스트 서비스 수수료</strong>
                          </u>
                          를 제외한 금액으로, 세금 또는 호스팅 비용은 공제되지
                          않습니다.)
                          <br />
                          <br />
                          실제 수입은 숙소의 예약 가능일과 요금, 해당 지역 내
                          수요 등 여러 요인에 따라 달라질 수 있습니다. 또한,
                          현지 법규에 따라 호스팅 가능 여부 및 요건이 변경될 수
                          있습니다.{" "}
                          <u>
                            <strong>책임감 있는 호스팅</strong>
                          </u>
                          에 관해 자세히 알아보세요. <br />
                          <br />
                          예상 수입은 숙소 가치를 평가하거나 추정한 것이
                          아닙니다.
                        </div>
                      </Wrapper>
                    </ModalBody>
                  </ModalWrapper>
                </ModalOverlay>
              )}
            </div>

            <Search>
              <SearchIcon
                src="http://localhost:3000/assets/home-search.png"
                alt="search-icon"
              />
              <div>
                <SearchCity>{city}</SearchCity>
                <SearchDetail>공간 전체, 게스트 4명</SearchDetail>
              </div>
            </Search>
            <StartButton />
          </Income>
        </Description>
      </Left>

      <Map>
        <div ref={mapElement} id="intro__map"></div>
        <MapButton onClick={setPosition}>가까운 숙소 요금 확인하기</MapButton>
      </Map>
    </IntroWrapper>
  );
};

export default Intro;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  width: 432px;
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

const ModalCloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

const ModalBody = styled.div`
  padding: 1rem;
`;

const IntroWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px;
  margin-top: 120px;

  @media screen and (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
  }
`;

const Left = styled.div``;

const Description = styled.div`
  width: 100%;
  width: 640px;
  height: 100%;
  padding: 0px 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

const Title = styled.div`
  color: rgb(255, 56, 92);
  font-size: 48px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1400px) {
    flex-direction: row;
  }
`;

const Text = styled.div`
  margin: 0px 3px;
`;

const Income = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

const IncomeTitle = styled.div`
  color: black;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const IncomeNumber = styled.div`
  color: black;
  font-size: 72px;
  font-weight: 700;
`;

const IncomeWay = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid rgb(113, 113, 113);
  font-size: 14px;
  color: rgb(113, 113, 113);
  cursor: pointer;
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 400px;
  height: 60px;
  border: 1px solid lightgray;
  border-radius: 40px;
  padding: 12px 6px 12px 20px;
  margin: 32px 0px;
  cursor: pointer;

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

const SearchIcon = styled.img`
  height: 40px;
  object-fit: cover;
  margin-right: 16px;
`;

const SearchCity = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const SearchDetail = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: rgb(113, 113, 113);
`;

const Map = styled.div`
  width: 640px;
  height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapButton = styled.div`
  height: 45px;
  padding: 11px 16px;
  color: black;
  font-weight: 600;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  position: absolute;
  top: 50px;
  transform: translateY(-50%);
  box-shadow: 10px 10px 5px rgb(0, 0, 0, 0.2);
  z-index: 100;
`;
