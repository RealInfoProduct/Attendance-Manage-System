import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TMS';

  user

  constructor(private authService:AuthService,
              private router:Router, 
          
    ){
  //    if (this.authService.user != undefined)
  //    this.authService.user.subscribe(x => this.user = x);
  // //  this.bnIdle.startWatching(100).subscribe((res) => {
  // //    if (res) {
  // //     // this.authService.signOut()
  // //    }
  // //  })
  }

  ngOnInit(): void {
    this.authService.autoSignIn();
    
  }

}

