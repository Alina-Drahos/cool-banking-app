/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path'
import helmet from 'helmet'
import express, { Request, Response, NextFunction } from 'express'
import logger from 'jet-logger'

import 'express-async-errors'

import BaseRouter from '@src/routes/api'
import Paths from '@src/constants/Paths'

import EnvVars from '@src/constants/EnvVars'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'

import { NodeEnvs } from '@src/constants/misc'
import { RouteError } from '@src/other/classes'
import { Database } from 'sqlite3'

// **** Variables **** //
const app = express()
const cors = require('cors')
//const sqlite3 = require('sqlite3').verbose(); // verbose mode for detailed stack traces
let sql;
app.use(cors())

// **** Setup **** //

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(EnvVars.CookieProps.Secret))


// Create a connection to the database
// Create connection to SQLite database
export const database = new Database('./database.db', (err:any) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const db = function DatabaseTable(){
  database.serialize(() => {
    database.run(`
        CREATE TABLE IF NOT EXISTS accessToken (
            id INTEGER PRIMARY KEY,
            accesstoken TEXT
        )
    `);
  });
}

db();
/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/
// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'))
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet())
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter)

// Add error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
      logger.err(err, true)
    }
    let status = HttpStatusCodes.BAD_REQUEST
    if (err instanceof RouteError) {
      status = err.status
    }
    return res.status(status).json({ error: err.message })
  },
)

// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views')
app.set('views', viewsDir)

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public')
app.use(express.static(staticDir))

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  return res.redirect('/users')
})

// Redirect to login if not logged in.
app.get('/users', (_: Request, res: Response) => {
  return res.sendFile('users.html', { root: viewsDir })
})

// **** Export default **** //

export default app
