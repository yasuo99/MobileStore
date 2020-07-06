import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../login/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() title='';
  @Input() subtitle='';
  @Input() buttonlogout='';
  @Input() button = '';
  public amen = '';
  constructor(private authenticationService: AuthenticationService, private router: Router) { 
  }
  public anlol = (title,button) =>
  {
    this.title = title;
    this.buttonlogout = button;
    console.log(this.buttonlogout)
  }
  ngOnInit(): void {
    if(localStorage.getItem('username') != null)
    {
      this.buttonlogout = 'logout';
    }
    this.button = 'view-cart';
  }
  public onLogout = () => {
    this.authenticationService.logout();
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      this.router.navigateByUrl('/login');
  }

}