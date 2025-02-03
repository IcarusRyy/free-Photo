"use client";

import { isTwoCNChar } from "@/utils/help";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
interface WaveButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const WaveButton: React.FC<WaveButtonProps> = ({ children, className, onClick }) => {
  const [hasTwoCNChar, setHasTwoCNChar] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 检测是否为两个汉字并更新状态
  useEffect(() => {
    if (!buttonRef.current) return;

    const buttonText = buttonRef.current.textContent || "";
    if (isTwoCNChar(buttonText)) {
      setHasTwoCNChar(true);
    } else {
      setHasTwoCNChar(false);
    }
  }, [children]);

  return (
    <button
      ref={buttonRef}
      className={classNames(
        "relative p-[8px] !text-[22px] font-[600] group overflow-hidden rounded-[4px] text-white text-[14px] text-center Component_WaveButton ",
        // 当检测到两个汉字时添加间距样式
        hasTwoCNChar && "two-cn-chars",
        className,
      )}
      onClick={onClick}
    >
      {/* Primary animated gradient */}
      <div className="absolute inset-0 wave-gradient"></div>

      {/* Glow effect */}
      <div className="absolute inset-0 glow-effect"></div>

      {/* Shine effect */}
      <div className="absolute inset-0 shine-effect"></div>

      {/* Button content */}
      <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-300">
        <span className="animate-pulse-subtle">{children}</span>
      </div>
    </button>
  );
};
export default WaveButton;
