import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Response, Action, User } from '../models/responses'; 

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient) {}

  public async login(username: string, password: string): Promise<Observable<Response<string>>> {
    const body = { username, password };
    return this.http.post<Response<string>>(environment.url + '/api/login', body);
  }

  public async getActionCount(): Promise<Observable<Response<number>>> {
    return this.http.get<Response<number>>(environment.url + '/api/action/count');
  }

  public async getActionList(page: number, size: number): Promise<Observable<Response<Action[]>>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Response<Action[]>>(environment.url + '/api/action', { params });
  }

  public async registerUser(username: string): Promise<Observable<Response<boolean>>> {
    const body = { username };
    return this.http.post<Response<boolean>>(environment.url + '/api/user', body);
  }

  public async registerAdmin(username: string, password: string): Promise<Observable<Response<boolean>>> {
    const body = { username, password };
    return this.http.post<Response<boolean>>(environment.url + '/api/admin', body);
  }

  public async getUserCount(): Promise<Observable<Response<number>>> {
    return this.http.get<Response<number>>(environment.url + '/api/user/count');
  }

  public async getUserList(page: number, size: number): Promise<Observable<Response<User[]>>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Response<User[]>>(environment.url + '/api/user', { params });
  }

  public async deleteUser(id: string): Promise<Observable<Response<boolean>>> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<Response<boolean>>(environment.url + '/api/user', { params });
  }
}
