import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { CalculatorComponent}  from '../app/../calculator/calculator.component';
import {SortPipe,SearchPipe,SearchIdPipe,FilterByIdPipe} from '../app/../pipe/hosuser.pipe';
import {AccordionModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule ,TabViewModule} from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {ConfirmDialogModule,CheckboxModule,MenuModule,MenuItem} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/primeng';
import { HttpModule } from '@angular/http';
//import { AwesomePipe }         from './awesome.pipe';
//import { HighlightDirective }  from './highlight.directive';
@NgModule({
  imports:      [ CommonModule,FormsModule,AccordionModule , HttpModule,ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,TabViewModule,
    DialogModule,ChartModule,CheckboxModule ],
  declarations: [SortPipe,SearchIdPipe,FilterByIdPipe,SearchPipe,CalculatorComponent],//AwesomePipe, HighlightDirective ],
  exports:      [ConfirmDialogModule,SortPipe,SearchIdPipe,FilterByIdPipe,SearchPipe,FormsModule,CommonModule,CalculatorComponent ,AutoCompleteModule,AccordionModule, HttpModule,
    ButtonModule,
    MessagesModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,PanelModule,TabViewModule,
    DialogModule,ChartModule,CheckboxModule,MenuModule]//AwesomePipe, HighlightDirective,
                  //CommonModule, FormsModule ]
})
export class ShareGlobalModule { }