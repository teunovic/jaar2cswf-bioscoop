import {Component} from '@angular/core';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  username: string;
  password: string;

  responseError: string;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    if(userService.getUser()) {
      router.navigateByUrl('/movies');
    }
  }

  tryRegister() {
    this.auth.register(this.username, this.password)
      .subscribe(user => {
          this.router.navigateByUrl('/movies');
        },
        err => {
          console.log(err);
          this.responseError = err.error.message;
        });

  }

}
