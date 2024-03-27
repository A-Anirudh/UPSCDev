import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../components';
import { useAddSupportMutation } from '../slices/customerSupportSlice';
import { toastSuccess } from '../utils/myToast';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export const CustomerSupport = () => {
  const open = useSelector((state) => state.open.isOpen);
  localStorage.setItem('selected', 'Help');
  const [addSupport] = useAddSupportMutation();

  const [isLoading, setisLoading] = useState(false);
  const [response, setresponse] = useState();

  const generateTicketNumber = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generate a 10-digit random number
    const ticketNumber = `#${randomNumber}`; // Attach '#' in front of the number
    return ticketNumber;
  };

  const [form, setform] = useState({
    ticketNumber: generateTicketNumber(),
    title: '',
    desc: '',
    paymentRelated: false,
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'title' || name === 'desc' || name === 'paymentRelated') {
      // Only update ticket number when relevant fields change
      setform((prevForm) => ({ ...prevForm, [name]: type === 'checkbox' ? checked : value }));
    } else {
      // Regenerate ticket number for other fields
      setform((prevForm) => ({ ...prevForm, [name]: type === 'checkbox' ? checked : value, ticketNumber: generateTicketNumber() }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    try {
      setisLoading(true);

      const { data, error } = await addSupport({ ...form });

      if (data) {
        toastSuccess('Ticket submitted');
        setresponse(data?.message);
        setform({
          ticketNumber: generateTicketNumber(),
          title: '',
          desc: '',
          paymentRelated: false,
        })
      } else if (error) {
        toast.error('Error submitting');
        console.error('Error submitting support:', error);
      }
    } catch (error) {
      toast.error('Error submitting');
      console.error('Error submitting support:', error);
    } finally {
      setisLoading(false);
    }
  };



  return (
    // <section className='flex flex-col md:flex-row w-full bg-background-25 p-5 md:p-2'>
      // <div className='w-full h-screen flex justify-center items-start font-jakarta overflow-hidden'>
        <form onSubmit={handleSubmit} className=' p-1   w-full   text-text-25 h-full'>
          <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
          <div className='mb-4'>
            <label className='block  text-sm font-bold mb-2' htmlFor='ticketNumber'>
              Ticket Number
            </label>
            <p>{form.ticketNumber}</p>
          </div>
          <div className='mb-4'>
            <label className='block  text-sm font-bold mb-2' htmlFor='title'>
              Title
            </label>
            <input
              required
              type='text'
              id='title'
              name='title'
              value={form.title}
              onChange={handleFormChange}
              className='w-full px-3 py-2  rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-background-100'
            />
          </div>
          <div className='mb-4'>
            <label className='block  text-sm font-bold mb-2' htmlFor='desc'>
              Description
            </label>
            <textarea
              required
              id='desc'
              name='desc'
              value={form.desc}
              onChange={handleFormChange}
              rows='4'
              className='w-full px-3 py-2  rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-background-100 h-[25vh]'
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                id='paymentRelated'
                name='paymentRelated'
                checked={form.paymentRelated}
                onChange={handleFormChange}
                className='mr-2'
              />
              Payment Related
            </label>
          </div>
          <button
            type='submit'
            className='bg-primary-500 text-white py-2 px-4 rounded-md  focus:outline-none focus:ring md:w-fit w-full  '
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
          <p className=' text-lg p-2 flex gap-2 items-center '>
            {response ? <CheckIcon className='text-green-500' /> : null} {response}
          </p>
        </form>
      // </div>
    // </section>
  );
};
