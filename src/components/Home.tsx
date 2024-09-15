"use client";
import { devonsGetApi, newsGetApi, questionsGetApi } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRightIcon, CalendarFoldIcon, UsersIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import Container from "./Core/Container";
import Title from "./Core/Title";
import Hero from "./Hero";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const NewsList = ({ n, h }) => {
  const locale = useLocale();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news_home"],
    queryFn: async () => {
      return await newsGetApi({});
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>{error?.message}</div>;
  return (
    <>
      {data?.data?.results.length != 0 && (
        <>
          <Title title={n("5")} />
          <div>
            <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {data?.data?.results.map((item: any, i: any) => (
                <Link
                  key={i}
                  href={`/${locale}/news/${item.id}`}
                  className="w-full mb-8 flex flex-col cursor-pointer hover:shadow-2xl duration-300"
                  data-aos="fade-up"
                  data-aos-delay={(i + 1) * 100}
                  data-aos-duration={(i + 1) * 100}
                >
                  <div className=" overflow-hidden h-40 md:h-80 w-full">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="object-cover object-center w-full h-48 hover:scale-110 duration-300"
                      style={{ width: "100%", height: "100%" }}
                      src={item.main_image}
                      alt="News"
                    />
                  </div>
                  <div className="flex flex-grow">
                    <div className="triangle"></div>
                    <div className="flex flex-col justify-between px-2 py-2 md:px-4 md:py-6 bg-white w-full">
                      <div>
                        <p className="inline-block mb-1 md:mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600">
                          {item.published_at}
                        </p>
                        <p className="block mb-1 md:mb-4 text-xs md:text-xl font-black leading-tight ">
                          {item.title}
                        </p>
                        <p className=" mb-1 md:mb-4 text-xs md:text-base">
                          {item.authors}
                        </p>
                      </div>
                      <div>
                        <Link
                          href={`/${locale}/news/${item.id}`}
                          className="inline-block pb-1 mt-2 text-xs md:text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
                        >
                          {h("button_more")} -{">"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const AboutPage = ({ n }) => {
  const locale = useLocale();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["about_home"],
    queryFn: async () => {
      return await questionsGetApi({ page: 1, page_size: 8 });
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>{error?.message}</div>;
  return (
    <>
      {data?.data?.results.length != 0 && (
        <>
          <Title title={n("5")} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.data?.results.map((item: any, i: number) => (
              <Link
                key={i}
                href={`/${locale}/about/${item.id}`}
                className="hover:scale-105 duration-300"
                data-aos="fade-up"
                data-aos-delay={(i + 1) * 100}
                data-aos-duration={(i + 1) * 100}
              >
                <div className="p-5 bg-blue-100 rounded-3xl shadow-lg">
                  <div className="flex justify-between items-center pb-1.5">
                    <div className="text-lg font-semibold">
                      {item.question.length > 50
                        ? item.question.substring(0, 50) + "..."
                        : item.question}
                    </div>
                    <div className="text-base rounded-full p-1 text-center bg-white">
                      <ArrowUpRightIcon strokeWidth={1} className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-sm font-normal text-gray-500 ">
                    {item.short_answer.length > 100
                      ? item.short_answer.substring(0, 100) + "..."
                      : item.short_answer}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

const Devons = ({ h }) => {
  const locale = useLocale();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["devans_home"],
    queryFn: async () => {
      return await devonsGetApi({});
    },
  });

  if (isError) return <div>{error?.message}</div>;
  return (
    <>
      {isLoading && (
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, i) => (
              <CarouselItem
                key={i}
                className="px-2 md:p-3 basis-[48%] md:basis-1/3 lg:basis-[24%] 2xl:basis-[21%]"
              >
                <div className="h-60 md:h-80  bg-gray-200 rounded-3xl"></div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max gap-2 md:gap-4 space-x-4 p-4">
          {data?.data.devans.map((item: any, index: any) => (
            <Link
              href={`/${locale}/devonlar`}
              key={index}
              className=" w-44 md:w-64"
              data-aos="fade-left"
              data-aos-delay={(index + 1) * 100}
              data-aos-duration={(index + 1) * 100}
            >
              <div className="py-2">
                <div className=" cursor-pointer hover:scale-105 duration-300">
                  <div className={`bg-white rounded-2xl overflow-hidden`}>
                    <div className="w-full h-28 md:h-40 bg-gray-200 relative">
                      <Image
                        src={item.image}
                        width={0}
                        height={0}
                        // className="transition hover:scale-110 duration-300 shadow-xl"
                        sizes="100vw"
                        style={{ width: "100%", height: "100%" }} // optional
                        alt="Image"
                      />
                      <div className=" block md:hidden absolute bottom-1 right-2 text-[10px] w-max  text-green-600 px-1 py-0.5 rounded-full bg-green-100">
                        {item.counts}
                      </div>
                    </div>

                    <div className="p-1.5 md:p-3">
                      <div className="flex flex-between items-center relative">
                        <div className="w-full md:w-[85%]  text-sm md:text-base font-semibold text-gray-700">
                          {item.name}
                        </div>
                        <div className=" hidden md:block absolute right-0 top-0 text-[10px] w-max  text-green-600 px-2 py-1 rounded-full bg-green-100">
                          {item.counts}
                        </div>
                      </div>
                      <div className="h-20 md:h-28 text-gray-500 flex flex-col">
                        <div className="flex-grow text-[10px] md:text-sm  text-wrap">
                          {item.desc.length > 100
                            ? item.desc.substring(0, 100) + "..."
                            : item.desc}
                        </div>

                        <span className="flex items-center text-xs md:text-sm">
                          <CalendarFoldIcon className="md:w-4 md:h-4 w-3 h-3 text-gray-400 mr-1" />
                          {item.to_year
                            ? item.from_year +
                              "-" +
                              item.to_year +
                              "-" +
                              h("years")
                            : item.from_year + "-" + h("year")}
                        </span>
                        <span className="flex items-center mb-1 text-xs md:text-sm">
                          <UsersIcon className="md:w-4 md:h-4 w-3 h-3 text-gray-400 mr-1" />
                          {item.to_age
                            ? item.from_age +
                              "-" +
                              item.to_age +
                              "-" +
                              h("ages")
                            : item.from_age + "-" + h("age")}
                        </span>
                      </div>
                      <Link href={item.pdf_file} target="_blank">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={`bg-blue-100 w-full rounded-lg text-xs md:text-sm py-0.5  md:py-1`}
                        >
                          {h("button_more")}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

const Home = () => {
  const locale = useLocale();
  const n = useTranslations("Navbar");
  const h = useTranslations("Home");

  return (
    <>
      <Hero h={h} />
      <div className="bg-image-flower">
        <Container>
          <div className="">
            <Title title={n("2")} />
            <div>
              <Devons h={h} />
            </div>
          </div>
          <div className="">
            <NewsList n={n} h={h} />
          </div>

          <div>
            <AboutPage n={n} />
          </div>

          <div className="py-5 pb-10">
            <Title title={h("bio")} />
            <Link
              href={`/${locale}/biography`}
              className="grid grid-cols-1 gap-0 md:gap-4 lg:grid-cols-5 bg-white p-2 md:p-4 shadow-lg rounded-3xl relative"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <div className=" overflow-hidden rounded-xl col-span-2">
                <Image
                  src={"/home_alisher_navoiy.png"}
                  width={350}
                  height={0}
                  className="transition hover:scale-105 duration-300 shadow-xl rounded-xl"
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt="Image"
                />
              </div>
              <div className=" col-span-3 text-sm 2xl:text-xl md:text-base font-normal text-gray-500 md:pb-4 pt-2">
                {`Alisher Navoiy (1441-1501) - buyuk shoir va mutafakkir, davlat arbobi. To‘liq ismi – Nizomiddin Mir Alisher. “Navoiy” taxallusi ostida chig‘atoy (eski o‘zbek tili) hamda fors tilida “Foniy” taxallusi bilan ijod qilgan. Navoiy yoshligidan Xurosonning bo‘lajak hukmdori Husayn
                                Boyqaro bilan (humronlik davri:1469-1506 - yillar) do‘st bo‘lgan. 7-8 yoshidan
                                she’rlar yozishni boshlagan. Navoiyning zamondoshi bo‘lmish tarixchi
                                Xondamir qoldirgan ma’lumotlarga ko‘ra, mashhur o‘zbek shoiri
                                Lutfiy (1369-1465) keksaygan chog‘larida yosh Alisher bilan
                                ko‘rishadi va uning she’riy iqtidorini yuqori baholaydi.`}
              </div>
              <div className=" text-blue-500 text-base font-semibold text-center cursor-pointer relative sm:absolute sm:bottom-5 sm:right-5">
                {h("button_more")}...
              </div>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
