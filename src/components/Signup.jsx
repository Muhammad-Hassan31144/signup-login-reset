// Signup.js (similar to Login.js with some modifications)
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email address'
      ),
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
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Check if the username or email already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some(user => user.username === values.username || user.email === values.email);
    if (userExists) {
        // Display an error message or toast notification to inform the user
        console.error('Username or email already exists.');
    } else {
        // If the user doesn't exist, save the new user to localStorage
        const newUser = {
            username: values.username,
            email: values.email,
            password: values.password,
        };
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        // Redirect the user to the login page or display a success message
        console.log('User signed up successfully:', newUser);
        // For redirection, you might use React Router: history.push('/login');
    }
    setSubmitting(false);
};


  return (
    <div className="form-container bg-[#DFA16A] w-[350px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-5 px-6 r flex flex-col items-center justify-center gap-3 transition-all duration-300">
    <p className="text-[#A15A3E] translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 font-semibold text-2xl absolute right-0">
      SignUp
    </p>

    <div className="capitalize w-full">
      <p className="text-2xl text-[#7F3D27] pb-5">Sign Up</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <div className="flex flex-col items-start w-full">
              <label
                htmlFor="username"
                className="text-sm text-[#7F3D27] font-semibold"
              >
                Username
              </label>
              <Field
                type="text"
                name="username"
                placeholder="Enter Your Username"
                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <label
                htmlFor="email"
                className="text-sm text-[#7F3D27] font-semibold"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <label
                htmlFor="password"
                className="text-sm text-[#7F3D27] font-semibold"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-[#7F3D27] font-semibold"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-message"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 focus:outline-none focus:scale-110 font-semibold text-xs py-2 rounded-[5px] hover:scale-110 transition-all hover:transiton text-[#D9D9D9] bg-[#7F3D27] shadow-[#7F3D27] shadow-lg"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-3 text-[#7F3D27] text-xs">
        Already have an account?{' '}
        <Link to="/" className="font-semibold">
          Login
        </Link>
      </div>
    </div>
  </div>

  );
};

export default Signup;
