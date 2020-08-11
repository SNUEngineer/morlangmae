import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

const tokenHeader = 'Authorization';

export function resetToken(token?: string) {
  if (token) {
    localStorage.setItem(tokenHeader, token)
    axiosInstance.defaults.headers.common[tokenHeader] = token;
  }
}

export function expireToken() {
  localStorage.removeItem(tokenHeader)
}

const token = localStorage.getItem(tokenHeader);
if (token) {
  axiosInstance.defaults.headers.common[tokenHeader] = token;
}

export default axiosInstance;
