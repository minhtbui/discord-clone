import { Avatar } from '@material-ui/core';
import React from 'react';

function Message({ user, timestamp, message }) {
   return (
      <div className='message'>
         <Avatar src={user.photo} />
         <div className='message__info'>
            <h4>
               {user.displayName}
               <span>{new Date(parseInt(timestamp)).toLocaleString()}</span>
            </h4>
            <p>{message}</p>
         </div>
      </div>
   );
}

export default Message;
