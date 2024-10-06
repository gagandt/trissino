"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { burgerLinks } from "@/contants/brand-links";

interface PropsTypes {
  isLoading: boolean;
}

export default function AnalysisLoader(props: PropsTypes) {
  const { isLoading } = props;
  const [currentItem, setCurrentItem] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalItems = burgerLinks?.length;

  useEffect(() => {
    if (currentItem < totalItems && isLoading) {
      const timer = setTimeout(() => {
        setCurrentItem((prev) => prev + 1);
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentItem, isLoading, totalItems]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-[9999] ${isLoading ? "flex" : "hidden"} items-center justify-center bg-[#000000a0]`}
    >
      <div className="mx-auto w-full max-w-md space-y-4 p-6">
        <div className="relative pt-1">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <span className="inline-block rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold uppercase text-white">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="inline-block rounded-full bg-blue-500 px-2 text-xs font-semibold text-white">
                {progress}%
              </span>
            </div>
          </div>
          <div className="mb-4 flex h-2 overflow-hidden rounded bg-white text-xs">
            <motion.div
              className="flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-white">
            {currentItem < totalItems ? (
              <>
                Analyzing item{" "}
                <span className="font-bold text-blue-500">
                  {burgerLinks?.[currentItem]?.url}
                </span>
              </>
            ) : (
              "Analysis complete!"
            )}
          </p>
        </div>
        <motion.div
          className="mx-auto h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    </div>
  );
}
