import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DateTime } from "luxon";
import UploadModals from "@/components/uploadModals";
import { useRouter } from "next/router";

export default function Order_hist({ user }) {
  const supabase = useSupabaseClient();
  const [uploadModals, setUploadModals] = useState(false);
  const [selectOrder, setSelectOrder] = useState({});

  const [selectDetails, setSelectDetails] = useState([]);
  const [orders, setOrder] = useState([]);
  const router = useRouter();

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

  function formatTimestampZ(timestamp) {
    const dateTime = DateTime.fromISO(timestamp);
    return dateTime.setZone("Asia/Jakarta").toFormat("yyyy-MM-dd HH:mm:ss");
  }

  const rupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };
  useEffect(() => {
    getOrder();
  }, []);

  const handleBtn = async (item) => {
    setUploadModals((prevModals) => ({
      ...prevModals,
      [item.id]: true,
    }));
    setSelectOrder(item);
    await getDetails(item.id);
  };

  const handleClose = (item) => {
    setUploadModals((prevModals) => ({
      ...prevModals,
      [item.id]: false,
    }));
    setSelectOrder([]);
    setSelectDetails([]);
  };

  const getOrder = async () => {
    try {
      const { data, error } = await supabase
        .from("order")
        .select(`*, profiles (email)`)
        .eq("profiles_id", user?.id)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      setOrder(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        {" "}
        <header className="border-b-2  border-black">
          <div className="  max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              ORDER HISTORY
            </h1>
          </div>
        </header>
        {orders.length === 0 ? (
          <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="tracking-tight text-gray-900">
              See your order history here!
            </h1>
          </div>
        ) : (
          <div className="flex flex-wrap py-8 gap-3">
            {orders.map((item) => (
              <div key={item.id} className="card w-96 bg-white shadow-xl">
                <div className="card-body font-medium">
                  <p>Order ID: {item.id}</p>
                  <p>First Name: {item.first_name}</p>
                  <p>Type: {item.type}</p>
                  <p>Total: {rupiah(item.total)}</p>
                  <p>Created at: {formatTimestampZ(item.created_at)}</p>
                  {item.updated_at ? (
                    <p>Updated at: {formatTimestampZ(item.updated_at)}</p>
                  ) : (
                    ""
                  )}

                  <div className=" justify-start flex">
                    <p>
                      Status: &nbsp;
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
                    </p>
                    <div>
                      <button
                        className="btn btn-ghost  btn-xs"
                        onClick={() => handleBtn(item)}
                      >
                        {item.status === "unpaid"
                          ? "upload payment"
                          : "details"}
                      </button>
                      {uploadModals[item.id] && (
                        <UploadModals
                          open={uploadModals[item.id]}
                          getOrder={getOrder}
                          selectData={selectOrder}
                          details={selectDetails}
                          rupiah={rupiah}
                          formatTime={formatTimestampZ}
                          onClose={() => handleClose(item)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
