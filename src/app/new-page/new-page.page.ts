import { Component, OnInit } from '@angular/core';
import { MeetUpService } from '../shared/meetup.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.page.html',
  styleUrls: ['./new-page.page.scss'],
})
export class NewPagePage implements OnInit {

  constructor(public meetUpService: MeetUpService) {
  }

  ngOnInit() {
    this.callGroups();
  }

  callGroups() {
    //const lat = 41.9097; // TODO get it from GPS
    //const lon = 12.2558; // TODO get it from GPS
    let lat: null;
    let lon: null;
    this.meetUpService.getCities().subscribe(
      (data) => {
        console.log(data);
      });
    /*
    this.meetUpService.getGroups(lat, lon)
    .subscribe(
      (data) => {
        this.groups = data;
        this.callProfiles();
      },
      () => alert("callGroups didn't work")
    );
    */    
  }  

}
