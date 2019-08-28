import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { GridModule } from './grid/grid.module';
import { CovarModule } from './covar/covar.module';

import { MaterialModule } from './material/material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopToolbarComponent
  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    HomeModule,
    GridModule,
    CovarModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    MaterialModule,
    AppRoutingModule,
    HomeModule,
    GridModule,
    CovarModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
