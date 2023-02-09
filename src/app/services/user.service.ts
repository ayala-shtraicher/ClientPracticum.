import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import User from '../models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  subjectF=new BehaviorSubject("");
  subjectL=new BehaviorSubject("");
routeUrl=`${environment.baseUrl}/User`;
ParentIdFromServer:number;
isSuccess=false;
  constructor(public http:HttpClient) { 
  }
  getAll()
  {
    return this.http.get<User[]>(`${this.routeUrl}`)
  }
  getById(id:number)
  {
    return this.http.get<User>(`${this.routeUrl}/${id}`)
  }

 addUser(user:User)
 {
   return this.http.post<User>(`${this.routeUrl}/`,user).subscribe(succ=>{
console.log("add user successfully");
this.ParentIdFromServer=succ["id"];
this.isSuccess=true;
   },err=>{
    console.log("mistake in add user");
    console.log(err);
   }
   );
 }

}
