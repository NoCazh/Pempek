import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Swal from "sweetalert2";

export default function UploadModals({
  open,
  onClose,
  selectData,
  getOrder,
  details,
  rupiah,
  formatTime,
}) {
  const supabase = useSupabaseClient();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isFiles, setIsFiles] = useState(false);

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

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsFiles(true);
    } else {
      setIsFiles(false);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("bukti_tf")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading file:", error.message);
      } else if (data) {
        const fullUrl = `${supabase.storageUrl}/object/public/bukti_tf/${data.path}`;
        setFileUrl(fullUrl); // Set the URL of the uploaded file
        console.log("File uploaded successfully:", fullUrl);
        return fullUrl; // Return the URL to be used later
      }
    }
  };

  async function updateOrderStat(status, orderId, uploadedUrl) {
    try {
      const { data, error } = await supabase
        .from("order")
        .update([
          {
            url: uploadedUrl,
            status: status,
            updated_at: new Date().toISOString(),
          },
        ])
        .eq("id", orderId)
        .select(`status`);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const uploadedUrl = await handleUpload();
        if (uploadedUrl) {
          await updateOrderStat("processing", selectData.id, uploadedUrl);
          await Swal.fire({
            icon: "success",
            title: "Payment Uploaded",
            text: "please wait for the order",
          });
        } else {
          console.error("Error uploading file.");
          await Swal.fire({
            icon: "error",
            title: "Error Submit",
            text: "Something went wrong!",
          });
        }
      }
    } finally {
      onClose();
      getOrder();
    }
  };

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
        {/* <form> */}
        <div className=" border-b border-neutral flex justify-around py-2">
          <h3 className="font-bold text-xl">Order </h3>
          <h3 className="font-bold text-xl">Order Details </h3>
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
            </p>
            <div>
              {selectData.url === null ? (
                <>
                  <div className="">
                    <p className="text-sm font-medium leading-6 text-gray-900">
                      Upload your tranfer receipt here (screenshot or file)!
                    </p>
                    <p className="text-sm font-bold leading-6 text-gray-900">
                      Transfer BCA 4210-183-715 an. Sultan Rayhan
                    </p>
                  </div>
                  <div className="mt-2">
                    <input
                      type="file"
                      required
                      onChange={handleFile}
                      accept="image/*"
                      className="file-input file-input-bordered file-input-success w-full max-w-xs"
                    />
                  </div>
                </>
              ) : (
                <p className="font-bold">
                  Url:&nbsp;
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => download(selectData.url)}
                  >
                    download
                  </button>
                </p>
              )}
            </div>
            <p className="font-bold">
              Created At:&nbsp; {formatTime(selectData.created_at)}
            </p>
            <p className="font-bold">
              Updated At:&nbsp;{" "}
              {selectData.updated_at ? formatTime(selectData.updated_at) : ""}
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
          {selectData.status === "unpaid" ? (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!isFiles}
            >
              Upload Payment
            </button>
          ) : (
            ""
          )}
        </div>
        <p className="py-4 text-center">
          Press ESC key or click on close button to close
        </p>
        {/* </form> */}
      </div>
    </div>
  );
}
