"use client";
import classNames from "classnames";
import "./index.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"; // 添加 useRef 和 useState

const ItemList = ({
  title,
  items,
  animationDelay,
}: {
  title: string;
  items: { url: string; text: string }[];
  animationDelay: string;
}) => {
  const t = useTranslations("footer");
  const [isVisible, setIsVisible] = useState(false); // 添加状态管理
  const ref = useRef<HTMLDivElement>(null); // 创建 ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 当进入视口时设置为可见
          //   observer.disconnect(); // 断开观察
        } else {
          setIsVisible(false); // 当离开视口时重置可见性
        }
      },
      { threshold: 0.1 }, // 触发的阈值
    );

    if (ref.current) {
      observer.observe(ref.current); // 观察当前元素
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // 清理观察
      }
    };
  }, []);
  return (
    <div
      className={classNames("w-full sm:w-[180px] text-left mt-10 sm:mt-3 ", {
        "ItemList_Comp  ": isVisible,
      })}
      //   style={{ animationDelay }}
      style={{
        // animationDelay,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
      }} // 控制初始状态
      ref={ref}
    >
      <h3 className="font-medium text-xl mb-2 sm:mb-6 mt-0  LandingLayout_title">{t(title)}</h3>
      <ul className="pl-0">
        {items.map((item, index) => (
          <li className="list-none overflow-hidden" key={index}>
            <Link
              href="/"
              className="text-[#D1D1D1] w-full block mt-3 w-full overflow-hidden  LandingLayout_headerItem"
            >
              <div className="w-full  text-[16px] overflow-hidden">{t(item.text)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
