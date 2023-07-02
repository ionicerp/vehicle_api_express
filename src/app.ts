import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.json());

app.use('/vehicle/v1', routes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
