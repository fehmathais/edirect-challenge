import express from 'express';
import {json} from 'body-parser';

const app = express();
app.use(json());

app.get('/', (req, res) => {
    res.send('It is working!');
});

app.listen(3000, () => {
    console.log('Listing on port 3000!');
});