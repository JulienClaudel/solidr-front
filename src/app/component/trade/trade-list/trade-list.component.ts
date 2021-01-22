import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TradeService} from '../../../service/trade.service';
import {Trade} from '../../../model/trade';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss']
})
export class TradeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentUser: any;

  ELEMENT_DATA: Trade[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['tradeCreationDate', 'tradeSymbol', 'tradeType', 'tradeSide', 'tradePrice', 'tradeOrigqty'];
  tradeListSource = new MatTableDataSource<Trade>();

  constructor(private tradeService: TradeService,
              private tokenService: TokenStorageService) {
    this.tradeService.listen().subscribe((m: any) => {
      this.getAllTrades();
    });
    this.tradeListSource = new MatTableDataSource<Trade>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser().email;
    }
    this.getAllTrades();
  }

  ngAfterViewInit(): void {
    this.tradeListSource.paginator = this.paginator;
    this.tradeListSource.sort = this.sort;
  }

  getAllTrades(): void {
    const resp = this.tradeService.getAllTradesByUserEmail(this.currentUser);
    resp.subscribe(report => this.tradeListSource.data = report as Trade[]);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tradeListSource.filter = filterValue.trim().toLowerCase();

    if (this.tradeListSource.paginator) {
      this.tradeListSource.paginator.firstPage();
    }
  }

}
