export class HelpRequest {
    senderId: number | undefined;
    helpType: string;
    description: string;
    companyEmail: string;
    companyName: string;
    companyDescription: string;

    constructor(
        senderId: number | undefined,
        helpType: string,
        description: string,
        companyEmail: string,
        companyName: string,
        companyDescription: string
    ) {
        this.senderId = senderId;
        this.helpType = helpType;
        this.description = description;
        this.companyEmail = companyEmail;
        this.companyName = companyName;
        this.companyDescription = companyDescription;
    }
}