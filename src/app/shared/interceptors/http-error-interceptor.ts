import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    /**
     * Itercepts every request error in order to handle a good message.
     * @param req request to be handle.
     * @param next get to the next step of the request
     */
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Unknown error, please contact to the system administrator';
                // Check if the request has a error object.
                if (error.error.message) {
                    // I check the status code if is 401 then user or pass are not correct so
                    // I select the first error message that is for login failed.
                    if (error.status === 401) {
                        errorMessage = 'Unauthorized';
                    } else {
                        errorMessage = error.error.message;
                    }
                }
                // I handle whatever I want to do with the error, then return the throwError.
                // alert(errorMessage);
                /* Swal({
                    type: 'error',
                    title: 'Something went wrong',
                    text: errorMessage
                  }); */
                return throwError(error);
            })
        );
    }
}
