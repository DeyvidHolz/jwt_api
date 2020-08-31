import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Configuration Files
import config from './config/general.config';
import corsConfig from './config/cors.config';

// Routes
import authRoutes from  './routes/auth';
import unauthRoutes from  './routes/unauth';

// Json Web Token Authentication
import User from './models/user.model';

import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwtConfig from './config/jwt.config';

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {
  ...jwtConfig,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  const id = jwt_payload.id;
  let user = User.findByPk(id)

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

// Initializing App
const app = express();
const port = config.port;

app.use(cors(corsConfig));
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRoutes)
app.use(unauthRoutes)

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on ${port}`);
});
