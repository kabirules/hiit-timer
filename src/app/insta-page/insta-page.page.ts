import { Component, OnInit } from '@angular/core';
import Instagram from 'node-instagram';
import { Config } from "../shared/config";
import { InstaService } from '../shared/insta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insta-page',
  templateUrl: './insta-page.page.html',
  styleUrls: ['./insta-page.page.scss'],
})
export class InstaPagePage implements OnInit {

  constructor(private instaService: InstaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    const url = "https://instagram.com/oauth/authorize/?client_id=" + 
                Config.clientId + 
                "&amp;redirect_uri=http://localhost:8100/insta-page&amp;response_type=token&amp;hl=en";
    let access_token = '';
    if (this.router.url.indexOf('#access_token=') > 0) {
      access_token = this.router.url.substring(this.router.url.indexOf('#access_token=')+14,this.router.url.length)
    }
    if (!access_token) {
      window.open(url);
    } else {
      const instagram = new Instagram({
        clientId: Config.clientId,
        clientSecret: Config.clientSecret,
        accessToken: access_token,
      });
      instagram.get('users/self', (err, data) => {
        if (err) {
          // an error occured
          console.log('2');
          console.log(err);
        } else {
          console.log('3');
          console.log(data);
        }
      });
      instagram
        .get('tags/paris')
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          // An error occured
          console.log(err);
      });      
    }
    // gender-api
    this.instaService.getGender().subscribe(res => console.log(res));
  }
}
