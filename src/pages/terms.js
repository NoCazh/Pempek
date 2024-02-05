import Footer from "@/components/footer";
import Layout from "@/components/layout";
import Navbar from "@/components/navbar";

export default function Terms() {
  return (
    <Layout>
      <div>
        <h1 className="font-bold text-2xl p-4">Terms and Conditions</h1>
        <div className="flex flex-col mx-8  p-4">
          <p className="whitespace-normal">
            This website is operated by June Cake. Throughout the site, the
            terms “we”, “us” and “our” refer to June Cake. June Cake offers this
            website, including all information, tools and services available
            from this site to you, the user, conditioned upon your acceptance of
            all terms, conditions, policies and notices stated here.
          </p>
          <p className="whitespace-normal py-2">
            By visiting our site and/or purchasing something from us, you engage
            in our “Service” and agree to be bound by the following terms and
            conditions (“Terms and Conditions”, “Terms”), including those
            additional terms and conditions and policies referenced herein
            and/or available by hyperlink. These Terms and Conditions apply to
            all users of the site, including without limitation users who are
            browsers, vendors, customers, merchants, and/or contributors of
            content.
          </p>
          <p className="whitespace-normal py-2">
            Please read these Terms and Conditions carefully before accessing or
            using our website. By accessing or using any part of the site, you
            agree to be bound by these Terms and Conditions. If you do not agree
            to all the terms and conditions of this agreement, then you may not
            access the website or use any services. If these Terms and
            Conditions are considered an offer, acceptance is expressly limited
            to these Terms and Conditions.
          </p>
          <p className="whitespace-normal py-2">
            Any new features or tools which are added to the current store shall
            also be subject to the Terms and Conditions. You can review the most
            current version of the Terms and Conditions at any time on this
            page. We reserve the right to update, change or replace any part of
            these Terms and Conditions by posting updates and/or changes to our
            website. It is your responsibility to check this page periodically
            for changes. Your continued use of or access to the website
            following the posting of any changes constitutes acceptance of those
            changes.
          </p>
        </div>
      </div>
    </Layout>
  );
}
