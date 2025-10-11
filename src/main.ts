import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { applyGlobalConfig } from './global-config'
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  const config = new DocumentBuilder()
    .setTitle('Node.js Course')
    .setDescription(
      'Node.js Rest API - NestJS, Typescripty, DDD, Clean Architecture and Automated Tests',
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      description: 'Informar o JWT para autorizar o acesso ',
      name: 'Authorization',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  applyGlobalConfig(app)
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0')
}
bootstrap()
