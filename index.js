require('dotenv').config()
const express = require('express')
const app = express()
const uuid = require('uuid/v4')
const LaunchDarkly = require('launchdarkly-node-server-sdk')
const port = 8080

const ldClient = LaunchDarkly.init("SDK-KEY")

const user = {
    "firstName":"Super",
    "lastName":"Coolguy",
    "key": uuid(),
    "email":"SuperCoolguy@example.com",
    "custom":{
       "groups":"beta_testers"
    }
  };

  // this is for the HTTP request
//app.get('/', async (req,res) => {
 //   let variation = await ldClient.variation("flag1", user, false)
//    res.send(`${variation}`)
//})

//app.listen(port, () => {
//    console.log(`workramp-featureflag-example listening at http://localhost:${port}`)
//})
//--------------------------------

// this is for the event subscription 
ldClient.on('update', (param) => 
{
    console.log('a flag was changed: ' + param.key);
    if (param.key=='flag1')
    {
        console.log('The code to be executed when flag1 changes');
    }
    if (param.key=='flag2')
    {
        console.log('The code to be executed when flag2 changes');
    }
});
  //ldClient.on('update:flag2', () => {
  //  console.log('the flag2 flag was changed');
  //});
  //--------------------------------
