import React, { useContext } from 'react';
import Link from 'next/link';
import { MenuContext } from '@/context/MenuContext';
import { BsBank2 } from "react-icons/bs";

import { AiOutlineHome, AiOutlineClose } from 'react-icons/ai';
import { GrProjects } from 'react-icons/gr';
import { FaAngleRight, FaCheck, FaCheckDouble, FaUsers } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { SiHelpscout, SiSinglestore } from 'react-icons/si';
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'

const MainSidebar = () => {
  const { open, toggle } = useContext(MenuContext);
  const { isAuth, user } = useSelector(store => store.userReducer);

  const closeSeideBarHandler = () => {
    toggle();
  };

  return (
    <aside
      className={`bg-white dark:bg-slate-600 dark:text-white top-4 left-4 lg:fixed lg:block lg:top-16 lg:left-8 rounded-lg overflow-hidden transition-all duration-200 ${open ? 'w-60 p-4 block fixed' : 'w-0 hidden'
        } lg:w-60 lg:p-4 max-lg:z-20 shadow-sm`}
    >
      <ul>
        
        <li className='flex justify-end items-center lg:hidden'>
          <AiOutlineClose onClick={closeSeideBarHandler} className='text-red-500 hover:text-red-800 cursor-pointer' />
        </li>
        <li className='flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2'>
          <AiOutlineHome className='mr-2' />
          <Link href='/' onClick={closeSeideBarHandler}>
            Home
          </Link>
        </li>
        {user.role=="User"?<>
        
      
         <Link href='/chats' onClick={closeSeideBarHandler}>
         <li className='flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2'>
           <FaUser className='mr-2' />
           <h3 className='flex-1'>Check Message</h3>
           <FaAngleRight />
         </li>
       </Link>
        
       </>
        :<>
         
        <Link href='/create-employee' onClick={closeSeideBarHandler}>
          <li className='flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2'>
            <FaUser className='mr-2' />
            <h3 className='flex-1'>Create Employee</h3>
            <FaAngleRight />
          </li>
        </Link>
        <Link href='/employees' onClick={closeSeideBarHandler}>
          <li className='flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2'>
            <FaUsers className='mr-2' />
            <h3 className='flex-1'>All Employees</h3>
            <FaAngleRight />
          </li>
        </Link>

       
        <Link href='/categories' onClick={closeSeideBarHandler}>
        <li className='flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2'>
          <BiSolidCategory className='mr-2' />
          <h3 className='flex-1'>All Categories</h3>
          <FaAngleRight />
        </li>
        </Link>
       
        <Link href='/account-details' onClick={closeSeideBarHandler}>
        <li className='flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2'>
          <BsBank2 className='mr-2' />
          <h3 className='flex-1' >Account Details</h3>
          <FaAngleRight />
        </li>
        </Link>
       
        </>
        
        }
       

      </ul>
    </aside>
  );
};

export default MainSidebar;
