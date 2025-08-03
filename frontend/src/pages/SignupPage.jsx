
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Mail, MessageSquare, User, Lock, EyeOff, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSingingUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format"); //check if email address is valid
    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters"); //check password length

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if(success === true) signup(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
        {/* left side */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
              <div className='w-fit max-w-md space-y-8'>
                    {/* LOGO */}
                  <div className="text-center mb-8">
                      <div className='flex flex-col items-center gap-2 group:'>
                          <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/200 transition-colors'>
                          <MessageSquare className='size-6 text-primary'/>
                          </div>
                          <h1 className='text-2xl font-bold mt-2'>Create an account</h1>
                          <p className='text-base-content/60'>Get started with your free account.</p>
                      </div>
                  </div>
                  {/* FORM */}
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className="form-control">
                      <label className='label'>
                        <span className='label-text font-medium'>Full Name</span>
                      </label>
                      {/* fullname input */}
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                         <User className='w-5 h-5 text-gray-500 z-10' />
                        </div>
                        <input 
                          type='text'
                          className='input input-bordered w-full pl-10'
                          placeholder='Enter your full name.'
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                    </div>
                    {/* mail input */}
                    <div className="form-control">
                      <label className='label'>
                        <span className='label-text font-medium'>Email</span>
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <Mail className='w-5 h-5 text-base-content/40 z-10' />
                        </div>
                        <input 
                          type='text'
                          className='input input-bordered w-full pl-10'
                          placeholder='Enter your full name.'
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    {/* password */}
                      <div className="form-control">
                      <label className='label'>
                        <span className='label-text font-medium'>Password</span>
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <Lock className='w-5 h-5 text-base-content/40 z-10' />
                        </div>
                        <input 
                          type={showPassword ? "text" : "password"}
                          className='input input-bordered w-full pl-10'
                          placeholder='*******'
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button type='button' 
                        className='absolute inset-y-5 right-0 pr-3 flex items-center z-10 cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? ( <EyeOff className='size-5 text-base-content/40' />)
                                            : (<Eye className='size-5 text-base-content/40' />) 
                        
                        }
                        </button>
                      </div>
                    </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={isSingingUp}>
                            {isSingingUp ? (
                                <>
                                 <Loader className='size-5 animate-spin'/> 
                                 Loading...
                                </>
                               )
                                        : ("Create Account")}
                        </button>
                  </form>
                  <div className='text-center'>
                               <p className='text-base-content/60'>
                                Already have an account?
                               </p>
                               <Link to="/login" className='link link-primary'>
                                    Sign in                               
                               </Link>
                  </div>
              </div>
        </div>

        {/* right side */}

        <AuthImagePattern 
          title="Join our community"
          subtitle="Connect with friend, share moments, stay in touch."
        />
    </div>
  );
}

export default SignupPage