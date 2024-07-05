import axios from "axios";

export const ApiSendCertificate = async (pdfBlob: Blob,email: string) =>{
    const formData = new FormData();
    formData.append('pdf',pdfBlob,"certificate.pdf");
    formData.append('email',email);
    try {
        const response = await axios.post("http://localhost:8080/internbridge/manager/sendCetificate",formData,{
            headers:{
                'Content-Type':  'multipart/form-data',
            }
        })
        return response.data;
    } catch (error) {
        
    }
}