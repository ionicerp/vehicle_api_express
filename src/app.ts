import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});

app.use(limiter);

app.use(cors({
    origin: 'https://app.ionicerp.com',
    credentials: true,
}));

app.use('/vehicle/v1', routes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

// steps 01
// says VEHICLE FE is connecting to this API, the FE need to provide a username & password for exchange a JWT token

// steps 02
// says VEHICLE FE is consuming the list payload, the FE need to provide with the JWT token, we will then make sure it's validity