import { useState, useEffect } from "react";
import Image from "next/image";
import CardMenu from "@/components/cardmenu";
import Layout from "@/components/layout";
// import { supabase } from "../../utils/supabaseClient";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
export default function Menu() {
  return (
    <>
      <Layout>
        <CardMenu limits={""} />
      </Layout>
    </>
  );
}
