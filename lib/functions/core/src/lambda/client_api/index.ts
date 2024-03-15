import * as awsServerlessExpress from 'aws-serverless-express'
import api from './app'

export const handler = async (event: any, context: any): Promise<awsServerlessExpress.Response> => {
  const server = awsServerlessExpress.createServer(api)
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`CONTEXT: ${JSON.stringify(context)}`)
  const response = await awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise
  return response
}
