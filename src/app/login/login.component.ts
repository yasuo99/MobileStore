import { Component, OnInit, Input} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {HeaderComponent} from '../header/header.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() loginfail = '';
  public userName = '';
  public passWord = '';
  constructor(private authenticationService: AuthenticationService,private router: Router) {
    
   }
  login = () => {
    this.authenticationService.login(this.userName,this.passWord).subscribe(
      (data) => {
        if(data != null && data.username)
        {
          localStorage.setItem('username',data.username);
          localStorage.setItem('password',data.password);
          this.router.navigateByUrl("/admin/addproduct");
          console.log('Login success');
          this.router.navigateByUrl("/admin/addproduct");
        }
        else{
          this.loginfail = 'Tài khoản hoặc mật khẩu không chính xác';
          console.log('Login fail');
        }
      },
      (err) => console.error(err)
    )
  }
  ngOnInit(): void {
  }

}
