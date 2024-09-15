import { devonsGetApi, genresGetOneAPI } from "@/api/AdminRequest";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import Modal from "@/components/Core/Modal";
import Loading from "../Core/Loading";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useTranslations } from "next-intl";

const Gazal = ({ gazal_id, setGazal_id, current, firstFilter, genre_detail_number, search }) => {
    const h = useTranslations("Home");
    const d = useTranslations("Devonlar");
    
    const { data: dataNextPrev } = useQuery({
        queryKey: ["gazal_next_prev", current, genre_detail_number],
        queryFn: async () => {
            return await devonsGetApi({ page: current, genre_detail_number });
        }
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["genres_id", gazal_id.id],
        queryFn: async () => {
            return await genresGetOneAPI({ id: gazal_id.id, search });
        }
    });
    if (isError) return <div>Xatolik yuz berdi...</div>;

    function filterString(input, allowedChars) {
        // Create a regex pattern to match any character not in the allowed characters
        let regexPattern = new RegExp(
            `[^a-zA-Z${allowedChars.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")}]`,
            "g"
        );

        // Replace all characters not in the allowed characters with an empty string
        return input.replace(regexPattern, "");
    }

    function getExplanation(searchWord, id) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = searchWord;
        const cleanedText = tempDiv.textContent || tempDiv.innerText || '';

        // So'zlarni birlashtirish
        searchWord = cleanedText.replace(/\s+/g, '');

        // Example usage
        let allowedChars = "’‘<>-"; // Characters you want to keep (in this case, just the apostrophe)
        // searchWord = filterString(searchWord, allowedChars);

        searchWord = searchWord.replace(/[.,"]/g, '');
        const result = data.data.word_explanations.find(entry => entry.word.toLowerCase() === searchWord.toLowerCase() && entry.genre_detail_line == id);
        return result ? result.explanation : 'Kiritilmagan';
    }

    function getNextPrev(number) {
        const result = dataNextPrev.data.main.results.find(entry => entry.number == number);
        setGazal_id(result);
    }

    return (
        <>
            {/* G'azallar */}
            {firstFilter.id == 0 && (
                <div className="h-fit bg-white rounded-2xl text-center py-2 " data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                    <div className="text-xl font-semibold py-1 pb-2">{data?.data?.genre_detail_number} - {data?.data?.genre_name}</div>
                    <div>
                        <ScrollArea className="h-[400px] md:h-[420px]">
                            {isLoading && <Loading />}
                            {!isLoading && (
                                <div className="text-sm  leading-7 space-y-1 overflow-auto">
                                    {data?.data?.lines.map((item: any, i: any) =>
                                        <div key={item.id}>
                                            {item.text.split(" ").map((item_in: any, i: any) => (
                                                <>
                                                    <span className="hidden md:inline-block">
                                                        <HoverCard >
                                                            <HoverCardTrigger>
                                                                <span
                                                                    style={{ whiteSpace: "pre-line" }}
                                                                    dangerouslySetInnerHTML={{ __html: item_in }}
                                                                    className="text-xs md:text-sm hover:bg-yellow-300 px-[1px] md:px-0.5  duration-300 py-1 rounded-full cursor-pointer" />
                                                            </HoverCardTrigger>
                                                            <HoverCardContent className="p-2 px-4">
                                                                <div>
                                                                    <p className="text-xs">Semantik izoh:</p>
                                                                    <span>{getExplanation(item_in, item.id)}</span>
                                                                </div>
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    </span>
                                                    <span className="inline-block md:hidden">
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <span
                                                                    style={{ whiteSpace: "pre-line" }}
                                                                    dangerouslySetInnerHTML={{ __html: item_in }}
                                                                    className="text-xs md:text-sm hover:bg-yellow-300 px-[1px] md:px-0.5  duration-300 py-1 rounded-full cursor-pointer" />
                                                            </PopoverTrigger>
                                                            <PopoverContent className="p-1 px-2">
                                                                <div>
                                                                    <p className="text-xs">Semantik izoh:</p>
                                                                    <span className="text-sm">{getExplanation(item_in, item.id)}</span>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </span>
                                                </>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>
                        <div className="flex justify-between items-center gap-2 p-4 w-full  md:w-[80%] mx-auto">
                            <div>
                                {/* {data?.data?.genre_detail_number - ((current - 1) * 10) != 1 && 1 != dataNextPrev?.data?.main?.count && genre_detail_number == "" && auditory_age__in == "" && text_type_id__in == "" && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.genre_detail_number > 1 ? data?.data?.genre_detail_number - 1 : 1)}>
                                        <MoveLeftIcon className="w-4 h-4" />
                                    </div>
                                )} */}
                            </div>
                            {!isLoading && (

                                <div className="flex items-center gap-2 ">
                                    <Modal title="Metama’lumot" button={
                                        <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{h("button_more")}</div>
                                    } >

                                        {Object.entries(data?.data?.metadata).map(([key, value]) => (
                                            <div key={key}>
                                                {/* Desktop */}
                                                <div className="hidden md:block">

                                                    <div className="grid grid-cols-2 gap-2 items-center border-b py-1 text-black">
                                                        <div className="text-start">{key}</div>
                                                        <div className="text-end">{value.toString()}</div>
                                                    </div>
                                                </div>
                                                {/* Mobile */}
                                                <div className="block md:hidden">
                                                    <div className=" text-start text-black mb-1 ">
                                                        <span className="text-gray-400">{key}:</span> {value.toString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Modal>

                                    <Modal title="Nasri bayoni" button={
                                        <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                    } >


                                        <ScrollArea className="h-[400px] md:h-[420px]">
                                            {data?.data?.explanation == "" && (
                                                <h1>Kiritilmagan</h1>
                                            )}
                                            <div
                                                style={{ whiteSpace: "pre-line" }}
                                                dangerouslySetInnerHTML={{ __html: data?.data?.explanation }}
                                                className="text-start" />
                                        </ScrollArea>
                                    </Modal>
                                </div>
                            )}
                            {isLoading && (
                                <div className="flex items-center gap-2 ">
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                </div>
                            )}
                            <div>
                                {/* {data?.data?.genre_detail_number < current * 10 && data?.data?.genre_detail_number != dataNextPrev?.data?.main?.count && genre_detail_number == "" && auditory_age__in == "" && text_type_id__in == "" && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.genre_detail_number + 1)}>
                                        <MoveRightIcon className="w-4 h-4" />
                                    </div>
                                )}
                                {isLoading && genre_detail_number != "" && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300">
                                        <MoveRightIcon className="w-4 h-4" />
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ibora and Maqol and She'riy San'at */}
            {firstFilter.id != 0 && (
                <div className="h-fit bg-white rounded-2xl text-center py-2 " data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                    <div className="text-xl font-semibold py-1 pb-2">{data?.data?.genre_detail_number} - {data?.data?.genre_name}</div>
                    <div>
                        <ScrollArea className="h-[400px] md:h-[420px]">
                            {isLoading && <Loading />}
                            {!isLoading && (
                                <div className="text-sm  leading-7 space-y-1 overflow-auto">
                                    {data?.data?.lines.map((item: any, i: any) =>
                                        <div key={item.id} className={`${i + 1 == gazal_id.byte * 2 || i + 1 == gazal_id.byte * 2 - 1 ? "bg-yellow-200 w-fit mx-auto rounded-full" : ""} `}>
                                            {item.text.split(" ").map((item_in: any, i: any) => (
                                                <>
                                                    <span className="hidden md:inline-block">
                                                        <HoverCard>
                                                            <HoverCardTrigger>
                                                                <span
                                                                    style={{ whiteSpace: "pre-line" }}
                                                                    dangerouslySetInnerHTML={{ __html: item_in }}
                                                                    className="text-xs md:text-sm hover:bg-yellow-300 px-[1px] md:px-0.5  duration-300 py-1 rounded-full cursor-pointer" />
                                                            </HoverCardTrigger>
                                                            <HoverCardContent className="p-2 px-4">
                                                                <div>
                                                                    <p className="text-xs">Semantik izoh:</p>
                                                                    <span>{getExplanation(item_in, item.id)}</span>
                                                                </div>
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    </span>
                                                    <span className="inline-block md:hidden">
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <span
                                                                    style={{ whiteSpace: "pre-line" }}
                                                                    dangerouslySetInnerHTML={{ __html: item_in }}
                                                                    className="text-xs md:text-sm hover:bg-yellow-300 px-[1px] md:px-0.5 duration-300 py-1 rounded-full cursor-pointer" />
                                                            </PopoverTrigger>
                                                            <PopoverContent className="p-1 px-2">
                                                                <div>
                                                                    <p className="text-xs">Semantik izoh:</p>
                                                                    <span className="text-sm">{getExplanation(item_in, item.id)}</span>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </span>
                                                </>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>
                        <div className="flex justify-between items-center gap-2 p-4 w-full  md:w-[80%] mx-auto">
                            <div>
                                {/* {data?.data?.genre_detail_number - ((current - 1) * 10) != 1 && 1 != dataNextPrev?.data?.main?.count && genre_detail_number == "" && auditory_age__in == "" && text_type_id__in == "" && firstFilter.id != 0 && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.genre_detail_number > 1 ? data?.data?.genre_detail_number - 1 : 1)}>
                                        <MoveLeftIcon className="w-4 h-4" />
                                    </div>
                                )} */}
                            </div>
                            {!isLoading && (

                                <div className="flex items-center gap-2 ">
                                    <Modal title="Metama’lumot" button={
                                        <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                    } >

                                        {Object.entries(data?.data?.metadata).map(([key, value]) => (
                                            <div key={key}>
                                                {/* Desktop */}
                                                <div className="hidden md:block">

                                                    <div className="grid grid-cols-2 gap-2 items-center border-b py-1 text-black">
                                                        <div className="text-start">{key}</div>
                                                        <div className="text-end">{value.toString()}</div>
                                                    </div>
                                                </div>
                                                {/* Mobile */}
                                                <div className="block md:hidden">
                                                    <div className=" text-start text-black mb-1 ">
                                                        <span className="text-gray-400">{key}:</span> {value.toString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Modal>
                                    <Modal title="Nasri bayoni" button={
                                        <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                    } >

                                        <ScrollArea className="h-[400px] md:h-[420px]">
                                            {data?.data?.explanation == "" && (
                                                <h1>Kiritilmagan</h1>
                                            )}
                                            <div
                                                style={{ whiteSpace: "pre-line" }}
                                                dangerouslySetInnerHTML={{ __html: data?.data?.explanation }}
                                                className="text-start" />
                                        </ScrollArea>

                                    </Modal>
                                </div>
                            )}
                            {isLoading && (
                                <div className="flex items-center gap-2 ">
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                </div>
                            )}
                            <div>
                                {/* {data?.data?.genre_detail_number < current * 10 && data?.data?.genre_detail_number != dataNextPrev?.data?.main?.count && genre_detail_number == "" && auditory_age__in == "" && text_type_id__in == "" && firstFilter.id != 0 && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.genre_detail_number + 1)}>
                                        <MoveRightIcon className="w-4 h-4" />
                                    </div>
                                )}
                                {isLoading && genre_detail_number != "" && firstFilter.id != 0 && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300">
                                        <MoveRightIcon className="w-4 h-4" />
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Gazal;