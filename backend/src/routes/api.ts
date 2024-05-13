import { Router } from 'express'
import jetValidator from 'jet-validator'

import Paths from '../constants/Paths'
import User from '@src/models/User'
import UserRoutes from './UserRoutes'
import BankingRoutes from './BankingRoutes'

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator()


  
  // ** Add UserRouter ** //
  
const userRouter = Router()
  
const bankingRouter = Router()

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll)

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
)

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
)

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
)


bankingRouter.get(Paths.Banking.Get, BankingRoutes.get)

bankingRouter.put(Paths.Banking.Put, BankingRoutes.put)

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter)
apiRouter.use(Paths.Banking.Base, bankingRouter)



// **** Export default **** //

export default apiRouter
