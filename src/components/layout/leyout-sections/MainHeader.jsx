'use client';

import { MenuContext } from '@/context/MenuContext';
import React, { useContext, useEffect, useState } from 'react';
import { FaBars, FaSun, FaMoon } from 'react-icons/fa';
import UserAreaSelectBox from './UserAreaSelectBox';
import LanguageSelectBox from './LanguageSelectBox';
import { IoLogOut } from "react-icons/io5";
const MainHeader = () => {
  const initialTheme =
    typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const [theme, setTheme] = useState(initialTheme);
  const { toggle } = useContext(MenuContext);

 

 

  return (
    <div className='bg-white dark:bg-slate-800 dark:text-white flex justify-between items-center px-4 h-12 mb-4'>
      <div>Customer Service</div>
      <div className='flex justify-center items-center gap-3'>
        
      <div>
          <UserAreaSelectBox />
        </div>
        <div className='flex justify-center items-center gap-3'>
          Logout
          <IoLogOut />
        </div>
        <div onClick={toggle} className='lg:hidden'>
          <FaBars className='cursor-pointer' />
        </div>
       
      </div>
    </div>
  );
};

export default MainHeader;
