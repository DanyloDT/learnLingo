"use client";
import { Formik, Field, Form } from "formik";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

import { FormError } from "../BookFormError/FormError";

import { booksSchema } from "@/utils/booksSchems";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface BookFormProps {
  teacherId: string;
}

export const BookForm = ({ teacherId }: BookFormProps) => {
  const router = useRouter();
  return (
    <div className="">
      <h3 className="text-2xl font-medium mb-5">
        What is your main reason for learning English?
      </h3>

      <Formik
        initialValues={{
          picked: "",
          name: "",
          email: "",
          phone: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            const teacherDocRef = doc(db, "teachers", teacherId);

            const userId = auth.currentUser?.uid;
            if (!userId) {
              throw new Error("User is not authorized");
            }

            const trialRequest = {
              ...values,
              userId: userId,
            };

            const docSnap = await getDoc(teacherDocRef);

            if (docSnap.exists()) {
              await updateDoc(teacherDocRef, {
                trials: arrayUnion(trialRequest),
              });
            } else {
              console.error("Document doesn't exist");
            }

            resetForm();
            document.body.style.overflow = "auto";
            router.back();
          } catch (error: any) {
            toast.error(error.toString());
          }
        }}
        validationSchema={booksSchema}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="flex flex-col gap-10"
            >
              <div className=" flex flex-col gap-4">
                <label className="relative">
                  <Field
                    type="radio"
                    name="picked"
                    value="Career and business"
                    className=" mr-2 opacity-0"
                  />
                  Career and business
                  {values.picked === "Career and business" ? (
                    <MdRadioButtonChecked className="absolute top-[3px] left-0 fill-orange" />
                  ) : (
                    <MdRadioButtonUnchecked className="absolute top-[3px] left-0 fill-greyLabel" />
                  )}
                </label>
                <label className="relative">
                  <Field
                    type="radio"
                    name="picked"
                    value="Lesson for kids"
                    className=" mr-2 opacity-0"
                  />
                  Lesson for kids
                  {values.picked === "Lesson for kids" ? (
                    <MdRadioButtonChecked className="absolute top-[3px] left-0 fill-orange" />
                  ) : (
                    <MdRadioButtonUnchecked className="absolute top-[3px] left-0 fill-greyLabel" />
                  )}
                </label>
                <label className="relative">
                  <Field
                    type="radio"
                    name="picked"
                    value="Living abroad"
                    className=" mr-2 opacity-0"
                  />
                  Living abroad
                  {values.picked === "Living abroad" ? (
                    <MdRadioButtonChecked className="absolute top-[3px] left-0 fill-orange" />
                  ) : (
                    <MdRadioButtonUnchecked className="absolute top-[3px] left-0 fill-greyLabel" />
                  )}
                </label>
                <label className="relative">
                  <Field
                    type="radio"
                    name="picked"
                    value="Exams and coursework"
                    className=" mr-2 opacity-0"
                  />
                  Exams and coursework
                  {values.picked === "Exams and coursework" ? (
                    <MdRadioButtonChecked className="absolute top-[3px] left-0 fill-orange" />
                  ) : (
                    <MdRadioButtonUnchecked className="absolute top-[3px] left-0 fill-greyLabel" />
                  )}
                </label>
                <label className="relative">
                  <Field
                    type="radio"
                    name="picked"
                    value="Culture, travel or hobby"
                    className=" mr-2 opacity-0"
                  />
                  Culture, travel or hobby
                  {values.picked === "Culture, travel or hobby" ? (
                    <MdRadioButtonChecked className="absolute top-[3px] left-0 fill-orange" />
                  ) : (
                    <MdRadioButtonUnchecked className="absolute top-[3px] left-0 fill-greyLabel" />
                  )}
                </label>
              </div>

              <div className="flex flex-col gap-[18px] mb-10">
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  autoComplete="off"
                  required
                  className="block px-[18px] py-4 w-full cursor-pointer rounded-xl border border-solid border-[rgba(18, 20, 23, 0.10)]"
                />

                <FormError name="name" touched={touched} errors={errors} />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  required
                  className="block px-[18px] py-4 w-full cursor-pointer rounded-xl border border-solid border-[rgba(18, 20, 23, 0.10)]"
                />
                <FormError name="email" touched={touched} errors={errors} />

                <Field
                  type="tell"
                  name="phone"
                  placeholder="Phone Number"
                  autoComplete="off"
                  required
                  className="block px-[18px] py-4 w-full cursor-pointer rounded-xl border border-solid border-[rgba(18, 20, 23, 0.10)]"
                />
                <FormError name="phone" touched={touched} errors={errors} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-215 py-4 font-bold cursor-pointer rounded-xl bg-orange"
            >
              Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
