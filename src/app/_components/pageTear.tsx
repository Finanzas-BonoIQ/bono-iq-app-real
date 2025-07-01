// components/PageTear.tsx
import Image from "next/image";

export default function PageTear() {
    return (
        <div className="group fixed bottom-0 right-0 h-[220px] w-[220px] z-50">
            {/* Speech bubble */}
            <div className="pointer-events-none absolute -top-9 -left-11
                      opacity-0 translate-y-2
                      transition-all duration-300 ease-out
                      group-hover:opacity-100 group-hover:translate-y-0">
                <div className="relative rounded-full bg-white px-3 py-1 text-sm font-semibold shadow-lg">
                    Step&nbsp;In!
                    {/* Bubble tail */}
                    <span className="absolute -bottom-1 right-6 h-3 w-3 rotate-45 bg-white"></span>
                </div>
            </div>

            {/* Torn-corner image */}
            <Image
                src="/login.png"
                alt=""
                fill
                className="object-cover rounded-tl-[180px] shadow-xl
                   border-l-4 border-t-4 border-white
                   transition-transform duration-300 ease-out
                   group-hover:scale-150 group-hover:rotate-2 cursor-pointer"
                priority
            />
        </div>
    );
}
