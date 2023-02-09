import User from "./User";

export default class ChildUser{
    constructor(public Name:string,public DateOfBirth:Date,public Tz:string,public ParentId:number){}
}