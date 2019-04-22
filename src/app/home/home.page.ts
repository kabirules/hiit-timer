import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  hiitForm = new FormGroup({
    exerciseTime: new FormControl(''),
    restTime: new FormControl('')
  });

  count: number = 0;

  public onSubmit() {
    this.count = this.hiitForm.get('exerciseTime').value;
    while (this.count > 0) {
      console.log(this.count);
      this.count = this.count - 1;
    }
  }
}
