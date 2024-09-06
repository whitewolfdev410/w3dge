import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormInput = ({ type = 'text', placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='py-[15px] px-[20px] rounded-3xl w-full text-white outline-none border-2 border-[#00BB35] placeholder-[#00BB35]'
        />
    )
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='bg-black min-h-screen h-screen w-full flex items-center justify-center'>
            <div className='w-[50%] bg-[url("/assets/images/login-bg.png")] h-full'></div>
            <div className='w-[50%] h-full flex flex-col items-center justify-center'>
                <img className='hide md:block' src='/assets/images/login-logo.png' alt='login-logo' />
                <div className='mt-[80px] flex flex-col w-[350px] mb-20px'>
                    <h1 className='text-[30px] font-[GlacialIndifference] font-bold'>Nice to see you!</h1>
                    <p className='text-[14px] text-[#A0AEC0]'>Enter your email and password to sign in.</p>
                    <div>
                        <p className='mt-[25px] pl-[8px]'>Email</p>
                        <FormInput value={email} onChange={setEmail} placeholder='Your email address' />
                        <p className='mt-[25px] pl-[8px]'>Password</p>
                        <FormInput value={password} onChange={setPassword} type='password' placeholder='Your password' />
                        <div className='mt-[25px]'>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" />
                                <div className="relative w-9 h-5 bg-gray-200 outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#00BB35]"></div>
                                <span className="ms-3 text-sm font-medium text-gray-300">Remember me</span>
                            </label>
                        </div>
                        <button className='w-full rounded-xl bg-[#00BB35] py-[12px] mt-[30px] text-[12px]'>SIGN IN</button>
                        <p className='text-center mt-[20px] text-[14px]'>Don't have an account? <Link to='/register' className='font-bold'>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;