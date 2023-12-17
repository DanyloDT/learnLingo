export const nameValidator = /^[a-zA-Z\s]+$/;
export const emailValidator =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordValidator =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=.<>]{6,16}$/;
export const phoneValidator = /^\+380\d{9}$/;
