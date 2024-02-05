import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import "react-phone-number-input/style.css";
import styles2 from "../styles/phone.module.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSelector, useDispatch } from "react-redux";
import { setValidation } from "@/stores/validSlice";
import { updateFormData } from "@/stores/contactSlice";
import { useRouter as _useRouter } from "next/router";

export default function OrderSum({
  onDeliveryChange,
  isDelivery,
  user,
  onSubmit,
}) {
  const contact = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const supabase = useSupabaseClient();

  const handleValidation = (name, isValid) => {
    dispatch(setValidation({ [name]: isValid }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedData = { [name]: value };
    dispatch(updateFormData(updatedData));
  };

  const handlePhoneChange = (value) => {
    dispatch(updateFormData({ phonenum: value }));
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = useCallback(async () => {
    try {
      // setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`email, first_name, last_name, phone_num`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        dispatch(
          updateFormData({
            email: data.email,
            firstname: data.first_name,
            lastname: data.last_name,
            phonenum: data.phone_num,
          })
        );
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      // setLoading(false);
    }
  }, [user, supabase, dispatch]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-start  px-6 py-7 my-9 mx-auto md:w-[60%] rounded-md border lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="w-auto  text-xl font-bold  tracking-tight text-gray-900">
            Contact Information
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="valid email address"
                  onChange={handleChange}
                  defaultValue={contact.email}
                  disabled
                  required
                  className="block w-full rounded-md border-0  py-2 bg-gray-200 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="first name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstname"
                  autoComplete="firstname"
                  placeholder="first name"
                  required
                  className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  defaultValue={contact.firstname}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="last name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
              </div>

              <div className="mt-2">
                <input
                  name="lastname"
                  type="text"
                  autoComplete="lastname"
                  placeholder="last name"
                  required
                  onChange={handleChange}
                  defaultValue={contact.lastname}
                  className="block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Phone number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
              </div>
              <div className="mt-2">
                <PhoneInput
                  inputProps={{
                    name: "phoneNum",
                    required: true,
                    // ...other input attributes you might want to add
                  }}
                  international
                  defaultCountry="ID"
                  countryCallingCodeEditable={false}
                  value={contact.phonenum}
                  onChange={handlePhoneChange}
                  className={
                    styles2.PhoneInput +
                    " px-2 block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                  }
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="last name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Shipment Method
                </label>
              </div>

              <div className="mt-2 flex">
                <div className="basis-1/2">
                  <input
                    name="shipment"
                    type="radio"
                    value="pickup"
                    required
                    onClick={(event) => {
                      onDeliveryChange(false);
                      handleChange(event);
                      handleValidation(
                        "shipment",
                        event.target.checkValidity()
                      );
                    }}
                    className="border-none py-2  shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 focus:ring-2 focus:ring-inset sm:leading-6"
                  />
                  <label className="ml-2">Pick up</label>
                </div>
                <div className="basis-2/3">
                  <input
                    name="shipment"
                    type="radio"
                    required
                    value="delivery"
                    onClick={(event) => {
                      onDeliveryChange(true);
                      handleChange(event);
                      handleValidation(
                        "shipment",
                        event.target.checkValidity()
                      );
                    }}
                    className="  border-none py-2  shadow-sm ring-1 ring-inset bg-gray-50 ring-gray-300 focus:ring-2 focus:ring-inset sm:leading-6"
                  />
                  <label className="ml-2">Delivery (Rp 15.000,00) </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="address"
                  type="text"
                  autoComplete="address"
                  placeholder={isDelivery ? "address" : ""}
                  required
                  onChange={(e) => {
                    handleChange(e);
                    handleValidation("address", e.target.checkValidity());
                  }}
                  disabled={!isDelivery}
                  value={isDelivery ? contact.address : ""}
                  className={`block w-full rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                    isDelivery ? "bg-gray-50" : "bg-gray-200"
                  } ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            {/* city, province, postalcode */}
            <div>
              <div className="flex flex-row items-center justify-between">
                <label
                  htmlFor
                  className=" basis-1/4 text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>

                <label className=" px-8 basis-2/4 text-sm font-medium leading-6 text-gray-900">
                  State/Province
                </label>
                <label
                  htmlFor=" postal code"
                  className="basis-1/4  text-sm font-medium leading-6 text-gray-900"
                >
                  Postal Code
                </label>
              </div>
              <div className="mt-2 gap-3 flex flex-row items-center justify-between ">
                <input
                  name="city"
                  type="text"
                  autoComplete="city"
                  placeholder={isDelivery ? "city" : ""}
                  required
                  onChange={handleChange}
                  disabled={!isDelivery}
                  value={isDelivery ? contact.city : ""}
                  className={`w-1/4 rounded-md border-none py-2  text-gray-900 shadow-sm ring-1 ring-inset ${
                    isDelivery ? "bg-gray-50" : "bg-gray-200"
                  } ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6`}
                />
                <input
                  name="province"
                  type="text"
                  autoComplete="province"
                  placeholder={isDelivery ? "province" : ""}
                  required
                  onChange={handleChange}
                  disabled={!isDelivery}
                  value={isDelivery ? contact.province : ""}
                  className={`w-1/3 block rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                    isDelivery ? "bg-gray-50" : "bg-gray-200"
                  } ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6`}
                />
                <input
                  name="postalcode"
                  type="number"
                  autoComplete="postal"
                  placeholder={isDelivery ? "postal" : ""}
                  required
                  onChange={handleChange}
                  disabled={!isDelivery}
                  value={isDelivery ? contact.postalcode : ""}
                  className={`w-1/3 block basis-1/4  rounded-md border-none py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                    isDelivery ? "bg-gray-50" : "bg-gray-200"
                  } ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
