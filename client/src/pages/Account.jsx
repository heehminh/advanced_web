import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { nameAtom, emailAtom } from "../recoil/atom";
import AccountButton from "../components/Home/atoms/AccountButton";

export const Account = () => {
  const name = useRecoilValue(nameAtom);
  const email = useRecoilValue(emailAtom);

  return (
    <App>
      <Wrapper>
        <AccountBox>
          <AccountTitle>계정</AccountTitle>
          <AccountInfo>
            {name}, {email}, <u>프로필로 이동</u>
          </AccountInfo>
        </AccountBox>

        <Container>
          <AccountButton />
          <AccountButton />
          <AccountButton />
          <AccountButton />
          <AccountButton />
          <AccountButton />
          <AccountButton />
        </Container>
      </Wrapper>
    </App>
  );
};

const App = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
`;

const AccountBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const AccountTitle = styled.div`
  color: black;
  font-size: 32px;
  font-weight: 600;
  line-height: 36px;
  margin-bottom: 5px;
`;

const AccountInfo = styled.div`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
