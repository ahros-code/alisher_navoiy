"use client"
import { useInfiniteQuery } from "@tanstack/react-query";
import Title from "@/components/Core/Title";
import { ChevronUpIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { newsGetApi } from "@/api/AdminRequest";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import { useInView } from "react-intersection-observer";
import Loading from "@/components/Core/Loading";

const NewsList = ({ search }: { search: string }) => {
    const [enabled, setEnabled] = useState(true);
    const { ref, inView } = useInView();
    const h = useTranslations('Home');
    const locale = useLocale();
    const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["news", search],
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            setEnabled(false);
            return await newsGetApi({ search, page: pageParam, page_size: 10 });
        },
        initialPageParam: 1,
        getNextPageParam: (lastpage, allPages) => {
            const nextPage = lastpage.data.results.length ? allPages.length + 1 : undefined;
            return nextPage;
        },
        enabled: enabled
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
        return <div>Error: {error.message}</div>
    }
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {data?.pages.map((todos: any) =>
                todos.data.results.map((item: any, i: any) => {
                    return (
                        <Link key={i} href={`/${locale}/news/${item.id}`} className="w-full  mb-2 md:mb-8  flex flex-col cursor-pointer hover:shadow-2xl duration-300" data-aos="fade-up" data-aos-delay={(i + 1) * 100} data-aos-duration={(i + 1) * 100}>
                            <div className=" overflow-hidden h-40 md:h-80 w-full">
                                <Image
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="object-cover object-center w-full h-48 hover:scale-110 duration-300"
                                    style={{ width: '100%', height: '100%' }}
                                    src={item.main_image} alt="News"
                                />
                            </div>
                            <div className="flex flex-grow">
                                <div className="triangle"></div>
                                <div className="flex flex-col justify-between px-2 py-2 md:px-4 md:py-6 bg-white w-full">
                                    <div>
                                        <p
                                            className="inline-block mb-1 md:mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600">
                                            {item.published_at}
                                        </p>
                                        <p
                                            className="block mb-1 md:mb-4 text-xs md:text-xl font-black leading-tight ">
                                            {item.title}
                                        </p>
                                        <p className=" mb-1 md:mb-4 text-xs md:text-base">
                                            {item.authors}
                                        </p>
                                    </div>
                                    <div>
                                        <Link href={`/${locale}/news/${item.id}`}
                                            className="inline-block pb-1 mt-2 text-xs md:text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600">{h('button_more')}-{">"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            )}
            <button ref={ref} disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? "" : hasNextPage ? "Load more" : "Nothing more to load"}
            </button>
            {isFetchingNextPage && <Loading />}
        </div>
    )
};

const News = () => {
    const n = useTranslations('Navbar');
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-image-flower min-h-screen pt-14 md:pt-20 relative">
            {/* {show && ( */}
            {/* )} */}

            <div className="w-full lg:w-[85vw] mx-auto px-4 pb-10">
                <div>
                    <div className="flex items-center justify-center  ">
                        <Title title={n("5")} />
                    </div>
                    <div className="flex items-center gap-2 border w-full bg-white p-2 rounded-full mb-5 md:w-[50%] ">
                        <SearchIcon strokeWidth={1} size={20} />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder={s("search")} className="w-full inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                    </div>
                    <div className=" rounded-lg px-4 py-2 md:py-6">
                        {/* Scroll to top */}
                        {show && (
                            <div onClick={scrollToTop} className=" hover:scale-110 duration-300 cursor-pointer bg-blue-400 p-2 rounded-full fixed bottom-5 md:bottom-10 right-5 md:right-10 z-10">
                                <ChevronUpIcon className="w-8 h-8 text-white" />
                            </div>
                        )}
                        <NewsList search={search} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News;