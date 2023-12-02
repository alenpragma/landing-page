import React from "react";
import Container from "../_container/Container";
import Image from "next/image";
import aud from "../../_svg/aud.svg"
import { TiTick } from "react-icons/ti";
const WhoCanUse = () => {
    let audienceData = [
        "যে পাইলস রোগে আক্রান্ত ",
       " যে এইমাত্র একসিডেন্ট করেছে ",
       "যার ক্ষত অনেক গভীর",
       " যার পরিবার, সন্তান-সন্ততি আছে ",
         "যারা স্কুল কলেজ ভার্সিটি পরিচালনা করেন ",
     "   যারা গাড়ি বা বাইকার বেবসা করেন",
    ]
  return (
    <div className="py-[50px] md:py-[80px] bg-[#f6f6f6]">
      <Container>
        <h1 className="text-[30px] md:text-[50px] text-center font-bold text-main-dark-green">
        ফাস্ট-এইড বাক্স টি কার জন্য ?
        </h1>
        <div className="flex flex-col items-center  md:flex-row gap-y-5 md:gap-x-5 mt-5 md:mt-10">
            <div className="w-full md:w-[49%]">
            <ul className="flex flex-col gap-y-5">
              {audienceData.map((item) => (
                <li className="text-[20px] md:text-[30px] text-main-green font-bold flex items-center gap-x-2">
                  <TiTick className="text-[25px] text-main-dark-green" /> {item}
                </li>
              ))}
            </ul>
            </div>

            <div className="w-full md:w-[49%]"><Image src={aud} className="w-full h-auto"/></div>
        </div>
      </Container>
    </div>
  );
};

export default WhoCanUse;
