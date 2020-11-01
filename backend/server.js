import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import mongoData from './mongoData.js';
import Pusher from 'pusher';

//4DNJY7uu3QIFg12u
//! app config
const app = express();
const port = process.env.PORT || 8000;

const pusher = new Pusher({
   appId: '1100330',
   key: '06c264784f19415e2712',
   secret: 'ecf1def31db790207a2f',
   cluster: 'ap1',
   useTLS: true,
});

//! middle wares
app.use(express.json());
app.use(cors());

//! db config
const mongoURI =
   'mongodb+srv://admin:4DNJY7uu3QIFg12u@cluster0.rimny.mongodb.net/discordDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

// connect to Pusher to watch MongoDB
mongoose.connection.once('open', () => {
   const changeStream = mongoose.connection
      .collection('discordchannels')
      .watch();

   changeStream.on('change', (change) => {
      if (change.operationType === 'insert') {
         pusher.trigger('channels', 'newChannel', {
            change: change,
         });
      } else if (change.operationType === 'update') {
         pusher.trigger('conversation', 'newMessage', {
            change: change,
         });
      } else {
         console.log('Error triggering Pusher');
      }
   });
});

//! api routes
app.post('/new/channel', (req, res) => {
   const dbData = req.body;
   mongoData.create(dbData, (err, data) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(201).send(data);
      }
   });
});
app.get('/get/channelList', (req, res) => {
   mongoData.find((err, data) => {
      if (err) {
         res.status(500).send(err);
      } else {
         let channels = [];

         data.map((channelData) => {
            const channelInfo = {
               id: channelData._id,
               name: channelData.channelName,
            };
            channels.push(channelInfo);
         });
         res.status(200).send(channels);
      }
   });
});
app.post('/new/message', (req, res) => {
   const newMessage = req.body;

   mongoData.update(
      { _id: req.query.id },
      { $push: { conversation: newMessage } },
      (err, data) => {
         if (err) {
            res.status(500).send(err);
         } else {
            res.status(200).send(data);
         }
      },
   );
});
app.get('/get/conversation', (req, res) => {
   const id = req.query.id;
   mongoData.find({ _id: id }, (err, data) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.status(200).send(data);
      }
   });
});

//! listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
