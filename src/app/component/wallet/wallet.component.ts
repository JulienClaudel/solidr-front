import {Component, OnInit} from '@angular/core';
import {WalletService} from '../../service/wallet.service';
import {HttpClient} from '@angular/common/http';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(private walletService: WalletService,
              private httpClient: HttpClient) {
  }

  public datasList: number[] = [];
  public labelsList: string[] = [];
  public backgroundColor: string[] = [];
  public chartType = 'doughnut';
  datasReady = false;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void{
    this.walletService.getBinanceWallets()
      .subscribe(test => {
        // tslint:disable-next-line:prefer-for-of
        for (let counter = 0; counter < test.length; counter++) {
          this.datasList.push(test[counter].free);
          this.labelsList.push(test[counter].asset);
        }
        this.setChart();
      });
  }

  setChart(): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    this.datasReady = true;
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'Colors',
          data: this.datasList,
          backgroundColor: ['#D98880', '#C39BD3', '#7FB3D5', '#76D7C4', '#7DCEA0', '#F7DC6F', '#F0B27A', '#BFC9CA', '#808B96', '#2E785D', '#872B31', '#CC76E3', '#968FFA', '#83C1E6', '#2E785D'],
          borderWidth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }],
        labels: this.labelsList,
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: 'Your wallet'
        }
      }
    });
  }



}
