import axios, { resetToken, expireToken } from '../common/axios';

export function signIn({ username, password }: { username: string, password: string }) {
  return axios.post(
    "/account/v1/sign-in",
    {
      username,
      password,
    }
  ).then(res => {
    resetToken(`Bearer ${res?.data?.token}`)
  });
}

export function signUp() {
  return axios.post(
    "/account/v1/sign-up",
    {

    }
  ).then(res => {
    resetToken(`Bearer ${res?.data?.token}`)
  });
}

export function logOut() {
  expireToken()
}
