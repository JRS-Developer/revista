import Carousel, { SlideType } from "@/components/Carousel";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Investigacion externa",
};

const slides: SlideType[] = [
  {
    id: "other-1",
    content: <div>Ejemplo</div>,
    thumbnail: {
      title: "Ejemplo",
      previewImg: undefined,
    },
  },
];

const page = () => {
  return (
    <main className="h-screen font-sans">
      <Suspense>
        <Carousel slides={slides} areExternalSlides />
      </Suspense>
    </main>
  );
};

export default page;
