import { UserInfoResponse } from "../Auth";
import UserAccount from "../UserAccount";

export class HelpResponse {
    id: number;
    user: UserInfoResponse | null;
    requestType: string;
    requestContent: string;
    requestStatus: boolean;

    constructor(id: number,user: UserInfoResponse, requestType: string, requestContent: string, requestStatus: boolean) {
        this.id = id;
        this.user=user;
        this.requestType = requestType;
        this.requestContent = requestContent;
        this.requestStatus = requestStatus;
    }
}