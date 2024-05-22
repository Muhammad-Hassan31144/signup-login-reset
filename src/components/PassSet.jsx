import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

const PassSet = () => {
  const [passwordStrength, setPasswordStrength] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, "Must Contain 8 Characters").required()
    .matches(
      /^(?=.*[a-z])/,
      " Must Contain One Lowercase Character"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "  Must Contain One Uppercase Character"
    )
    .matches(
      /^(?=.*[0-9])/,
      "  Must Contain One Number Character"
    )
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
  });

  

  return (
    <div>
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // handle form submission
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"

              />
              <ErrorMessage name="password" component="div" />
              {passwordStrength && <div>Password Strength: {passwordStrength}</div>}
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PassSet;
