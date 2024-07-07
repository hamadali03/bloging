"use client";
import React, { useEffect, useState } from 'react';
import SubscriTabelItem from '../SubscriTabelItem';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const del = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', {
        params: { id: mongoId }
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchData(); // Refresh the data after deletion
      } else {
        toast.error(response.data.msg || "Error deleting email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Failed to delete email");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/email');
      console.log('Fetched data:', response.data); // Log fetched data
      setSubscriptions(response.data.emails); // Ensure the key matches the API response
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Failed to fetch subscriptions");
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscriptions</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>Email Subscription</th>
              <th scope='col' className='hidden sm:block px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
          {subscriptions && subscriptions.length > 0 ? (
              subscriptions.map((subscription, index) => (
                <SubscriTabelItem
                  key={index}
                  del={del}
                  mongoId={subscription._id}
                  date={subscription.createdAt}
                  email={subscription.email}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className='text-center py-4'>
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
