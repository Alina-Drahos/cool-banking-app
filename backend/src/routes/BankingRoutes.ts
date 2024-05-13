import { IPublicToken } from '@src/models/Banking';
import { IReq, IRes } from './types/express/misc'



async function get(_: IReq, res: IRes) {
    res.send("I am outputing a Link Token");
  }

  async function put(req: IReq< IPublicToken>, res: IRes){
    console.log(req.body)
    res.send(JSON.stringify(req.body.publicToken));
  }

export default {
    put,
    get,
  } as const