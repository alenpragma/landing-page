"use client";
import React from "react";
import Container from "../_container/Container";
import Image from "next/image";
import Link from "next/link";
import navsvg from "../../_svg/gmaidnav.svg";
import { MdShoppingCartCheckout } from "react-icons/md";

import banneproduct from "../../_svg/banneproduct.svg";
const Banner = () => {
  return (
    <>
      <div
        className="relative w-full  pb-[50px]"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/s2ZdskrM/25f72e43a90ea2fab17ddca8e3ee1323.jpg')",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0  bg-[#000000b3]"></div>

        <Container>
          <div className="relative z-3 py-[20px] lg:py-[30px]">
            {/* navbar svg start */}
            <Image src={navsvg} className="w-full h-auto " />
            {/* nav bar svg end */}
          </div>
          {/* banner start */}
          <div className="w-full flex flex-col   gap-y-7  lg:gap-y-14 md:gap-x-5 relative z-3 mt-0 md:mt-12">
            <div className="text-center">
              <h1 className="text-[30px] md:text-[50px] font-bold text-main-green">
                অল্প খরচে দ্রুত প্রাথমিক রোগ নিরাময় সল্যুশন
              </h1>
              <h3 className="text-[14px] md:text-[20px] text-white">
                দ্রুত ও নির্ভরযোগ্য প্রাথমিক চিকিৎসা সল্যুশন হচ্ছে আমাদের এই
                ফাস্ট এইড বক্স
              </h3>
            </div>
            <div className="flex justify-center">
              {/* <Image src={banneproduct} className="w-full h-auto " /> */}
              <iframe
                className="w-full md:w-[60%] h-[400px]"
                src="https://www.youtube.com/embed/1Tn_tu3NDYg?si=OoDTFSz_TY1mfzMg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          {/* banner end */}
          {/* button start */}
          <div className="flex justify-center relative z-3 mt-7 md:mt-14">
            <Link
              href={"/"}
              className="w-[150px] text-center overflow-hidden py-[10px] bg-main-green hover:text-main-green duration-500 hover:bg-white text-white   rounded-lg flex items-center gap-x-2 group"
            >
              <span className="ml-[40px] group-hover:ml-[30px] duration-300 justify-center">
                Buy Now
              </span>{" "}
              <MdShoppingCartCheckout className="mt-[2px] translate-x-[-300px] group-hover:translate-x-0 duration-300" />
            </Link>
          </div>

          {/* button end */}
        </Container>
      </div>
    </>
  );
};

export default Banner;
