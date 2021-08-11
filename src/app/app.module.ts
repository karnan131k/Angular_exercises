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
import { LayoutboxComponent } from './layoutbox/layoutbox.component';
import { DynamicLayoutDirective } from './directive/dynamic-layout.directive';

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
    LayoutboxComponent,
    DynamicLayoutDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSvgModule
  ],
  entryComponents:[AddtionComponentComponent,SubstractionComponentComponent,MultiplyComponentComponent,DivisionComponentComponent,LayoutboxComponent],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
