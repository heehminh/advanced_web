import React from "react";
import styled from "styled-components";
import StartButton from "../atoms/StartButton";

const Start = () => {
  return (
    <Wrapper>
      <Title>에어비앤비 스타트로 쉽⁠게 에⁠어⁠비⁠앤⁠비⁠하⁠세⁠요</Title>
      <Img
        src="https://a0.muscache.com/im/pictures/5dcdc471-a645-4a34-b06d-3cb84e9c15c5.jpg?im_w=2560&im_q=highq"
        alt="슈퍼호스트이미지"
      />
      <Description>
        <Des>
          <DTitle>슈퍼호스트의 일대일 지원</DTitle>
          <DText>
            에어비앤비가 숙소 운영 경험이 풍부한 슈퍼호스트와 연결해드립니다.
            전화, 화상 통화 또는 채팅을 통해 한국어로 호스팅에 대한 궁금증을
            해결하고 첫 게스트를 맞이하는 방법도 배우실 수 있어요. 물론 무료로
            제공됩니다.
          </DText>
        </Des>
        <Des>
          <DTitle>첫 예약에서 경험이 풍부한 게스트를 맞이하는 옵션</DTitle>
          <DText>
            에어비앤비에서 최소 3건의 숙박을 완료하고 평점이 좋은 게스트를 첫
            게스트로 맞이하도록 선택할 수 있습니다
          </DText>
        </Des>
        <Des>
          <DTitle>에어비앤비의 특별 지원</DTitle>
          <DText>
            신규 호스트는 터치 한 번으로 특별 교육을 받은 고객지원 상담원과
            연결되어 계정 문제부터 대금 수령까지 모든 방면에서 도움을 받을 수
            있습니다.
          </DText>
        </Des>
      </Description>
      <Ready>
        <RText>호스팅을 시작할 준비가 되셨나요?</RText>
        <StartButton />
      </Ready>
    </Wrapper>
  );
};

export default Start;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 120px;
  align-items: center;

  @media screen and (max-width: 1400px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: 600;
  margin: 0px 40px 40px 40px;

  @media screen and (max-width: 1400px) {
    width: 100%;
    text-align: start;
    font-size: 36px;
    padding-left: 160px;
  }
`;

const Img = styled.img`
  width: 100%;

  @media screen and (max-width: 1400px) {
    width: calc((100% - 300px));
  }
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;

  @media screen and (max-width: 1400px) {
    flex-direction: column;
    width: calc((100% - 300px));
  }
`;

const Des = styled.div`
  width: 373px;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;

  @media screen and (max-width: 1400px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const DTitle = styled.div`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const DText = styled.div`
  color: rgb(113, 113, 113);
  font-size: 16px;
  font-weight: 400;
`;

const Ready = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-top: 64px;

  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

const RText = styled.div`
  margin-bottom: 24px;
`;
