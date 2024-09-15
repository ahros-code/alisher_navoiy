"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useLocale } from "next-intl"

const LocalSwitcher = () => {
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();
    const [lang, setLang] = useState(locale);
    const router = useRouter();

    const pathname = usePathname();
    const onSelectChange = (e: string) => {
        // alert(pathname.replace("ru", e))
        startTransition(() => {
            router.replace(pathname.replace(locale, e));
        });
    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild className=" z-[99999]">
                <Button variant="ghost" size="icon" disabled={isPending} className=" px-1 md:px-2 shadow md:shadow-none" >
                    <div className=" hidden md:block">

                        <Image
                            src={`/languages/${lang == 'uz' ? "uzbekistan" : lang == 'en' ? "english" : lang == 'ru' ? "russia" : "turkey"}.png`}
                            width={25}
                            height={25}
                            alt="Image"
                        />
                    </div>

                    <div className=" block md:hidden ">
                        <div className="flex justify-between items-center ">

                            <Image
                                src={`/languages/${lang == 'uz' ? "uzbekistan" : lang == 'en' ? "english" : lang == 'ru' ? "russia" : "turkey"}.png`}
                                width={25}
                                height={25}
                                alt="Image"
                            />

                            {/* <ChevronRightIcon className="w-5 h-5 text-gray-400" /> */}
                        </div>
                    </div>

                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {lang != 'uz' && (
                    <DropdownMenuItem onClick={() => onSelectChange("uz")}>
                        <div className="flex justify-between items-center w-full">

                            <Image
                                src="/languages/uzbekistan.png"
                                width={20}
                                height={20}
                                alt="Image"
                            />
                            <p className=" text-base font-normal">UZ</p>
                        </div>
                    </DropdownMenuItem>
                )}
                {lang != 'ru' && (
                    <DropdownMenuItem onClick={() => onSelectChange("ru")}>
                        <div className="flex justify-between items-center w-full">

                            <Image
                                src="/languages/russia.png"
                                width={20}
                                height={20}
                                alt="Image"
                            />
                            <p className=" text-base font-normal">RU</p>
                        </div>
                    </DropdownMenuItem>
                )}
                {lang != 'en' && (
                    <DropdownMenuItem onClick={() => onSelectChange("en")}>
                        <div className="flex justify-between items-center w-full">
                            <Image
                                src="/languages/english.png"
                                width={20}
                                height={20}
                                alt="Image"
                            />
                            <p className="text-base font-normal">EN</p>
                        </div>
                    </DropdownMenuItem>
                )}
                {lang != 'tr' && (
                    <DropdownMenuItem onClick={() => onSelectChange("tr")}>
                        <div className="flex justify-between items-center w-full">

                            <Image
                                src="/languages/turkey.png"
                                width={20}
                                height={20}
                                alt="Image"
                            />
                            <p className=" text-base font-normal">TU</p>
                        </div>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LocalSwitcher;
