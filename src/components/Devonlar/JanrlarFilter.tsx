import { devonsGetApi } from "@/api/AdminRequest";
import Title from "@/components/Core/Title";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, CircleIcon, ScrollTextIcon } from "lucide-react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";

const JanrlarFilter = ({ search, devan_id, genre_id, firstFilter, setFirstFilter, firstFilterChild, setFirstFilterChild, text_type_id__in, auditory_age__in, d, genre_detail_number }) => {
    const [secondsData, setSecondsData] = useState([]);
    const [poetic_artsData, setPoeticArtsData] = useState([]);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["janrlar_filter", search, devan_id.id, genre_id.id, text_type_id__in, auditory_age__in, genre_detail_number],
        queryFn: async () => {
            return await devonsGetApi({
                search: search == null ? "" : search,
                devan_id: devan_id.id,
                genre_id: genre_id.id,
                text_type_id__in,
                auditory_age__in,
                genre_detail_number
            });
        }
    });

    // if (isLoading) return <h1>Loading...</h1>;
    useEffect(() => {
        if (data && data.data && data.data.seconds) {
            setSecondsData(data.data.seconds);
            setPoeticArtsData(data.data.poetic_arts);
        }
    }, [data]);

    useEffect(() => {
        setFirstFilterChild({ id: 0, name: "" })
    }, [firstFilter]);

    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {/* Desktop */}
            <div className="bg-white h-fit rounded-2xl text-center py-2 px-4 hidden lg:block" >
                <div className="text-xl py-1 pb-2 font-semibold">{d("content_of_devans")}</div>
                <div className=" space-y-2">
                    {genre_id.name == "" ? (
                        null
                    ) : (
                        <div className={`flex justify-between items-center ${firstFilter.id != 0 ? "" : "bg-blue-100"} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter({ id: 0, name: "" })}>
                            <div className="flex gap-2 items-center">
                                <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                <div className="text-base capitalize">{genre_id?.name}</div>
                            </div>
                            <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{genre_id?.counts}</span>
                        </div>
                    )}
                    {secondsData.map((item: any, i: any) => (
                        <div key={i}>
                            <div className={`flex justify-between items-center ${firstFilter.id == item.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter(item)}>
                                <div className="flex gap-2 items-center">
                                    <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                    <div className="text-sm">{item.name}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {i == 4 && (
                                        <>
                                            {firstFilter.id == 5 ? (
                                                <ChevronUpIcon strokeWidth={1} className="w-5 h-5" />
                                            ) : (
                                                <ChevronDownIcon strokeWidth={1} className="w-5 h-5" />
                                            )}
                                        </>
                                    )}
                                    <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">
                                        {item.counts}
                                    </span>
                                </div>
                            </div>
                            {4 == i && firstFilter.id == 5 && poetic_artsData.map((itemchild: any, i: any) => (

                                <div key={i} className={`w-[95%] my-1.5 ml-auto flex justify-between items-center ${firstFilterChild.id == itemchild.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilterChild(itemchild)}>
                                    <div className="flex gap-2 items-center">
                                        {firstFilterChild.id == itemchild.id ? (
                                            <CheckCircleTwoTone />
                                        ) : (
                                            <CircleIcon strokeWidth={2} className="w-4 h-4 text-blue-500" />
                                        )}
                                        <div className="text-sm">{itemchild.name}</div>
                                    </div>
                                    <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{itemchild.counts}</span>
                                </div>
                            ))}

                        </div>
                    ))}


                </div>

            </div>

            {/* Mobile */}
            <div className=" rounded-2xl text-start block lg:hidden" >
                <Title title={d("content_of_devans")} />
                <ScrollArea className="py-2 whitespace-nowrap ">
                    <div className=" flex gap-2 items-center">
                        {genre_id.name == "" ? (
                            null
                        ) : (
                            <div className={`flex justify-between gap-2 items-center ${firstFilter.id != 0 ? "" : "bg-blue-100"} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter({ id: 0, name: "" })}>
                                <div className="flex gap-2 items-center">
                                    <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                    <div className="text-base">{genre_id?.name}</div>
                                </div>
                                <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{genre_id?.counts}</span>
                            </div>
                        )}
                        {secondsData.map((item: any, i: any) => (
                            <div key={i} className={`flex items-center gap-2 ${i == 4 && firstFilter.id == 5 ? "bg-blue-100 rounded-full" : ""} `}>
                                <div className={`flex justify-between items-center gap-2 ${firstFilter.id == item.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter(item)}>
                                    <div className="flex gap-2 items-center">
                                        <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                        <div className="text-sm">{item.name}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {i == 4 && (
                                            <>
                                                {firstFilter.id == 5 && <ChevronRightIcon strokeWidth={1} className="w-5 h-5 pl-2" />}
                                            </>
                                        )}
                                        <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">
                                            {item.counts}
                                        </span>
                                    </div>
                                </div>
                                {4 == i && firstFilter.id == 5 && poetic_artsData.map((itemchild: any, i: any) => (

                                    <div key={i} className={`w-[80%] space-x-2  ml-auto flex justify-between items-center ${firstFilterChild.id == itemchild.id ? "bg-blue-200" : ""} hover:bg-blue-200 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilterChild(itemchild)}>
                                        <div className="flex gap-2 items-center">
                                            {firstFilterChild.id == itemchild.id ? (
                                                <CheckCircleTwoTone />
                                            ) : (
                                                <CircleIcon strokeWidth={2} className="w-4 h-4 text-blue-500" />
                                            )}
                                            <div className="text-sm">{itemchild.name}</div>
                                        </div>
                                        <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{itemchild.counts}</span>
                                    </div>
                                ))}

                            </div>
                        ))}

                        {isLoading && Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="flex h-6 w-20 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                                </div>
                                {i == 3 && Array.from({ length: 4 }).map((item: any, i: any) => (
                                    <div key={i} className="flex h-6 w-16 ml-auto  justify-between items-center my-1.5 bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

            </div>
        </>
    )
}
export default JanrlarFilter;