import { atom } from "recoil";

export const nameAtom = atom({
  key: "nameAtom",
  default: localStorage.getItem("nameAtom")
    ? localStorage.getItem("nameAtom")
    : "",
});

export const emailAtom = atom({
  key: "emailAtom",
  default: localStorage.getItem("emailAtom")
    ? localStorage.getItem("emailAtom")
    : "",
});

export const loginAtom = atom({
  key: "loginAtom",
  default: {
    token: localStorage.getItem("loginAtom") || null,
  },
});
