import { Component, OnInit } from '@angular/core';
import { MeetUpService } from '../shared/meetup.service';
import { Member } from '../shared/member';
import { Group } from '../shared/group';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.page.html',
  styleUrls: ['./new-page.page.scss'],
})
export class NewPagePage implements OnInit {

  constructor(public meetUpService: MeetUpService,
              private geolocation: Geolocation) {
  }

  members: Array<Member>;
  groups: Array<Group>;

  index: number;
  photo_url: string;
  bigPhoto_url: string;
  name: string;

  lat: number; // = 41.9097; // TODO get it from GPS
  lon: number; // = 12.2558; // TODO get it from GPS  

  ngOnInit() {
    this.photo_url = 'https://media1.tenor.com/images/556e9ff845b7dd0c62dcdbbb00babb4b/tenor.gif?itemid=5300368';
    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.callGroups();
    }).catch((error) => {
      console.log('Error getting location', error);
    });    
  }

  callGroups() {
    //this.lat = 47.4813602;
    //this.lon = 18.9902201;
    this.meetUpService.getGroups(this.lat, this.lon)
    .subscribe(
      (data) => {
        this.groups = <Array<Group>>data;
        this.callProfiles();
      },
      () => alert("callGroups didn't work")
    );
  }

  callProfiles() {
    const urlname = this.getRandomGroup();
    this.meetUpService.getProfiles(urlname)
    .subscribe(
      (data) => {
        this.members = <Array<Member>>data;
        this.indexRandomUpdate();
        this.dataUpdate();
        //console.log(this.members);
      },
      () => alert("callProfiles didn't work")
    );
  }

  getRandomGroup() {
    const totalGroups = this.groups.length;
    const index = Math.floor(Math.random() * totalGroups);
    return this.groups[index].urlname;
  }

  indexRandomUpdate() {
    const totalMembers = this.members.length;
    this.index = Math.floor(Math.random() * totalMembers);
  }

  dataUpdate() {
    try {
      this.photo_url = this.members[this.index].photo.photo_link;
      this.bigPhoto_url = this.members[this.index].photo.highres_link;
      this.name = this.members[this.index].name + ', ' +  this.members[this.index].localized_country_name;
      return true;
    } catch (e) {
      this.photo_url = 'https://media1.tenor.com/images/556e9ff845b7dd0c62dcdbbb00babb4b/tenor.gif?itemid=5300368';
      this.bigPhoto_url = 'https://media1.tenor.com/images/556e9ff845b7dd0c62dcdbbb00babb4b/tenor.gif?itemid=5300368';
      this.name = 'Error on profile retrieving'
      return false;
    }
  }

  nextMember() {
    this.photo_url = 'https://media1.tenor.com/images/556e9ff845b7dd0c62dcdbbb00babb4b/tenor.gif?itemid=5300368';
    this.index = this.index + 1;
    if (this.index === this.members.length) {
      this.index = 0;
    }
    if (!this.dataUpdate()) {
      this.nextMember();
    }
  }

  prevMember() {
    this.photo_url = 'https://media1.tenor.com/images/556e9ff845b7dd0c62dcdbbb00babb4b/tenor.gif?itemid=5300368';
    this.index = this.index - 1;
    if (this.index < 0) {
      this.index = this.members.length -1;
    }
    if (!this.dataUpdate()) {
      this.prevMember();
    }    
  }  
}
