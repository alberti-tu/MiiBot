import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Action } from '../../models/responses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public length: number = 0;
  public sizeOptions: number[] = [ 5, 10, 25, 50, 100 ];

  public actionList: Action[] = [];

  constructor(private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getData(0, 10);
  }

  public async getData(page: number, size: number): Promise<void> {
    const response1 = await this.httpService.getActionListCount();
    response1.subscribe(data => {
      this.length = data.result
    });

    const response2 = await this.httpService.getActionList(page, size);
    response2.subscribe(data => {
      if (data.result === null) {
        return;
      }

      data.result.forEach(item => {
        item.date = new Date(item.date);
      });

      this.actionList = data.result;
    });
  }

  public pager(event: { length: number, pageIndex: number, pageSize: number, previousPageIndex: number }): void {
    this.getData(event.pageIndex, event.pageSize);
  }

  public sortData(event: { active: string, direction: string }): void {
    console.log(event);
  }

}
