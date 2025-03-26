const constant = {
  user: 'user',
  title_validate: 'Lỗi đầu vào',
  system_error: 'Lỗi hệ thống!',
  validation_error: 'Thông tin không hợp lệ',
  system_error_label: 'Lỗi',
  authority_label: 'Thiếu quyền',
  del_confirm_title: 'Xác nhận xoá',
  register_title: 'Đăng ký',
  update_title: 'Cập nhật',
  filter_title: 'Lọc',
  delete_title: 'Xoá',
  backend_error: 'Không kết nối được máy chủ',
  server_error: 'Lỗi phía máy chủ',
  number_required: 'Yêu cầu nhập số',
};


const FILE_TYPE = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls: 'application/vnd.ms-excel',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  txt: 'text/plain',
  rtf: 'application/rtf',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

export { constant, FILE_TYPE };
