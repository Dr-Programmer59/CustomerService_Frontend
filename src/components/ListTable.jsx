import React from 'react'

function ListTable({titles,data,onEdit,onDelete}) {
  return (
   

<div class="relative overflow-x-auto shadow-md sm:rounded-lg p-20">
    <table class="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {
                    titles.map(title=>( 
                    <th scope="col" class="px-6 py-3">
                   {title}
                </th>))
                }
                <th scope="col" class="px-6 py-3">
                 Actions
                </th>
            </tr>
           
        </thead>
        <tbody>

            {
            data.map((row,index)=>(
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                {
                    row.slice(1).map(col=>(
                    <td class="px-6 py-4">
                        {col}
                    </td>
                    ))
                    
                }
                 <td class="flex items-center px-6 py-4">
                    <button  data-key={index} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={onEdit}>Edit</button>
                    <button data-key={index} class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3" onClick={onDelete}>Remove</button>
                </td>
                
            </tr>
            ))
           
}
        </tbody>
    </table>
</div>

  )
}

export default ListTable