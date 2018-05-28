import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { nextTick } from 'q';

// ...
// Example of user credentials to match against incoming credentials.
const username  = 'me@domain.com';
const password  = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends   = ['alice', 'bob'] 

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtZUBkb21haW4uY29tIiwibmFtZSI6IkpvaG4gRG9lIn0.wKPiyFCFnCvNcK6vIqy2e_Cp9vXFwJxpx5HKVu_u3Wk';

// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};

const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body
        })
    );
};

// ...

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { 
        body,       // object
        headers,    // object   
        method,     // string
        url,        // string
    } = req;
    if(url.endsWith('/auth')){
        if(body.name === username && 
        body.password === password || body.tokenFound === token){
            localStorage.setItem("token", token);
            return makeResponse(token);
        }else{
            return makeError(401, "Could not find user")
        }
    }else if(url.endsWith("/friends")){
        return makeResponse(friends);
    }

    
    
    // implement logic for handling API requests, as 
    // defined in the exercise instructions.
  }
}