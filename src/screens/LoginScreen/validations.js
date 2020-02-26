export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
    return 'Vui lòng nhập tài khoản.';
  }
  if (!re.test(email)) {
    return 'Email không đúng định dạng.';
  }

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) {
    return 'Vui lòng nhập mật khẩu.';
  }

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) {
    return 'Name cannot be empty.';
  }

  return '';
};
