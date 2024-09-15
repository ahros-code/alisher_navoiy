"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Container from "./Core/Container";

const Footer = () => {
  const locale = useLocale();
  const n = useTranslations("Navbar");
  const f = useTranslations("Footer");

  return (
    <div className={`bg-white py-6 px-4`}>
      <Container>
        {/* <!-- Footer --> */}
        <footer className=" border-b pb-6">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 lg:grid-cols-4 text-black">
            <div className="hidden md:block">
              <Image
                src="/logo_footer.png"
                width={125}
                height={0}
                className=" hover:scale-105 duration-300 cursor-pointer"
                alt="Image"
              />
            </div>
            <div>
              <h2 className="text-base md:text-xl font-semibold py-2">
                {f("ruknlar")}
              </h2>
              <div className="text-sm md:text-base text-gray-400 space-y-2">
                <div>
                  <Link href={`/${locale}/`} className="text-maincolor">
                    {n("0")}
                  </Link>
                </div>
                <div>
                  <Link
                    href={`/${locale}/biography`}
                    className="text-maincolor"
                  >
                    {n("1")}
                  </Link>
                </div>
                <div>
                  <Link href={`/${locale}/devonlar`} className="text-maincolor">
                    {n("2")}
                  </Link>
                </div>
                <div>
                  <Link href={`/${locale}/asarlar`} className="text-maincolor">
                    {n("3")}
                  </Link>
                </div>
                <div>
                  <Link
                    href={`/${locale}/hikmatlar`}
                    className="text-maincolor"
                  >
                    {n("4")}
                  </Link>
                </div>
                <div>
                  <Link
                    href={`/${locale}/tadqiqotlar`}
                    className="text-maincolor"
                  >
                    {n("5")}
                  </Link>
                </div>
                <div>
                  <Link href={`/${locale}/news`} className="text-maincolor">
                    {n("6")}
                  </Link>
                </div>
                <div>
                  <Link href={`/${locale}/about`} className="text-maincolor">
                    {n("7")}
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-base md:text-xl font-semibold py-2">
                {n("6")}
              </h2>
              <div className="text-sm md:text-base text-gray-400 space-y-2">
                <div>
                  <Link href={`/${locale}/about`} className="text-maincolor">
                    {f("employee")}
                  </Link>
                </div>
                <div>
                  <Link href={`/${locale}/about`} className="text-maincolor">
                    {f("questions")}
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h2 className=" text-base md:text-xl font-semibold py-2">
                {f("contact")}
              </h2>
              <div className="text-xs md:text-base text-gray-400 space-y-2">
                <div>
                  <Link
                    href={"tel:+998 91 333 86 55"}
                    target="_blank"
                    className="text-maincolor"
                  >
                    +998 91 333 86 55
                  </Link>
                </div>
                <div>
                  Telegram:{" "}
                  <Link
                    href="https://t.me/Manzura_Abdurashetovna"
                    target="_blank"
                    className="text-maincolor"
                  >
                    Manzura Abdurashidova
                  </Link>
                </div>
              </div>
            </div>
            <div className="block md:hidden mx-auto">
              <Image
                src="/logo_footer.png"
                width={90}
                height={0}
                className=" hover:scale-105 duration-300 cursor-pointer"
                alt="Image"
              />
            </div>
          </div>
        </footer>
        <div className="text-xs md:text-base text-black pt-5">
          {f("version")}{" "}
          <Link
            href="http://v1.alishernavoicorpus.uz/"
            target="_blank"
            className="text-maincolor"
          >
            v1.alishernavoicorpus.uz
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
