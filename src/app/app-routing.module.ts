import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {ListComponent} from "./list/list.component";
import {DocumentDetailsComponent} from "./document-details/document-details.component";
import {PlaygroundComponent} from "./playground/playground.component";

const routes: Routes =  [
  { path: 'single-file-import', component: FileUploadComponent },
  { path: 'list', component: ListComponent },
  { path: 'document/:id', component: DocumentDetailsComponent },
  { path: 'playground', component: PlaygroundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
