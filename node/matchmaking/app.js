const express = require('express');
const app = express();
const port = 5101;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let waiting_player = null;

app.post('/play', (req, res) => {
    const postData = req.body;
  
    res.send('POST request received successfully');
    if(waiting_player){
        console.log("Two Players found: ", postData, " and: ", waiting_player);
        waiting_player = null;
        //TODO: Send notification to users who will then call game service
    }else{
        console.log("waiting for player");
        waiting_player = postData;
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});