import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// other imports...

@NgModule({
  declarations: [
    AppComponent,
    // other components...
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // other modules...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 