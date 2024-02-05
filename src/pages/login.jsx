import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter as _useRouter } from "next/router";
import {
  createClientComponentClient,
  createPagesServerClient,
} from "@supabase/auth-helpers-nextjs";
import Layout from "@/components/layout";
export default function Login() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const supabase = createClientComponentClient();
  const router = _useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [event.target.name]: event.target.value,
      };
    });
  }
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
        options: {
          emailRedirectTo: `${location.origin}/api/callback`,
        },
      });
      if (error) {
        await Toast.fire({
          icon: "error",
          title: error.message,
        });
        await router.reload();
      } else {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
        }

        const userRole = profileData?.role;

        // Redirect based on user role
        if (userRole === "admin") {
          await router.push("/admin/orders");
        } else {
          await router.push("/");
        }
      }
    } catch (error) {
      await Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  }

  return (
    <>
      <Layout>
        <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 my-9 mx-auto md:w-[60%] md:rounded-lg border lg:px-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 h-10 w-auto text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className=" text-center  font-light leading-9 tracking-tight text-gray-900">
              Enter your email and password to login
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>

                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
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
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    aria-label="password"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                href="/register"
                className="font-semibold leading-6 text-orange-500 hover:text-orange-600"
              >
                Sign Up
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
