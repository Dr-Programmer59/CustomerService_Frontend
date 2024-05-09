'use client'
import CustomSelectBox from "@/components/CustomSelectBox";
import { useEffect, useState } from "react";
import axios from "axios";
const StepC = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}) => {
  const [categories, setcategories] = useState([])

  const [category, setcategory] = useState("")
  useEffect(() => {
    const fetchCategories=async()=>{
      let res =  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`);
      res.data.categories.map(category=>{
        if(! categories.includes(category.name))
       {

        setcategories((prev)=>[...prev,category.name])
       }
      })
    }
    fetchCategories();

  }, [])
  
  
  useEffect(() => {
    formData.category=category
  }, [category])
  
  return (
    <div>
      <h1 className='mt-2 text-xl font-bold text-blue-900'>
        Step C: Select Category For Employee
      </h1>

      <div className='my-2'>
          <CustomSelectBox category={category} setcategory={setcategory} options={categories}/>
      </div>

      <div className='my-2 flex justify-between items-center'>
        <button
          className='bg-yellow-400 px-4 py-2 rounded-xl'
          onClick={handlePrevStep}
        >
          Prev
        </button>
        <button
          className='bg-green-400 px-4 py-2 rounded-xl'
          onClick={handleNextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepC;
