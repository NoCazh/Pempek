import Layout from "@/components/layout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function Profile({ user }) {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    phonenum: "",
  });

  function handleChange(event) {
    setProfile((prevProfileData) => {
      return {
        ...prevProfileData,
        [event.target.name]: event.target.value,
      };
    });
  }

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`id,first_name, last_name, phone_num, role`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile({
          id: data.id,
          firstname: data.first_name,
          lastname: data.last_name,
          phonenum: data.phone_num,
        });
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  async function updateProfile(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        data: {
          first_name: profile.firstname,
          last_name: profile.lastname,
          phone_num: profile.phonenum,
        },
      });

      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .update({
          first_name: profile.firstname,
          last_name: profile.lastname,
          phone_num: profile.phonenum,
          created_at: new Date().toISOString(),
        })
        .eq("id", profile?.id);

      if (profilesError) {
        console.error("Error updating profile:", profilesError);
        // Handle the error appropriately
      } else {
        console.log("Profile updated successfully:", profilesData);
        // Perform any actions you need on successful update
      }

      await Swal.fire({
        icon: "success",
        title: "Profile updated!",
      });
    } catch (error) {
      alert("Error updating the data!");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }
  return (
    <Layout>
      <div className="p-4">
        <header className="border-b-2  border-black">
          <div className="  max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {profile.firstname ? (
                <span>Welcome back&#44;&nbsp;{profile.firstname}</span>
              ) : (
                "loading"
              )}
            </h1>
          </div>
        </header>
        <div className="  max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Edit Profile
          </h1>
          <div className="my-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="first name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
            </div>
            <input
              name="firstname"
              type="text"
              placeholder="Type here"
              className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              defaultValue={profile.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="last name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
            </div>
            <input
              name="lastname"
              type="text"
              placeholder="Type here"
              className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              defaultValue={profile.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="phone num"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
            </div>
            <input
              name="phonenum"
              type="text"
              placeholder="Type here"
              className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              defaultValue={profile.phonenum}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={updateProfile}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
