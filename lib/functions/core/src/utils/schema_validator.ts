import Ajv, { ValidationError as AjvValidationError, type AnySchema } from 'ajv'

export class ValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ValidationError'
  }

  static fromAjvError (error: AjvValidationError): ValidationError {
    const message = error.errors.map(e => e.message).join(', ')
    return new ValidationError(message)
  }
}

export const validate = async (schema: AnySchema, input: any): Promise<void> => {
  try {
    const validator = new Ajv().compile(schema)
    const valid = await validator(input)
    if (!valid) {
      throw new ValidationError(
        validator.errors?.map(e => e.message).join(', ') ?? 'Unknown validation error'
      )
    }
  } catch (e) {
    if (e instanceof AjvValidationError) {
      throw ValidationError.fromAjvError(e)
    }
    throw e
  }
}
