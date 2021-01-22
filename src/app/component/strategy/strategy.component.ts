import {Component, OnInit} from '@angular/core';
import {StrategyService} from '../../service/strategy.service';
import {Observable} from 'rxjs';
import {Strategy} from '../../model/strategy';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {StrategyCreateComponent} from './strategy-create/strategy-create.component';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {
  strategies: Observable<Strategy[]>;
  currentUser: any;
  isMember: false;
  isExpert: false;

  constructor(private strategyService: StrategyService,
              private tokenService: TokenStorageService,
              private dialog: MatDialog) {
    this.strategyService.listen().subscribe((m: any) => {
      this.reloadData();
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.isMember = this.tokenService.getUser().roles.includes('ROLE_Member');
      this.isExpert = this.tokenService.getUser().roles.includes('ROLE_Expert');
      this.currentUser = this.tokenService.getUser();
    }
    this.reloadData();
  }

  reloadData(): void {
    this.strategyService.getAllOtherStrategies(this.currentUser.email).subscribe(data => {
      this.strategies = this.strategyService.getAllStrategies();
    });
  }

  onCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(StrategyCreateComponent, dialogConfig);
  }

}
