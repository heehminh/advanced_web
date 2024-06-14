import { atom } from 'recoil';

// 사용자 상태
export const userState = atom({
  key: 'userState', 
  default: {
    isAuthenticated: false,
    user: null,
  },
});
