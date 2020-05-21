import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('sideMenu') sideMenu: MatSidenav;

  public pageList: { name: string, icon: string, action: () => void }[] = [];

  constructor(private authService: AuthenticationService, private router: Router) {}

  public ngOnInit(): void {
    this.pageList = [
      { name: 'Home', icon: 'home', action: () => this.navigateTo('/home') },
      { name: 'Register', icon: 'person_add', action: () => this.navigateTo('/register') },
      { name: 'Cerrar sesión', icon: 'directions_run', action: () => this.authService.removeToken() }
    ];
  }

  public navigateTo(url: string) {
    this.sideMenu.close();
    this.router.navigateByUrl(url);
  }

  public closeSession() {
    this.authService.removeToken();
  }

}
