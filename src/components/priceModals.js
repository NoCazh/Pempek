import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
export default function PriceModals({
  open,
  onClose,
  selectData,
  details,
  onVoidClick,
  onAcceptClick,
  rupiah,
}) {
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
          <h3 className="font-bold text-xl">Change The Price </h3>
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
              <p className="font-bold">
                Url:&nbsp;
                <a
                  target="_blank"
                  href={selectData.url}
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  {" "}
                  click here
                </a>
              </p>
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          {" "}
          <button className="btn btn-primary" onClick={onAcceptClick}>
            UPDATE
          </button>
        </div>

        <p className="py-4 text-center">
          Press ESC key or click on close button to close
        </p>
      </div>
    </div>
  );
}
