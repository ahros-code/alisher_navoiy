'use client';
import Image from "next/image";
import Container from "./Core/Container";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { provebsGetApi } from "@/api/AdminRequest";

import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";

const Hero = ({ h }) => {
    const locale = useLocale();
    const pluginDesktop = useRef(
        Autoplay({ delay: 10000, stopOnInteraction: true })
    );

    const pluginMobile = useRef(
        Autoplay({ delay: 10000, stopOnInteraction: true })
    );

    const { data, isError, error } = useQuery({
        queryKey: ["proverbs", locale],
        queryFn: async () => {
            return await provebsGetApi({ language: locale });
        }
    });

    if (isError) return <div>{error?.message}</div>;
    return (
        <div>
            {/* Desktop */}
            <div className=" hidden md:block relative h-screen overflow-hidden">
                <Image
                    src={"/gif.gif"}
                    width={0}
                    height={0}
                    // className="object-contain"
                    sizes="100vw" style={{ width: '100vw', height: '100%' }}
                    alt="Image"
                />
                <div className=" absolute top-0 left-0 bottom-0 right-0">
                    <Container>
                        <div className=" flex justify-center items-center">
                            <div className="flex flex-col justify-between h-full w-full  items-center pt-20 absolute bottom-0 ">
                                <div className="font-bold text-white font-serif md:pt-20 space-y-4 " style={{ textShadow: '5px 5px 15px #000' }}>
                                    <h1 className="md:text-9xl  text-4xl hero_title shadow-black " >
                                        <span className=" relative">
                                            {h("alisher").substring(0, 1)}
                                            {/* <span className=" absolute right-3.5 top-[60px] ">
                                                <DotIcon className="star" size={8} />
                                            </span>
                                            <span className=" absolute right-4 top-[110px] ">
                                                <DotIcon className="star" size={10} />
                                            </span>
                                            <span className=" absolute left-0 top-[110px] ">
                                                <DotIcon className="star" size={12} />
                                            </span>
                                            <span className=" absolute left-11  bottom-[50px] p-0 m-0">
                                                <DotIcon className="star p-0 m-0" size={10} />
                                            </span> */}
                                        </span>

                                        {h("alisher").substring(1)}
                                    </h1>
                                    <p className="hero_title text-center md:text-3xl  text-base font-semibold " >{h("hero_desc")}</p>
                                </div>
                                <div className=" w-[80%] mx-auto absolute top-0 bottom-0 left-0 right-0">

                                    <div className="hidden w-[45%]  md:block absolute  bottom-0 -left-10 ">
                                        <Image
                                            src={"/improve.png"}
                                            width={0}
                                            height={0}
                                            sizes="100vw" style={{ width: '100%', height: 'auto' }}
                                            alt="Image"
                                        />
                                    </div>
                                    <div className="hidden md:flex justify-center absolute items-center right-0 bottom-0 ">
                                        <Image
                                            src={"/maqol.png"}
                                            width={0}
                                            height={0}
                                            sizes="100vw" style={{ width: '100%', height: 'auto' }}
                                            alt="Image"
                                        />
                                        <div className="absolute bottom-0 left-0 top-0 right-0 z-10 text-2xl flex items-center justify-center text-black text-center">
                                            <Carousel
                                                plugins={[pluginDesktop.current]}
                                                onMouseEnter={pluginDesktop.current.stop}
                                                onMouseLeave={pluginDesktop.current.play}

                                                className="w-[60%] h-20 flex justify-center items-center ">
                                                <CarouselContent>
                                                    {data?.data?.map((item: any, index: any) => (
                                                        <CarouselItem key={index} className="basis-full  cursor-pointer my-auto">
                                                            <div
                                                                className=" whitespace-pre-line text-sm md:text-lg hero_title leading-none font-normal tracking-wide"
                                                                style={{ whiteSpace: "pre-line" }}
                                                                dangerouslySetInnerHTML={{ __html: item.text }} />
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>

                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Container>
                </div>
            </div>

            {/* Mobile */}
            <div className=" block md:hidden relative mt-8">
                <Image
                    src={"/gif.gif"}
                    width={0}
                    height={0}
                    sizes="100vw" style={{ width: '100%', height: 'auto' }}
                    alt="Image"
                />
                <div className=" absolute top-0 left-0 bottom-0 right-0">
                    <Container>
                        <div className=" flex justify-center items-center">
                            <div className="flex flex-col justify-between h-full  items-center pt-10 absolute bottom-0 right-0  left-0 top-0">
                                <div className="font-bold text-white font-serif md:pt-20" style={{ textShadow: '1px 1px 5px #000' }}>
                                    <h1 className="md:text-9xl text-4xl hero_title drop-shadow-xl" >
                                        <span className=" relative">
                                            {h("alisher").substring(0, 1)}
                                            {/* <span className=" absolute right-1 top-[30px] ">
                                                <DotIcon className="star" size={5} />
                                            </span> */}
                                        </span>
                                        {h("alisher").substring(1)}
                                    </h1>
                                    <p className=" text-center md:text-xl text-base font-semibold hero_title" >{h("hero_desc")}</p>
                                </div>
                                <div className=" w-full absolute top-0 bottom-0 left-0 right-0">
                                    <div className=" w-[45%]  absolute  bottom-0 left-0 ">
                                        <Image
                                            src={"/improve.png"}
                                            width={0}
                                            height={0}
                                            sizes="100vw" style={{ width: '100%', height: 'auto' }}
                                            alt="Image"
                                        />
                                    </div>
                                    <div className=" w-[50%] h-40 justify-center absolute items-center right-0  bottom-0 mx-auto ">
                                        <Image
                                            src={"/maqol.png"}
                                            width={0}
                                            height={0}
                                            sizes="100vw" style={{ width: '100%', height: '100%' }}
                                            alt="Image"
                                        />
                                        <div className="absolute bottom-0 left-0 top-0 right-0 z-10 text-2xl flex items-center justify-center text-black text-center">
                                            <Carousel
                                                plugins={[pluginMobile.current]}
                                                onMouseEnter={pluginMobile.current.stop}
                                                onMouseLeave={pluginMobile.current.play}
                                                className="w-[60%] flex justify-center items-center ">
                                                <CarouselContent>
                                                    {data?.data?.map((item: any, index: any) => (
                                                        <CarouselItem key={index} className="basis-full  cursor-pointer my-auto ">
                                                            <div
                                                                className=" whitespace-pre-line text-[7px] tracking-[0px] md:text-lg hero_title leading-[10px]"
                                                                style={{ whiteSpace: "pre-line" }}
                                                                dangerouslySetInnerHTML={{ __html: item.text }} />
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Hero;