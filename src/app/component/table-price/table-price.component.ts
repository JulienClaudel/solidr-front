import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-price',
  templateUrl: './table-price.component.html',
  styleUrls: ['./table-price.component.scss']
})
export class TablePriceComponent implements OnInit {
  @Input() paidFor;
  @Input() paidFor2;
  @Input() paidFor3;

  product = {
    price: 1,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg'
  };

  ngOnInit(): void { }
}
