import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useRef } from "react"

import Link from "next/link"
const ImagesCarusel = ({ images }: { images: any }) => {
    const plugin1 = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
        // AutoScroll({ loop: true, speed: 1, autoScroll: true }),
    )
    return (
        <Carousel
            plugins={[plugin1.current]}
            className="w-full p-0 m-0"
            onMouseEnter={plugin1.current.stop}
            onMouseLeave={plugin1.current.play}
        >
            <CarouselContent className="p-0 m-0">
                {images.map((item: any, index: number) => (
                    <CarouselItem key={index} className="p-0 m-0 ">
                        <div className="  w-full h-auto md:h-auto  border">
                            <Link href={item} target="_blank">
                                <Image
                                    src={item}
                                    width={0}
                                    height={0}
                                    className="object-cover w-full"
                                    sizes="100vw"
                                    style={{ width: '100%', height: '100%' }} // optional
                                    alt="Image"
                                />
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default ImagesCarusel;