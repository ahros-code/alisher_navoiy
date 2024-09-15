"use client"
import { useEffect, useState } from "react";
import { devonsGetApi } from "@/api/AdminRequest";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { CalendarFoldIcon, UsersIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const DevonList = ({ devan_id, setDevan_id, genre_id, search, h, firstFilter, firstFilterChild, auditory_age__in, text_type_id__in, genre_detail_number }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [dataDevons, setDataDevons] = useState([]);

    const { data } = useQuery({
        queryKey: ["devans_list", search, genre_id, firstFilter.id, firstFilterChild.id, auditory_age__in, text_type_id__in, genre_detail_number],
        queryFn: async () => {
            return await devonsGetApi({
                genre_id: genre_id.id,
                search,
                genre_detail_number,
                second: firstFilter.id == 0 ? "" : firstFilter.id,
                auditory_age__in, text_type_id__in,
                poetic_art_id: firstFilterChild.id == 0 ? "" : firstFilterChild.id,
            });
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.devans) {
            setDataDevons(data.data.devans);
        }
    }, [data])

    useEffect(() => {
        if (!isInitialized && data && data.data && data.data.devans) {
            // setGenreId(data.data.genres[0]);
            setDataDevons(data.data.devans);
            setIsInitialized(true);
        }
        return () => { }; // cleanup funksiyasi
    }, [isInitialized, data]);

    return (
        <>
            {!isInitialized && (
                <Carousel
                    className="w-full">
                    <CarouselContent>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <CarouselItem key={i} className="px-2 md:p-3 basis-[48%] md:basis-1/3 lg:basis-[22.5%] 2xl:basis-[21%]">
                                <div className="h-60 md:h-80  bg-gray-200 rounded-3xl"></div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className=" hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            )}
            <div className="block md:hidden">
                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                    <div className="flex w-max gap-2 md:gap-4 space-x-2 p-2 md:p-4 ">
                        {dataDevons.map((item: any, index: any) => (
                            <div key={index} className=" w-40 md:w-64" onClick={() => setDevan_id(item)} data-aos="fade-up" data-aos-delay={(index + 1) * 100} data-aos-duration={(index + 1) * 100}>
                                <div className="py-2">
                                    <div className=" cursor-pointer hover:scale-105 duration-300">
                                        <div className={`${item.id == devan_id.id ? " bg-blue-100 shadow-lg border shadow-gray-500 " : "bg-white"} rounded-2xl overflow-hidden`}>
                                            {/* <Link href={item.image} target="_blank"> */}
                                            <div className="w-full h-28 md:h-40 bg-gray-200 relative">
                                                <Image
                                                    src={item.image}
                                                    width={0}
                                                    height={0}
                                                    // className="transition hover:scale-110 duration-300 shadow-xl"
                                                    sizes="100vw"
                                                    style={{ width: '100%', height: '100%' }} // optional
                                                    alt="Image"
                                                />
                                                <div className=" block md:hidden absolute bottom-1 right-2 text-[10px] w-max  text-green-600 px-1 py-0.5 rounded-full bg-green-100">
                                                    {item.counts}
                                                </div>
                                            </div>
                                            {/* </Link> */}
                                            <div className="p-1.5 md:p-3">
                                                <div className="flex flex-between items-center relative">

                                                    <div className="w-full md:w-[85%]  text-sm md:text-base font-semibold text-gray-700">{item.name}</div>
                                                    <div className=" hidden md:block absolute right-0 top-0 text-[10px] w-max  text-green-600 px-2 py-1 rounded-full bg-green-100">
                                                        {item.counts}
                                                    </div>
                                                </div>
                                                <div className="h-20 md:h-28 text-gray-500 flex flex-col">
                                                    <div className="flex-grow text-[10px] md:text-sm  text-wrap">
                                                        {item.desc.length > 100 ? item.desc.substring(0, 100) + "..." : item.desc}
                                                    </div>

                                                    <span className="flex items-center text-xs md:text-sm">
                                                        <CalendarFoldIcon className="md:w-4 md:h-4 w-3 h-3 text-gray-400 mr-1" />
                                                        {item.to_year ? item.from_year + "-" + item.to_year + "-" + h("years") : item.from_year + "-" + h("year")}
                                                    </span>
                                                    <span className="flex items-center mb-1 text-xs md:text-sm">
                                                        <UsersIcon className="md:w-4 md:h-4 w-3 h-3 text-gray-400 mr-1" />
                                                        {item.to_age ? item.from_age + "-" + item.to_age + "-" + h("ages") : item.from_age + "-" + h("age")}
                                                    </span>

                                                </div>
                                                <Link href={item.pdf_file} target="_blank">
                                                    <button className={`${item.id == devan_id.id ? "bg-white" : "bg-blue-100"}  w-full rounded-lg text-xs md:text-sm py-0.5  md:py-1`}>{h("button_more")}</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="hidden md:block">
                <Carousel

                    className={`w-full md:w-[95%] mx-auto `}>
                    <CarouselContent>
                        {dataDevons.map((item: any, index: any) => (
                            <CarouselItem key={index} className="px-2  md:p-3 basis-[48%] md:basis-1/3 lg:basis-[24%] 2xl:basis-[21%]" onClick={() => setDevan_id(item)} data-aos="fade-up" data-aos-delay={(index + 1) * 100} data-aos-duration={(index + 1) * 100}>
                                <div className="py-2">
                                    <div className=" cursor-pointer hover:scale-105 duration-300">
                                        <div className={`${item.id == devan_id.id ? " bg-blue-100 shadow-lg border shadow-gray-500 " : "bg-white"} rounded-2xl overflow-hidden`}>
                                            {/* <Link href={item.image} target="_blank"> */}
                                            <div className="w-full h-28 md:h-40 bg-gray-200 relative">
                                                <Image
                                                    src={item.image}
                                                    width={0}
                                                    height={0}
                                                    // className="transition hover:scale-110 duration-300 shadow-xl"
                                                    sizes="100vw"
                                                    style={{ width: '100%', height: '100%' }} // optional
                                                    alt="Image"
                                                />
                                                <div className=" block md:hidden absolute bottom-1 right-2 text-[10px] w-max  text-green-600 px-1 py-0.5 rounded-full bg-green-100">
                                                    {item.counts}
                                                </div>
                                            </div>
                                            {/* </Link> */}
                                            <div className="p-1.5 md:p-3">
                                                <div className="flex flex-between items-center relative">

                                                    <div className="w-full md:w-[85%]  text-sm md:text-base font-semibold text-gray-700">{item.name}</div>
                                                    <div className=" hidden md:block absolute right-0 top-0 text-[10px] w-max  text-green-600 px-2 py-1 rounded-full bg-green-100">
                                                        {item.counts}
                                                    </div>
                                                </div>
                                                <div className="h-20 md:h-28 text-gray-500 flex flex-col">
                                                    <div className="flex-grow text-[10px] md:text-sm">
                                                        {item.desc.length > 100 ? item.desc.substring(0, 100) + "..." : item.desc}
                                                    </div>

                                                    <span className="flex items-center text-xs md:text-sm">
                                                        <CalendarFoldIcon className="md:w-4 md:h-4 w-3 h-3 text-gray-400 mr-1" />
                                                        {item.to_year ? item.from_year + "-" + item.to_year + "-" + h("years") : item.from_year + "-" + h("year")}
                                                    </span>
                                                    <span className="flex items-center mb-1 text-xs md:text-sm">
                                                        <UsersIcon className="md:w-4 md:h-4 w-3 h-3 text-gray-400 mr-1" />
                                                        {item.to_age ? item.from_age + "-" + item.to_age + "-" + h("ages") : item.from_age + "-" + h("age")}
                                                    </span>

                                                </div>
                                                <Link href={item.pdf_file} target="_blank">
                                                    <button className={`${item.id == devan_id.id ? "bg-white" : "bg-blue-100"}  w-full rounded-lg text-xs md:text-sm py-0.5  md:py-1`}>{h("button_more")}</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className=" hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>

        </>
    )
}

export default DevonList;