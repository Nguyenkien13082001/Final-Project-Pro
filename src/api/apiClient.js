// Import module `querystring` để xử lý việc serialize tham số truy vấn URL.
import qs from "querystring";
// Import thư viện `axios` để thực hiện các yêu cầu HTTP dựa trên Promise.
import axios from "axios";

// Định nghĩa URL cơ sở cho tất cả các yêu cầu API.
const baseURLApp = "https://apiedusmart.pythonanywhere.com/";

// Tạo một instance của axios với cấu hình mặc định.
const apiClient = axios.create({
  baseURL: baseURLApp, // URL cơ sở được sử dụng cho mọi yêu cầu
  headers: {
    "content-type": "application/json", // Thiết lập nội dung kiểu JSON cho các yêu cầu
  },
  paramsSerializer: (params) => {
    return qs.stringify(params); // Chức năng để serialize tham số truy vấn sử dụng `querystring`
  },
});

// Thêm một bộ chặn yêu cầu để chỉnh sửa các yêu cầu trước khi gửi đi
apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); // Lấy token xác thực từ bộ nhớ cục bộ
    if (config.headers) {
      // Kiểm tra nếu tiêu đề đã được định nghĩa trên cấu hình
      if (token) {
        config.headers["Authorization"] = "Bearer " + token; // Thêm token vào tiêu đề yêu cầu
      }
    }
    return config; // Trả lại cấu hình đã được chỉnh sửa
  },
  (error) => {
    return Promise.reject(error); // Trả về lỗi nếu có trong quá trình tạo yêu cầu
  }
);

// Thêm một bộ chặn phản hồi để xử lý dữ liệu trả về hoặc lỗi
apiClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data; // Trả về dữ liệu trực tiếp nếu có trong phản hồi
    }
    return response; // Trả lại toàn bộ phản hồi nếu không có dữ liệu cụ thể
  },
  (error) => {
    if (typeof window === "undefined") {
      throw error; // Ném lỗi nếu không chạy trong môi trường trình duyệt
    }
    return Promise.reject(error); // Trả về lỗi nếu xử lý phản hồi thất bại
  }
);

// Xuất khẩu instance axios để sử dụng ở các phần khác của ứng dụng
export default apiClient;
