export default class InternResultResponse {
    value: number;
    labelName: string;

    constructor(value: number, labelName: string) {
        this.value = value;
        this.labelName = labelName;
    }
}