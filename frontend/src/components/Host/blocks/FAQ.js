import React, { useState } from "react";
import styled from "styled-components";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const AccordionTitle = ({ title, isOpen, toggle }) => {
  return (
    <TitleWrapper onClick={toggle}>
      {title}
      {isOpen ? <UpOutlined /> : <DownOutlined />}
    </TitleWrapper>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      id: 1,
      title: "제 공간이 에어비앤비 숙소로 적합할까요?",
      content:
        "에어비앤비 게스트가 찾는 숙소는 매우 다양하며, 에어비앤비에서는 초소형 주택, 통나무집, 트리하우스 등 다양한 유형의 숙소가 등록되어 있습니다. 집에 남는 방 한 칸이라도 훌륭한 숙소가 될 수 있습니다.",
    },
    {
      id: 2,
      title: "일 년 내내 호스팅해야 하나요?",
      content:
        "절대 아닙니다. 호스트는 달력에서 호스팅하려는 날짜를 자유롭게 선택할 수 있어요. 1년에 한 번이나 한 달에 며칠만 호스팅해도 되고, 원하시면 더 자주 호스팅하실 수 있습니다.",
    },
    {
      id: 3,
      title: "게스트와 얼마나 소통해야 하나요?",
      content:
        "게스트와 얼마나 자주 소통할지는 호스트가 자유롭게 결정하는 사항입니다. 체크인 시 짧은 인사를 보내는 식으로 숙박 과정에서 중요한 순간에만 게스트에게 메시지를 보내는 호스트가 있는 반면, 게스트와 직접 만나 이야기 나누는 걸 즐기는 호스트도 있습니다. 호스팅을 하면서 본인과 게스트 모두에게 잘 맞는 방식을 찾으실 수 있을 거예요.",
    },
    {
      id: 4,
      title: "훌륭한 에어비앤비 호스트가 되기 위한 팁이 있나요?",
      content:
        "기본에 충실한 것이 중요합니다. 숙소를 깨끗하게 관리하고, 게스트에게 신속하게 답변하며, 깨끗한 수건처럼 꼭 필요한 편의시설을 갖추세요. 싱싱한 꽃을 꽂아놓거나 숙소 주변에 가보면 좋을 장소를 추천하는 등 조금 더 세심한 배려를 보이는 호스트도 있지만, 이는 필수 사항은 아닙니다.",
    },
    {
      id: 5,
      title: "에어비앤비 수수료는 얼마인가요?",
      content:
        "일반적으로 에어비앤비는 호스팅 대금에서 예약 소계의 3%에 해당하는 금액을 고정 서비스 수수료로 차감합니다. 또한 예약하는 게스트에게도 수수료를 부과합니다. 에어비앤비는 상당수 지역에서 호스트를 대신해 자동으로 판매세 및 관광세를 징수·납부합니다.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Wrapper>
      <FAQLeft>
        자주 묻는 질문과 <br /> 답변
      </FAQLeft>
      <Questions>
        {questions.map((question, index) => (
          <Accordion key={index}>
            <AccordionTitle
              title={question.title}
              isOpen={activeIndex === index}
              toggle={() => toggleAccordion(index)}
            />
            <AccordionContent isOpen={activeIndex === index}>
              {question.content}
            </AccordionContent>
          </Accordion>
        ))}
      </Questions>
    </Wrapper>
  );
};

export default FAQ;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: rgb(247, 247, 247);
  padding: 48px 200px;

  @media screen and (max-width: 1400px) {
    flex-direction: column;
    padding: 32px 20px;
  }
`;

const FAQLeft = styled.div`
  width: 50%;
  font-size: 40px;
  font-weight: 600;
  padding: 32px 32px;

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

const Questions = styled.div`
  width: 50%;

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

const Accordion = styled.div`
  border-bottom: 1px solid #ccc;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  cursor: pointer;
  font-size: 22px;
  font-weight: 400;
`;

const AccordionContent = styled.div`
  padding: 0px 32px 32px 32px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;
