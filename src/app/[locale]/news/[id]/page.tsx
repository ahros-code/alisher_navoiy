"use client"
import { newsGetOneAPI } from "@/api/AdminRequest";
import ImagesCarusel from "@/components/Core/ImagesCarusel";
import { useQuery } from "@tanstack/react-query";
import { ClockIcon, MoveLeftIcon, UserIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const New = () => {
    const locale = useLocale();
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["news_id", id],
        queryFn: async () => {
            return await newsGetOneAPI({ id });
        }
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>{error?.message}</div>;
    return (
        <div className="bg-image-flower min-h-screen py-5 pt-14 md:pt-20">
            <div className="mx-auto xl:w-[65vw] lg:w-[85vw] md:w-[95vw]  max-w-full px-4 sm:px-6 lg:px-8">
                <div className=" bg-white rounded overflow-hidden flex flex-col mx-auto">
                    <div className="flex items-center justify-start p-5  ">
                        <Link href={`/${locale}/news`} className=" hover:scale-105 duration-300 cursor-pointer text-gray-500 text-base">
                            <MoveLeftIcon className="w-6 h-6" />
                        </Link>

                    </div>

                    <div className="">
                        <ImagesCarusel images={[data?.data?.main_image, ...data?.data?.images]} />
                    </div>
                    <h2 className=" text-lg md:text-xl font-semibold text-center flex-grow">{data?.data?.title}</h2>
                    <div
                        className=" px-2 md:px-5 text-gray-700 py-5 text-base md:text-lg leading-8 text-justify"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{ __html: data?.data?.content }}></div>

                    <div className="px-2 py-2 md:px-5 font-regular gap-2 text-gray-900 flex flex-wrap">
                        <span className="mr-3 flex flex-row items-center">
                            <ClockIcon strokeWidth={1} size={18} className=" mx-auto text-indigo-600" />
                            <span className=" text-xs md:text-sm ml-1">{data?.data?.published_at}</span>
                        </span>
                        <div className="flex flex-wrap justify-between items-center hover:text-indigo-600">
                            <UserIcon strokeWidth={1} size={18} className=" text-indigo-600" />
                            {
                                data?.data?.authors.split(" ").map((item: any, i: any) => (
                                    <span key={i} className="ml-1 text-xs md:text-sm">{item}</span>
                                ))
                            }
                        </div>
                    </div>
                    <hr />

                </div>
            </div>

        </div>
    )
}

export default New;