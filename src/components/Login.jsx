// Login.js
import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"
const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username/Email is required")
      .test(
        "username-exists",
        "Username/Email does not exist",
        async function (value) {
          const { path, createError } = this;
          // Check if the username or email exists in local storage
          const usersData = JSON.parse(localStorage.getItem("usersData"));
          const userExists =
            usersData &&
            usersData.find(
              (user) => user.username === value || user.email === value
            );
          if (!userExists) {
            return createError({
              path,
              message: "Username/Email does not exist",
            });
          }
          return true;
        }
      ),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Authentication logic using localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.username === values.username);
    if (user && user.password === values.password) {
      console.log("User authenticated:", user);
    } else {
      console.error(
        "Invalid credentials. Please check your username and password."
      );
    }
    setSubmitting(false);
  };

  return (
    // <div className="flex items-center justify-center h-screen w-full mx-auto">
      <div className="form w-[350px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-5 px-6 bg-[#DFA16A] r flex flex-col items-center justify-center gap-3 transition-all duration-300">
        <p className="text-[#A15A3E] translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 font-semibold text-2xl absolute right-0">
            SignIn
        </p>

        <div className="capitalize w-full">
          <h2 className="text-2xl text-[#7F3D27] pb-5">Login</h2>
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
                    Username/Email
                  </label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter Your Username/Email"
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 focus:outline-none focus:scale-110 font-semibold text-xs py-2 rounded-[5px] hover:scale-110 transition-all hover:transiton text-[#D9D9D9] bg-[#7F3D27] shadow-[#7F3D27] shadow-lg"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot-password" className="text-xs text-[#7F3D27]">
            Forgot Password?
          </Link>
          <div className="mt-3 text-[#7F3D27] text-xs">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Login;
