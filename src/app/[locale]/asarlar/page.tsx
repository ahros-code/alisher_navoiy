"use client";
import { filtersGetApi, worksGetApi } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import Title from "@/components/Core/Title";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type { CheckboxProps } from "antd";
import { Checkbox, Divider } from "antd";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  SearchIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

const CheckboxGroup = Checkbox.Group;

const Filter = ({ setAuditory_age__in, setText_type_id__in }) => {
  const [enabled, setEnabled] = useState(true);
  const d = useTranslations("Devonlar");
  const { data, isLoading } = useQuery({
    queryKey: ["filter_list"],
    queryFn: async () => {
      setEnabled(false);
      return await filtersGetApi();
    },
    enabled: enabled,
  });

  // ANT CHECKBOX GROUP
  const [optionsTextTypes, setOptionsTextTypes] = useState([]);
  const [checkedListTextTypes, setCheckedListTextTypes] = useState([]);

  const [optionsAges, setOptionsAges] = useState([]);
  const [checkedListAges, setCheckedListAges] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setOptionsTextTypes(
        data.data.text_types.map((text_type: { name: any; id: any }) => ({
          label: text_type.name,
          value: text_type.id,
        }))
      );
      setOptionsAges(
        data.data.auditory_ages.map(
          (age: { auditory_age: any }) => age.auditory_age
        )
      );
    }
  }, [data]);

  let checkAllTextTypes = checkedListTextTypes.length == 0;
  const indeterminateTextTypes =
    checkedListTextTypes.length > 0 &&
    checkedListTextTypes.length < optionsTextTypes.length;

  let checkAllAges = checkedListAges.length == 0;
  const indeterminateAges =
    checkedListAges.length > 0 && checkedListAges.length < optionsAges.length;

  if (isLoading) return <Loading />;

  const onChangeListTextTypes = (list) => {
    setCheckedListTextTypes(list);
    setText_type_id__in(list.join(","));
  };

  const onChangeListAges = (list) => {
    setCheckedListAges(list);
    setAuditory_age__in(list.join(","));
  };

  const onCheckAllChangeAges: CheckboxProps["onChange"] = (e) => {
    setCheckedListAges([]);
    setAuditory_age__in("");
  };

  const onCheckAllChangeTextTypes: CheckboxProps["onChange"] = (e) => {
    setCheckedListTextTypes([]);
    setText_type_id__in("");
  };

  return (
    <>
      <div className="w-full ">
        <Popover>
          <PopoverTrigger>
            <div className="flex w-max items-center bg-white gap-2 px-2 py-1 hover:bg-gray-50 duration-300  cursor-pointer border rounded-full">
              <span className=" text-sm">{d("text_type")}</span>
              <ChevronDownIcon
                strokeWidth={1}
                className="w-4 h-4 hover:scale-110 duration-300"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="">
              <ScrollArea className="h-[30vh] p-2">
                <Checkbox
                  className="w-full"
                  indeterminate={indeterminateTextTypes}
                  onChange={onCheckAllChangeTextTypes}
                  checked={checkAllTextTypes}
                >
                  {d("all_button")}
                </Checkbox>
                <Divider className="my-2" />
                <CheckboxGroup
                  options={optionsTextTypes}
                  value={checkedListTextTypes}
                  onChange={onChangeListTextTypes}
                  className="grid grid-cols-1"
                />
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full ">
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2  w-max bg-white  px-2 py-1 hover:bg-gray-50 duration-300  cursor-pointer border rounded-full">
              <span className="text-sm">{d("age_type")}</span>
              <ChevronDownIcon
                strokeWidth={1}
                className="w-4 h-4 hover:scale-110 duration-300"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="">
              <ScrollArea className="h-[20vh] p-2">
                <Checkbox
                  className="w-full"
                  indeterminate={indeterminateAges}
                  onChange={onCheckAllChangeAges}
                  checked={checkAllAges}
                >
                  {d("all_button")}
                </Checkbox>
                <Divider className="my-2" />
                <CheckboxGroup
                  options={optionsAges}
                  value={checkedListAges}
                  onChange={onChangeListAges}
                  className="grid grid-cols-1"
                />
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

const AsarListMobile = ({ search, auditory_age__in, text_type_id__in }) => {
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
    queryKey: ["works", search, auditory_age__in, text_type_id__in],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      setEnabled(false);
      return await worksGetApi({
        search,
        page: pageParam,
        auditory_age__in,
        text_type_id__in,
      });
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
            <Link key={i} href={item.pdf_file} target="_blank">
              <div className="py-4 px-3 bg-white rounded-2xl space-y-2 border mb-3">
                <div className="pb-2 text-sm font-medium">{item.title}</div>
                <div className="text-sm">
                  <div>
                    <span className="text-blue-300">Muallifi: </span> Alisher
                    Navoiy
                  </div>
                  <div className="pb-5">
                    <span className="text-blue-300">Yaratilgan vaqti: </span>{" "}
                    {item.to_year
                      ? item.from_year + "-" + item.to_year + "-yillar"
                      : item.from_year + "-yil"}
                  </div>
                </div>
                <button className="bg-blue-100 text-gray-500 w-full font-semibold rounded-full text-sm md:text-sm py-2.5 ">
                  {"Ko‘rish"}
                </button>
              </div>
            </Link>
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

const AsarList = ({ search, auditory_age__in, text_type_id__in, h }) => {
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
    queryKey: ["works", search, auditory_age__in, text_type_id__in],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      setEnabled(false);
      return await worksGetApi({
        search,
        page: pageParam,
        auditory_age__in,
        text_type_id__in,
      });
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
        <thead className="">
          <tr className="bg-gray-100 overflow-hidden text-sm mb-5">
            <th className="w-3/4 py-2 px-6 text-left text-gray-600 rounded-tl-full rounded-bl-full">
              {h("name")}
            </th>
            <th className="w-1/6 py-2 px-6 text-center text-gray-600">
              {h("text_type")}
            </th>
            <th className="w-1/6 py-2 px-6  text-gray-600 text-center">
              {h("auditory_age")}
            </th>
            <th className="w-1/6 py-2 px-6 text-gray-600 text-center">
              {h("created")}
            </th>
            <th className="w-[10%] py-2 px-6 text-center text-gray-600 rounded-tr-full rounded-br-full">
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
                  className="hover:bg-gray-100 duration-300 cursor-pointer h-20"
                  onClick={() => window.open(item.pdf_file, "_blank")}
                >
                  <td className="py-3 px-6 border-b border-gray-200 text-sm font-semibold rounded-tl-full rounded-bl-full">
                    {item.title}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm text-center">
                    {item.auditory_age == null ? "-" : item.auditory_age}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm text-center">
                    {item.text_type == null ? "-" : item.text_type}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm text-center">
                    {item.to_year
                      ? item.from_year + "-" + item.to_year + "-" + h("years")
                      : item.from_year + "-" + h("year")}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-sm rounded-tr-full rounded-br-full">
                    <Link href={item.pdf_file} target="_blank">
                      <EyeIcon strokeWidth={1} size={20} className=" mx-auto" />
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

const Asarlar = () => {
  const h = useTranslations("Home");
  const n = useTranslations("Navbar");
  const s = useTranslations();
  const [search, setSearch] = useState("");

  const [auditory_age__in, setAuditory_age__in] = useState("");
  const [text_type_id__in, setText_type_id__in] = useState("");
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
    <div className="bg-image-flower min-h-screen md:pt-20 pt-14">
      {/* Scroll to top */}
      {show && (
        <div
          onClick={scrollToTop}
          className="hover:scale-110 duration-300 cursor-pointer bg-blue-400 p-2 rounded-full fixed bottom-5 md:bottom-10 right-5 md:right-10 z-10"
        >
          <ChevronUpIcon className="w-8 h-8 text-white" />
        </div>
      )}
      <div className="w-full lg:w-[85vw] mx-auto px-4 pb-10">
        <div className=" hidden md:block">
          <Title title={n("3")} />
        </div>

        <div className="hidden lg:block bg-white shadow-lg rounded-lg pb-5">
          <div className={` overflow-hidden px-4 pt-6`}>
            <div className="flex items-center float-center gap-2  md:hidden mb-2">
              {/* Filter mobile */}
              <Filter
                setAuditory_age__in={setAuditory_age__in}
                setText_type_id__in={setText_type_id__in}
              />
            </div>

            <div className="flex items-center gap-2 mb-2 w-full">
              <div className="flex items-center gap-2 p-1 rounded-full bg-gray-50 border w-[50%]">
                <SearchIcon strokeWidth={1} size={20} />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  type="text"
                  placeholder={s("search")}
                  className="w-full  placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500"
                />
              </div>
              <div className=" items-center gap-2 hidden md:flex">
                {/* Filter Desktop */}
                <Filter
                  setAuditory_age__in={setAuditory_age__in}
                  setText_type_id__in={setText_type_id__in}
                />
              </div>
            </div>

            <AsarList
              search={search}
              auditory_age__in={auditory_age__in}
              text_type_id__in={text_type_id__in}
              h={h}
            />
          </div>
        </div>

        <div className="block lg:hidden ">
          <div className="flex items-center justify-center py-5 ">
            <h2 className="text-xl font-semibold text-center flex-grow">
              {n("3")}
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 mb-2 w-full ">
            <div className="flex items-center float-center gap-2  md:hidden mb-2">
              {/* Filter mobile */}
              <Filter
                setAuditory_age__in={setAuditory_age__in}
                setText_type_id__in={setText_type_id__in}
              />
            </div>
            <div className="flex items-center gap-2 mb-2 w-full ">
              <div className="flex items-center gap-2 p-1 rounded-full bg-white border w-full">
                <SearchIcon strokeWidth={1} size={20} />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  type="search"
                  placeholder={s("search")}
                  className="w-full  placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500"
                />
              </div>
              <div className=" items-center gap-2 hidden md:flex">
                {/* Filter Desktop */}
                <Filter
                  setAuditory_age__in={setAuditory_age__in}
                  setText_type_id__in={setText_type_id__in}
                />
              </div>
            </div>
          </div>
          <AsarListMobile
            search={search}
            auditory_age__in={auditory_age__in}
            text_type_id__in={text_type_id__in}
          />
        </div>
      </div>
    </div>
  );
};

export default Asarlar;
