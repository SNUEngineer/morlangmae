import axios from "../../common/axios";

export function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return axios
    .post("/account/v1/sign-in", {
      username,
      password,
    })
    .then((res) => {
      localStorage.setItem("Authorization", `Bearer ${res?.data?.token}`);
    });
}

export function signUp() {
  return axios.post("/account/v1/sign-up", {}).then((res) => {
    localStorage.setItem("Authorization", `Bearer ${res?.data?.token}`);
  });
}
