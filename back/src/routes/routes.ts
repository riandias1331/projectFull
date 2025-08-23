import { Router } from 'express'
const route: Router = Router()


import * as userControllerMongo from '../controllers/user.mogo.controller'
import * as userControllerPostgres from '../controllers/user.postgres'
import * as auth from '../middlewares/auth'
import validateUser from '../utils/validator'

// Mongo
  //Private Routes
  route.get('/users', auth.authMiddleware, userControllerMongo.getUserAll)
  route.get('/users/:id', auth.authMiddleware, userControllerMongo.getUser)
  route.put('/users', auth.authMiddleware, validateUser, userControllerMongo.updateUser)
  route.delete('/users/:id', auth.authMiddleware, userControllerMongo.deleteUser)
  route.delete('/users', auth.authMiddleware, userControllerMongo.deleteUserAll)

  //Public Routes
  route.post('/users', validateUser, userControllerMongo.createUser)
  route.post('/api/register', validateUser, userControllerMongo.register)
  route.post('/api/login', userControllerMongo.login)


// postgres
  //Private
  route.get("/users-postgres", auth.authMiddleware, userControllerPostgres.getAllUsers)
  route.get("/users-postgres/:id", auth.authMiddleware, userControllerPostgres.getUserById)
  route.put("/users-postgres", auth.authMiddleware, validateUser, userControllerPostgres.updateUser)
  route.delete("/users-postgres", auth.authMiddleware, userControllerPostgres.deleteAll)
  route.delete("/users-postgres/:id", auth.authMiddleware, userControllerPostgres.deleteUser)
  
  //Public
  route.post("/users-postgres", validateUser, userControllerPostgres.createUser)




export default route