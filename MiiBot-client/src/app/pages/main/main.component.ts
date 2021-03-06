import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AdviceService } from 'src/app/services/advice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('sideMenu') sideMenu: MatSidenav;

  public pageList: { name: string, icon: string, action: () => void }[] = [];

  constructor(private adviceService: AdviceService, private authService: AuthenticationService, private router: Router) {}

  public ngOnInit(): void {
    this.pageList = [
      { name: 'Inicio', icon: 'home', action: () => this.navigateTo('/home') },
      { name: 'Nuevo usuario', icon: 'person_add', action: () => this.navigateTo('/register') },
      { name: 'Gestión', icon: 'settings', action: () => this.navigateTo('/management') },
      { name: 'Cerrar sesión', icon: 'directions_run', action: () => this.closeSession() }
    ];
  }

  public navigateTo(url: string): void {
    this.sideMenu.close();
    this.router.navigateByUrl(url);
  }

  public closeSession(): void {
    this.authService.removeToken();
    this.adviceService.showToast('La sesión se ha cerrado correctamente');
  }

}
