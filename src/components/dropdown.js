import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useRouter as _useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearForm } from "@/stores/contactSlice";
export default function Dropdown() {
  const [firstname, setFirstname] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = _useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`first_name`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFirstname(data.first_name);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabaseClient]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  async function handleLogout(e) {
    e.preventDefault();
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) alert(error.error_description || error.message);

      await router.push("/login");
      await dispatch(clearForm());
    } catch (error) {
      alert(error);
    }
  }
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full  text-sm focus:outline-none focus:ring-2 ">
          <span className="sr-only">Open user menu</span>
          Hello&#44; &nbsp;{firstname} &nbsp;
          {/* Hello&#44; &nbsp;{user.user_metadata.first_name} &nbsp; */}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profiles/profile"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profiles/order_hist"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Order History
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              // <form action="/auth/signout" method="POST">
              <Link
                onClick={handleLogout}
                href="/"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Sign out
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
