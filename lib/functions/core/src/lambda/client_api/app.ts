import * as express from 'express'
import * as bodyParser from 'body-parser'
import router from './router'
import { eventContext } from 'aws-serverless-express/middleware'
import { defaultErrorHandler } from '../../middleware'

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(eventContext())

// Enable CORS for all methods
app.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use(router)

app.use(defaultErrorHandler)

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app
