import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../entities/student';
import { Status } from '../entities/status';
import { Observable } from 'rxjs';
import { StudentService } from './../services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  public createMode: boolean;
  public headerText: string = "";
  public studentData: Student = {} as Student;
  public statusFields: Object = { text: 'Status', value: 'Status' };
  public status$: Observable<Status[]>;
  @ViewChild("studentModal") studentModal: ElementRef;

  constructor(public activeModal: NgbActiveModal, private studentService: StudentService) { }

  ngOnInit() {
    this.headerText = (this.createMode) ? "Create New Student" : "Update Student";
    this.status$ = this.studentService.getStatus();
  }

  saveStudent() {
    if (this.studentModal.nativeElement.getElementsByClassName('requiredClass').length > 0) {
      return;
    }
    this.studentData.StudentId = Math.round(Math.random() * 100);
    this.studentService.studentAdded(this.studentData);
    this.activeModal.close();
  }

  updateStudent() {
    if (this.studentModal.nativeElement.getElementsByClassName('requiredClass').length > 0) {
      return;
    }
    this.studentService.studentUpdated(this.studentData);
    this.activeModal.close();
  }

}
