"use client"
import { questionGetOneAPI } from "@/api/AdminRequest";
import Title from "@/components/Core/Title";
import { useQuery } from "@tanstack/react-query";
import { MoveLeftIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

const About = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const locale = useLocale();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["question_id", id],
        queryFn: async () => {
            return await questionGetOneAPI({ id });
        }
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>{error?.message}</div>;

    return (
        <div className="bg-image-flower min-h-screen py-10 md:pt-20 pt-14 ">
            <div className="w-full md:w-[80vw] lg:w-[55vw] mx-auto bg-white px-6 pb-6 pt-6 md:pt-0 text-center rounded-xl shadow">
                <div className="flex items-start justify-center py-5 ">
                    <Link href={`/${locale}/about`} className=" hover:scale-105 duration-300 cursor-pointer pr-2 text-gray-500 text-base">
                        <MoveLeftIcon className="w-6 h-6" />
                    </Link>

                    <h2 className="text-xl font-semibold text-center flex-grow">{data?.data?.question + " ?"}</h2>
                </div>
                <div className="">
                    <div

                        className="text-sm md:text-base text-justify text-gray-500"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{ __html: data?.data?.answer }}
                    />

                </div>
            </div>
        </div>
    )
}

export default About;