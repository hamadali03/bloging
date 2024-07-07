import React from 'react';

const SubscriTabelItem = ({ email, mongoId, date, del }) => {
  const formattedDate = new Date(date).toDateString();

  return (
    <tr className='bg-white border-b text-left'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email ? email : "No Email"}
      </th>
      <td className='px-6 py-4 hidden sm:block'>{formattedDate}</td>
      <td onClick={() => del(mongoId)} className='px-6 py-4 cursor-pointer'>X</td>
    </tr>
  );
};

export default SubscriTabelItem;
