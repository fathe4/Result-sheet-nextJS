import Image from "next/image";
import React, { ReactElement } from "react";

const Header = (): ReactElement => {
  return (
    <div className="flex gap-2 w-full rounded-lg my-4">
      <div>
        <img
          src="https://bd.top10place.com/img_files/1329810593746058"
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="bg-green-600 w-full py-6">
        <div className="border-b">
          <h2 className="text-3xl font-bold text-white ml-4">
            Narsingdi Government College
          </h2>
        </div>
        <div>
          <h2 className="text-2xl text-white ml-4">
            Intermediate and secondary Education board results
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
