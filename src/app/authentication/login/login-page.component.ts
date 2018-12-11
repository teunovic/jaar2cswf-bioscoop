import {Component} from '@angular/core';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  username: string;
  password: string;

  responseError: string;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    if(userService.getUser()) {
      router.navigateByUrl('/dashboard');
    }
  }

  tryLogin() {
    this.auth.login(this.username, this.password)
      .subscribe(user => {
        console.log('welkom, ' + user.username);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        console.log(err);
        this.responseError = err.error.message;
      });

  }

}
