import Hero from "@/components/hero";

import React from "react";
import About from "@/components/about";

import CardMenu from "@/components/cardmenu";
import Review from "@/components/review";
// import { supabase } from "../../utils/supabaseClient";
import Layout from "@/components/layout";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <Layout>
        <main>
          <Hero />
          <About />

          <div>
            {" "}
            <div className="md:mt-5 py-5 mx-6" id="cardMenu">
              <h1 className="text-xl text-[#1B7B59] font-bold  flex justify-start ">
                Our Menu
              </h1>
              <p className="text-2xl font-bold  flex justify-start py-2  sm:w-1/2 md:w-3/4">
                Explore Top Chef Recommendation
              </p>
              <Link href={"/menu"}>
                <div className="flex justify-end items-center container">
                  <p className="text-md font-bold flex py-2 px-3   lg:max-w-7xl ">
                    see more..
                  </p>
                  <FontAwesomeIcon icon={faCircleArrowRight} className="" />
                </div>
              </Link>
              <CardMenu limits={3} />
            </div>
          </div>
          <div>
            <Review />
          </div>
        </main>
      </Layout>
    </>
  );
}
