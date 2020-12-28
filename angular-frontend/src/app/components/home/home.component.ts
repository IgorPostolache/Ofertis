import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

}
