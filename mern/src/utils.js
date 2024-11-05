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

export const renderOptions = (arr) => {
  if (!Array.isArray(arr)) {
    console.error("Input is not an array:", arr);
    return [];
  }

  const result = arr.map((opt) => {
    return {
      value: opt,  // Dùng giá trị trực tiếp từ mảng
      label: opt,  // Dùng giá trị trực tiếp từ mảng làm nhãn
    };
  });

  // Thêm tùy chọn mặc định "--- Chọn ---"
  result.unshift({
    value: "",
    label: "--- Chọn ---",
  });

  //console.log("Render Options Result:", result);
  return result;
};






