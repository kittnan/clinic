import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { QueueHttpService } from 'src/app/api/queue-http.service';

@Component({
  selector: 'app-table-queue',
  templateUrl: './table-queue.component.html',
  styleUrls: ['./table-queue.component.scss'],
})
export class TableQueueComponent implements OnInit {
  @Input() doctorId: any;
  keyRange: any = 'day';
  keyRangeList: any[] = ['month', 'week', 'day'];

  queue:any[]=[]
  constructor(private $queue: QueueHttpService) {}

  ngOnInit(): void {
    this.onSelectRange()
  }

  async onSelectRange() {
    if (this.keyRange) {
      const param: HttpParams = new HttpParams().set('doctorId',this.doctorId);
      if(this.keyRange=='day'){
        const resQueue = await this.$queue.queueDay(param).toPromise()
        console.log(resQueue);
        this.queue = resQueue
      }
      if(this.keyRange=='week'){
        const resQueue = await this.$queue.queueWeek(param).toPromise()
        console.log(resQueue);
        this.queue = resQueue
      }
      if(this.keyRange=='month'){
        const resQueue = await this.$queue.queueMonth(param).toPromise()
        console.log(resQueue);
        this.queue = resQueue
      }
      
    }
  }
}
