import * as yup from 'yup';
import { emailValidator, nameValidator, phoneValidator } from './regexp';

export const booksSchema = yup.object().shape({
  name: yup
    .string()
    .required('required field')
    .matches(nameValidator, 'the name must contain only letters')
    .min(2, 'the name must contain a minimum of 2 characters')
    .max(16, 'the name must contain a maximum of 16 characters'),

  email: yup
    .string()
    .matches(emailValidator, 'Please enter a valid email address')
    .required('required field'),

  phone: yup
    .string()
    .matches(phoneValidator, 'enter the number in this format +380123456789')
    .required('required field'),
});
