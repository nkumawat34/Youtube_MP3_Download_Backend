var express = require('express');
var app = express();
var cors=require("cors")
var bodyparser=require('body-parser')
const port = 3000;
const axios = require('axios');
const fs = require('fs');
const path = require('path');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});
function extractVideoID(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/|v\/|playlist\?list=|user\/.+\/|c\/|channel\/|attribution_link\?.+v%3D)|youtu\.be\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}



  
app.post('/download', async function (req, res) {

    const {url}=req.body;
    
    const videoID = extractVideoID(url);
    console.log(videoID)
    const options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: {id: videoID},
        headers: {
          'x-rapidapi-key': '19b1e5fde3msh87a9547aea397fap14ee4ejsnd57b2257b718',
          'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
       
         res.json(response.data);
      }
      catch
      {
            console.log("error came")
      }

        
  });


app.listen(port, function () {
  console.log('Youtube Download app listening on port 3000!');
});