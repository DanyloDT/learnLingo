'use client';
import { Formik, Field, Form } from 'formik';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

import { FormError } from '../BookFormError/FormError';

import { booksSchema } from '@/utils/booksSchems';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const radioOptions = [
  { value: 'Career and business', label: 'Career and business' },
  { value: 'Lesson for kids', label: 'Lesson for kids' },
  { value: 'Living abroad', label: 'Living abroad' },
  { value: 'Exams and coursework', label: 'Exams and coursework' },
  { value: 'Culture, travel or hobby', label: 'Culture, travel or hobby' },
];

interface BookFormProps {
  teacherId: string;
}

export const BookForm = ({ teacherId }: BookFormProps) => {
  const router = useRouter();
  return (
    <div className="">
      <h3 className="text-2xl font-medium mb-5">What is your main reason for learning English?</h3>

      <Formik
        initialValues={{
          picked: '',
          name: '',
          email: '',
          phone: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            const teacherDocRef = doc(db, 'teachers', teacherId);

            const userId = auth.currentUser?.uid;
            if (!userId) {
              throw new Error('User is not authorized');
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
              toast.success('Your booking has been successfully submitted!');
            } else {
              console.error("Document doesn't exist");
            }

            resetForm();
            document.body.style.overflow = 'auto';
            router.back();
          } catch (error: any) {
            toast.error(error.toString());
          }
        }}
        validationSchema={booksSchema}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div role="group" aria-labelledby="my-radio-group" className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                {radioOptions.map(option => (
                  <label key={option.value} className="relative">
                    <Field
                      type="radio"
                      name="picked"
                      value={option.value}
                      className="mr-2 opacity-0"
                    />
                    {option.label}
                    {values.picked === option.value ? (
                      <MdRadioButtonChecked className="absolute top-[3px] left-0 fill-orange" />
                    ) : (
                      <MdRadioButtonUnchecked className="absolute top-[3px] left-0 fill-greyLabel" />
                    )}
                  </label>
                ))}
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
                  placeholder="+380123456789"
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
