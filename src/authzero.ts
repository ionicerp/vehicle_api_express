import jwtDefault from 'express-jwt';
import jwksRsa from 'jwks-rsa';

// Get callable function
const jwt = jwtDefault as any;

export const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://ionicerp.us.auth0.com/.well-known/jwks.json`
    }),
    audience: 'tYk0jDwd29OG9V8BmZJl3FoXaRr5y8GO',
    issuer: `https://ionicerp.us.auth0.com/`,
    algorithms: ['RS256']
});
