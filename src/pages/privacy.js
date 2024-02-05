import Footer from "@/components/footer";
import Layout from "@/components/layout";
import Navbar from "@/components/navbar";
import React from "react";

export default function Privacy() {
  return (
    <Layout>
      <div>
        <h1 className="font-bold text-2xl p-4">Privacy Policy</h1>
        <div className="flex mx-8  p-4">
          <p className="whitespace-normal">
            This privacy policy is for this website and served by Sample and
            governs the privacy of its users who choose to use it. The policy
            sets out the different areas where user privacy is concerned and
            outlines the obligations & requirements of the users, the website
            and website owners. Furthermore the way this website processes,
            stores and protects user data and information will also be detailed
            within this policy.
          </p>
        </div>
        <h1 className="flex text-2xl font-bold p-4">The Website</h1>
        <div className="flex mx-8  p-4">
          <p className="whitespace-normal">
            This website and its owners take a proactive approach to user
            privacy and ensure the necessary steps are taken to protect the
            privacy of its users throughout their visiting experience. This
            website complies to all national laws and requirements for user
            privacy.
          </p>
        </div>
      </div>
    </Layout>
  );
}
