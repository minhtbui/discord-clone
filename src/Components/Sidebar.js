import React, { useEffect, useState } from 'react';
import Channel from './Channel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import { HeadsetMic, Mic, Settings } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';

function Sidebar() {
   const user = useSelector(selectUser);
   const [channels, setChannels] = useState([]);

   useEffect(() => {
      db.collection('channels').onSnapshot((snapshot) => {
         setChannels(
            snapshot.docs.map((doc) => ({
               id: doc.id,
               channel: doc.data(),
            })),
         );
      });
   }, []);

   const handleAddChannel = () => {
      const channelName = prompt('Enter a channel name:');

      if (channelName) {
         db.collection('channels').add({
            channelName: channelName,
         });
      }
   };
   return (
      <section className='sidebar'>
         <div className='sidebar__top'>
            <h3>Sidebar Top</h3>
            <ExpandMoreIcon />
         </div>

         <div className='sidebar__channels'>
            <div className='sidebar__channelsHeader'>
               <h4>
                  <ExpandMoreIcon />
                  Test
               </h4>

               <AddIcon
                  className='sidebar__addChannel'
                  onClick={() => handleAddChannel()}
               />
            </div>
            <div className='sidebar__channelsList'>
               {channels.map(({ id, channel }) => (
                  <Channel key={id} id={id} channelName={channel.channelName} />
               ))}
            </div>
         </div>

         <div className='sidebar__voice'>
            <SignalCellularAltIcon
               className='sideber__voiceSignal'
               fontSize='large'
            />
            <div className='sidebar__voiceInfo'>
               <h3>Voice Connected</h3>
               <span>Stream</span>
            </div>
            <div className='sidebar__voiceIcons'>
               <InfoOutlinedIcon />
               <CallIcon />
            </div>
         </div>

         <div className='sidebar__user'>
            <Avatar src={user.photo} onClick={() => auth.signOut()} />
            <div className='sidebar__userProfile'>
               <h3>{user.displayName}</h3>
               <span>#{user.uid.substring(0, 5)}</span>
            </div>
            <div className='sidebar__userIcons'>
               <Mic />
               <HeadsetMic />
               <Settings />
            </div>
         </div>
      </section>
   );
}

export default Sidebar;
