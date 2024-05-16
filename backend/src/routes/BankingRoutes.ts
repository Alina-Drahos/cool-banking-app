import { IPublicToken } from '@src/models/Banking';
import { IReq, IRes } from './types/express/misc'

require('dotenv').config();
const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');


const APP_PORT = process.env.APP_PORT || 8000;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(
  ',',
);


// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
);

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
});

const client = new PlaidApi(configuration);

// Retrieve the Link Token from Plaid
async function get(_: IReq, res: IRes) {
    const configs = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: 'user-id',
      },
      client_name: 'Plaid Quickstart',
      products: PLAID_PRODUCTS,
      country_codes: PLAID_COUNTRY_CODES,
      language: 'en',
    };

    const createTokenResponse = await client.linkTokenCreate(configs);
    res.json(createTokenResponse.data);
  }

  async function put(req: IReq< IPublicToken>, res: IRes){
    console.log(req.body)
    res.send(JSON.stringify(req.body.publicToken));
  }

export default {
    put,
    get,
  } as const