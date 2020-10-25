import React, { useEffect } from 'react';
import './App.scss';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Components/Login';
import { auth } from './firebase';

function App() {
   const dispatch = useDispatch();
   const user = useSelector(selectUser);

   useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         authUser
            ? dispatch(
                 login({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    displayName: authUser.displayName,
                 }),
              )
            : dispatch(logout());
      });
   }, [dispatch]);
   return (
      <div className='app'>
         {user ? (
            <>
               <Sidebar />
               <Chat />
            </>
         ) : (
            <Login />
         )}
      </div>
   );
}

export default App;
