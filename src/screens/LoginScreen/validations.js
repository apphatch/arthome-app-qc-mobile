export const emailValidator = username => {
  // const re = /\S+@\S+\.\S+/;

  if (!username || username.length <= 0) {
    return 'Vui lòng nhập tài khoản.';
  }
  // if (!re.test(email)) {
  //   return 'Email không đúng định dạng.';
  // }

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) {
    return 'Vui lòng nhập mật khẩu.';
  }

  return '';
};
