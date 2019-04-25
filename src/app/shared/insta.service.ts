import { Config } from "./config";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import Instagram from 'node-instagram';


@Injectable()
export class InstaService {
  constructor(private http: HttpClient) {}

    public getToken() {
        const url = "https://instagram.com/oauth/authorize/?client_id=" + 
                    Config.clientId + 
                    "&amp;redirect_uri=http://localhost:8100/insta-page/?&amp;response_type=token&amp;hl=en";
        console.log(url);
        return this.http.get<Object>(url).pipe();
        return this.http.get<Object>(url).pipe(tap(res => {
            console.log(res);
        }));
    }

    public redirectUser() {
        const redirectUri = 'http://localhost:8100/insta-page/';
        const instagram = new Instagram({
            clientId: Config.clientId,
            clientSecret: Config.clientSecret
          });        
        this.http.get('/auth/instagram').pipe(tap(res => {
            instagram.getAuthorizationUrl(redirectUri, { scope: ['basic'] });
        }));        
    }
}