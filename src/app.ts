import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});

app.use(limiter);

app.use('/vehicle/v1', routes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
