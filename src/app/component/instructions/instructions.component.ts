import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {
  currentFirstName:string;
  currentLastName:string;
  constructor(public router:Router,public userService:UserService) { }

  ngOnInit(): void {
    this.userService.subjectF.subscribe(succ=>{
      this.currentFirstName=localStorage.getItem("currentFirstName");
    })
    this.userService.subjectL.subscribe(succ=>{
      this.currentLastName=localStorage.getItem("currentLastName");
    })
    
  }
  goToAdd()
  {
    this.router.navigate(['/add-user']);
  }
}
