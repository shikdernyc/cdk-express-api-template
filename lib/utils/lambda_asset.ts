import { Code, Runtime } from 'aws-cdk-lib/aws-lambda'
import path = require('path')

const code = Code.fromAsset(
  path.join(__dirname, '..', 'functions', 'core'),
  {
    bundling: {
      image: Runtime.NODEJS_18_X.bundlingImage,
      command: [
        'bash',
        '-c',
        `cp -aur . /asset-output &&
        cd /asset-output &&
        mkdir .npm &&
        export npm_config_cache=.npm &&
        npm install && 
        npm run build`
      ]
    }
  }
)

export const CoreLambda = {
  code,
  runtime: Runtime.NODEJS_18_X,
  memorySize: 512
}

export const handlerPath = (relativePath: string) => {
  return `dist/lambda/${relativePath}`
}