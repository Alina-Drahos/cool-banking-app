import { IPublicToken } from '@src/models/Banking'
import { IReq, IRes } from './types/express/misc'
import { BankingRoutesLinkData } from '@src/Context'
import { database } from '@src/server'
import { RunResult } from 'sqlite3'
const util = require('util')

require('dotenv').config()
const {
  Configuration,
  PlaidApi,
  Products,
  PlaidEnvironments,
} = require('plaid')

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_ENV = 'sandbox'

let ACCESS_TOKEN:string = '';

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = ['auth', 'transactions']

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = ['US', 'CA']

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
})

const client = new PlaidApi(configuration)

// Generate a unique Guid for every session
const guid = function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Retrieve the Link Token from Plaid
async function get(_: IReq, res: IRes) {
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: guid(),
    },
    client_name: 'Plaid Quickstart',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',
  }

  const createTokenResponse = await client.linkTokenCreate(configs)
  const data = createTokenResponse.data as BankingRoutesLinkData
  console.log(data)
  res.json(data)
}
const prettyPrintResponse = (response: any) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }))
}

// Send the Public Token to Plaid in exchange for an "Access Token"
async function put(req: IReq<IPublicToken>, res: IRes) {
  const tokenResponse = await client.itemPublicTokenExchange({
    public_token: req.body.publicToken,
  })

  prettyPrintResponse(tokenResponse)
  ACCESS_TOKEN = tokenResponse.data.access_token as string;
  
  database.serialize(() => {
    database.run('DELETE FROM accessToken', function(err:Error) {
      if (err) {
          console.error('Error deleting rows:', err.message);
      } else {
          console.log('Rows deleted successfully');
      }
  });
    database.run(
        'INSERT INTO accessToken (accesstoken) VALUES (?)',
        [ACCESS_TOKEN],
        (err: Error) => {
            if (err) {
                // Handle error
                console.log('Error occurred:', err.message);
            } else {
                // Insertion successful
                console.log('AccessToken inserted successfully');
               
            }
        }
    );
    const sqlQuery = 'SELECT * FROM accessToken';
    database.all<any>(sqlQuery, (err: Error | null, rows: any[]) => {
      if (err) {
          // Handle query error
          console.error('Error executing query:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          // Send query results as JSON response
          //res.json(rows);
          console.log(rows);
      }
  });
  });
}

export default {
  put,
  get
} as const
