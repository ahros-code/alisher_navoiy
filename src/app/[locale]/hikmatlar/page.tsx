"use client";
import Container from "@/components/Core/Container";
import Title from "@/components/Core/Title";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const back_url = process.env.NEXT_PUBLIC_BACKEND_API;

const Hikmatlar = () => {
  const u = useTranslations("Hikmatlar");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `${back_url}/quotes?page=${page}&page_size=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.results.length === 0) {
        setHasMore(false);
      }

      setData((prevData) => [...prevData, ...result.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className={"bg-image-flower min-h-screen pt-[80px"}>
      <Container>
        <div className="w-[85wv] pt-[100px] pb-[80px]">
          <div className="hidden md:block">
            <Title title={u("hikmat_word")} />
          </div>
          <div className={"w-full bg-white rounded-lg py-[24px] px-[16px]"}>
            {data.map((item, index) => (
              <div key={index}>
                <p className={"w-full bg-[#F3F4F6] p-[10px] rounded-[1px]"}>
                  {item.name}
                </p>
                <ul>
                  <li className={"px-[10px] py-[15px] space-y-[10px]"}>
                    {item.quotes?.map((quote, idx) => (
                      <div key={idx}>
                        <div className={"flex gap-x-[8px]"}>
                          <div>{idx + 1}.</div>
                          <div
                            dangerouslySetInnerHTML={{ __html: quote.content }}
                          />
                        </div>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            ))}

            {hasMore ? (
              <div
                ref={observerRef}
                className="loading-indicator text-center mt-5"
              >
                Loading more items...
              </div>
            ) : (
              <div className="no-more-items text-center mt-5">
                No more items to load.
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hikmatlar;
