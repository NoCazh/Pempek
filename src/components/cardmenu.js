"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../../utils/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/stores/cartSlice";
import Swal from "sweetalert2";

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
export default function CardMenu({ limits }) {
  const [menus, setMenus] = useState([]);

  const dispatch = useDispatch();

  const rupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  useEffect(() => {
    getMenu();
    console.log(menus)
  }, [menus]);

  async function getMenu() {
    try {
      let { data:Menu ,error } = await supabase
        .from("Menu")
        .select(`*`)
        .limit(limits);

      setMenus(Menu);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className=" mx-auto max-w-2xl px-2 py-10 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className=" grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {menus && menus.map((menu,index) => {return(
          <div
              key={index}
              className=" flex flex-col flex-1 group relative justify-between bg-white rounded-2xl group-hover:opacity-75"
            >
              <div className=" aspect-h-2 aspect-w-3 w-full overflow-hidden ">
                <Image
                  src={menu.Gambar}
                  alt={"..."}
                  width="300"
                  height="400"
                  // loading="eager"
                  className=" h-full w-full  object-center object-fill rounded-t-2xl hover:opacity-80"
                />
              </div>

              <div className="px-3 mt-3 mb-0">
                <h3 className="text-lg text-gray-900 font-extrabold">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {menu.Nama_Menu}
                </h3>
                <p className="mt-2 w text-2md text-gray-500">
                  {menu.Keterangan}
                </p>

                <div className="flex justify-between w-full">
                  <div className="">
                    <p className="text-lg font-bold text-gray-900 py-3">
                      {rupiah(menu.Harga)}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: menu.id,
                      title: menu.menu_name,
                      image: menu.imageSrc,
                      price: menu.price,
                    })
                  );
                  Toast.fire({
                    icon: "success",
                    title: "added to cart",
                  });
                }}
                className="bg-[#1B7B59] w-full py-3 mx-auto  rounded-b-2xl  self-end text-white group-hover:opacity-90"
              >
                add to cart
              </button>
            </div>
        
          )      
        }
        
      )
        }
        
        </div>
      </div>
    </>
  );
}
