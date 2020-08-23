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

export interface SignInRequest {
  username: string;
  password: string;
}

export async function signIn({ username, password }: SignInRequest) {
  const res = await axios.post(
    "/account/v1/sign-in",
    {
      username,
      password,
    }
  );
  resetToken(`${res?.data?.token}`);
}

export interface SignUpRequest {
  username: string;
  password: string;
  companyCode: string;
  displayName: string;
}

export async function signUp(signUpRequest: SignUpRequest) {
  const res = await axios.post(
    "/account/v1/sign-up",
    signUpRequest
  );
  resetToken(`${res?.data?.token}`);
}

export function logOut() {
  expireToken()
}

export interface UserView {
  id: number;
  displayName: string;
  imageUrl?: string;
  companyId: string;
}

export async function searchUsers(query?: string): Promise<UserView[]> {
  const res = await axios.get(
    "/users/v1"
  )
  return res.data.users
}
