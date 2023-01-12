import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { HistoryHealHttpService } from 'src/app/api/history-heal-http.service';

@Component({
  selector: 'app-share-history-detail',
  templateUrl: './share-history-detail.component.html',
  styleUrls: ['./share-history-detail.component.scss'],
})
export class ShareHistoryDetailComponent implements OnInit {
  healHistory: any;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  constructor(
    private route: ActivatedRoute,
    private $healHistory: HistoryHealHttpService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (param: any) => {
      const customerId = param['userId'];
      if (customerId) {
        const p: HttpParams = new HttpParams().set('customerId', customerId);
        this.healHistory = await this.$healHistory.customerId(p).toPromise();
        console.log(this.healHistory);
      }
    });
  }

  loopData(data: any[]) {
    const foo = data.filter((heal: any) => {
      heal.items = heal.items.filter((item: any) => item.checked);
      if (heal.checked) return true;
      return false;
    });
    return foo;
  }
}
