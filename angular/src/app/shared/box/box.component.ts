import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wed-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input() boxContent: any

  constructor() { }

  ngOnInit() {
  }

}
