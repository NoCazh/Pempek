import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { onChangeProduct, clearProduct } from "@/stores/productSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function CreateModals({ open, onClose, getMenu }) {
  const supabase = useSupabaseClient();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const router = useRouter();
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

  console.log(products);
  const handleChange = (e) => {
    const { name, value } = e.target;

    const changeData = { [name]: value };
    dispatch(onChangeProduct(changeData));
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  console.log(file);

  const handleUpload = async () => {
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("imageSrc")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading file:", error.message);
      } else if (data) {
        const fullUrl = `${supabase.storageUrl}/object/public/imageSrc/${data.path}`;
        setFileUrl(fullUrl); // Set the URL of the uploaded file
        console.log("File uploaded successfully:", fullUrl);
        return fullUrl; // Return the URL to be used later
      }
    }
  };
  const saveProducts = async (Url) => {
    try {
      const { data, error } = await supabase.from("menu").insert([
        {
          menu_name: products.menuName,
          menu_detail: products.details,
          price: products.price,
          category: products.category,
          imageSrc: Url,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error saving products:", error.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const uploadedUrl = await handleUpload();
        if (uploadedUrl) {
          await saveProducts(uploadedUrl);
          await Swal.fire({
            icon: "success",
            title: "Products Added ",
            text: "Your products has been created",
          });
        }
      } else {
        console.error("Error uploading file.");
        await Swal.fire({
          icon: "error",
          title: "Error Create",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error create products:", error.message);
    } finally {
      dispatch(clearProduct());
      onClose();
      getMenu();
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
        <div className=" border-b border-neutral flex  py-2">
          <h3 className="font-bold text-xl">Create Product </h3>
        </div>
        <form>
          <div className=" flex py-2 w-full">
            <div className="flex-1 py-2 flex-row  text-base">
              <div className="flex items-center gap-2  justify-between ">
                <p>Menu Name:&nbsp;</p>
                <input
                  name="menuName"
                  type="text"
                  placeholder="Type here"
                  className=" w-3/4 rounded-md border-none input-sm  text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-2 justify-between py-4">
                <p>Details:&nbsp;</p>

                <textarea
                  name="details"
                  type="text"
                  placeholder="Type here"
                  className=" w-3/4 h-full text-area rounded-md border-none input-sm  text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-2 justify-between py-4">
                <p>Price:&nbsp;</p>

                <input
                  name="price"
                  type="number"
                  placeholder="Type here"
                  className=" w-3/4 rounded-md border-none input-sm py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-2 justify-between">
                <p>Category:&nbsp;</p>

                <select
                  name="category"
                  type=""
                  placeholder="Type here"
                  className=" w-3/4 h-full rounded-md border-none input-sm  text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  defaultValue={"Choose a category"}
                >
                  <option disabled selected>
                    Choose a category
                  </option>
                  <option value="bread">Bread</option>
                  <option value="cakes">Cakes</option>
                  <option value="pastry">Pastry</option>
                  <option value="cookies">Cookies</option>
                </select>
              </div>
              <div className="flex items-center gap-2 py-4 justify-between">
                <p>Upload Picture:&nbsp;</p>

                <input
                  name="menuImg"
                  type="file"
                  className=" w-3/4 h-full file-input  rounded-md border-none input-sm  text-gray-900 shadow-sm  ring-inset bg-white ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  accept="image/*"
                  required
                  onChange={handleFile}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="btn btn-primary" onClick={handleCreate}>
              CREATE
            </button>
          </div>
        </form>

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
