import axios, { resetToken, expireToken } from '../common/axios';

export async function validateToken() {
  try {
    const res = await axios.get(
      "/v1"
    );
  } catch (err) {
    expireToken();
  }
}

export async function signIn({ username, password }: { username: string, password: string }) {
  const res = await axios.post(
    "/account/v1/sign-in",
    {
      username,
      password,
    }
  );
  resetToken(`Bearer ${res?.data?.token}`);
}

export async function signUp() {
  const res = await axios.post(
    "/account/v1/sign-up",
    {

    }
  );
  resetToken(`Bearer ${res?.data?.token}`);
}

export function logOut() {
  expireToken()
}
