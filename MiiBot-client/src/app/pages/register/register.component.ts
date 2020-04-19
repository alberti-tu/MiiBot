import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private adviceService: AdviceService, private authService: AuthenticationService, private httpService: HttpService) { }

  public ngOnInit(): void {}

  public async addUser(form: { username: string }): Promise<void> {
    const response = await this.httpService.registerUser(form.username);
    response.subscribe(data => this.adviceService.showToast('Usuario guardado'));
  }

  public async addAdmin(form: { username: string, password1: string, password2: string }): Promise<void> {
    if (form.password1 !== form.password2) {
      this.adviceService.showToast('Las contraseñas deben de ser iguales')
      return;
    }

    const passwordHash = this.authService.hash(form.password1);
    const response = await this.httpService.registerAdmin(form.username, passwordHash);
    response.subscribe(data => this.adviceService.showToast('Usuario guardado'));
  }
}
