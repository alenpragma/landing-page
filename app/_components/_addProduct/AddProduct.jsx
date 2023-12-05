import React from "react";
import Container from "../_container/Container";

const AddProduct = () => {
  return (
    <div className="py-[50px] md:py-[80px] bg-[#f6f6f6]">
      <Container>
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="text-[#5E5E5E] text-4xl font-normal">Products</h2>

          {/* from component */}
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <h2 className="text-[#5E5E5E] text-[17px] font-semibold">Add new product</h2>
              <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-5">
                <input type="text" placeholder="First Aid Box" className="input-style w-full md:w-full lg:w-[225px]"/>
                <input type="text" placeholder="image url" className="input-style w-full md:w-full lg:w-[225px]" />
                <input type="text" placeholder="Product Description"  className="input-style w-full md:w-full lg:w-[500px]"/>
                <button className="rounded-full bg-[#8CC84B] hover:bg-[#80b744] text-white text-[14px] w-[115px] h-[45px]">Add  Product</button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-[#5E5E5E] text-[17px] font-semibold">Edit Product No. 03</h2>
              <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-5">
                <input type="text" placeholder="First Aid Box" className="input-style w-full md:w-full lg:w-[225px]"/>
                <input type="text" placeholder="image url" className="input-style w-full md:w-full lg:w-[225px]" />
                <input type="text" placeholder="Product Description"  className="input-style w-full md:w-full lg:w-[500px]"/>
                <button className="rounded-full bg-[#8CC84B] hover:bg-[#80b744] text-white text-[14px] w-[115px] h-[45px]">Confirm Edit</button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddProduct;
