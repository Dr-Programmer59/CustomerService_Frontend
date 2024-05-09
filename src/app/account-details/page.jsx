'use client'
import ListTable from '@/components/ListTable'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function page() {
    
    const [accounts, setaccounts] = useState([])
    const [showPopup, setshowPopup] = useState(false)
    const [account, setaccount] = useState("")
    const [holdername, setholdername] = useState("")
    
    const [accountnumber, setaccountnumber] = useState("")
  
    const [currentIndex, setcurrentIndex] = useState(0)
    const fetchaccounts = async () => {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/accounts`);
      res.data.accounts.map(account => {
       
  
          setaccounts((prev) => [...prev, [account._id, account.account,account.holdername,account.accountnumber]])
        
      })
    }
    useEffect(() => {
     
      fetchaccounts();
  
    }, [])
    
  const onEdit=(e)=>{
    const key = e.target.getAttribute('data-key');
    setcurrentIndex(Number(key))
    setaccount(accounts[key][1])
    setholdername(accounts[key][2])
    setaccountnumber(accounts[key][3])


 
    setshowPopup(true)
    
  }
  const onUpdate=async (e)=>{
    e.preventDefault();
    
    try{
    const res=await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/accounts/${accounts[currentIndex][0]}`,{account,holdername,accountnumber});
    setaccounts([])
    fetchaccounts();
    setshowPopup(false)
    }
    catch(err){
        console.log(err)
      console.log("some error")
    }
  }
  const onDelete=async(e)=>{
    const key = e.target.getAttribute('data-key');
    setcurrentIndex(Number(key))

    try{
    const res=await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/accounts/${accounts[Number(key)][0]}`);
    setaccounts([])
    fetchaccounts();
    }
    catch{
      console.log("some error")
    }

console.log("delete key ",key);

  }
  return (
    <div>
        <ListTable titles={["Accounts","Holder Name","Account number"]} data={accounts} onDelete={onDelete} onEdit={onEdit}/>
    
        <div>

        
<div id="crud-modal" tabindex="-1" aria-hidden="true" class={showPopup?"fixed inset-0 flex items-center justify-center z-50 overflow-y-auto bg-gray-800 bg-opacity-75":"hidden"}>
  <div class="relative p-4 w-full max-w-md max-h-full">

    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
         Edit Account Details
        </h3>
        <button type="button" onClick={()=>setshowPopup(false)}class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <div class="p-4 md:p-5">
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account</label>
            <input type="text" name="name" value={account} onChange={(e)=>setaccount(e.target.value)} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required=""/>
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Holder Name</label>
            <input type="text" name="name" value={holdername} onChange={(e)=>setholdername(e.target.value)} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required=""/>
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account number</label>
            <input type="text" name="name" value={accountnumber} onChange={(e)=>setaccountnumber(e.target.value)} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required=""/>
          </div>
         
        
        
        </div>
        <button type="submit" onClick={onUpdate} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
          Update
        </button>
      </div>
    </div>
  </div>
</div>

</div>
</div>
    

  )
}

export default page