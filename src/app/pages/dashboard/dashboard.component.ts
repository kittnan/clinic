import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QueueHttpService } from 'src/app/api/queue-http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: any[] = [];
  constructor(
    private $queues: QueueHttpService,
    private _loading: NgxUiLoaderService
  ) {}

  async ngOnInit(): Promise<void> {
    this._loading.start();
    const resStatic = await this.$queues.static().toPromise();
    this.data = this.mapData(resStatic);
  }
  mapData(data: any[]) {
    return data.map((d: any, i: any) => {
      const h1 = d.value;
      const h2 = `จำนวน: ${d.count}`;
      return {
        h1: h1,
        h2: h2,
        count: d.count,
        percent: d.percent,
      };
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }
}
