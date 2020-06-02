import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './services/student.service';
import { Student } from './entities/student';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentCreateComponent } from './student-create/student-create.component';
import { CommandClickEventArgs, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public students: Student[];
  public pageSettings: any;
  public groupOptions: any;
  public editSettings: any;
  public commands: any;
  public selectOptions: any;
  @ViewChild("studentGrid") studentGrid: GridComponent;

  constructor(private studentService: StudentService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.selectOptions = { type: 'Single' };
    this.editSettings = { allowEditing: true, allowDeleting: true, allowAdding: true, showDeleteConfirmDialog: true, allowEditOnDblClick: false };
    this.commands = [{ type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
    { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
    { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
    { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }];
    this.pageSettings = { pageSizes: ['10', '20', 'All'], pageSize: 10 };
    this.groupOptions = { showDropArea: false, columns: ['Status'] };
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
    this.studentService.newStudent$.subscribe((data: Student) => {
      this.students.push(data);
      this.studentGrid.refresh();
    });
    this.studentService.modifyStudent$.subscribe((data: Student) => {
      const objIndex = this.students.findIndex(obj => obj.StudentId === data.StudentId);
      this.students[objIndex].FirstName = data.FirstName;
      this.students[objIndex].LastName = data.LastName;
      this.students[objIndex].PhoneNumber = data.PhoneNumber;
      this.students[objIndex].Status = data.Status;
      this.studentGrid.refresh();
    });
  }

  addStudent(): void {
    let activeModal = this.modalService.open(StudentCreateComponent,
      { windowClass: 'modal-animation', centered: true, backdrop: 'static' });
    activeModal.componentInstance.createMode = true;
  }

  onStudentGridActionBegin(event: any) {
    if (event.requestType === 'beginEdit') {
      let activeModal = this.modalService.open(StudentCreateComponent,
        { windowClass: 'modal-animation', centered: true, backdrop: 'static' });
      activeModal.componentInstance.createMode = false;
      activeModal.componentInstance.studentData = JSON.parse(JSON.stringify(event.rowData)) as Student;
      event.cancel = true;
    }
  }

  onCommandClick(event: CommandClickEventArgs) {
    if (event.commandColumn.type === "Delete") {
      event.cancel = true;
      let rowData: Student = event.rowData as Student;
      let dialog = DialogUtility.confirm({
        title: 'Delete Confirmation',
        content: 'Are you sure to remove the student ' + rowData.LastName + ' , ' + rowData.FirstName,
        okButton: {
          text: 'Ok', click: () => {
            const objIndex = this.students.findIndex(obj => obj.StudentId === rowData.StudentId);
            this.students.splice(objIndex, 1);
            this.studentGrid.refresh();
            dialog.close();
          }
        },
        cancelButton: { text: 'Cancel' },
        showCloseIcon: true,
        closeOnEscape: true
      });
    }
  }

  onRowDrop(arg: any) {
    let startedRow: any = arg.rows[0];
    let targetRow: any = arg.target.closest('tr');
    if (targetRow.classList.contains('e-row') && targetRow.classList.length) {
      targetRow = targetRow;
    } else {
      targetRow = arg.target.closest('tr').nextSibling;
    }
    let startRowIndex: number = parseInt(startedRow.getAttribute("aria-rowindex"), 10);
    let targetRowIndex: number = parseInt(targetRow.getAttribute("aria-rowindex"), 10);
    if (startRowIndex === targetRowIndex) {
      return;
    }
    let groupedCol: any = this.studentGrid.groupSettings.columns;
    for (let i: number = 0, len: number = groupedCol.length; i < len; i++) {
      let dataIndex: number = this.students.indexOf(arg.data);
      let value: any = this.studentGrid.currentViewData["records"][targetRowIndex][groupedCol[i]];
      this.studentGrid.currentViewData["records"][startRowIndex][groupedCol[i]] = value;
    }
    this.studentGrid.refreshColumns();
    arg.cancel = true;
  }

}
