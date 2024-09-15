import { devonsGetApi } from "@/api/AdminRequest";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const GenreList = ({ search, devan_id, genre_id, setGenreId, firstFilter, firstFilterChild, auditory_age__in, text_type_id__in, genre_detail_number }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [dataGenres, setDataGenres] = useState([]);

    const { data } = useQuery({
        queryKey: ["genre_list", search, devan_id.id, firstFilter.id, firstFilterChild.id, auditory_age__in, text_type_id__in, genre_detail_number],
        queryFn: async () => {
            return await devonsGetApi({
                search,
                devan_id: devan_id.id,
                second: firstFilter.id == 0 ? "" : firstFilter.id,
                poetic_art_id: firstFilterChild.id == 0 ? "" : firstFilterChild.id,
                auditory_age__in: auditory_age__in ? auditory_age__in : "",
                text_type_id__in: text_type_id__in ? text_type_id__in : "",
                genre_detail_number
            });
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.genres) {
            setDataGenres(data.data.genres);
            if (genre_id.name != "") {

                let genre = data.data.genres.find(genre => genre.id == genre_id.id);
                setGenreId(genre);
            }

        }
    }, [data])

    useEffect(() => {
        if (!isInitialized && data && data.data && data.data.genres) {
            setGenreId(data.data.genres[0]);
            setDataGenres(data.data.genres);
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
                            <CarouselItem key={i} className="px-2 basis-[30%] lg:basis-[11%] md:basis-[20%] 2xl:basis-[10%] ">
                                <div className="h-[50px] md:h-[60px]  bg-gray-200 rounded-2xl"></div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex w-max gap-1 md:gap-2 space-x-4 p-2 md:p-4">
                    {dataGenres.map((item: any, index: any) => (
                        <div key={index} className=" w-28 md:w-40" onClick={() => setGenreId(item)} data-aos="fade-left" data-aos-delay={(index + 1) * 100} data-aos-duration={(index + 1) * 100}>
                            <div className="py-2">
                                <div className=" cursor-pointer hover:scale-105 duration-300">
                                    <div className="relative">
                                        <div className="h-16 lg:h-20" >
                                            <Image
                                                src={`${item.id == genre_id?.id ? "/item-active.png" : "/item-disactive.png"}`}
                                                width={50}
                                                height={50}
                                                className={`${item.id == genre_id?.id && "scale-105"}`}
                                                sizes="100vw"
                                                style={{ width: '100%', height: '100%' }} // optional
                                                alt="Image"
                                            />
                                        </div>
                                        <div className="absolute top-2.5 lg:top-2.5 right-0 left-0 text-center">
                                            <div className="text-sm 2xl:text-lg xl:text-base lg:text-sm md:text-base font-medium text-gray-700  text-center capitalize">{item.name}</div>
                                            <div className="text-[8px] md:text-xs text-green-600 px-1 py-0.5 md:px-2 md:py-1 rounded-full bg-green-100 inline-block">{item.counts}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </>
    )
}

export default GenreList;