"use client";
import GridPattern from "@/components/reactive/grid-pattern";
import SparklesCore from "@/components/reactive/particles";
import Spotlight from "@/components/reactive/spotlight";
import { AnimatedTooltip } from "@/components/reactive/tooltip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { voices } from "@/lib/mock";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader } from "lucide-react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState<Voice>(voices[0]);
  const [audio, setAudio] = useState("");

  const handleGenerate = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/tts", { text: "Hello world", voice: voice.name })
      .then(({ data }) => {
        setAudio(data.status.OutputUri[0]);
        toast.success("Audio generated successfully");
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex  min-h-screen items-center bg-black flex-col justify-around">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#06b6d4"
      />

      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [6, 6],
          [10, 5],
          [13, 3],
          [15, 6],
          [20, 3],
        ]}
        className={cn(
          "[mask-image:radial-gradient(4000px_circle_at_center,white,transparent)]",
          "inset-x-0 fill-gray-700/15 stroke-gray-700/15"
        )}
      />
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={80}
        className="w-full h-full absolute"
        particleColor="#FFFFFF"
      />
      <div className="max-w-screen-sm relative z-50 w-full flex flex-col justify-center items-center">
        <div className="w-[40rem] h-10 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>
        <h1 className="text-4xl font-bold capitalize text-transparent tracking-tighter bg-gradient-to-tl text-center from-black to-stone-200 bg-clip-text [text-wrap:balance] md:text-7xl md:leading-[5rem]">
          blog post to audio in few seconds
        </h1>
        <div className="w-full mt-8 mb-4 bg-[#1d1d1d] shadowm-md border-[1px] h-[150px] border-gray-200/15 rounded-md">
          <Textarea className="bg-transparent text-white border-none h-full" />
        </div>
        <div className="flex my-5 items-center space-x-4">
          <AnimatedTooltip items={voices} />
        </div>
        <Button
          onClick={handleGenerate}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[180px] h-12"
        >
          Convert
          {loading && <Loader className="w-6 h-6 ml-2 animate-spin" />}
        </Button>
      </div>
    </main>
  );
}
