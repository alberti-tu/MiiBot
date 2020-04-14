import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private httpService: HttpService) { }

  public ngOnInit(): void {}

  public async login(form: { username: string, password: string }): Promise<void> {
    const passwordHash = this.authService.hash(form.password);
    const response = await this.httpService.login(form.username, passwordHash);
    response.subscribe(data => {
      this.authService.saveToken(data.result)
    });
  }

}
