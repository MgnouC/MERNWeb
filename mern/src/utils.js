export const isJSONString = (data) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Đọc file dưới dạng URL base64
    reader.onload = () => resolve(reader.result); // Khi file được đọc xong, trả về base64
    reader.onerror = (error) => reject(error); // Xử lý lỗi nếu có
  });
};




  