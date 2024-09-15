"use client"
import Container from "@/components/Core/Container";
import Title from "@/components/Core/Title";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DevonList from "@/components/Devonlar/DevonList";
import GenreList from "@/components/Devonlar/GenreList";
import JanrlarFilter from "@/components/Devonlar/JanrlarFilter";
import GazalList from "@/components/Devonlar/GazalList";
import Gazal from "@/components/Devonlar/Gazal";
import { useTranslations } from "next-intl";

const Devonlar = () => {
    const n = useTranslations('Navbar');
    const h = useTranslations('Home');
    const d = useTranslations('Devonlar');
    const searchParams = useSearchParams();
    const search = searchParams.get('search') ?? "";
    const [genre_id, setGenreId] = useState({ id: "", name: "", counts: 0 });
    const [devan_id, setDevan_id] = useState({ id: "", name: "" });
    const [gazal_id, setGazal_id] = useState({ id: "", name: "" });

    const [current, setCurrent] = useState(1);
    const [genre_detail_number, setGenre_detail_number] = useState("");

    const [auditory_age__in, setAuditory_age__in] = useState("");
    const [text_type_id__in, setText_type_id__in] = useState("");

    // Filter Janrlar
    const [firstFilter, setFirstFilter] = useState({ id: 0, name: "" });
    const [firstFilterChild, setFirstFilterChild] = useState({ id: 0, name: "" });

    useEffect(() => {
        setGazal_id({ id: "", name: "" });
    }, [devan_id, genre_id, search, firstFilter, firstFilterChild, genre_detail_number, current, auditory_age__in, text_type_id__in]);


    const resetFilter = () => {
        setDevan_id({ id: "", name: "" });
        setGenreId({ id: "", name: "", counts: 0 });
        setFirstFilter({ id: 0, name: "" });
        setFirstFilterChild({ id: 0, name: "" });
        setAuditory_age__in("");
        setText_type_id__in("");
        setGenre_detail_number("");
        setGazal_id({ id: "", name: "" });
    }
    return (
        <div className="pb-5 bg-image-flower min-h-screen md:pt-20 pt-14">
            <Container>
                {/* Devonlar */}
                <div>
                    <div className="flex items-center justify-between">

                        <Title title={n("2")} />
                        {/* <button onClick={resetFilter} className="px-4 py-2 hover:px-6 duration-300 hover:shadow-xl border border-blue-500 bg-blue-100 text-blue-500 font-semibold text-base tracking-wide rounded-full">Reset Filter</button> */}
                    </div>
                    <DevonList
                        setDevan_id={setDevan_id}

                        search={search}
                        devan_id={devan_id}
                        genre_id={genre_id}
                        firstFilter={firstFilter}
                        firstFilterChild={firstFilterChild}
                        auditory_age__in={auditory_age__in}
                        text_type_id__in={text_type_id__in}
                        genre_detail_number={genre_detail_number}

                        h={h}
                    />
                </div>

                {/* Janrlar */}
                <div>
                    <Title title={d("genres")} />
                    <GenreList
                        setGenreId={setGenreId}
                        
                        search={search}
                        devan_id={devan_id}
                        genre_id={genre_id}
                        firstFilter={firstFilter}
                        firstFilterChild={firstFilterChild}
                        auditory_age__in={auditory_age__in}
                        text_type_id__in={text_type_id__in}
                        genre_detail_number={genre_detail_number}
                    />
                </div>

                {/* Filter */}
                <div className="py-1 md:py-5">
                    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-5 gap-3">

                        {/* Filter 1 */}
                        <JanrlarFilter
                            setFirstFilter={setFirstFilter}
                            setFirstFilterChild={setFirstFilterChild}
                            firstFilter={firstFilter}
                            firstFilterChild={firstFilterChild}

                            // Filter
                            search={search}
                            devan_id={devan_id}
                            genre_id={genre_id}
                            text_type_id__in={text_type_id__in}
                            auditory_age__in={auditory_age__in}
                            genre_detail_number={genre_detail_number}

                            d={d}
                        />

                        {/* Filter 2 */}
                        <div className=" md:col-span-4 grid grid-cols-1  lg:grid-cols-2  gap-4">
                            {/* Filter 2.2 */}
                            <GazalList
                                search={search}
                                devan_id={devan_id}
                                genre_id={genre_id}
                                gazal_id={gazal_id}
                                firstFilter={firstFilter}
                                firstFilterChild={firstFilterChild}
                                auditory_age__in={auditory_age__in}
                                text_type_id__in={text_type_id__in}
                                genre_detail_number={genre_detail_number}

                                // Filter
                                setGazal_id={setGazal_id}
                                setGenre_detail_number={setGenre_detail_number}
                                setCurrent={setCurrent}
                                setAuditory_age__in={setAuditory_age__in}
                                setText_type_id__in={setText_type_id__in}
                                current={current}
                                d={d}
                            />

                            {/* Deteil */}
                            <div className="hidden lg:block">
                                {gazal_id.id && <Gazal
                                    gazal_id={gazal_id}
                                    setGazal_id={setGazal_id}
                                    current={current}
                                    firstFilter={firstFilter}
                                    genre_detail_number={genre_detail_number}
                                    search={search}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Devonlar