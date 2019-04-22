import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(CountdownComponent) counter: CountdownComponent;

  hiitForm = new FormGroup({
    exerciseTime: new FormControl(''),
    restTime: new FormControl('')
  });

  count: number = 0;

  public onSubmit() {
    console.log(this.counter);
    this.count = this.hiitForm.get('exerciseTime').value;
    this.counter.config.leftTime = this.count;
    this.counter.config.demand = false;
    this.counter.restart();
    console.log(this.counter);
  }
}
