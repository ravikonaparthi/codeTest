import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student } from './../entities/student';
import { Status } from '../entities/status';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    private newStudent = new Subject<Student>();
    public newStudent$ = this.newStudent.asObservable();

    private modifyStudent = new Subject<Student>();
    public modifyStudent$ = this.modifyStudent.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    getStudents(): Observable<Student[]> {
        let url: string = 'data/students.json';
        return this.httpClient.get<Student[]>(url);
    }

    getStatus(): Observable<Status[]> {
        let url: string = 'data/status.json';
        return this.httpClient.get<Status[]>(url);
    }

    studentAdded(studentData: Student) {
        this.newStudent.next(studentData);
    }

    studentUpdated(studentData: Student) {
        this.modifyStudent.next(studentData);
    };

}