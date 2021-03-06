import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<any> , handler: HttpHandler): Observable<HttpEvent<any>> {
    return handler.handle(req).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse) {

            if (error.status === 401) {
                return throwError(error.statusText);
            }
            const applicationError = error.headers.get('Application-Error');
            if (applicationError) {
                return throwError(applicationError);
            }

            const serverError = error.error;
           let modelStateErrors = '';
            if (serverError && typeof serverError === 'object') {
                for (const key in serverError) {
                    if (serverError[key]) {
                        modelStateErrors += serverError[key] + '\n';
                    }
                }
             }

            return throwError(serverError || 'Server Error' || modelStateErrors);
        }
    }));
}
}

export const ErrorInteceptorProvider = {
    provide : HTTP_INTERCEPTORS , useClass : ErrorInterceptor , multi : true
};
