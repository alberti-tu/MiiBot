import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

const key = 'token'; 

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem(key);
  }

  public saveToken(value: string): void {
    localStorage.setItem(key, value);
  }

  public removeToken(): void {
    localStorage.removeItem(key);
  }

  public hash(value: string): string {
    return crypto.SHA256(value).toString(crypto.enc.Hex);
  } 
}
