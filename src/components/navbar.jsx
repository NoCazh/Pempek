import { useState, useEffect, useCallback } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter as _useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "./dropdown";
import { useDispatch } from "react-redux";
import { clearForm } from "@/stores/contactSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [firstname, setFirstname] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nav, setNav] = useState(true);
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = _useRouter();

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

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

  async function handleLogout() {
    // e.preventDefault();
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) alert(error.error_description || error.message);

      await router.push("/login");
      await dispatch(clearForm());
    } catch (error) {
      alert(error);
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      className="flex justify-between h-24 mx-auto items-center font-bold px-4"
      id="home"
    >
      <Link href="/">
        <Image
          alt=""
          src="/assets/icons/junecake_ori.png"
          width="235"
          height="67"
          className=" w-[70%] "
        />
      </Link>
      <ul className="hidden md:flex ">
        <li className="p-4 hover:text-orange-500">
          <Link href="/" scroll={false}>
            Home
          </Link>
        </li>
        <li className="p-4 hover:text-orange-500">
          <Link href="/menu">Menu</Link>
        </li>
        <li className="p-4 hover:text-orange-500">
          <Link href="/#about" scroll={false}>
            About
          </Link>
        </li>
        <li className="p-4 hover:text-orange-500">
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
      <div className="">
        <ul className="flex ">
          <li className="p-4 relative ">
            <Link href="/cart">
              <div className=" top-1 absolute right-1">
                <p className="p-3  flex h-2 w-2 items-center justify-center text-base rounded-full bg-orange-500 hover:text-black">
                  {getTotalQuantity() || 0}
                </p>
              </div>
              <FontAwesomeIcon
                icon={faCartPlus}
                className="flex  h-5 w-5 hover:text-orange-500 "
              />
            </Link>
          </li>
          <li className="hidden md:flex p-4  hover:text-orange-500 ">
            {!user ? <Link href="/login">Sign in</Link> : <Dropdown />}
          </li>
        </ul>
      </div>
      <div className="block p-4 sticky md:hidden" onClick={handleNav}>
        {!nav ? (
          <>
            <FontAwesomeIcon icon={faXmark} />
          </>
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </div>

      {/* RESPONSIVE NAVBAR */}
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[60%] h-full  bg-[#F9F3E3] ease-in-out duration-500 z-40"
            : "fixed left-[-100%]  "
        }
      >
        <Link href="/">
          <Image
            alt=""
            src="/assets/icons/junecake_ori.png"
            width="235"
            height="67"
            className=" p-6"
          />
        </Link>
        <ul className="p-4">
          <li className="p-4 border-b hover:text-orange-500 border-gray-900">
            {" "}
            <Link href="/" onClick={() => setNav(!nav)}>
              Home
            </Link>
          </li>
          <li className="p-4 border-b hover:text-orange-500 border-gray-900">
            <Link href="/menu" onClick={() => setNav(!nav)}>
              Menu
            </Link>
          </li>
          <li className="p-4 border-b hover:text-orange-500 border-gray-900">
            <Link href="/#about" scroll={false} onClick={() => setNav(!nav)}>
              About
            </Link>
          </li>
          <li className="p-4 border-b hover:text-orange-500 border-gray-900">
            <Link href="/faq" onClick={() => setNav(!nav)}>
              FAQ
            </Link>
          </li>
          {!user ? (
            <li className="p-4 border-b hover:text-orange-500 border-gray-900">
              <Link href="/login" onClick={() => setNav(!nav)}>
                Sign in
              </Link>
            </li>
          ) : (
            <>
              <li className="p-4 border-b hover:text-orange-500 border-gray-900">
                <Link href="/profiles/profile" onClick={() => setNav(!nav)}>
                  {firstname}
                </Link>
              </li>
              <li className="p-4 border-b hover:text-orange-500 border-gray-900">
                <Link href="/profiles/order_hist" onClick={() => setNav(!nav)}>
                  Order History
                </Link>
              </li>
              <li className="p-4 border-b hover:text-orange-500 border-gray-900">
                <Link href="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
