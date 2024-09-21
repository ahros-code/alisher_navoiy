"use client";
import { researchGetApi } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import Title from "@/components/Core/Title";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronUpIcon, EyeIcon, SearchIcon } from "lucide-react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

const TadqiqotListMobile = ({ search }) => {
  const [enabled, setEnabled] = useState(true);
  const { ref, inView } = useInView();

  const h = useTranslations("Home");
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["researches", search],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      setEnabled(false);
      return await researchGetApi({ search, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastpage, allPages) => {
      const nextPage = lastpage.data.results.length
        ? allPages.length + 1
        : undefined;
      return nextPage;
    },
    enabled: enabled,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data?.pages.map((todos: any) =>
        todos.data.results.map((item: any, i: any) => {
          return (
            <div
              key={i}
              className="py-4 px-3 bg-white rounded-2xl space-y-2 border mb-3"
            >
              <div className="pb-2 text-sm font-semibold">{item.title}</div>
              <div className="text-sm">
                <div>
                  <span className="text-blue-300">{h("author")}: </span>{" "}
                  {item.authors}
                </div>
                <div className="pb-5">
                  <span className="text-blue-300">{h("created")}: </span>{" "}
                  {item.published_at}
                </div>
              </div>
              <Link href={item.pdf_file} target="_blank">
                <button className="bg-blue-100 text-gray-500 w-full font-semibold rounded-full text-sm md:text-sm py-2.5 ">
                  {h("button_more")}
                </button>
              </Link>
            </div>
          );
        })
      )}
      <button
        ref={ref}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? ""
          : hasNextPage
          ? "Load more"
          : "Nothing more to load"}
      </button>
      {isFetchingNextPage && <Loading />}
    </>
  );
};

const TadqiqotList = ({ search, h }) => {
  const [enabled, setEnabled] = useState(true);
  const { ref, inView } = useInView();

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["researches", search],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      setEnabled(false);
      return await researchGetApi({ search, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastpage, allPages) => {
      const nextPage = lastpage.data.results.length
        ? allPages.length + 1
        : undefined;
      return nextPage;
    },
    enabled: enabled,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <table className="w-full table-fixed">
        <thead className=" rounded-full overflow-hidden">
          <tr className="bg-gray-100 rounded-full overflow-hidden text-sm">
            <th className="w-3/4 py-2 px-6 text-left text-gray-600 rounded-tl-full rounded-bl-full">
              {h("name")}
            </th>
            <th className="w-1/6 py-2 px-6 text-left text-gray-600">
              {h("author")}
            </th>
            <th className="w-1/6 py-2 px-6 text-left text-gray-600">
              {h("created")}
            </th>
            <th className="w-1/6 py-2 px-6 text-center text-gray-600 rounded-tr-full rounded-br-full">
              {h("button_more")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {data?.pages.map((todos: any) =>
            todos.data.results.map((item: any, i: any) => {
              return (
                <tr
                  key={i}
                  className="hover:bg-gray-100 duration-300 cursor-pointer"
                  onClick={() => window.open(item.pdf_file, "_blank")}
                >
                  <td className="py-3 px-6 border-b border-gray-200 text-sm rounded-tl-full rounded-bl-full">
                    {item.title}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm">
                    {item.authors}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm">
                    {item.published_at}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm rounded-tr-full rounded-br-full">
                    <Link href={item.pdf_file} target="_blank">
                      <EyeIcon strokeWidth={1} size={20} className="mx-auto" />
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <button
        ref={ref}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? ""
          : hasNextPage
          ? "Load more"
          : "Nothing more to load"}
      </button>
      {isFetchingNextPage && <Loading />}
    </>
  );
};

const Tadqiqotlar = () => {
  const h = useTranslations("Home");
  const n = useTranslations("Navbar");
  const s = useTranslations();
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);
  const handleScroll = () => {
    window.pageYOffset >= 100 ? setShow(true) : setShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-image-flower min-h-screen pt-14 md:pt-20">
      {/* Scroll to top */}
      {show && (
        <div
          onClick={scrollToTop}
          className=" hover:scale-110 duration-300 cursor-pointer bg-blue-400 p-2 rounded-full fixed bottom-5 md:bottom-10 right-5 md:right-10 z-10"
        >
          <ChevronUpIcon className="w-8 h-8 text-white" />
        </div>
      )}
      <div className="w-full lg:w-[85vw] mx-auto px-4 pb-10">
        {/* Desktop */}
        <div className=" hidden md:block">
          <Title title={n("5")} />
        </div>
        <div className=" hidden lg:block bg-white shadow-lg rounded-lg pb-5 ">
          <div className={` overflow-hidden px-4 pt-6`}>
            <div className="flex items-center gap-2 border p-2 rounded-full mb-5 w-full md:w-[50%] ">
              <SearchIcon strokeWidth={1} size={20} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder={s("search")}
                className=" w-full inline-block bg-transparent focus:outline-none text-sm text-gray-500"
              />
            </div>
            <TadqiqotList search={search} h={h} />
          </div>
        </div>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-center py-5 ">
            <h2 className="text-xl font-semibold text-center flex-grow">
              {n("4")}
            </h2>
          </div>
          <div className="flex items-center gap-2 border p-2 rounded-full mb-5 bg-white ">
            <SearchIcon strokeWidth={1} size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder={s("search")}
              className=" w-full bg-transparent focus:outline-none text-sm text-gray-500"
            />
          </div>
          <TadqiqotListMobile search={search} />
        </div>
      </div>
    </div>
  );
};

export default Tadqiqotlar;
