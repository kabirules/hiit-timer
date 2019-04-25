import { Component, OnInit } from '@angular/core';
import Instagram from 'node-instagram';
import { Config } from "../shared/config";
import { InstaService } from '../shared/insta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insta-page',
  templateUrl: './insta-page.page.html',
  styleUrls: ['./insta-page.page.scss'],
})
export class InstaPagePage implements OnInit {

  constructor(private instaService: InstaService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      let access_token = params['#access_token'];
      console.log(access_token); // Print the parameter to the console. 
    });

    this.instaService.getToken().subscribe(
      (data) => {

        const instagram = new Instagram({
          clientId: Config.clientId,
          clientSecret: Config.clientSecret,
          accessToken: <string>data,
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

      });
  }

}
