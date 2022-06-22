import { HttpService } from '@nestjs/axios';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

export const getErrorMessage = (exception): string => {
  return exception instanceof HttpException
    ? exception.message
    : String(exception);
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = getErrorMessage(exception);


    let user: any;
    if(request.user){
      user = request.user
    }
    else{
      user = "Unauthenticated"
    }

    const httpClient = new HttpService();
    const requestLog = {
      request: {
        type: "String",
        value: {
          method: request.method,
          pathname: request["_parsedUrl"].path,
          body: request.query ?? request.body,
          user: user
        }
      }
    }
    httpClient.post('http://orion:1026/v2/entities/trubbi/attrs', requestLog).toPromise()
      .then(response => response)
      .catch(function (error) {
        console.log(error);
      });

    const responseLog = {response: {
      type: "String",
      value: {
        statusCode: response.statusCode,
        body: message,
        user: user
      }
    }}

    httpClient.post('http://orion:1026/v2/entities/trubbi/attrs', responseLog).toPromise()
    .then(response => response)
    .catch(function (error) {
      error;
    });

    response
    .status(status)
    .json({
      statusCode: status,
      message: message
    });
  }
}