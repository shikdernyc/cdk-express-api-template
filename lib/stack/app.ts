import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import { Function as LambdaFN } from 'aws-cdk-lib/aws-lambda'
import { CoreLambda, handlerPath } from '../utils/lambda_asset'
import { Duration } from 'aws-cdk-lib'
import { Cors, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'

export class AppCDKStack extends cdk.Stack {

  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
    const helloWorldLambda = new LambdaFN(this, 'HelloWorldHandler', {
      ...CoreLambda,
      handler: handlerPath("hello_world/index.handler"),
      timeout: Duration.seconds(8)
    })
    
    const clientAPIProxyLambda = new LambdaFN(this, 'ClientAPIRequestHandler', {
      ...CoreLambda,
      handler: handlerPath("client_api/index.handler"),
      timeout: Duration.seconds(8)
    })
    
    const api = new LambdaRestApi(this, 'ClientAPI', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowHeaders: ['*'],
        allowMethods: Cors.ALL_METHODS
      },
      handler: clientAPIProxyLambda,
      proxy: true
    })
  }
}
