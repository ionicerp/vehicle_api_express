
// import jwt from 'express-jwt';
// import jwksRsa from 'jwks-rsa';

// export const checkJwt = jwt.expressjwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://ionicerp.us.auth0.com/.well-known/jwks.json`
//   }),
//   audience: 'tYk0jDwd29OG9V8BmZJl3FoXaRr5y8GO',
//   issuer: `https://ionicerp.us.auth0.com/`,
//   algorithms: ['RS256']
// });

import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

export const checkJwt = expressjwt({
    secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://ionicerp.us.auth0.com/.well-known/jwks.json`,
    }) as any,
    audience: 'tYk0jDwd29OG9V8BmZJl3FoXaRr5y8GO',
    issuer: `https://ionicerp.us.auth0.com/`,
    algorithms: ['RS256'],
});
