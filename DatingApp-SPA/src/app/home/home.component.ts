import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registermode = false;
  values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }
  registermodeset()  {
    this.registermode = !this.registermode;
  }


  cancelregistermode(registermode: boolean) {
    this.registermode = registermode;
  }

}
