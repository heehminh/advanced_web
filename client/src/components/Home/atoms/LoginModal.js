import React, { useState } from "react";
import styled from "styled-components";
import KakaoLoginPage from "../../../auth/KakaoLoginPage";

const LoginModal = () => {
  const [country, setCountry] = useState("+82");
  const handleSelectChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <Wrapper>
      <Title>에어비앤비에 오신 것을 환영합니다.</Title>
      <SelectWrapper>
        <Select value={country} onChange={handleSelectChange}>
          <option value="+351">포르투칼 (+351)</option>
          <option value="+90">터키 (+90)</option>
          <option value="+1">미국 (+1)</option>
          <option selected value="+82">
            대한민국 (+82)
          </option>
          <option value="+52">멕시코 (+52)</option>
        </Select>
        <InputWrapper>
          <div>{country}</div>
          <Input placeholder="전화번호" type="tel" />
        </InputWrapper>
      </SelectWrapper>
      <Description>
        전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터
        요금이 부과됩니다.{" "}
        <u>
          <strong>개인정보 처리방침</strong>
        </u>
      </Description>
      <Continue>계속</Continue>
      <LineWrapper>또는</LineWrapper>
      <div>
        <KakaoLoginPage />
      </div>
    </Wrapper>
  );
};

export default LoginModal;

const Wrapper = styled.div`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin-top: 15px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
`;

const Select = styled.select`
  width: 100%;
  padding: 18px 12px;
  font-size: 16px;
  vertical-align: top;
  border: 1px solid black;
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
`;

const Input = styled.input`
  border: none;
  margin-left: 5px;
  font-size: 16px;
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: 18px 12px;
  font-size: 16px;
  display: flex;
  border: 1px solid black;
  border-radius: 0px 0px 10px 10px;
`;

const Description = styled.div`
  margin: 5px;
  font-size: 14px;
`;

const Continue = styled.button`
  width: 100%;
  height: 50px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  background-color: rgb(255, 56, 92);
  cursor: pointer;
  border: none;
  margin: 10px 0px;
  border-radius: 10px;
`;

const LineWrapper = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: black;
  font-size: 14px;
  margin: 8px 0px;

  &::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: lightgray;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }

  &::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: lightgray;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
`;
