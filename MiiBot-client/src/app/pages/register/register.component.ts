import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { Response } from 'src/app/models/responses';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public optionList: { name: string, value: string }[] = [
    { name: 'Usuario de Telegram', value: 'user' },
    { name: 'Usuario administrador', value: 'admin' }
  ];

  public option: string = this.optionList[0].value;

  constructor(private adviceService: AdviceService, private authService: AuthenticationService, private httpService: HttpService) { }

  public ngOnInit(): void {}

  public async saveUser(form: { username: string, password1: string, password2: string }): Promise<void> {
    let response: Observable<Response<boolean>> = null;

    switch (this.option) {
      case this.optionList[0].value:
        response = await this.httpService.registerUser(form.username);
        break;
      case this.optionList[1].value:
        if (form.password1 !== form.password2) {
          this.adviceService.showToast('Las contraseñas deben de ser iguales')
          return;
        }
        const passwordHash = this.authService.hash(form.password1);
        response = await this.httpService.registerAdmin(form.username, passwordHash);
        break;
    }

    response.subscribe(data => this.adviceService.showToast('Usuario guardado'));
  }
}
