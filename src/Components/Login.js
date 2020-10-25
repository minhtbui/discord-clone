import React from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

function Login() {
   const logIn = () => {
      auth.signInWithPopup(provider).catch((error) => alert(error.message));
   };
   return (
      <section className='login'>
         <img
            src='https://i.pinimg.com/originals/62/d1/26/62d126dcfc3c38c276627e6a251a6c25.jpg'
            alt='logo'
         />
         <Button onClick={logIn}>Login</Button>
      </section>
   );
}

export default Login;
