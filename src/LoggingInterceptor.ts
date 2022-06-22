import { HttpService } from '@nestjs/axios';
import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { response } from 'express';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

export interface Response<T> {
  response: T;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpClient = new HttpService();
    const request = context.switchToHttp().getRequest();

    let user;
    if(request.user){
      user = {id: request.user.id, email: request.user.email, role: request.user.role}
    }
    else{
      user = "Unauthenticated"
    }
    const requestLog = {
      request: {
        type: "String",
        value: {
          method: request.method,
          pathname: 'http://localhost:3060'+request._parsedUrl.pathname,
          body: request.query ?? request.body,
          user: user
        }
      }
    }
    // httpClient.post('http://orion:1026/v2/entities/trubbi/attrs', requestLog).toPromise()
    //   .then(response => response)
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(tap(
      (body: any) => {
        const responseLog = {
          response: {
            type: "String",
            value: {
              statusCode: response.statusCode,
              body: body,
              user: user
            }
          }
        }
        // httpClient.post('http://orion:1026/v2/entities/trubbi/attrs', responseLog).toPromise()
        // .then(response => response)
        // .catch(function (error) {
        //   error;
        // });
      }
    ));
  }
}