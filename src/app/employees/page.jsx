'use client'
import ListTable from '@/components/ListTable';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page() {
  
    const [users, setUsers] = useState([])

    const fetchEmployees = async () => {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/users`);
        res.data.users.map(user => {
          if (!users.includes(user.name)) {
    
            setUsers((prev) => [...prev, [user._id,user.name, user.category]])
          }
        })
      }
      useEffect(() => {
       
        fetchEmployees();
    
      }, [])
    
  return (
    <div>
           
       <ListTable titles={["Name", "category"]} data={users} />
    </div>
  )
}

export default page