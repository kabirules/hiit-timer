import { Component, OnInit } from '@angular/core';
import { MeetUpService } from '../shared/meetup.service';
import { Router } from '@angular/router';
import { Config } from '../shared/config';
import { OauthResponse } from '../shared/oauthResponse';

@Component({
  selector: 'app-meetup-login',
  templateUrl: './meetup-login.page.html',
  styleUrls: ['./meetup-login.page.scss'],
})
export class MeetupLoginPage implements OnInit {

  constructor(  private router: Router,
                private meetUpService: MeetUpService) { }

  ngOnInit() {
    let code = '';
    let access_token = '';
    if (this.router.url.indexOf('?code=') > 0) {
      code = this.router.url.substring(this.router.url.indexOf('?code=')+6,this.router.url.length)
    }
    if (!code) {
      window.open(this.meetUpService.getAuthUrl());
    } else {
      this.meetUpService.getAccessToken(code)
      .subscribe(
        (data) => {
          let oauthResponse = <OauthResponse>data;
          access_token = oauthResponse.access_token;
          this.meetUpService.getDashboard(access_token)
          .subscribe(
            (data) => {
              console.log(data);
            });
        },
        () => alert("getAccessToken didn't work")
      );
    }
  }

}
