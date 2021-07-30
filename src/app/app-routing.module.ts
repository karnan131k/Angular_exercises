import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentThreeComponent } from './component-three/component-three.component';
import { ComponentTwoComponent } from './component-two/component-two.component';


const routes: Routes = [
  {path:'', component:ComponentOneComponent},
  {path:'component-one', component:ComponentOneComponent},
  {path:'component-two', component:ComponentTwoComponent},
  {path:'component-three', component:ComponentThreeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
