import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import ChildUser from '../models/ChildUser';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  routeUrl=`${environment.baseUrl}/ChildUser`;
  constructor(public http:HttpClient) { }
  getAll()
  {
    return this.http.get<ChildUser[]>(`${this.routeUrl}`)
  }
  getById(id:string)
  {
    return this.http.get<ChildUser>(`${this.routeUrl}/${id}`);
  }

addChildUser(child:ChildUser)
 {
   return this.http.post<ChildUser>(`${this.routeUrl}/`,child).subscribe(succ=>{
   console.log("add user successfully");
   },err=>{
    console.log("mistake in add user");
    console.log(err);
   }
   );
 }




  }

