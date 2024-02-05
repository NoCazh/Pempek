import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "@/stores/cartSlice";
import OrderSum from "@/components/orderSum";
import Layout from "@/components/layout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { clearForm } from "@/stores/contactSlice";
import Swal from "sweetalert2";

export default function Cart({ user }) {
  const supabase = useSupabaseClient();
  const cart = useSelector((state) => state.cart.cart);
  const contact = useSelector((state) => state.contact);
  const validation = useSelector((state) => state.validation);
  const [isDeliverySelected, setIsDeliverySelected] = useState(false);
  const [isInputsFilled, setIsInputsFilled] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const {
      firstname,
      lastname,
      phonenum,
      shipment,
      address,
      city,
      province,
      postalcode,
    } = contact;

    if (firstname && lastname && phonenum && validation.shipment) {
      if (shipment === "pickup") {
        setIsInputsFilled(true);
      } else if (shipment === "delivery") {
        if (address && city && province && postalcode) {
          setIsInputsFilled(true);
        } else {
          setIsInputsFilled(false);
        }
      }
    } else {
      setIsInputsFilled(false);
    }
  }, [contact, validation.shipment]);

  const handleDeliveryChange = (isChecked) => {
    setIsDeliverySelected(isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveOrder();
      await Swal.fire({
        icon: "success",
        title: "Checkout Successful",
        text: "please proceed a payment",
      });
    } finally {
      dispatch(clearCart());
      dispatch(clearForm());
      router.push("/profiles/order_hist");
    }
  };

  const saveOrder = async () => {
    try {
      const { data, error } = await supabase
        .from("order")
        .insert([
          {
            profiles_id: user.id,
            first_name: contact.firstname,
            last_name: contact.lastname,
            phone_num: contact.phonenum,
            type: contact.shipment,
            address: contact.address,
            city: contact.city,
            province: contact.province,
            postal: contact.postalcode,
            total: getTotalPrice(),
            // url: uploadedUrl,
          },
        ])
        .select(`id`);

      if (error) {
        throw error;
      }
      const orderId = data[0].id;
      for (const cartItem of cart) {
        await saveOrderDetails(
          orderId,
          cartItem.id,
          cartItem.quantity,
          getSubPrice(cartItem.quantity, cartItem.price)
        );
      }

      // console.log("Order saved successfully:", data);
    } catch (error) {
      console.error("Error saving order 1:", error.message);
    }
  };

  const saveOrderDetails = async (order_id, menu_id, quantity, price) => {
    try {
      const { data, error } = await supabase.from("order_details").insert([
        {
          order_id: order_id,
          menu_id: menu_id,
          quantity: quantity,
          price: price,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("error saving order details 2:", error.message);
    }
  };

  const rupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  const delivery = 15000;
  const getTotalPrice = () => {
    return (
      cart.reduce(
        (accumulator, item) => accumulator + item.quantity * item.price,
        0
      ) + (isDeliverySelected ? delivery : 0)
    );
  };
  const getSubPrice = (quantity, price) => {
    return quantity * price;
  };

  return (
    <Layout>
      <div>
        {cart.length === 0 ? (
          <h1 className="mx-auto text-center pb-5">Your Cart is Empty!</h1>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3 ">
              <OrderSum
                onDeliveryChange={handleDeliveryChange}
                isDelivery={isDeliverySelected}
                onSubmit={handleSubmit}
                user={user}
              />
              <div className="container min-h-[200px] max-h-[600px] overflow-y-auto px-6 py-6 my-9 mx-auto s sm:w-[80%] lg:w-[60%] flex-1 rounded-md border md:px-8 bg-white">
                <div className="text-left font-bold text-xl">Order Summary</div>
                <div className="mt-4 flex justify-evenly gap-x-2  font-bold pb-1  uppercase border-b-2 border-black mb-2  text-xs md:text-base">
                  <div className="hidden sm:block">Image</div>
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Actions</div>
                  <div>Total Price</div>
                </div>
                {cart.map((item, index) => (
                  <div
                    className={
                      " flex justify-between py-2 px-2 mx-auto gap-x-1  items-center mb-3 text-xs md:text-sm lg:text-base"
                    }
                    key={index}
                  >
                    <div className={" flex-1 hidden sm:block "}>
                      <Image
                        src={item.image}
                        height="90"
                        width="60"
                        alt="cart image"
                      />
                    </div>
                    <p className="flex-1 text-center ">{item.title}</p>

                    <p className=" flex-1 text-center">{rupiah(item.price)}</p>

                    <p className="flex-1 text-center  ">{item.quantity}</p>

                    <div className={"flex-1 space-x-1 sm:space-x-2"}>
                      <button
                        onClick={() =>
                          dispatch(incrementQuantity({ id: item.id }))
                        }
                      >
                        <FontAwesomeIcon icon={faCirclePlus} />
                      </button>
                      <button
                        onClick={() =>
                          dispatch(decrementQuantity({ id: item.id }))
                        }
                      >
                        <FontAwesomeIcon icon={faCircleMinus} />
                      </button>
                      <button
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </button>
                    </div>
                    <p className="flex-1 ">
                      {" "}
                      {rupiah(getSubPrice(item.quantity, item.price))}
                    </p>
                  </div>
                ))}
                <div className="flex flex-col sm:mr-[2.5rem]">
                  <h2 className="text-right">
                    Delivery : {isDeliverySelected ? rupiah(delivery) : 0}
                  </h2>
                  <h2 className="text-right font-bold">
                    Total : {rupiah(getTotalPrice())}
                  </h2>
                </div>
                {/* <div className="sm:w-full sm:max-w-sm">
                  <h2 className="text-xl font-bold  tracking-tight text-gray-900">
                    Payment
                  </h2>
                </div> */}
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-end">
                    <button
                      className=" bg-[#1B7B59] btn  btn-success w-[200px] text-white rounded font-bold my-6 mx-auto md:mx-0 sm:mx-0 py-2 px-1 hover:opacity-90"
                      disabled={!isInputsFilled}
                    >
                      Checkout
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
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
