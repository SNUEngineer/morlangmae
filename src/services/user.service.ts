import axios, { resetToken, expireToken } from "../common/axios";

export async function validateToken() {
  try {
    await axios.get("/token/v1/validate");
  } catch (err) {
    expireToken();
  }
}

export interface SignInRequest {
  username: string;
  password: string;
}

export async function signIn({ username, password }: SignInRequest) {
  const res = await axios.post("/account/v1/sign-in", {
    username,
    password,
  });
  resetToken(`${res?.data?.token}`);
}

export interface SignUpRequest {
  username: string;
  password: string;
  companyCode: string;
  displayName: string;
}

export async function signUp(signUpRequest: SignUpRequest) {
  const res = await axios.post("/account/v1/sign-up", signUpRequest);
  resetToken(`${res?.data?.token}`);
}

export function logOut() {
  expireToken();
}

export interface UserView {
  id: number;
  displayName: string;
  imageUrl?: string;
  companyId: string;
}

export async function searchUsers(query?: string): Promise<UserView[]> {
  console.log("serach users ");
  const res = await axios.get("/users/v1");
  console.log("serach users " + JSON.stringify(res));
  return res.data.users;
}

export interface EditUserRequest {
  id: number;
  imageUrl: string;
}

export async function getMe(): Promise<UserView> {
  const res = await axios.get("/users/v1/me");
  return res.data;
}

export async function editUser(request: EditUserRequest): Promise<void> {
  const { id, imageUrl } = request;
  await axios.post(`/users/v1/${id}`, {
    imageUrl,
  });
}
