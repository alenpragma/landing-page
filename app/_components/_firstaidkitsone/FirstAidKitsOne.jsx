import React from "react";
import Container from "../_container/Container";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import bannerproduct from "../../_svg/banneproduct.svg"

const FirstAidKitsOne = () => {
  let audienceData = [
    "কটন, ব্যান্ডেজ",
    "কমপ্রেস ব্যান্ডেজ",
    "স্যানিটাইজিং ওয়াইপ",
    "থার্মোমিটার, ড্যান্ড্রাফ শ্যাম্পু",
    "টুইজারস, স্যাফটি পিন",
    "প্যারাসিটামল (জ্বরের জন্য)",
    "বাম (মাথা বেথার জন্য )",
  ];
  return (
    <div className="py-[50px] md:py-[80px] bg-[#f6f6f6]">
      <Container>
        <h1 className="text-[30px] md:text-[50px] text-center font-bold text-main-dark-green">
          ফাস্ট এইড বাক্সটিতে যা যা পাচ্ছেন ?
        </h1>
        <p className="text-[14px] text-center font-bold text-main-dark-green">
        ফাস্ট এইড বাক্সটিতে যা যা পাচ্ছেন ?
        </p>
        <div className="flex flex-col items-center md:flex-row gap-y-5 md:gap-x-5 mt-5 md:mt-10 justify-between">
          <div className="w-full md:w-[49%] flex justify-start">
            <ul className="flex flex-col gap-y-5">
              {audienceData.map((item) => (
                <li className="text-[20px] md:text-[30px] text-main-green font-bold flex items-center gap-x-2">
                  <TiTick className="text-[25px] text-main-dark-green" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-[49%]">
            <Image src={bannerproduct} className="w-full h-auto" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FirstAidKitsOne;
