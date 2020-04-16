import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';

const key = 'token'; 

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private router: Router) { }

  public getToken(): string {
    return localStorage.getItem(key);
  }

  public saveToken(value: string): void {
    localStorage.setItem(key, value);
    this.router.navigateByUrl('/home');
  }

  public removeToken(): void {
    localStorage.removeItem(key);
    this.router.navigateByUrl('/login');
  }

  public hash(value: string): string {
    return crypto.SHA256(value).toString(crypto.enc.Hex);
  } 
}
