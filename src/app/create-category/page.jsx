'use client'
import { login } from '@/lib/actions/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux'

import axios from 'axios';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    description:'',
   
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 const createCategory=async ()=>{

 }
  const handleSubmit =async (e) => {
    e.preventDefault();
      let res =  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/category`, formData);
   
      if(res){
        console.log("category created");

      }
    // Handle form submission here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Category</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm flex flex-col  space-y-5">
            <div>
              <label htmlFor="name" className="sr-only ">Category Name</label>
              <input id="name" name="name" type="text" required onChange={handleChange} value={formData.name} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">Discription</label>
              <textarea id="description" name="description" placeholder='Description'  type="text" required onChange={handleChange} value={formData.email} className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  />
            </div>
            
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
