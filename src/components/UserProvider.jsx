"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {getAds, loadme} from '@/lib/actions/user';

import { usePathname, useRouter } from 'next/navigation'

const UserProvider = ({children}) => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    
    const checkHideHeader = () => {
      const list = ['/user-chat', '/dashboard']
  
      let hide = false;
      for (const index in list) {
          if (pathname.includes(list[index])) {
              hide = true;
              break;
          } else {
              hide = false;
          }
      }
   
      return hide
  }
    useEffect(() => {
      if(!checkHideHeader()){
        dispatch(loadme());
      }
    },[])
  return (children)
}

export default UserProvider