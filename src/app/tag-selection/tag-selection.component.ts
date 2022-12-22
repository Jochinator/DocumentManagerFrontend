import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html',
  styleUrls: ['./tag-selection.component.scss']
})
export class TagSelectionComponent {
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public newTag: string = '';
  @Input()
  public tags: string[] = [];
  @Output()
  public tagsChange = new EventEmitter<string[]>();

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  private allTags = ['Jochen', 'Jochibal', 'Reuter'];

  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this.filter(tag) : this.allTags.slice())),
    );
  }

  remove(tag: string) {
    this.tags = this.tags.filter(x => x !== tag);
    this.tagsChange.emit(this.tags);
  }

  addToken($event: MatChipInputEvent) {
    const value = ($event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.tagsChange.emit(this.tags);
  }

  selected($event: MatAutocompleteSelectedEvent) {
    this.tags.push($event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.tagsChange.emit(this.tags);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
