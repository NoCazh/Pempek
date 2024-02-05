import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <div className="w-full py-32px px-3">
      <div className=" mx-auto grid md:grid-cols-2">
        <Image
          src="/assets/roti.webp"
          className="md:w-[800px] sm:w-[300px]  my-4"
          width={800}
          height={300}
          alt="Bread photo"
          priority={true}
        />
        <div className="flex flex-col justify-center ">
          <h1 className="text-[#1B7B59] font-bold  md:text-4xl sm:text-3xl text-xl md:w-1/2 py-2  ">
            We Bake {/* new hero */}
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Tasty",
                1500,
                "Delicious",
                1500,
                "Yummy",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
            Bread
          </h1>
          <p className="sm:text-xl md:text-2xl w-3/4">
            Fresh bread and cake are cooked using natural ingredients.
          </p>
          <div className=" grid justify-items-center ">
            <button className=" bg-orange-500 w-[200px] rounded font-bold my-6 mx-auto md:mx-0 py-2 px-1 hover:bg-orange-600">
              <a href="#cardMenu" className="scroll-smooth">
                Order Bread
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
