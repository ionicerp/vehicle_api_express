import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.json());

app.use('/v1/vehicle', routes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
