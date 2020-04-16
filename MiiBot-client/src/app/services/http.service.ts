import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Response, Action } from '../models/responses'; 

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient) {}

  public async login(username: string, password: string): Promise<Observable<Response<string>>> {
    const body = { username, password };
    return this.http.post<Response<string>>(environment.url + '/api/login', body);
  }

  public async getActionListCount(): Promise<Observable<Response<number>>> {
    return this.http.get<Response<number>>(environment.url + '/api/action/count');
  }

  public async getActionList(page: number, size: number): Promise<Observable<Response<Action[]>>> {
    console.log(page, size)
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Response<Action[]>>(environment.url + '/api/action', { params });
  }
}
