type Message = {
  [key: string]: string
}

const messages: Message = {
  login_fail: 'Đăng nhập không thành công',
  authority: 'Chưa được xác thực',
  errorDetails: 'error is not Null',
  rangeError: '{0} khoảng {1} ~ {2} không được để trống',
  min: '{0} ít nhất {1} kí tự',
  max: '{0} nhiều nhất {1} kí tự',
  required: '{0} không được để trống ',
  email: 'Email không hợp lệ',
  select: "Vui lòng chọn {0}",
  type: '{0} không hợp lệ',
}

export default messages
