import { Injectable } from '@angular/core';

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
}
