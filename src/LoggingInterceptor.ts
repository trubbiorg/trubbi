import { HttpService } from '@nestjs/axios';
import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Response<T> {
  response: T;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const httpClient = new HttpService();
    const req = context.switchToHttp().getRequest();
    const body = {
      request: {
        type: "String",
        value: {
          method: req.method,
          pathname: 'http://localhost:3060'+req._parsedUrl.pathname,
          body: req.query ?? req.body
        }
      }
    }
    httpClient.post('http://orion:1026/v2/entities/logs/attrs', body).toPromise()
      .then(response => response)
      .catch(function (error) {
        error;
      });

    return next.handle().pipe(map(response => {

      // const statusCode: number = res.statusCode
      const body = {response: response}
      httpClient.post('http://orion:1026/v2/entities/logs/attrs', body).toPromise()
        .then(response => response)
        .catch(function (error) {
          error;
        });

      // console.log(statusCode, body, headers);
      return (response);
    }));
  }
}