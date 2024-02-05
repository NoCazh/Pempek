import { useState, useEffect } from "react";
import AdminLayout from "@/components/adminLayout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Swal from "sweetalert2";
import Modals from "@/components/modals";
import { useRouter } from "next/router";
export default function Orders() {
  const [orders, setOrder] = useState([]);
  const [modals, setModals] = useState(false);
  const [selectOrder, setSelectOrder] = useState([]);
  const [selectDetails, setSelectDetails] = useState([]);
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    getOrder();
  }, []);

  const handleBtn = async (item) => {
    setModals((prevModals) => ({
      ...prevModals,
      [item.id]: true,
    }));
    setSelectOrder(item);
    await getDetails(item.id);
  };

  const handleClose = (item) => {
    setModals((prevModals) => ({
      ...prevModals,
      [item.id]: false,
    }));
    setSelectOrder([]);
    setSelectDetails([]);
  };

  async function getOrder() {
    try {
      const { data, error } = await supabase
        .from("order")
        .select(`*, profiles (email)`)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      setOrder(data);
    } catch (error) {
      alert(error.message);
    }
  }

  async function updateOrderStat(status, orderId) {
    try {
      const { data, error } = await supabase
        .from("order")
        .update([
          {
            status: status,
            updated_at: new Date().toISOString(),
          },
        ])
        .eq("id", orderId)
        .select(`status`);

      if (error) {
        throw error;
      }
      const stats = data[0].status;

      if (stats === "completed") {
        await Swal.fire({
          icon: "success",
          title: "Order Completed ",
          text: "Order has been accepted!",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Order Void",
          text: "Order has been rejected!",
        });
      }

      setModals((prevModals) => ({
        ...prevModals,
        [orderId]: false,
      }));
      getOrder();
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  }

  async function getDetails(orderId) {
    try {
      const { data, error } = await supabase
        .from("order_details")
        .select(`*, menu(menu_name)`)
        .eq("order_id", orderId)
        .order("id");

      if (error) {
        throw error;
      }
      setSelectDetails(data);
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
          .from("order")
          .update({ deleted_at: new Date().toISOString() })
          .eq("id", item.id); // using item.id

        await supabase
          .from("order_details")
          .update({ deleted_at: new Date().toISOString() })
          .eq("order_id", item.id); // using item.id

        await Swal.fire({
          icon: "success",
          title: "success remove products ",
        });
        getOrder();
      } catch (error) {
        console.log(error);
      } finally {
        router.reload();
      }
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="p-4">
          <header className="border-b-2  border-black">
            <div className="  max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Order Data
              </h1>
            </div>
          </header>
          <div className="">
            <table className="table table-pin-rows  table-pin-cols ">
              {/* head */}
              <thead className="text-primary-content">
                <tr>
                  <th>No</th>
                  <th>Order ID</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={item.id} className="border-b-neutral-content">
                    <th>{index + 1}</th>
                    <td>{item.id}</td>
                    <td className="max-w-[150px]  overflow-x-scroll">
                      {item.profiles.email}
                    </td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.phone_num}</td>
                    <td>{item.type}</td>
                    <td>{rupiah(item.total)}</td>
                    <td>
                      <div
                        className={`badge ${
                          item.status === "completed"
                            ? "badge-primary"
                            : item.status === "void"
                            ? "badge-secondary"
                            : item.status === "processing"
                            ? "badge-info"
                            : "badge-accent"
                        }`}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-ghost  btn-xs"
                        onClick={() => handleBtn(item)}
                      >
                        details
                      </button>
                      {modals[item.id] && (
                        <Modals
                          open={modals[item.id]}
                          selectData={selectOrder}
                          details={selectDetails}
                          rupiah={rupiah}
                          onClose={() => handleClose(item)}
                          onVoidClick={() => updateOrderStat("void", item.id)}
                          onAcceptClick={() =>
                            updateOrderStat("completed", item.id)
                          }
                        />
                      )}
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn btn-ghost hover:btn-error btn-xs"
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
