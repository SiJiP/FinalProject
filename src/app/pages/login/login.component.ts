import { ValidationService } from 'src/app/services/validation.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'webui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;

  constructor(private auth: AuthService,
              private validServ: ValidationService) {
  }

  login: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(this.validServ.loginRegExp)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.validServ.passwordRegExp)])
  });

  onSubmit(event): void {
    event.preventDefault();

    const data: { username: string, password: string } = {
      password: this.login.get('username').value,
      username: this.login.get('password').value
    };
    this.auth.signIn(data);
  }

  ngOnInit() {
  }
}
