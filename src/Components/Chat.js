import {
   AddCircleRounded,
   CardGiftcard,
   EmojiEmotionsRounded,
   Gif,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import ChatHeader from './ChatHeader';
import Message from './Message';
// import firebase from 'firebase';
// import db from '../firebase';
import axios from '../axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('06c264784f19415e2712', {
   cluster: 'ap1',
});

function Chat() {
   const user = useSelector(selectUser);
   const channelId = useSelector(selectChannelId);
   const channelName = useSelector(selectChannelName);
   const [input, setInput] = useState('');
   const [messages, setMessages] = useState([]);

   const getConversation = (channelId) => {
      if (channelId) {
         axios.get(`/get/conversation?id=${channelId}`).then((res) => {
            setMessages(res.data[0].conversation);
         });
      }
   };

   useEffect(() => {
      // if (channelId) {
      //    db.collection('channels')
      //       .doc(channelId)
      //       .collection('messages')
      //       .orderBy('timestamp', 'asc')
      //       .onSnapshot((snapshot) =>
      //          setMessages(snapshot.docs.map((doc) => doc.data())),
      //       );
      // }
      getConversation(channelId);

      const channel = pusher.subscribe('conversation');
      channel.bind('newMessage', function (data) {
         getConversation(channelId);
      });
   }, [channelId]);

   const sendMessage = (e) => {
      e.preventDefault();

      axios.post(`/new/message?id=${channelId}`, {
         message: input,
         timestamp: Date.now(),
         user: user,
      });
      setInput('');
   };
   return (
      <section className='chat'>
         <ChatHeader key={channelId} channelName={channelName} />

         <div className='chat__message'>
            {messages.map((message, i) => (
               <Message
                  key={i}
                  user={message.user}
                  timestamp={message.timestamp}
                  message={message.message}
               />
            ))}
         </div>

         <div className='chat__input'>
            <AddCircleRounded />
            <form action=''>
               <input
                  value={input}
                  disabled={!channelId}
                  type='text'
                  placeholder={`Message #${channelName}`}
                  onChange={(e) => setInput(e.target.value)}
               />
               <button
                  type='submit'
                  disabled={!channelId}
                  onClick={sendMessage}>
                  Send
               </button>
            </form>

            <div className='chat__inputIcons'>
               <CardGiftcard />
               <Gif />
               <EmojiEmotionsRounded />
            </div>
         </div>
      </section>
   );
}

export default Chat;
