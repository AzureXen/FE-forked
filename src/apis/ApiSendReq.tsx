import axios from "axios";
import { HelpRequest } from "../model/HelpRequest";

export const ApiSendReq = async (helpRequest: HelpRequest) => {
    try {
        const response = await axios.post('http://localhost:8080/internbridge/sendRequest', helpRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error sending help request:", error);
        throw error;
    }
};