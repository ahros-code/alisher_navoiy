"use client"
import { questionsGetApi, workersGetApi } from "@/api/AdminRequest";
import Container from "@/components/Core/Container";
import Title from "@/components/Core/Title";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRightIcon, UserIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import React from "react";

import AutoScroll from "embla-carousel-auto-scroll"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

import Image from "next/image";


const Workers = () => {
    const e = useTranslations();
    const plugin2 = React.useRef(
        AutoScroll({ loop: true, speed: 1000, autoScroll: true }),
        // Autoplay({ delay: 2000, stopOnInteraction: true, speed: 1, })
    )

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["workers"],
        queryFn: async () => {
            return await workersGetApi();
        }
    });

    // if (isLoading) return <Loading />;
    if (isError) return <div>{error?.message}</div>;

    return (
        <div>
            {data?.data?.length != 0 && (
                <>
                    <div className="flex items-center justify-center">
                        <Title title={e('employee')} />
                    </div>
                    <Container>
                        <Carousel
                            plugins={[plugin2.current]}
                            onMouseEnter={plugin2.current.stop}
                            onMouseLeave={plugin2.current.play}
                            className="w-full">
                            <CarouselContent>
                                {data?.data?.map((item: any, index: any) => (
                                    <CarouselItem key={index} className="pr-5 basis-full lg:basis-2/6 cursor-pointer">
                                        <div
                                            className="bg-gray-100 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                                            <div className="grid grid-cols-6  gap-4 items-center">
                                                <div className=" flex items-center justify-center mx-auto col-span-2 h-16 w-16 md:h-24 md:w-24">

                                                    {item.photo == null ? (
                                                        <UserIcon
                                                            strokeWidth={1}
                                                            className="border w-full h-full object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                                        />
                                                    ) : (

                                                        <Image
                                                            src={item.photo}
                                                            className=" rounded-full   transition-all duration-500 delay-500 transform"
                                                            width={0}
                                                            height={0}
                                                            sizes="100vw"
                                                            style={{ width: '100%', height: '100%' }} // optional
                                                            alt="Image"
                                                        />
                                                    )}
                                                </div>

                                                <div className=" col-span-4 w-fit transition-all transform duration-500">
                                                    <h1 className="text-gray-600 font-bold text-sm md:text-base">
                                                        {item.fullname}
                                                    </h1>
                                                    <p
                                                        className="  text-sm md:text-base text-gray-500 transform transition-all delay-300 duration-500">
                                                        {item.role && <span className="text-maincolor inline-block"> <span className="text-gray-700">{item.role.length > 100 ? item.role.substring(0, 100) + "..." : item.role}</span></span>}
                                                    </p>

                                                    {item.phone_number && <span className="text-maincolor inline-block"> <span className="text-maincolor">{item.phone_number}</span></span>}
                                                </div>
                                            </div>
                                            

                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                        </Carousel>
                    </Container>
                </>
            )}
        </div>
    )
}


const AboutPage = () => {
    const locale = useLocale();
    const { data, isError, error } = useQuery({
        queryKey: ["about"],
        queryFn: async () => {
            return await questionsGetApi({ page: 1, page_size: 100 });
        }
    });

    // if (isLoading) return <Loading />;
    if (isError) return <div>{error?.message}</div>;

    return (
        <>
            {data?.data?.results.length != 0 && (
                <>
                    {data?.data?.results.map((item: any, i: number) => (
                        <Link key={i} href={`/${locale}/about/${item.id}`} className="hover:scale-105 duration-300">
                            <div className="p-5 bg-blue-100 rounded-3xl shadow-lg">

                                <div className="flex justify-between items-center pb-1.5">
                                    <div className="text-lg font-semibold">{item.question.length > 50 ? item.question.substring(0, 50) + "..." : item.question}</div>
                                    <div className="text-base rounded-full p-1 text-center bg-white">
                                        <ArrowUpRightIcon strokeWidth={1} className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="text-sm font-normal text-gray-500 ">
                                    {item.short_answer.length > 100 ? item.short_answer.substring(0, 100) + "..." : item.short_answer}
                                </div>
                            </div>
                        </Link>
                    ))}
                </>
            )}
        </>
    )
}


const About = () => {
    const n = useTranslations("Navbar");
    return (
        <div className="pb-5 min-h-screen bg-image-flower md:pt-20 pt-14">
            <Container>
                <div>
                    <Workers />
                </div>
                <div className="flex items-center justify-center">
                    <Title title={n('6')} />
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AboutPage />
                </div>
            </Container>
        </div>
    )
}

export default About;