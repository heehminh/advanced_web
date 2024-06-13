import React from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import { useRecoilState } from "recoil";
import { nameAtom, emailAtom } from "../recoil/atom";
import { loginAtom } from "../recoil/atom";

const KakaoLoginPage = () => {
  const setName = useRecoilState(nameAtom);
  const setEmail = useRecoilState(emailAtom);
  const setIsLogin = useRecoilState(loginAtom);

  // 프론트만으로 구현 (카카오 Javascript key 사용)
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_KEY;
  const kakaoOnsuccess = async (data) => {
    console.log("체크");
    console.log(data);
    const token = data.response.access_token;
    // token 을 백에 보내야하는데 일단은 백이 없으니 Local에 저장해놓고 사용하겠음
    console.log(`idToken ${token}`);

    setName(data.profile.properties.nickname);
    setEmail(data.profile.kakao_account.email);
    
    // setName과 setEmail이 값을 변경한 후에 localStorage.setItem을 호출
    localStorage.setItem("loginAtom", token);
    localStorage.setItem("nameAtom", data.profile.properties.nickname);
    localStorage.setItem("emailAtom", data.profile.kakao_account.email);

    setIsLogin(true);
  };

  const kakaoOnFailrue = (error) => {
    console.log(error);
    setIsLogin(false);
    localStorage.removeItem("loginAtom");
  };

  return (
    <div>
      <Wrapper>
        <Icon
          src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg"
          alt="kakao logo"
        ></Icon>
      <KakaoLogin
          token={kakaoClientId}
          onSuccess={kakaoOnsuccess}
          onFail={kakaoOnFailrue}
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            color: "black",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "20px",
            paddingLeft: "17px",
            backgroundColor: "white",
            border: "none",
            cursor: "pointer",
          }}
        />
      </Wrapper>
      <Wrapper>
        <Icon
          src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5rH/image/aFrEyVpANu07FvoBZQbIB4aF_uc"
          alt="google logo"
        ></Icon>
        <Text>구글로 로그인하기</Text>
      </Wrapper>
      <Wrapper>
        <Icon
          src="https://blog.kakaocdn.net/dn/uqJpZ/btqyenBIIXx/mh1Cc5F023UGpfQTFBdqV0/img.jpg"
          alt="apple logo"
        ></Icon>
        <Text>애플로 로그인하기</Text>
      </Wrapper>
      <Wrapper>
        <Icon
          src="https://png.pngtree.com/png-vector/20190429/ourlarge/pngtree-vector-mail-icon-png-image_995083.jpg"
          alt="apple logo"
        ></Icon>
        <Text>이메일로 로그인하기</Text>
      </Wrapper>
    </div>
  );
};

export default KakaoLoginPage;

const Wrapper = styled.button`
  width: 100%;
  height: 50px;
  background-color: white;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const Icon = styled.img`
  position: fixed;
  width: 30px;
`;

const Text = styled.button`
  width: 100%;
  height: 100%;
  text-align: center;
  color: black;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  padding-left: 17px;
  background-color: white;
  border: none;
  cursor: pointer;
`;
