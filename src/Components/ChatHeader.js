import {
   HelpRounded,
   InboxRounded,
   Notifications,
   PeopleAlt,
   PinDropRounded,
   SearchRounded,
} from '@material-ui/icons';
import React from 'react';

function ChatHeader({ channelName }) {
   return (
      <div className='chatHeader'>
         <div className='chatHeader__left'>
            <h3>
               <span>#</span>
               {channelName}
            </h3>
         </div>

         <div className='chatHeader__right'>
            <Notifications />
            <PinDropRounded />
            <PeopleAlt />

            <div className='chatHeader__search'>
               <input type='text' placeholder='Search' />
               <SearchRounded />
            </div>

            <InboxRounded />
            <HelpRounded />
         </div>
      </div>
   );
}

export default ChatHeader;
