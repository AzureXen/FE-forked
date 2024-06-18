import axios from 'axios'

export const ApiVerifyCodeForgotPassword = async (code: string) => {
    const response = await axios.put(`http://localhost:8080/internbridge/verifyPassword?code=${code}`)
}