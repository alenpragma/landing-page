import React from 'react'
import { MdMessage, MdPhone } from 'react-icons/md'
import Link from "next/link";
const Footer = () => {
  return (
    <div className='pt-[50px] md:pt-[80px] bg-main-dark-green'>
      <div className="flex justify-around">
        {/* button start */}
        <div className="flex justify-center relative z-3  ">
            <Link
              href={"/"}
              className="w-[150px] text-center overflow-hidden py-[20px] bg-main-green hover:text-main-green duration-500 hover:bg-white text-white   rounded-lg flex items-center gap-x-2 group"
            >
              <span className="ml-[45px] group-hover:ml-[30px] duration-300 justify-center">
              Mail Us 
              </span>{" "}
              <MdMessage className="mt-[2px] translate-x-[-300px] group-hover:translate-x-0 duration-300" />
            </Link>
          </div>

          {/* button end */}
          {/* button start */}
          <div className="flex justify-center relative z-3 ">
            <Link
              href={"/"}
              className="w-[150px] text-center overflow-hidden py-[20px] bg-main-green hover:text-main-green duration-500 hover:bg-white text-white   rounded-lg flex items-center gap-x-2 group"
            >
              <span className="ml-[50px] group-hover:ml-[30px] duration-300 justify-center">
              Call Us 
              </span>{" "}
              <MdPhone className="mt-[2px] translate-x-[-300px] group-hover:translate-x-0 duration-300" />
            </Link>
          </div>

          {/* button end */}
      </div>
      <div className="flex justify-around py-[20px] border-b">
          <div className=""><a href="#" className='text-main-green'>Terms Of Services</a></div>
          <div className=""><a href="#" className='text-main-green'>Privacy Policy</a></div>

      </div>
      <div className="py-[20px] text-center text-main-green">
      All Right Reserved   
      </div>
    </div>
  )
}

export default Footer