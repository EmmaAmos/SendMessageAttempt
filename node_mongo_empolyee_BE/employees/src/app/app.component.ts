import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employees';
  employees: any[];
  formData: any = {};
  selectedEmployee: any;   //Added foe Update 

  constructor (private http:HttpClient) {}

  ngOnInit() {
    this.getEmployees();
  }

  removeEmployee(id: string) {
    const postData = {"employeeID": id}
    this.http.post('http://localhost:3000/api/employee/destory', postData).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  addNewEmployee(formData) {
    this.http.post('http://localhost:3000/api/employee/store', formData).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  getEmployees() {
    this.http.get('http://localhost:3000/api/employee/').subscribe(data=>{
      this.employees = Object.values(data)
      this.employees = this.employees[0]
    })
  }

  //Added for Update
  updateEmployee(id: string) {
    const putData = {
      "employeeID": id,
      "name": this.selectedEmployee.name,
      "designation": this.selectedEmployee.designation,
      "email": this.selectedEmployee.email,
      "phone": this.selectedEmployee.phone,
      "age": this.selectedEmployee.age
    }
    this.http.post('http://localhost:3000/api/employee/update', putData).subscribe(res => {
      console.log(res);
      this.selectedEmployee = null; // Close the edit form
    }, err => {
      console.log(err)
    });
  }

  onSelect(employee: any) {
    this.selectedEmployee = employee;
  }

  cancelUpdate(){
    this.selectedEmployee = null;
  }

}
