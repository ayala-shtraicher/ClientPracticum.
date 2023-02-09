import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ChildUser from 'src/app/models/ChildUser';
import User from 'src/app/models/User';
import { ChildrenService } from 'src/app/services/children.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
user:User;
  gender:string;
  emptyUser:User=new User("","","",new Date(),0,"");
  emptyChild:ChildUser=new ChildUser("",new Date(),"",0);
  arrChildren:ChildUser[]=[];
  data:any[]=[];
  shouldRender=false;
  constructor(public childService:ChildrenService,public userService:UserService,public router:Router) { }
  ngOnInit(): void {
   localStorage.setItem("currentFirstName","");
   localStorage.setItem("currentLastName","");
   if(localStorage.getItem("currentUser"))
   this.emptyUser=JSON.parse(localStorage.getItem("currentUser")); 
   if(localStorage.getItem("currentChildUser")){
    this.emptyChild=JSON.parse(localStorage.getItem("currentChildUser")); 
    this.gender=localStorage.getItem("gender");
   }
  }
  changeFirstName()
  {
    this.userService.subjectF.next(this.emptyUser?.FirstName);
    localStorage.setItem("currentFirstName",this.emptyUser?.FirstName);
  }
  changeLastName()
{
  this.userService.subjectL.next(this.emptyUser?.LastName);
  localStorage.setItem("currentLastName",this.emptyUser?.LastName);
}  
goToInstructions()
  {
    localStorage.setItem("currentUser",JSON.stringify(this.emptyUser));
    console.log(this.emptyChild);
    localStorage.setItem("currentChildUser",JSON.stringify(this.emptyChild));
    localStorage.setItem("gender",this.gender);
    this.router.navigate(['/instructions']);
  }
   addChild()
  {
    localStorage.removeItem("currentChildUser");
    console.log(this.emptyChild);
    this.emptyChild.ParentId= this.userService.ParentIdFromServer;
    this.arrChildren.push(this.emptyChild);
    this.emptyChild=new ChildUser("",new Date(),"",0);
  }
  addUser()
  {
    if(this.gender=="famle")
    this.emptyUser.eGender=2;
    else
    this.emptyUser.eGender=1;
    this.userService.addUser(this.emptyUser);
  }
  save(myForm)
  {
    localStorage.removeItem("currentUser");
    this.gender="";
    this.addChild();
    for(let i=0;i<this.arrChildren.length;i++)
    {
      console.log(this.arrChildren[i]);
      this.childService.addChildUser(this.arrChildren[i]);
       this.data.push(this.arrChildren[i]);
    }
     this.data.push(this.emptyUser);
     this.data.reverse();
    if(this.userService.isSuccess)
    {
      const ws = XLSX.utils.json_to_sheet(this.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'ExportedData.xlsx');

    }
    this.emptyUser=new User("","","",new Date(),0,"");
  }
}
