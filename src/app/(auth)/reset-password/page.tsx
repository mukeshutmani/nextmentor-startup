'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import {useForm} from 'react-hook-form';


const page = () => {

    const searchParams = useSearchParams();
    const {register, handleSubmit, formState: {errors}} = useForm()

    const token = searchParams.get("token")
    const email  = searchParams.get("email")

    const dataSubmit = async (data: any) => {
        try {
            const response = await axios.post("/api/reset-password", {
                    token,
                    email,
                    newPassword: data.password
                  })
            console.log(response);
            alert("Password reset succesfully")
        } catch (error: any) {
               console.error(error.response.data);
        }
    }


    return (
    <div className='bg-gray-600 h-screen gap-4  flex justify-center items-center'>
        <h1 className='absolute mb-36'>
           Reset Password
        </h1>

        <form onSubmit={handleSubmit(dataSubmit)} >
            <input 
            className='bg-white rounded-sm px-4 py-1 border-gray-400'
            id='password'
            type="password"
            placeholder='Enter New Password'
            {...register("password", {
                required: "password is required",
                minLength: {value: 6, message: "Minimum 6 character required"}

            })}
            />
            {errors.password && <p>{errors.password.message as string}</p>}

            <button 
            type='submit'
            className='flex mt-4 cursor-pointer bg-white rounded-sm px-4 py-1 border-gray-400'>
                Reset Password
            </button>
            
        </form>


    </div>
  )
}

export default page