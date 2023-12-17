import { ErrorMessage } from "formik";
import { FormikTouched, FormikErrors } from "formik";
import { FC } from "react";

interface FormErrorProps {
  name: string;
  touched: FormikTouched<{
    picked: string;
    name: string;
    email: string;
    phone: string;
  }>;
  errors: FormikErrors<{
    picked: string;
    name: string;
    email: string;
    phone: string;
  }>;
}

export const FormError: FC<FormErrorProps> = ({ name }) => {
  return <ErrorMessage name={name} render={(message) => <p>{message}</p>} />;
};
