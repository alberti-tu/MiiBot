import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { AdviceService } from 'src/app/services/advice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private adviceService: AdviceService, private authService: AuthenticationService, private httpService: HttpService) { }

  public ngOnInit(): void {}

  public async login(form: { username: string, password: string }): Promise<void> {
    const passwordHash = this.authService.hash(form.password);
    const response = await this.httpService.login(form.username, passwordHash);
    response.subscribe(data => {
      if (data.code === 200) {
        this.authService.saveToken(data.result);
      } else {
        this.authService.removeToken();
        this.adviceService.showToast('Usuario y/o contraseña incorrecto');
      }
    });
  }

}
