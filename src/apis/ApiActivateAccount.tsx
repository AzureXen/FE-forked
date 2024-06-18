import axios from 'axios';

export const activate = async (code: string, username:string, password: string) => {
  const response = await axios.put(`http://localhost:8080/internbridge/verify?code=${code}&userName=${username}&password=${password}`);
  return response.data;
};
