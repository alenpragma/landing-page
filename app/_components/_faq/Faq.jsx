"use client"
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Container from "../_container/Container";

const Faq = () => {
  const faqData = [
    {
      question: "হারবাল কি?",
      answer: "হারবাল হলো সৈকতে জাহাজগুলি আশ্রয় পাওয়ার জন্য একটি স্থান...",
    },
    {
      question: "হারবাল ফার্স্ট এইড বক্স কিভাবে ব্যবহার করতে হয়?",
      answer: "জরুরি অবস্থায়, প্রথম সাড়া বক্স খোলুন এবং নির্দেশাবলী অনুসরণ করুন...",
    },
    {
      question: "হারবালে কি কি সুরক্ষা ব্যবস্থা গুরুত্বপূর্ণ?",
      answer: "সুরক্ষা ব্যবস্থার মধ্যে উচ্চমান শিক্ষা, যন্ত্র রক্ষণ এবং প্রদর্শনী নির্ধারণের অনুসরণ রয়েছে...",
    },
    {
      question: "হারবাল চালনার জন্য কোনও নির্দিষ্ট বিধিমালা আছে কি?",
      answer: "হারবাল অপারেশনগুলি নিরাপত্তা এবং দক্ষতা নিশ্চিত করতে বিভিন্ন বিধি নিয়েছে...",
    },
    {
      question: "কোনও নিজেস্ব উদ্দিপ্তি কি কি সহায়ক হতে পারে হারবাল ব্যবস্থার জন্য?",
      answer: "হারবাল উদ্দিপ্তির জন্য একটি ভাল ব্যবস্থা তৈরি করতে প্রস্তুতি নেওয়া, স্বাস্থ্যকর আহার নিতে, এবং প্রতি দিন চোখ রাখতে ভালো হতে পারে...",
    },
    {
      question: "হারবালে প্রায়শই কি ধরণের জাহাজগুলি ব্যবহৃত হয়?",
      answer: "বিভিন্ন ধরণের জাহাজ, যেমন কার্গো জাহাজ, মৎস্য নৌকা, এবং ক্রুজ জাহাজ, পৃষ্ঠে ভিন্ন উদ্দেশ্যে হারবাল ব্যবহার করে...",
    },
    // Add more FAQ items as needed
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="py-[50px] md:py-[80px] bg-[#f6f6f6]">
        <Container>
          <h1 className="text-[30px] md:text-[50px] text-center font-bold text-main-dark-green p-2">
            প্রশ্ন উত্তর পর্ব
            
          </h1>
          <div className="mt-10 space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="border-b pb-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleAccordionClick(index)}
                >
                  <h2 className="text-lg font-semibold">{item.question}</h2>
                  <span className="transition-transform transform">
                    {openIndex === index ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </span>
                </div>
                {openIndex === index && (
                  <p className="text-gray-600 mt-2">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Faq;
