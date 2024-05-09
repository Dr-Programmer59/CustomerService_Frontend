'use client'
import { useEffect, useState } from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import { ImYoutube2 } from 'react-icons/im';
import { MdOutlinePlaylistPlay } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { redirect } from 'next/navigation'

const HomePage = () => {
  const { isAuth, user } = useSelector(store => store.userReducer);


  // useEffect(() => {
  //  if(!isAuth)
  //  {
  //   redirect('/signup');

  //  }
  // }, [isAuth])
  
  return (
   
    <div className='bg-white dark:bg-slate-900 dark:text-white rounded-lg mx-4 p-4'>
      <h1 className='text-2xl font-semibold'>{
      isAuth?`Hi ${user.name}`:"do login"
      }</h1>
      <div className='flex flex-col gap-4 w-fit'>
       
      </div>
    </div>
    

    
  
  );
};

export default HomePage;
