export const handler = async (event: any, context: any): Promise<any> => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`CONTEXT: ${JSON.stringify(context)}`)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!'
    })
  }
}