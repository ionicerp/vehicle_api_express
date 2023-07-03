import * as jwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';

// Middleware for checking the JWT
export const checkJwt = (jwt as any)({
    // Dynamically provide a signing key based on the kid in the header 
    // and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://ionicerp.us.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'tYk0jDwd29OG9V8BmZJl3FoXaRr5y8GO',
    issuer: `https://ionicerp.us.auth0.com/`,
    algorithms: ['RS256']
});