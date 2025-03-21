import { ArrowRight, Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div
        className="relative p-[1px]
          rounded-full overflow-hidden
          bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 group animate-gradient-x"
      >
        <Badge
          variant="secondary"
          className="relative px-6 py-2 text-base font-medium rounded-full group-hover:bg-rose-50 transition-colors duration-200"
        >
          <Sparkle className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-rose-600">Powered by AI</p>
        </Badge>
      </div>

      <h1 className="font-bold py-6 text-center">
        Transform PDFs into concise summaries
      </h1>
      <h2 className="text-lg sm:text-xl lg:2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600 ">
        Get a summary reel of large pdf files in seconds
      </h2>
      <div>
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl 
          rounded-full px-8 sm:px-10 py-6 sm:py-7 lg:py-8 lg:mt-16
          bg-linear-to-r from-slate-900 to-rose-500 
          hover:from-rose-500 hover:to-slate-900 
          font-bold 
          hover:no-underline shadow-lg transition-all duration-300"
        >
          <Link href="/#pricing" className="flex items-center gap-2">
            <span>Try Now</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
