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

  error: string;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    if(userService.getUser()) {
      router.navigateByUrl('/dashboard');
    }
  }

  tryRegister() {
    if(!/^([a-zA-Z0-9-_]{2,32})$/.test(this.username)) {
      this.error = 'Username must be alphanumeric, and between 2 and 32 characters';
      return;
    }
    if(!(/[a-zA-Z]+/.test(this.password) && /[0-9]+/.test(this.password) && this.password.length >= 8)) {
      this.error = 'Password must be at least 8 characters, and contain at least 1 letter and 1 number';
      return;
    }
    this.auth.register(this.username, this.password)
      .subscribe(user => {
          this.router.navigateByUrl('/dashboard');
        },
        err => {
          console.log(err);
          this.error = err.error.message;
        });

  }

}
