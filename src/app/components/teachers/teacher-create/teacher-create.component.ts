import { TeachersService } from './../../../services/teachers.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'webui-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss']
})
export class TeacherCreateComponent implements OnInit {
  private startDate = new Date(1980, 0, 1);
  constructor(private teachServise: TeachersService) {}
  private fileToUpload;
  private avatarImg;

  addTeacher: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    email: new FormControl(''),
    phone: new FormControl(''),
    login: new FormControl('', Validators.required)
  });
  ngOnInit() {
    this.avatarImg = this.fileToUpload
      ? this.fileToUpload
      : '../../../assets/images/no-user-image.png';
  }
  generateDate() {
    const date = new Date(this.addTeacher.get('dateOfBirth').value);
    date.setHours(date.getHours() + 10);
    return date.toISOString().slice(0, 10);
  }
  handleFileInput(event): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = e => {
      this.fileToUpload = reader.result;
      this.avatarImg = this.fileToUpload;
      console.log(this.fileToUpload);
    };
    reader.readAsDataURL(file);
  }

  submitAdd($event): void {
    $event.preventDefault();
    const data = {
      avatar: this.fileToUpload,
      firstname: this.addTeacher.get('firstname').value,
      lastname: this.addTeacher.get('lastname').value,
      patronymic: this.addTeacher.get('patronymic').value,
      dateOfBirth: this.generateDate(),
      email: this.addTeacher.get('email').value,
      phone: this.addTeacher.get('phone').value,
      login: this.addTeacher.get('login').value
    };
    this.teachServise.addTeacher(data);
    this.addTeacher.reset();
    this.avatarImg = '../../../assets/images/no-user-image.png';
  }
}
