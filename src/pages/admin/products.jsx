import { useState, useEffect } from "react";
import AdminLayout from "@/components/adminLayout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CreateModals from "@/components/createModals";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import EditModals from "@/components/editModals";
import { useDispatch, useSelector } from "react-redux";
import { onChangeProduct, clearProduct } from "@/stores/productSlice";

export default function Products() {
  const [menus, setMenu] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    getMenu();
  }, []);

  const handleBtn = async (item) => {
    setShowEdit((prevModals) => ({
      ...prevModals,
      [item.id]: true,
    }));
    dispatch(
      onChangeProduct({
        id: item.id,
        menuName: item.menu_name,
        details: item.menu_detail,
        price: item.price,
        category: item.category,
        imageSrc: item.imageSrc,
      })
    );
  };

  const handleClose = (item) => {
    setShowEdit((prevModals) => ({
      ...prevModals,
      [item.id]: false,
    }));
    dispatch(clearProduct());
  };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const { data, error } = await supabase
          .from("menu")
          .update({ isDeleted: true })
          .eq("id", item.id); // using item.id

        await Swal.fire({
          icon: "success",
          title: "success remove products ",
        });
      } catch (error) {
        console.log(error);
      } finally {
        getMenu();
      }
    }
  };

  async function getMenu() {
    try {
      const { data, error } = await supabase
        .from("menu")
        .select(`*`)
        .eq("isDeleted", false)
        .order("id");

      if (error) {
        throw error;
      }
      setMenu(data);
      router.replace(router.asPath);
    } catch (error) {
      alert(error.message);
    }
  }

  const rupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  return (
    <>
      <AdminLayout>
        <div className="p-4">
          <header className="border-b-2  border-black">
            <div className="flex  justify-between max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Products Data
              </h1>
              <button
                className=" btn btn-success btn-sm"
                onClick={() => setShowModals(true)}
              >
                Add Products
              </button>
              {showModals && (
                <CreateModals
                  open={showModals}
                  onClose={() => setShowModals(false)}
                  getMenu={getMenu}
                />
              )}
            </div>
          </header>
          <div className="">
            <table className="table table-pin-rows ">
              {/* head */}
              <thead className="text-primary-content">
                <tr>
                  <th>No</th>
                  <th>Menu ID</th>
                  <th>Menu Name</th>
                  <th>Menu Detail</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Image URL</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((item, index) => (
                  <tr key={item.id} className="border-b-neutral-content">
                    <th>{index + 1}</th>
                    <td>{item.id}</td>
                    <td>{item.menu_name}</td>
                    <td>{item.menu_detail}</td>
                    <td>{rupiah(item.price)}</td>
                    <td>{item.category}</td>
                    <td className="max-w-[150px]  overflow-x-scroll ">
                      {item.imageSrc}
                    </td>

                    <td className="flex gap-2 ">
                      <button
                        className="btn btn-info btn-xs"
                        onClick={() => handleBtn(item)}
                      >
                        Edit
                      </button>
                      {showEdit[item.id] && (
                        <EditModals
                          open={showEdit[item.id]}
                          onClose={() => handleClose(item)}
                          getMenu={getMenu}
                        />
                      )}
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn btn-error btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
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

  if (!session) {
    // User is not authenticated, redirect to login
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Fetch user's profile to check for admin role
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
    // Handle the error appropriately
    return {
      redirect: {
        destination: "/login", // Redirect to login page on error
        permanent: false,
      },
    };
  }

  const userRole = profileData?.role;

  if (userRole !== "admin") {
    // User doesn't have admin role, redirect to home or unauthorized page
    return {
      redirect: {
        destination: "/", // Redirect to home or unauthorized page
        permanent: false,
      },
    };
  }

  return {
    props: { initialSession: session, user: session.user },
  };
};
