import React from 'react'

const SubsTableItem = ({ mongoId, date, email, deleteEmail}) => {

    const emailDate = new Date(date);
  return (
    <>
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            {email ? email : "No availab email"}
        </th>

        <td className='px-6 py-4 hidden sm:block'>{emailDate.toDateString() ? emailDate.toDateString() :"11 Jan 2025"}</td>
        <td className='px-6 py-4 cursor-pointer'>
            <span className="font-bold border-2 p-1" onClick={()=> {deleteEmail(mongoId)}}>❌</span>  
        </td>
    </tr>
    </>
  )
}

export default SubsTableItem