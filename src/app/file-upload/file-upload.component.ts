import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, forkJoin, Observable, timer} from "rxjs";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  uploadInProgress = false;
  fileName = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.uploadInProgress = true;
    let uploads$: Observable<any>[] = [];
    const files: File[] = event.target.files;

    for (const file of files) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("file", file);
      formData.append("lastChanged", new Date(file.lastModified).toISOString());

      const upload$ = this.http.post("api/Document", formData);
      uploads$.push(upload$);
    }
    uploads$.push(timer(500));
    forkJoin(uploads$).subscribe(() => this.uploadInProgress = false);
  }

  ngOnInit(): void {
  }

}
