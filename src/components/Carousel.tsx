"use client";
import { EmblaCarouselType } from "embla-carousel";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import {
  XIcon,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  EyeIcon,
  EyeOffIcon,
  RefreshCcwIcon,
} from "lucide-react";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import IconButton from "./IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export type SlideType = {
  id: number | string;
  content: ReactNode;
  thumbnail: {
    title: string;
    previewImg:
      | {
          src: StaticImport | string;
          alt: string;
        }
      | undefined;
  };
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi?.canScrollPrev());
    setNextBtnDisabled(!emblaApi?.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
const CarouselBtn = ({
  type,
  onClick,
  disabled,
}: {
  type: "next" | "prev";
  disabled: boolean;
  onClick: () => unknown;
}) => {
  return (
    <IconButton
      aria-label={type === "next" ? "Next Slide" : "Prev Slide"}
      onClick={onClick}
      disabled={disabled}
      className="pointer-events-auto"
    >
      {type === "next" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  );
};

const CarouselSlide = ({
  children,
  showThumbnails,
  zenMode,
}: {
  children: ReactNode;
  showThumbnails: boolean;
  zenMode: boolean;
}) => {
  return (
    <div className={`flex-[0_0_100%] min-w-0`}>
      <div
        className={`${zenMode ? "scale-100" : "scale-[97%]"} h-full transition-transform`}
      >
        <div
          className={`h-full overflow-hidden border-2 transition-all ${zenMode ? "rounded-none border-transparent" : "rounded-3xl border-gray-500/50"}`}
          style={
            showThumbnails
              ? {
                  transform: "translateY(-240px)",
                }
              : undefined
          }
        >
          <div className="h-full w-full overflow-y-auto p-4 pt-10 pb-24 md:p-10 lg:p-20 lg:pb-24">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const defaultIndex = 0;

const Carousel = ({
  slides,
  areExternalSlides,
}: {
  slides: SlideType[];
  areExternalSlides: boolean;
}) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const searchSlide = useMemo(() => {
    const slide = searchParams.get("slide");
    const numberSlide = Number.isNaN(Number(slide))
      ? defaultIndex
      : Number(slide);

    return numberSlide > slides.length ? defaultIndex : numberSlide;
  }, [searchParams, slides.length]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    {
      watchDrag: false,
      startIndex: searchSlide,
      // duration: 20,
    },
    [Fade()],
  );

  const [zenMode, setZenMode] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(searchSlide);
  const [ready, setReady] = useState(false);

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );
  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const selectedIndex = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(selectedIndex);
    emblaThumbsApi.scrollTo(selectedIndex);

    push(pathname + "?" + createQueryString("slide", selectedIndex.toString()));
  }, [createQueryString, emblaMainApi, emblaThumbsApi, pathname, push]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    setReady(true);
  }, []);

  const shouldShowThumbnails = !!showThumbnails && !zenMode;

  return (
    <div className="overflow-hidden h-full relative" ref={emblaMainRef}>
      <div className="flex h-full">
        {slides.map((s) => (
          <CarouselSlide
            showThumbnails={shouldShowThumbnails}
            key={s.id}
            zenMode={zenMode}
          >
            {ready ? (
              s.content
            ) : (
              <div className="h-full w-full justify-center items-center flex">
                <LoaderIcon size={40} className="animate-spin" />
              </div>
            )}
          </CarouselSlide>
        ))}
      </div>

      <div className="bottom-8 pointer-events-none md:bottom-12 absolute left-1/2 -translate-x-1/2 flex flex-col gap-4 w-full px-4 md:px-8">
        <div
          className={`transition-opacity ${shouldShowThumbnails ? "opacity-100" : "opacity-0"} overflow-visible`}
          ref={emblaThumbsRef}
        >
          <div
            className={`flex w-full ${shouldShowThumbnails ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            {slides.map((slide, index) => {
              const isLast = index === slides.length - 1;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={slide.id}
                  className={`flex-[0_0_33%] md:flex-[0_0_20%] ${zenMode ? "pointer-events-none" : ""} ${isSelected ? "border-white" : "border-gray-500/50"} ${isLast ? "" : "mr-4"} rounded-xl border-2 h-[100px] relative overflow-hidden`}
                  onClick={() => onThumbClick(index)}
                  tabIndex={zenMode || !shouldShowThumbnails ? -1 : undefined}
                >
                  {slide?.thumbnail?.previewImg ? (
                    <Image
                      src={slide.thumbnail.previewImg.src}
                      alt={slide.thumbnail.previewImg.alt}
                      fill
                      className="object-cover z-[-1]"
                    />
                  ) : null}

                  <div
                    className={`flex justify-center items-center p-4 px-2 h-full font-semibold text-xs md:text-base ${slide.thumbnail?.previewImg ? "bg-black/80" : ""}`}
                  >
                    {slide.thumbnail?.title ?? `Slide ${index + 1}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex w-full justify-center px-4">
          {!zenMode ? (
            <IconButton
              onClick={() => {
                push(areExternalSlides ? "/" : "/external");
              }}
              className="pointer-events-auto"
            >
              <RefreshCcwIcon />
            </IconButton>
          ) : null}
          <div className="flex items-center gap-4 lg:gap-10 justify-center flex-1">
            {!zenMode ? (
              <>
                {!shouldShowThumbnails ? (
                  <CarouselBtn
                    type="prev"
                    disabled={prevBtnDisabled}
                    onClick={onPrevButtonClick}
                  />
                ) : null}
                <IconButton
                  aria-label="Show thumbnails"
                  onClick={() => setShowThumbnails((prev) => !prev)}
                  className="pointer-events-auto"
                >
                  {shouldShowThumbnails ? <XIcon /> : <MenuIcon />}
                </IconButton>
                {!shouldShowThumbnails ? (
                  <CarouselBtn
                    type="next"
                    disabled={nextBtnDisabled}
                    onClick={onNextButtonClick}
                  />
                ) : null}
              </>
            ) : null}
          </div>

          <IconButton
            onClick={() => {
              setZenMode((prev) => !prev);
            }}
            className="pointer-events-auto"
          >
            {!zenMode ? <EyeIcon /> : <EyeOffIcon />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Carousel;