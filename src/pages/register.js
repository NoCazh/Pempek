import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import "react-phone-number-input/style.css";
import styles2 from "../styles/phone.module.css";
import PhoneInput from "react-phone-number-input";
import Layout from "@/components/layout";
import {
  createClientComponentClient,
  createPagesServerClient,
} from "@supabase/auth-helpers-nextjs";

import { useRouter as _useRouter } from "next/router";

export default function Register() {
  const supabase = createClientComponentClient();

  const router = _useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNum: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,

        options: {
          emailRedirectTo: `${location.origin}/api/callback`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone_num: formData.phoneNum,
          },
        },
      });
      if (error) throw error;
      await Swal.fire({
        icon: "success",
        title: "Account Created",
      });

      await router.push("/login");
    } catch (error) {
      alert(error);
    }
  }

  const handlePhoneChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phoneNum: value,
    }));
  };

  return (
    <>
      <Layout>
        <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 my-9 mx-auto md:w-[60%] rounded-md border lg:px-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 h-10 w-auto text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Let&apos;s Sign Up
            </h2>
            <p className=" text-center  font-light leading-9 tracking-tight text-gray-900">
              Please fill your email, phone number, and password to register
              your account
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="valid email address"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0  py-2 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="password"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="first name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="firstName"
                    placeholder="first name"
                    required
                    className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="last name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    name="lastName"
                    type="text"
                    autoComplete="lastName"
                    placeholder="last name"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="Phone number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="mt-2">
                  <PhoneInput
                    name="phoneNum"
                    international
                    defaultCountry="ID"
                    countryCallingCodeEditable={false}
                    value={formData.phoneNum}
                    onChange={handlePhoneChange}
                    className={
                      styles2.PhoneInput +
                      " px-2 block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <Link
                href="/login"
                className="font-semibold leading-6 text-orange-500 hover:text-orange-600"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      // user: session.user,
    },
  };
};
