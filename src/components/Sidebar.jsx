import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faFileInvoice,
  faAnglesLeft,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDispatch } from "react-redux";
import { clearForm } from "@/stores/contactSlice";

const menuItems = [
  {
    id: 1,
    label: "Manage Orders",
    icon: faFileInvoice,
    link: "/admin/orders",
  },
  { id: 2, label: "Manage Products", icon: faBox, link: "/admin/products" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const dispatch = useDispatch();

  const activeMenu = useMemo(() => {
    return menuItems.find((menu) => menu.link === router.pathname);
  }, [router.pathname]);
  console.log(router.pathname);
  const wrapperClasses = classNames(
    "relative  h-screen px-4 pt-8 pb-4 bg-blue-600 flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-blue-500"]: activeMenu.id === menu.id,
      }
    );
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) alert(error.error_description || error.message);

      await router.push("/login");
      await dispatch(clearForm());
    } catch (error) {
      alert(error);
    }
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative ">
          <div className="flex items-center pl-1 gap-4">
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              <Image
                alt=""
                src="/assets/icons/junecake_white.png"
                width="200"
                height="60"
                className=" w-[60%] "
              />
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <FontAwesomeIcon icon={faAnglesLeft} className="text-white" />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24 text-white">
          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={index}>
                <Link href={menu.link} legacyBehavior>
                  <a className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <FontAwesomeIcon icon={Icon} />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`${getNavItemClasses({})} px-3 py-4`}
        onClick={handleLogout}
      >
        <div style={{ width: "2.5rem" }}>
          <FontAwesomeIcon icon={faPowerOff} className="text-white" />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-white")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
