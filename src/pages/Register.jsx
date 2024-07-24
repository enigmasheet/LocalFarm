import React from 'react'

const Register = () => {
  
  return (
    <div className='h-[90vh] flex justify-center items-center px-4 '>
        <div className='border shadow-md p-4 rounded-xl max-w-lg w-full'>
            <h1 className='text-teal-500 text-4xl font-bold text-center py-4'>Register</h1>
            <form className='space-y-3' >
              <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id='email' />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' />
              </div>
              <button className='bg-teal-400 text-white p-2 my-4 w-full rounded-md'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register