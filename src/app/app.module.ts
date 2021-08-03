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

@NgModule({
  declarations: [
    AppComponent,
    ComponentOneComponent,
    ComponentTwoComponent,
    ComponentThreeComponent,
    CustomstyleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSvgModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
