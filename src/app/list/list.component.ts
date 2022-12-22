import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DocumentMetadata} from "../dataModel/documentMetadata";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public metadatas: DocumentMetadata[] = [];

  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.client.get<DocumentMetadata[]>("api/Document").subscribe(value => this.metadatas = value);
  }

}
