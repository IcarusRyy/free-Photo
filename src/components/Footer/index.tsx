"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ItemList from "./ItemList";
import classNames from "classnames";
import FOOT_CONFIG from "./footConfig";
const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={classNames("overflow-hidden pb-[40px] sm:pb-[40px] ", { "footer-hidden": !isVisible })}
      ref={footerRef}
    >
      <div className="relative w-[90vw] sm:w-[88vw] xl:w-[76vw] mx-auto max-w-[1400px] flex-center flex-col">
        <div className="mt-6 sm:mt-16 flex sm:gap-x-10  pb-10 px-8 sm:px-0 sm:pb-10 flex-wrap sm:gap-y-8">
          <div className="w-full sm:w-[220px] mt-3">
            <div>
              {/* <Image
                alt="test"
                src={"https://cdn.goenhance.ai/images/static/logo/enhance-logo-name.png"}
                width={183}
                height={48}
              /> */}
              <div className="w-[183px] h-[48px]">Logo</div>
              <div className="text-sm font-bold mt-4 text-[#d1d1d1]">
                AI Video & Image Art Tool For Human Imagination.
              </div>
            </div>
          </div>

          {FOOT_CONFIG.map((item) => (
            <ItemList
              key={item.title}
              title={item.title}
              items={item.items}
              transitionDelay={item.params.transitionDelay}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
