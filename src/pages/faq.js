import React from "react";
import { Disclosure } from "@headlessui/react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "@/components/layout";

export default function Faq() {
  return (
    <Layout>
      <div>
        <h1 className="font-bold text-xl px-4">Frequently Asked Question</h1>
      </div>
      <div className="w-full px-4 py-16">
        <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-emerald-300 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-emerald-400 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75">
                  <span>Halal</span>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-900`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                  June Cake selama ini menjamin untuk selalu menggunakan
                  bahan-bahan yang halal untuk setiap produk makanan yang
                  dihasilkan.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  bg-emerald-300 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-emerald-400 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75">
                  <span>Berapa Biaya Menjadi Anggota?</span>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-900`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                  Keanggotaan tersedia bagi Anda untuk bergabung secara gratis.
                  Cukup daftarkan diri Anda di June Cake dan pastikan Anda
                  mendaftarkan email dan nomor telepon yang aktif
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  bg-emerald-300 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-emerald-400 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75">
                  <span>Cara Registrasi</span>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-900`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                  <ol className="list-decimal p-3">
                    <li className="py-2">
                      Isi alamat email, nama, nomor handphone serta password
                      lalu klik tombol “submit”.
                    </li>
                    <li className="py-2">
                      Email aktivasi akun akan dikirimkan ke email Anda. Cek
                      email dan klik link atau tombol “Activation” untuk
                      mengaktivasi akun.
                    </li>
                  </ol>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  bg-emerald-300 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-emerald-400 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75">
                  <span>Cara Order</span>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-900`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                  <ol className="list-decimal p-3">
                    <li className="py-2">
                      Klik Menu dan pilih produk yang akan dipesan dari kategori
                      yang tersedia. Kemudian klik tombol “add to cart”.
                    </li>
                    <li className="py-2">
                      Pemilihan produk dapat juga dilakukan di kotak search yang
                      berada di sudut kanan atas halaman web dengan ikon
                      “keranjang (Cart)”.
                    </li>
                    <li className="py-2">
                      Setelah selesai memilih produk dan ditaruh dalam
                      keranjang/cart, klik ikon keranjang/cart yang berada di
                      sudut kanan atas halaman web untuk melihat produk yang
                      sudah dimasukan ke dalam keranjang.
                    </li>
                    <li className="py-2">
                      Untuk melanjutkan proses pembelian, klik tombol “Purchase
                      Now”
                    </li>
                    <li className="py-2">
                      Selanjutnya Anda akan diarahkan ke halaman pemesanan
                      (Order Summary).
                    </li>
                    <li className="py-2">
                      Periksa kembali list produk yang ada di halaman pemesanan.
                    </li>
                    <li className="py-2">
                      Kemudian klik tombol “Purchase Now” untuk proses checkout.
                      Minimum pemesanan via website adalah Rp 50.000
                    </li>
                    <li className="py-2">
                      Lalu Anda akan diarahkan ke halaman Registrasi. Bagi yang
                      sudah memiliki akun, dapat langsung ke bagian Login dengan
                      mengisi alamat email dan password serta klik tombol
                      “login”. Sedangkan bagi yang belum memiliki akun, harap
                      mendaftar ke bagian Register dengan mengisi alamat email,
                      nama serta password berupa no telepon lalu klik “submit”.
                    </li>
                    <li className="py-2">
                      Isi alamat pengiriman dan no telepon pada form yang
                      tersedia. Pastikan semua bagian dalam form terisi serta
                      data yang diisi sudah benar dan lengkap. Lengkapi pinpoint
                      lokasi Anda di peta secara akurat agar pengiriman dapat
                      berlangsung dengan cepat dan tepat.
                    </li>
                    <li className="py-2">
                      Alamat pengiriman dapat ditambahkan sesuai alamat yang
                      dituju (contoh kantor, rumah, dll). Alamat tujuan
                      pengiriman hanya 1 yang dipilih untuk 1 kali pengiriman.
                    </li>
                    <li className="py-2">
                      Setelah itu pilih tanggal pengiriman dan metode pengiriman
                      Delivery June Cake di bagian Delivery Service. Tarif Gojek
                      adalah flat dan dapat dilihat tabel pengiriman (lihat poin
                      Tabel tarif pengiriman GoSend Instan).
                    </li>
                    <li className="py-2">
                      Lalu klik tombol “Confirmation” dan Anda akan diarahkan ke
                      halaman konfirmasi.
                    </li>
                    <li className="py-2">
                      Status pembayaran dan pemesanan dapat dicek dengan menekan
                      opsi “Order History”.
                    </li>
                    <li className="py-2">
                      Segera lakukan pembayaran sesuai dengan metode pembayaran
                      yang Anda pilih.
                    </li>
                  </ol>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  bg-emerald-300 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-emerald-400 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75">
                  <span>Metode Pembayaran</span>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-900`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                  pembayaran dapat melalui Transfer bank BCA (4210183715 an.
                  Sultan Rayhan).
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </Layout>
  );
}
