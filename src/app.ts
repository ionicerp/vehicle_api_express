import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello Kubernetes!');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
