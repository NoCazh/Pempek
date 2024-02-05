import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import Image from "next/image";

import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="bg-gray-900 text-gray-50 p-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="mb-5">
              <Link href="/#home" passHref legacyBehavior scroll={false}>
                <a className="block">
                  <Image
                    alt=""
                    src="/assets/icons/junecake_white.png"
                    width="235"
                    height="67"
                    className=" w-[60%] "
                  />{" "}
                </a>
              </Link>
            </div>
            <div className="mb-5">
              {/* COL 2 */}
              <h3 className="font-bold text-xl">Navigate</h3>
              <ul className="">
                <Link href="/#home" scroll={false}>
                  <li className="hover:text-orange-500">Home</li>
                </Link>
                <Link href="/menu">
                  <li className="hover:text-orange-500">Menu</li>
                </Link>
                <Link href="/#about" scroll={false}>
                  <li className="hover:text-orange-500">About</li>
                </Link>
                <Link href="/login">
                  <li className="hover:text-orange-500">Login</li>
                </Link>
              </ul>
            </div>

            <div className="mb-5">
              {/* COL 1 */}
              <h3 className="font-bold text-xl">Help </h3>
              <ul className="">
                <Link href="/faq">
                  <li className="hover:text-orange-500">FAQ</li>
                </Link>
                <Link href="/terms">
                  <li className="hover:text-orange-500">Terms & Conditions</li>
                </Link>
                <Link href="/privacy">
                  <li className="hover:text-orange-500">Privacy Policy</li>
                </Link>
              </ul>
            </div>

            <div className="mb-5 ">
              {/* col 3 */}
              <h3 className="font-bold text-xl">Address</h3>
              <ul className="">
                <li className="">
                  <span className="hover:text-orange-500 mb-3 ">
                    <a
                      href="https://goo.gl/maps/ueDGQqEgYYUgfRkG8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className=" whitespace-pre-line">
                        Jl. Siak Raya no. 109, Depok, Jawa Barat, Indonesia
                        16418
                      </p>
                    </a>
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-5 lg:px-5 sm:px-0">
              {/* col 3 */}
              <h3 className="font-bold text-xl">Social</h3>
              <ul className="">
                <li className="">
                  <span className="hover:text-orange-500 mb-3">
                    <a
                      href="https://www.instagram.com/junecake.id"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="text-2xl"
                      />
                    </a>
                  </span>
                  <span className="p-5">
                    <a
                      href="https://api.whatsapp.com/send?phone=628118000565"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-50"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="text-2xl hover:text-orange-500"
                      />
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm py-2">
            &copy; {new Date().getFullYear()} June Cake | All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
