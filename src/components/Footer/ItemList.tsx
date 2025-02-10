import classNames from "classnames";
import "./index.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ItemList = ({
  title,
  items,
  transitionDelay,
  isVisible,
}: {
  title: string;
  items: { url: string; text: string }[];
  transitionDelay: string;
  isVisible: boolean;
}) => {
  const t = useTranslations("footer");

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true); // 当进入视口时设置为可见
  //         //   observer.disconnect(); // 断开观察
  //       } else {
  //         setIsVisible(false); // 当离开视口时重置可见性
  //       }
  //     },
  //     { threshold: 0.1 }, // 触发的阈值
  //   );

  //   if (ref.current) {
  //     observer.observe(ref.current); // 观察当前元素
  //   }

  //   return () => {
  //     if (ref.current) {
  //       observer.unobserve(ref.current); // 清理观察
  //     }
  //   };
  // }, []);
  return (
    <div
      className={classNames("w-full sm:w-[180px] text-left mt-10 sm:mt-3  ItemList_Comp", {
        "is-visible  ": isVisible,
      })}
      //   style={{ animationDelay }}
      style={{
        transitionDelay, // 添加这行，使用 transitionDelay
      }}
      // ref={ref}
    >
      <h3 className="font-medium text-xl mb-2 sm:mb-6 mt-0  mainColor">{t(title)}</h3>
      <ul className="pl-0">
        {items.map((item, index) => (
          <li className="list-none overflow-hidden" key={index}>
            <Link href="/" className="text-[#D1D1D1] w-full block mt-3 w-full overflow-hidden  mainColorHover">
              <div className="w-full  text-[16px] overflow-hidden">{t(item.text)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
