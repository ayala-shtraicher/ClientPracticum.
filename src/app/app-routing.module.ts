import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './component/add-user/add-user.component';
import { InstructionsComponent } from './component/instructions/instructions.component';

const routes: Routes = [
  {path:"add-user",component:AddUserComponent},
  {path:"instructions",component:InstructionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
