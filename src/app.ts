import express, { Request, Response, NextFunction } from 'express';
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

// Custom error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Check if the error is an UnauthorizedError
    if (err.name === 'UnauthorizedError') {
        // Send a simplified error response with just the error title
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        // For other types of errors, you may want to handle them differently
        // You can customize the error responses as needed
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

// steps 01
// says VEHICLE FE is connecting to this API, the FE need to provide a username & password for exchange a JWT token

// steps 02
// says VEHICLE FE is consuming the list payload, the FE need to provide with the JWT token, we will then make sure it's validity