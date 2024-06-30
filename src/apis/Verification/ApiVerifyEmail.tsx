import axios from 'axios'

export const ApiVerifyEmail = async (code: string) => {
    const response = await axios.put(`http://localhost:8080/internbridge/verifyEmail?code=${code}`)
}