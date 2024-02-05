import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Review() {
  const testimonials = [
    {
      id: 1,
      name: "Yulistiana",
      quote:
        "rotinya lembut, wangi, seller responsif, saya sudah repeat order rasanya enak",
    },
    {
      id: 2,
      name: "Suhendri",
      quote:
        "Roti ini adalah roti terbaik yang pernah saya makan! Setiap gigitan penuh dengan kenikmatan. Rasanya begitu lezat dan menggugah selera. Pelayanan di tempat ini juga sangat ramah.",
    },
    {
      id: 3,
      name: "Kevin",
      quote:
        "Roti di sini membuat saya ketagihan! Setiap kali saya menggigitnya, rasanya seperti ada pesta di mulut saya. Penggunaan bahan-bahan segar dan teknik pembuatan yang ahli terasa dalam setiap gigitan. ",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = React.useState(0);

  const handlePrev = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className=" flex justify-center container mx-auto items-center flex-col md:flex-row px-5 md:px-0 py-5">
      <div className=" w-full sm:w-[60%] ">
        <h1 className="text-xl text-[#1B7B59] font-bold  flex justify-start ">
          What They Said ?
        </h1>
        <p className="text-2xl font-bold  flex justify-start py-2 w-7/8 sm:w-1/2 md:w-3/4 text-orange-500">
          What Customers Say About Their Experience With Us
        </p>
        <div className=" ">
          <div className=" w-full sm:w-1/3 md:w-3/4  py-2">
            <p>
              They say what they feel, most of them say they are very satisfied,
              especially satisfied because they can order cake or bread easily.
              We have numerous Customer, who are regular ones. They buy our
              products from day to day. Let&apos;s see what they say.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="max-w-xl w-full p-8  bg-white rounded-lg shadow ">
          <div className="relative ">
            <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
              <button
                className="p-2 bg-gray-200 rounded-full focus:outline-none"
                onClick={handlePrev}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
                {/* <ChevronLeftIcon className="h-5 w-5" /> */}
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
              <button
                className="p-2 bg-gray-200 rounded-full focus:outline-none"
                onClick={handleNext}
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-xl font-bold">Testimonials</h2>
              </div>
              <div className="mt-8">
                <p className="text-gray-600 text-center">
                  {testimonials[activeTestimonial].quote}
                </p>
                <div className="mt-4">
                  <p className="font-bold text-center">
                    {testimonials[activeTestimonial].name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* end carousel */}
    </div>
  );
}
