import { IvalidCredentialsError } from '@/shared/application/erros/invalid-credentials-error'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

import { FastifyReply } from 'fastify'
@Catch(IvalidCredentialsError)
export class InvalidCredentialsErrorFilter implements ExceptionFilter {
  catch(exception: IvalidCredentialsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()

    response.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: exception.message,
    })
  }
}
