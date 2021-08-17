import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent } from './component-two/component-two.component';
import { ComponentThreeComponent } from './component-three/component-three.component';
import { MessageService } from 'src/service/message.service';
import { CustomstyleDirective } from './directive/customstyle.directive';
import { NgxSvgModule } from 'ngx-svg';
import { AddtionComponentComponent } from './addtion-component/addtion-component.component';
import { SubstractionComponentComponent } from './substraction-component/substraction-component.component';
import { MultiplyComponentComponent } from './multiply-component/multiply-component.component';
import { DivisionComponentComponent } from './division-component/division-component.component';
import { DynamicLayoutDirective } from './directive/dynamic-layout.directive';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    ComponentOneComponent,
    ComponentTwoComponent,
    ComponentThreeComponent,
    CustomstyleDirective,
    AddtionComponentComponent,
    SubstractionComponentComponent,
    MultiplyComponentComponent,
    DivisionComponentComponent,
    DynamicLayoutDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSvgModule,
    FormsModule,
    DragDropModule
  ],
  entryComponents:[AddtionComponentComponent,SubstractionComponentComponent,MultiplyComponentComponent,DivisionComponentComponent],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
