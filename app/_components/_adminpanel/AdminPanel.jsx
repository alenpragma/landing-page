import React from "react";
import Container from "../_container/Container";
import logo from "../../assets/logo.png";
import Image from "next/image";

const AdminPanel = () => {
  return (
    <div className="py-[50px] md:py-[80px] bg-[#f6f6f6]">
      <Container>
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <Image src={logo} className="w-[500px] h-auto " />
          </div>
          <div>
            <p className="center text-[31px] font-semibold text-[#5E5E5E]">
              Welcome to Admin Panel
            </p>
          </div>
          <div className="w-[436px] h-[231px] shadow-lg rounded-lg flex flex-col justify-center items-center gap-3 shadow-slate-500">
            <p className="text-center text-[#5E5E5E] text-[25px]">
              Enter Admin Secret Key
            </p>
            <input
              type="text"
              className="w-[229px] h-[45px] rounded-3xl shadow-lg shadow-slate-400 py-2 px-3 outline-none "
            />
            <button className="rounded-full bg-[#8CC84B] hover:bg-[#80b744] text-white text-[14px] w-[115px] h-[45px]">Enter</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminPanel;
