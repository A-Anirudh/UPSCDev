import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserRegisterMutation } from '../slices/usersApiSlice'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Logo from '../assets/logo.png'
import toast from 'react-hot-toast'
import { setUserCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { UnloggedUserBar } from '../components';

export const Register = () => {
    const [register] = useUserRegisterMutation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false)
    const [confirmvisible, setconfirmVisible] = useState(false)


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);


        if (data.password === data.confirm_password) {
            try {
                const message = await register({
                    username:data.username,
                    email:data.email,
                    password:data.password,
                    phoneNumber:data.phoneNumber,
                    dateOfBirth:data.dateOfBirth,
                    gender:data.gender
                });
                if (message.data) {
                    localStorage.setItem('selected', 'Home');
                    navigate(`/email-sent`);
                } else if (message.error) {
                    toast.error(message.error.data.message);
                }
            } catch (error) {
                toast.error("Registration failed. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error('Passwords do not match');
            setIsSubmitting(false);
        }
    };

    return (
        <section>
            {/* <UnloggedUserBar/> */}
        <div className='w-full p-10  flex flex-col justify-center items-center '>
            <div className='rounded-md outline-1 outline outline-gray-500  flex-col w-[350px] md:w-[500px]  '>
                <div className='flex items-center w-full border-b border-gray-500 px-5'>
                    <img src={Logo} className='w-5 aspect-square' />
                    <p className='p-2   w-full '>Sign up to UpscMax</p>
                </div>
                <p className='font-[poppins] text-center  py-6 px-6 font-semibold md:text-xl'>Create an account </p>

                <form className='flex flex-col p-8 gap-2 text-sm' onSubmit={handleSubmit}>
                    <div className='' >
                        <label htmlFor='name' className='block text-accent-300  font-medium p-1 font-jakarta'>Username</label>
                        <input className='w-[100%] text-black p-3 outline-none rounded focus:outline-accent-200 bg-gray-100 font-jakarta' type='text' name='username' placeholder='Enter your username' />
                    </div>

                    <div className='' >
                        <label htmlFor='email' className='block text-accent-300  font-medium p-1 font-jakarta'>Email</label>
                        <input className='w-[100%] text-black p-3 outline-none rounded focus:outline-accent-200 bg-gray-100 font-jakarta' type='email' name='email' placeholder='Enter your email' />
                    </div>

                    <div className='relative '>
                        <label htmlFor='password' className='block text-accent-300  font-medium p-1 font-jakarta'>Password</label>
                        <input className='w-[100%] text-black p-3 outline-none rounded focus:outline-accent-200 bg-gray-100 font-jakarta relative' type={visible ? 'text' : 'password'} name='password' placeholder='Enter your password' />
                        {visible ? <VisibilityIcon className='absolute right-3 top-1/2 transform -translate-y-[-4px] text-gray-500 bg-gray-100' onClick={() => { setVisible(!visible) }} /> : <VisibilityOffIcon className='absolute right-3 top-1/2 transform -translate-y-[-4px] text-gray-500 bg-gray-100 ' onClick={() => { setVisible(!visible) }} />}
                    </div>

                    <div className='relative '>
                        <label htmlFor='confirm_password' className='block text-accent-300 text-base  xl:text-base font-medium p-1 font-jakarta'>Confirm password</label>
                        <input className='w-[100%] text-black p-3 outline-none rounded focus:outline-accent-200 bg-gray-100 font-jakarta relative' type={confirmvisible ? 'text' : 'password'} name='confirm_password' placeholder='Enter your password' />
                        {confirmvisible ? <VisibilityIcon className='absolute right-3 top-1/2 transform -translate-y-[-4px] text-gray-500 bg-gray-100' onClick={() => { setconfirmVisible(!confirmvisible) }} /> : <VisibilityOffIcon className='absolute right-3 top-1/2 transform -translate-y-[-4px] text-gray-500 bg-gray-100 ' onClick={() => { setconfirmVisible(!confirmvisible) }} />}
                    </div>

                    <div className='' >
                        <label htmlFor='phoneNumber' className='block text-accent-300  font-medium p-1 font-jakarta'>Phone number</label>
                        <input className='w-[100%] text-black p-3 outline-none rounded focus:outline-accent-200 bg-gray-100 font-jakarta' type='number' name='phoneNumber' placeholder='Enter your phone number' />
                    </div>

                    <div className='grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 gap-2 place-items-center place-content-center '>
                    <div className='w-full' >
                        <label htmlFor='dateOfBirth' className='block text-accent-300  font-medium p-1 font-jakarta'>Date of birth</label>
                        <input className='w-[100%] text-black p-3 outline-none rounded focus:outline-accent-200 bg-gray-100 font-jakarta' type='date' name='dateOfBirth' />
                    </div>

                    <div className='w-full h-full'>
                    <label  className='block text-accent-300  font-medium p-1 font-jakarta '>Gender</label>

                        <select name="gender" className='p-[0.83rem] h-fit bg-gray-100  outline-none rounded focus:outline-accent-200 w-full'>
                            <option value="" disabled selected>Select Gender</option>
                            <option value="male" className=' text-md'>Male</option>
                            <option value="female" className=' text-md'>Female</option>
                        </select>
                    </div>
                        </div>
                    <button disabled={isSubmitting} className='bg-accent-500 py-2  font-[poppins] text-2xl lg:text-xl lg:mt-3 xl:text-2xl text-white font-medium rounded-xl w-[100%] hover:bg-accent-600' >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
        </section>
    )
}
