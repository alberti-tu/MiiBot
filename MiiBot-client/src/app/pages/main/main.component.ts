import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('sideMenu') sideMenu: MatSidenav;

  public pageList: { name: string, url: string }[] = [];

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.pageList = [
      { name: 'Home', url: '/home' },
      { name: 'Register', url: '/register' }
    ];
  }

  public navigateTo(page: { name: string, url: string }) {
    this.sideMenu.close();
    this.router.navigateByUrl(page.url);
  }

}
