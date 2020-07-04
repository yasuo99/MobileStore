import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userName = 'NgocThanh';
  public passWord = 'NgocThanh';
  constructor(private authenticationService: AuthenticationService,router: Router) { }
  login = () => {
    this.authenticationService.login(this.userName,this.passWord).subscribe(
      (data) => {
        if(data != null && data.username)
        {
          localStorage.setItem('username',data.username);
          localStorage.setItem('password',data.password);
          console.log('Login success');
        }
        else{
          console.log('Login fail');
        }
      },
      (err) => console.error(err)
    )
  }
  ngOnInit(): void {
  }

}
