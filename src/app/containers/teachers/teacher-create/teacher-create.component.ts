import { TeachersService } from '../../../services/teachers.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Source } from 'webpack-sources';

@Component({
  selector: 'webui-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk-UK'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TeacherCreateComponent implements OnInit {
  private avatarImg = '../../../assets/images/no-user-image.png';
  private subject: Subject<any>;
  private maxAge = this.teachServise.checkAgeDate();


  constructor(private teachServise: TeachersService) {}

  addTeacher: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern(this.teachServise.ukrNameRegex)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern(this.teachServise.ukrNameRegex)]),
    patronymic: new FormControl('', [Validators.required, Validators.pattern(this.teachServise.ukrNameRegex)]),
    dateOfBirth: new FormControl(null, [Validators.required, Validators.pattern('')]),
    email: new FormControl('', [Validators.pattern(this.teachServise.emailRegex)]),
    phone: new FormControl('', [Validators.pattern(this.teachServise.phoneRegex)]),
    login: new FormControl('', [Validators.required, Validators.pattern(this.teachServise.loginRegex)])
  });
  ngOnInit() {
  }
  handleFileInput(event): void {
    this.teachServise.readFileImage(event.target);
    this.subject = this.teachServise.subject;
  }

  submitAdd($event): void {
    $event.preventDefault();
    const data = {
      avatar: '',
      firstname: this.addTeacher.get('firstname').value,
      lastname: this.addTeacher.get('lastname').value,
      patronymic: this.addTeacher.get('patronymic').value,
      dateOfBirth: new Date(this.addTeacher.get('dateOfBirth').value).toISOString().slice(0, 10),
      email: this.addTeacher.get('email').value,
      phone: this.addTeacher.get('phone').value,
      login: this.addTeacher.get('login').value
    };
    this.teachServise.addTeacher(data);
    this.addTeacher.reset();
  }
}
