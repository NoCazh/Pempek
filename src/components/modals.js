import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DateTime } from "luxon";
export default function Modals({
  open,
  onClose,
  selectData,
  details,
  onVoidClick,
  onAcceptClick,
  rupiah,
}) {
  const supabase = useSupabaseClient();
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  if (!open) return null;

  function formatTimestampZ(timestamp) {
    const dateTime = DateTime.fromISO(timestamp, { zone: "UTC+7" });
    return dateTime.toFormat("yyyy-MM-dd HH:mm:ss");
  }

  const download = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Extract filename from the URL
      const filename = url.substring(url.lastIndexOf("/") + 1);

      const urlObject = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObject;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="modal-box bg-white  w-11/12 max-w-5xl">
        <button
          className="absolute top-2 right-2 p-2 btn-circle  btn-sm bg-white rounded-2xl hover:bg-gray-200"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose} className="rounded-full" />
        </button>
        <div className=" border-b border-neutral flex justify-around py-2">
          <h3 className="font-bold text-xl">Order </h3>
          <h3 className="font-bold text-xl">Order Details</h3>
        </div>
        <div className=" flex  justify-around  w-full">
          {/* order */}
          <div className="flex-1 py-2 flex-row  text-base">
            <p>Order ID:&nbsp;{selectData.id}</p>
            <p>Email:&nbsp;{selectData.profiles.email}</p>
            <p>First Name:&nbsp;{selectData.first_name}</p>
            <p>Last Name:&nbsp;{selectData.last_name}</p>
            <p>Phone:&nbsp;{selectData.phone_num}</p>
            {selectData.type === "delivery" ? (
              <>
                <p>Address:&nbsp;{selectData.address}</p>
                <p>City:&nbsp;{selectData.city}</p>
                <p>Postal:&nbsp;{selectData.postal} </p>
              </>
            ) : (
              ""
            )}
            <p>Type:&nbsp;{selectData.type}</p>
            <p>Created at:&nbsp;{formatTimestampZ(selectData.created_at)}</p>
            <p>
              Updated at:&nbsp;
              {selectData.updated_at
                ? formatTimestampZ(selectData.updated_at)
                : ""}
            </p>
            <p className="font-bold">Total:&nbsp; {rupiah(selectData.total)}</p>
            <p className="font-bold">
              Status:&nbsp;
              <div
                className={`badge ${
                  selectData.status === "completed"
                    ? "badge-primary"
                    : selectData.status === "void"
                    ? "badge-secondary"
                    : "badge-accent"
                }`}
              >
                {selectData.status}
              </div>
              <p className="font-bold">
                Transfer Receipt:&nbsp;
                <button
                  className="btn btn-xs btn-warning"
                  onClick={() => download(selectData.url)}
                >
                  download
                </button>
              </p>
            </p>
          </div>

          <div className="divider divider-horizontal"></div>
          {/* order_details */}
          <div className="flex-1  py-2 text-base  w-full   ">
            <div className="flex font-medium text-center">
              <p className="flex-1">Menu </p>
              <p className="flex-1">Qty</p>
              <p className="flex-1">Price</p>
            </div>
            {details.map((detail) => (
              <div key={detail.id} className="flex text-center ">
                <p className="flex-1">{detail.menu.menu_name}</p>
                <p className="flex-1">{detail.quantity}</p>
                <p className="flex-1">{detail.price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          {" "}
          <button className="btn btn-error" onClick={onVoidClick}>
            VOID
          </button>
          <button className="btn btn-primary" onClick={onAcceptClick}>
            ACCEPT
          </button>
        </div>

        <p className="py-4 text-center">
          Press ESC key or click on close button to close
        </p>
      </div>
    </div>
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
