"use client";
import WaveButton from "@/components/BaseComp/WaveButton";
import Hyperspeed from "@/components/Hyperspeed";
import classNames from "classnames";
import { useRouter } from "next/navigation";

const FirstPage = () => {
  const router = useRouter();

  return (
    <>
      <Hyperspeed className={classNames("absolute  inset-0", "!h-[calc(100vh-64px)]")} />
      <div className="absolute top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <WaveButton
          onClick={() => router.push("/profile")}
          className="
            flex-1"
        >
          Join the Cyberpunk Plan
        </WaveButton>
      </div>
    </>
  );
};

export default FirstPage;
