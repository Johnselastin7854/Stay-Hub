import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center text-2xl text-white h-screen">
      <Image
        src="/loader.gif"
        alt="Loader"
        height={120}
        width={120}
        sizes="100vw"
        priority
      />
    </div>
  );
};

export default loading;
