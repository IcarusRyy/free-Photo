// "use client";
// import { memo, useEffect, useRef, useState } from "react";
// import HyperspeedComponent from "./Hyperspeed";
// import classnames from "classnames";
// const Hyperspeed = memo(({ className }: { className: string }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [shouldRender, setShouldRender] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) {
//             setShouldRender(false);
//           } else {
//             setShouldRender(true);
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//         rootMargin: "100px 0px",
//       },
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div ref={containerRef} className={classnames("h-full w-full", className)}>
//       {shouldRender && (
//         <HyperspeedComponent
//           effectOptions={{
//             onSpeedUp: () => {},
//             onSlowDown: () => {},
//             distortion: "turbulentDistortion",
//             length: 400,
//             roadWidth: 10,
//             islandWidth: 2,
//             lanesPerRoad: 4,
//             fov: 90,
//             fovSpeedUp: 150,
//             speedUp: 2,
//             carLightsFade: 0.4,
//             totalSideLightSticks: 20,
//             lightPairsPerRoadWay: 40,
//             shoulderLinesWidthPercentage: 0.05,
//             brokenLinesWidthPercentage: 0.1,
//             brokenLinesLengthPercentage: 0.5,
//             lightStickWidth: [0.12, 0.5],
//             lightStickHeight: [1.3, 1.7],
//             movingAwaySpeed: [60, 80],
//             movingCloserSpeed: [-120, -160],
//             carLightsLength: [400 * 0.03, 400 * 0.2],
//             carLightsRadius: [0.05, 0.14],
//             carWidthPercentage: [0.3, 0.5],
//             carShiftX: [-0.8, 0.8],
//             carFloorSeparation: [0, 5],
//             colors: {
//               roadColor: 0x080808,
//               islandColor: 0x0a0a0a,
//               background: 0x000000,
//               shoulderLines: 0xffffff,
//               brokenLines: 0xffffff,
//               leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
//               rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
//               sticks: 0x03b3c3,
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// });
// Hyperspeed.displayName = "Hyperspeed";

// export default Hyperspeed;

"use client";
import { memo, useEffect, useRef, useState } from "react";
import HyperspeedComponent from "./Hyperspeed";
import classnames from "classnames";
const Hyperspeed = memo(({ className }: { className: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 清除之前的定时器
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          const now = Date.now();
          const scrollSpeed = now - lastScrollTime.current;
          lastScrollTime.current = now;

          if (!entry.isIntersecting) {
            // 立即隐藏
            setShouldRender(false);
          } else {
            // 根据滚动速度调整延迟加载时间
            const delay = scrollSpeed < 100 ? 0 : 300;
            timeoutRef.current = setTimeout(() => {
              setShouldRender(true);
            }, delay);
          }
        });
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0], // 多个观察点，更平滑
        rootMargin: "150px 0px", // 更大的预加载区域
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // 确保组件卸载时重置状态
      setShouldRender(false);
      lastScrollTime.current = Date.now();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={classnames("h-full w-full ", className)}
      style={{ minHeight: "300px" }} // 保持占位高度
    >
      {shouldRender && (
        <HyperspeedComponent
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,

              // roadColor: 0x2c2c2c, // 更新为较深的颜色
              // islandColor: 0x3a3a3a, // 更新为较深的颜色
              // background: 0x1a1a1a, // 更新为较深的背景色
              // shoulderLines: 0xffffff,
              // brokenLines: 0xffffff,
              // leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              // rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              // sticks: 0x03b3c3,

              // roadColor: 0x4b0082, // 深紫色
              // islandColor: 0x1e90ff, // 道奇蓝
              // background: 0x0a0a0a, // 深色背景
              // shoulderLines: 0xffffff, // 白色肩线
              // brokenLines: 0xffffff, // 白色破损线
              // leftCars: [0xd856bf, 0x6750a2, 0xc247ac], // 左侧车辆颜色
              // rightCars: [0x03b3c3, 0x0e5ea5, 0x324555], // 右侧车辆颜色
              // sticks: 0x03b3c3, // 交通标志颜色

              // roadColor: 0xff7e5f, // 珊瑚色
              // islandColor: 0xfeb47b, // 金色
              // background: 0x0a0a0a, // 深色背景
              // shoulderLines: 0xffffff, // 白色肩线
              // brokenLines: 0xffffff, // 白色破损线
              // leftCars: [0xd856bf, 0x6750a2, 0xc247ac], // 左侧车辆颜色
              // rightCars: [0x03b3c3, 0x0e5ea5, 0x324555], // 右侧车辆颜色
              // sticks: 0x03b3c3, // 交通标志颜色

              // roadColor: 0x2c2c2c, // 深色道路
              // roadColor: 0x080808,
              // islandColor: 0x3a3a3a, // 稍亮的岛屿
              // background: 0x0a0a0a, // 深色背景
              // shoulderLines: 0xffffff, // 白色肩线
              // brokenLines: 0xffffff, // 白色破损线
              // leftCars: [0xff7e5f, 0x6750a2, 0xc247ac], // 左侧车辆颜色，使用珊瑚色
              // rightCars: [0xfeb47b, 0x0e5ea5, 0x324555], // 右侧车辆颜色，使用金色
              // sticks: 0x03b3c3, // 交通标志颜色

              // roadColor: 0x1a1a1a, // 更深的道路颜色
              // islandColor: 0x4a90e2, // 明亮的蓝色岛屿
              // background: 0x0a0a0a, // 深色背景
              // shoulderLines: 0xffffff, // 白色肩线
              // brokenLines: 0xffffff, // 白色破损线
              // leftCars: [0xff7e5f, 0x00ffcc, 0xc247ac], // 左侧车辆颜色，使用珊瑚色和亮青色
              // rightCars: [0xfeb47b, 0x0e5ea5, 0x324555], // 右侧车辆颜色，使用金色
              // sticks: 0xffcc00, // 亮黄色交通标志颜色
            },
          }}
        />
      )}
    </div>
  );
});
Hyperspeed.displayName = "Hyperspeed";

export default Hyperspeed;
