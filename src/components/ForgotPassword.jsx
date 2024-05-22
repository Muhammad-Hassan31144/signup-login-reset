import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const [isUsernameStep, setIsUsernameStep] = useState(true);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isPasswordResetStep, setIsPasswordResetStep] = useState(false);
  const [storedUsername, setStoredUsername] = useState("");
  const [storedOtp, setStoredOtp] = useState("");

  const initialUsernameValues = {
    username: "",
  };

  const initialOtpValues = {
    otp: "",
  };

  const initialPasswordResetValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const generateOtp = async (username) => {
    const storedEmails = JSON.parse(localStorage.getItem("users")).map(
      (user) => user.email
    );

    if (storedEmails.includes(username)) {
      // Placeholder function for demonstration purposes
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setStoredUsername(username);
      setStoredOtp(otp);
      console.log(`Generated OTP ${otp} for ${username}`);
      // Implement logic to send OTP to the user (e.g., email, API call)
      setIsUsernameStep(false);
      setIsOtpStep(true);
    } else {
      console.error("User not found");
      throw new Error("User not found");
    }
  };

  const verifyOtp = async (otp) => {
    // Placeholder function for demonstration purposes
    console.log(`Verifying OTP ${otp} for ${storedUsername}`);
    return otp === storedOtp;
  };

  const resetPassword = async (username, newPassword) => {
    try {
      // Retrieve user data from localStorage
      const users = JSON.parse(localStorage.getItem("users"));

      // Find the user by username
      const user = users.find((user) => user.username === username);

      if (user) {
        // Update the user's password
        user.password = newPassword;

        // Save the updated user data back to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        console.log(`Password reset successful for ${username}`);
      } else {
        console.error(`User ${username} not found`);
        throw new Error(`User ${username} not found`);
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
      throw error;
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username/Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .test(
        "is-existing-email",
        "User not found. Please enter a valid email.",
        async function (value) {
          try {
            const storedEmails = JSON.parse(localStorage.getItem("users")).map(
              (user) => user.email
            );
            return storedEmails.includes(value);
          } catch (error) {
            console.error("Error retrieving user data:", error);
            return false;
          }
        }
      ),
    otp: Yup.string().when("isOtpStep", {
      is: true,
      then: Yup.string()
        .required("OTP is required")
        .matches(/^\d+$/, "OTP must be a number")
        .min(6, "OTP must be exactly 6 digits")
        .max(6, "OTP must be exactly 6 digits"),
    }),
    newPassword: Yup.string().when("isPasswordResetStep", {
      is: true,
      then: Yup.string()
        .required("New Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])/,
          "Password must contain at least one lowercase character"
        )
        .matches(
          /^(?=.*[A-Z])/,
          "Password must contain at least one uppercase character"
        )
        .matches(
          /^(?=.*[0-9])/,
          "Password must contain at least one numeric character"
        )
        .matches(
          /^(?=.*[!@#$%^&*])/,
          "Password must contain at least one special character"
        ),
    }),
    confirmPassword: Yup.string().when(["isPasswordResetStep", "newPassword"], {
      is: (isPasswordResetStep, newPassword) =>
        isPasswordResetStep && newPassword,
      then: Yup.string()
        .required("Confirm New Password is required")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    }),
  });

  return (
    <div class="form w-[350px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-5 px-6 bg-[#DFA16A] r flex flex-col items-center justify-center gap-3 transition-all duration-300">
      <p class="text-[#A15A3E] translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 font-semibold text-2xl absolute right-0">
        OOPS!
      </p>

      <div class="capitalize w-full">
        <p class="text-2xl text-[#7F3D27] pb-5">Forgot Password</p>
        <Formik
          initialValues={initialUsernameValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (isUsernameStep) {
                const { username } = values;
                await generateOtp(username);
                setIsUsernameStep(false);
                setIsOtpStep(true);
              } else if (isOtpStep) {
                const { otp } = values;
                const isOtpValid = await verifyOtp(otp);
                if (isOtpValid) {
                  setIsOtpStep(false);
                  setIsPasswordResetStep(true);
                } else {
                  throw new Error("Invalid OTP. Please try again.");
                }
              } else if (isPasswordResetStep) {
                const { username, newPassword } = values;
                await resetPassword(username, newPassword);
                setIsPasswordResetStep(false);
                resetForm();
              }
            } catch (error) {
              console.error(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form class="flex flex-col gap-3">
              {isUsernameStep && (
                <div>
                  <label
                    htmlFor="username"
                    class="text-sm text-[#7F3D27] font-semibold"
                  >
                    Username/Email
                  </label>
                  <Field
                    type="text"
                    name="username"
                    class="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
                  />
                  <ErrorMessage name="username" component="div" />
                </div>
              )}

              {isOtpStep && (
                <div>
                  <label
                    htmlFor="otp"
                    class="text-sm text-[#7F3D27] font-semibold"
                  >
                    Enter OTP
                  </label>
                  <Field
                    type="text"
                    name="otp"
                    class="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
                  />
                  <ErrorMessage name="otp" component="div" />
                </div>
              )}

              {isPasswordResetStep && (
                <div>
                  <label
                    htmlFor="newPassword"
                    class="text-sm text-[#7F3D27] font-semibold"
                  >
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    class="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
                  />
                  <ErrorMessage name="newPassword" component="div" />

                  <label
                    htmlFor="confirmPassword"
                    class="text-sm text-[#7F3D27] font-semibold"
                  >
                    Confirm New Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    class="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
                  />
                  <ErrorMessage name="confirmPassword" component="div" />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                class="px-6 focus:outline-none focus:scale-110 font-semibold text-xs py-2 rounded-[5px] hover:scale-110 transition-all hover:transiton text-[#D9D9D9] bg-[#7F3D27] shadow-[#7F3D27] shadow-lg"
              >
                {isSubmitting
                  ? "Submitting..."
                  : isPasswordResetStep
                  ? "Reset Password"
                  : "Next"}
              </button>
              <div className="mt-3 text-[#7F3D27] text-xs">
                Remembered your password?{" "}
                <Link to="/" class="text-[#7F3D27]">
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
