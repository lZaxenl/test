//require('dotenv').config();
import 'dotenv/config';
import fetch from 'node-fetch'; // import Node.js libraries
//const fs = require('fs');
import fs from 'fs'
const url = 'https://api.assemblyai.com/v2/upload'; // private storage URL; only accessible through AssemblyAI API 


let args = process.argv.slice(2);
let audioPath = args[0];

fs.readFile(audioPath, (err, data) => { 
    if (err) {
        return console.log(err);
    }

    const params = {
    headers: {
        "authorization": process.env.ASSEMBLYAI_API_KEY,
        "Transfer-Encoding" : "chunked"
    },
    body: data,
    method: 'POST'
    };

    fetch(url, params)
        .then(response => response.json())
        .then(data => {
        console.log(`URL: ${data['upload_url']}`)
    })
    .catch((error) => {
        console.error(`Error: ${error}`);
    });
});




