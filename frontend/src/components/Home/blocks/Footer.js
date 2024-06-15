import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper id="footer">
      <Footer01>
        © 2024 minhee, Inc. · 개인정보 처리방침 · 이용약관 · 사이트맵 · 한국의
        변경된 환불 정책 · 회사 세부정보
      </Footer01>
      <div className="line"></div>
      <Footer02>
        웹사이트 제공자: 여행집 Ireland UC, private unlimited company, 8 Hanover
        Quay Dublin 2, D02 DP23 Ireland | 이사: Dermot Clarke, Killian Pattwell,
        Andrea Finnegan | VAT 번호: IE9827384L | 사업자 등록 번호: IE 511825 |
        연락처: terms@mini.com, 웹사이트, 080-822-0230 | 호스팅 서비스
        제공업체: 아마존 웹서비스 | 여행집은 통신판매 중개자로 여행집
        플랫폼을 통하여 게스트와 호스트 사이에 이루어지는 통신판매의 당사자가
        아닙니다. 여행집 플랫폼을 통하여 예약된 숙소, 체험, 호스트 서비스에
        관한 의무와 책임은 해당 서비스를 제공하는 호스트에게 있습니다.
      </Footer02>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 40px;
  z-index: 999;
`;

const Footer01 = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: rgb(34, 34, 34);
  margin-bottom: 10px;
`;

const Footer02 = styled.div`
  font-size: 10px;
  line-height: 12px;
  color: gray;
  margin-top: 10px;
`;
