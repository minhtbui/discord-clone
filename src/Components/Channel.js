import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannel } from '../features/appSlice';

function Channel({ id, channelName }) {
   const dispatch = useDispatch();
   return (
      <section
         className='channel'
         onClick={() =>
            dispatch(
               setChannel({
                  channelId: id,
                  channelName: channelName,
               }),
            )
         }>
         <h4>
            <span>#</span>
            {channelName}
         </h4>
      </section>
   );
}

export default Channel;
