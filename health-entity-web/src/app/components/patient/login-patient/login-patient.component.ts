import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import { PatientService } from 'app/services/patient.service';
import { Patient } from 'app/models/patient';
import { OptionsList } from '../../../models/options-lists';
import { RoleEnum } from 'app/models/role-enum';
import { AuthenticationModeEnum } from 'app/models/authentication-mode-enum';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login-patient',
  templateUrl: './login-patient.component.html',
  styleUrls: ['./login-patient.component.css']
})
export class LoginPatientComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private patientService: PatientService) { }

  patient: Patient = new Patient(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );

  idType: string;
  id: number;
  password: string;
  hide = true;

  incorrectLogin = false;
  invalidAuthorities = false;

  options = OptionsList.identificationTypes;

  ngOnInit(): void { }

  login() {
    this.loginService.login(this.idType, this.id, this.password)
      .subscribe(result => {
        if(this.validateAuthorities(result.token, RoleEnum.PATIENT, AuthenticationModeEnum.PASSWORD_AUTHENTICATED_USER)){
          this.incorrectLogin = false;
          localStorage.setItem('token', result.token);
        }
        else
          this.invalidAuthorities = true;
      },
      error => {
        this.incorrectLogin = true;
        console.error(error);
      });
    }

  close() {
    this.incorrectLogin = false;
    this.invalidAuthorities = false;
  }

  validateAuthorities(token: string, role: RoleEnum, authenticationMode: AuthenticationModeEnum): boolean{
    const parts = token.split('.');
    const payload = parts[1];
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    if (payloadObject.authorities.includes(role) && payloadObject.authorities.includes(authenticationMode) &&
    payloadObject.authorities.includes(environment.healthEntityAuthority))
      return true;
    return false;
  }
}
