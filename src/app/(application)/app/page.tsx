import Intro from "@/assets/intro.png";
import Image from "next/image";

export default function Page() {
  return (
    <section className="flex h-full w-full items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <h1 className="bg-gradient-to-tl from-violet-500 to-cyan-500 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-5xl lg:text-6xl/none">
              Voice2Note
            </h1>
            <p className="mx-auto max-w-[700px] py-2 text-gray-500 dark:text-gray-400 md:text-lg">
              一个帮助你记录语音的小助手，随时随地记录、此时此刻总结
            </p>
            <Image
              className="w-[500px] rounded-xl shadow-2xl md:rounded-3xl"
              src={Intro}
              alt="Intro"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
