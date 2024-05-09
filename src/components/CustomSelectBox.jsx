"use client";

import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";



const CustomSelectBox = ({category,setcategory,options}) => {
   const [open, setOpen] = useState(false);

   return (
      <>
         <div className="bg-gray-100 flex flex-col justify-center items-center w-fit relative z-10">
            <div
               onClick={() => setOpen((prev) => !prev)}
               className="flex flex-row justify-between items-center bg-white w-48 my-2 p-2 rounded-lg cursor-pointer"
            >
               <span>{category}</span>
               <BsChevronExpand className="text-gray-400" />
            </div>
            <div
               className={`flex flex-col bg-white w-48 my-2 rounded-lg ${
                  open ? "opacity-100 h-auto" : "opacity-0 h-0"
               } transition-all duration-200 overflow-hidden absolute top-16 left-0`}
            >
               {options.map((item) => (
                  <div
                     key={item}
                     onClick={() => {
                        setcategory(item);
                        setOpen(false);
                     }}
                     className={`flex justify-start items-center gap-x-2 px-2 py-1 hover:bg-orange-100 cursor-pointer ${
                        category === item ? "bg-orange-100" : ""
                     }`}
                  >
                     <AiOutlineCheck
                        className={`text-orange-300 ${category === item ? "opacity-100" : "opacity-0"}`}
                     />
                     <span>{item}</span>
                  </div>
               ))}
            </div>
         </div>
         <div
            onClick={() => setOpen(false)}
            className={`bg-gray-100 fixed inset-0 opacity-50 z-0 ${open ? "block" : "hidden"}`}
         ></div>
      </>
   );
};

export default CustomSelectBox;
