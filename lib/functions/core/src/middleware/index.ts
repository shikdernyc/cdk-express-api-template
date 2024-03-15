import { ValidationError, type AnySchema } from 'ajv'
import { type RequestHandler, type ErrorRequestHandler } from 'express'
import { TagLogger } from '../utils/logger'
import { validate } from '../utils/schema_validator'

const logger = new TagLogger('Middleware')

export const defaultErrorHandler: ErrorRequestHandler = (err, _, res, __) => {
  logger.log('defaultErrorHandler')
  logger.log(err)
  return res.status(500).json({ message: err.message })
}

export const ValidateRequestBodySchema = (
  schema: AnySchema
): RequestHandler => async (req: any, res: any, next: any): Promise<void> => {
  try {
    await validate(schema, req.body)
    return next()
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ message: e.message })
    }
    return next(e)
  }
}

export const ValidateRequestQuerySchema = (
  schema: AnySchema
) => async (req: any, res: any, next: any): Promise<void> => {
  try {
    await validate(schema, req.query)
    return next()
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ message: e.message })
    }
    return next(e)
  }
}