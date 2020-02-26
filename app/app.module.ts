import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PasswordModule,
InputTextModule,
PanelModule,
MultiSelectModule,

} from 'primeng/primeng';

import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {TreeModule} from 'primeng/tree';

@NgModule({
  imports:      [ BrowserModule, 
  BrowserAnimationsModule,
  FormsModule,
  PasswordModule,
  InputTextModule,
  PanelModule,
  TableModule,
  TreeModule,
  TreeTableModule,
  MultiSelectModule
   ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
