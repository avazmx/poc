import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // I get the token from the auth service.
        const authToken = this.authService.getToken();

        // If I have the token then I send it otherwise I dont append the authorization header.
        let authRequest;
        if (authToken !== '') {
            authRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authToken) });
        } else {
            authRequest = req.clone({});
        }

        return next.handle(authRequest);
    }
}

