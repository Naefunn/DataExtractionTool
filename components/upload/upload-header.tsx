import { Sparkle } from "lucide-react";
import { Badge } from "../ui/badge";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
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
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Start uploading your PDFs
      </div>
      <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p>Upload your PDF and let our AI do the magic!</p>
      </div>
    </div>
  );
}
