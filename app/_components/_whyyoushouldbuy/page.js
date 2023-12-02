import React from "react";
import Container from "../_container/Container";
import Image from "next/image";
import aud from "../../_svg/aud.svg";
import { TiTick } from "react-icons/ti";

const WhyShould = () => {
    let audienceData =  [
        "কখনো পাইলস বা মলদ্বারে গেজ হওয়ার কারণে অনেক বেশি রক্ত পড়ে আর আর রক্ত অনেক পড়ার কারণে শরীরে রক্ত শূন্যতা দেখা দেয়। তাই আমাদের এই ফাস্ট-এইড বক্সে পাইলসের সাইড ইফেক্টহীন ন্যাচারাল হোমিওপ্যাথিক সল্যুশন - ক্যালেন্ডুলা কিউ।",
        "কখনো ক্ষত বেশি গভীর হওয়ার কারণে রক্ত বেশি পড়ে আর রক্ত বেশি পড়ার কারণে দেহ নিস্তেজ বা প্রাণ হীন হওয়ার আশঙ্কা থাকে। তাই রক্ত পড়া বন্ধ করার জন্য গেজ ও ক্যালেন্ডুলার কিউ গুড মর্নিং আইড এর ফাস্ট এইড বক্সে যুক্ত করা হয়েছে।",
        "একটি ফাস্ট-এইড বক্সে এক জাগায় সব গুরুত্বপূর্ণ প্রাথমিক চিকিৎসা কিট গুলো থাকে। কাজেই, জরুরী পরিস্থিতিতে বা দুর্ঘটনার মুহূর্তে , আপনাকে উপযুক্ত চিকিৎসা আইটেম একত্রিত করতে গিয়ে মূল্যবান সময় নষ্ট করতে হবে না। কারণ, প্রয়োজনের সময় একমিনিট বিলম্বের অনেক চরা মূল্য দিতে হয়।",
        "ফার্স্ট-এইড নলেজ দুর্ঘটনার মুহূর্তে বা জরুরী পরিস্থিতিতে আপনাকে খুব দ্রুত প্রাথমিক চিকিৎসা প্রদানে বা জরুরী অবস্থা নিয়নত্রণে সহায়তা করবে। জরুরী পরিস্থিতিতে, মাত্র এক মিনিটের বিলম্ব অপূরণীয় ক্ষতির কারণ হতে পারে। এই কিটগুলি সাধারণ চিকিৎসার আঘাত যেমন আঘাত, পোড়া, কাটা ইত্যাদির জন্য প্রাথমিক এবং তাত্ক্ষণিক যত্ন প্রদান করে।",
        "ভালো মানের, প্রয়োজনীয় কিট দিয়ে সাজানো একটা ফাস্ট এইড বাক্স আপনার ব্যক্তিগত, পারিবারিক ও সামাজিক ভাবে অনেক কাজে আসবে। দুর্ঘটনার মুহূর্তে বা জরুরী পরিস্থিতিতে আপনি নিজের বা অন্যের সাহায্য করতে পারবেন।",
        "ফাস্ট-এইড বাক্স দুর্ঘটনার মুহূর্তে বা জরুরী পরিস্থিতিতে আপনার টাকা ও সময় বাঁচাবে, সাস্থ সচেতন মানুষ হতে সাহায্য করবে, মানব ভিড়ে আপনাকে আলাদা রাখবে।",
        "দুর্ঘটনার মুহূর্তে ফাস্ট-এইড বাক্স অনেক বড় চরা মূল্য দেয়া থেকে বাঁচতে সাহায্য করবে। make array with this text"
    ]
  return (
    <div className="py-[50px] md:py-[80px] bg-[#f6f6f6]" style={{backgroundAttachment:"fixed",backgroundImage:"url('https://i.postimg.cc/G3DFRrMw/pexels-nataliya-vaitkevich-7615572.jpg')",backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}}>
      <Container>
        <h1 className="text-[30px] md:text-[50px] text-center font-bold text-main-dark-green p-2 bg-main-green">
        আপনি ফাস্ট এইড বাক্স কেন কিনবেন
        </h1>
        <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-5 items-center mt-5 md:mt-10">
          <div className="w-full ">
            <ul className="flex flex-col gap-y-5">
              {audienceData.map((item) => (
                <li className="text-[20px] md:text-[30px] bg-[#26773eef] text-white border-main-green border-[5px] p-4 rounded-lg font-bold flex items-center gap-x-2">
                 {item}
                </li>
              ))}
            </ul>
          </div>

        
        </div>
      </Container>
    </div>
  );
};

export default WhyShould;
