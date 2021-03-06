import { Config } from "./config";
import { City } from "./city";
import { Meta } from "./meta";
import { Topic } from "./topic";
import { Group } from "./group";
import { Member } from "./member";
import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class MeetUpService {
  constructor(private http: HttpClient) {}

  METHOD_CITIES = '/2/cities';
  METHOD_TOPICS = '/find/topics';
  METHOD_GROUPS = '/find/groups';

  getCities(): Observable<Array<City>> {
    const url = Config.meetUpHost +
                this.METHOD_CITIES + 
                '?offset=0&format=json&photo-host=public&page=20&radius=50&order=size&desc=false&lat=51.52&lon=-0.24';
    return this.http.get<Array<City>>(url).pipe();
  /*
      .map(response => { 
        const results = <Array<City>>response.json().results;
        return results;
      })
      .do(data => {
      })
      .catch(this.handleErrors);
  */
  }
/*
  getTopics(query: string) {
    const url = Config.meetUpHost +
                this.METHOD_TOPICS + 
                '?photo-host=public&page=20&query=' + query; 
    return this.http.get(url)
    .map(response => { 
      const topics = <Array<Topic>>response.json();
      topics.forEach(element => {
        // console.log(element);
      });
      return topics;
    })
    .do(data => {
    })
    .catch(this.handleErrors);                
  }
*/
  // TODO send lat & long
  // Returns only groups with join_mode 'open'
  getGroups(lat: number, lon: number) {
    // lat = 41.9097; // TODO get it from GPS
    // lon = 12.2558;
    const latUrl = (lat !== null && lat !== undefined) ? '&lat=' + lat : ''
    const lonUrl = (lon !== null && lon !== undefined) ? '&lon=' + lon : ''
    const url = Config.meetUpHost +
                this.METHOD_GROUPS +
                '?photo-host=public&page=20&sign=true' +
                '&key=' + Config.API_KEY +
                latUrl + 
                lonUrl;
    return this.http.get(url)
      .pipe(tap(response => { 
        const result = new Array<Group>();
        const groups = <Array<Group>>response;
        groups.forEach(element => {
          if (element.join_mode === 'open') {
            //console.log(element.name);
            result.push(element);
          }
        });
        return result;
      }));
  }

  // Make sure the member has photo
  getProfiles(urlname: string) {
    const url = Config.meetUpHost + '/' + 
                urlname +
                '/members?&photo-host=public&page=20' +
                'sign=true' +
                '&key=' + Config.API_KEY;
    return this.http.get(url)
      .pipe(tap(response => {
        const members = <Array<Member>>response;
        const result = new Array<Member>();
        members.forEach(element => {
          if (element.photo) {
            result.push(element);
          }
        });
        return result;
      }));            
  }

  getAuthUrl() {
    const url = 'https://secure.meetup.com/oauth2/authorize?client_id=' +  Config.consumerKey + '&response_type=code&redirect_uri=http://localhost:8100/meetup-login';
    return url;
  }

  getAccessToken(code: string) {
    const url = 'https://cors-anywhere.herokuapp.com/https://secure.meetup.com/oauth2/access';
    let options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    let body = new URLSearchParams();
    body.set('client_id', Config.consumerKey);
    body.set('client_secret', Config.secret);
    body.set('grant_type', 'authorization_code');
    body.set('redirect_uri', 'http://localhost:8100/meetup-login');
    body.set('code', code);
    return this.http.post(url, body.toString(), options);
  }

  getDashboard(access_token: string) {
    const url = Config.meetUpHost + '/dashboard?access_token=' + access_token;
    return this.http.get(url);
  }


  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}