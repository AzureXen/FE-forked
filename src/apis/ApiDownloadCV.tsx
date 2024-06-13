// import axios from "axios";

// export const downloadCV = async (id: number) => {
//   try {
//     const response = await axios.get(
//       "http://localhost:8080/internbridge/manager/downLoadCV",
//       {
//         params: { id },
//         responseType: "blob",
//       }
//     );

//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;

//     const contentDisposition = response.headers["content-disposition"];
//     const fileName = contentDisposition
//       ? contentDisposition.split("filename=")[1]
//       : "download.pdf";
//     link.setAttribute("download", fileName);

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Error downloading the CV", error);
//   }
// };

import axios from 'axios';

export const downloadCV = async (id: number) => {
  const response = await axios.get(`http://localhost:8080/internbridge/manager/downLoadCV?id=${id}`, {
    responseType: 'blob', // Quan trọng: để nhận phản hồi dưới dạng Blob
  });
  return response.data;
};

