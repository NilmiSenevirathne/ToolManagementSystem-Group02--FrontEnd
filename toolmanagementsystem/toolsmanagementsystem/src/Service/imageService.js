import http from "./httpService";

const endpoint = "/image";

export async function UploadImage(formData) {
  return await http.post(endpoint + "/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
