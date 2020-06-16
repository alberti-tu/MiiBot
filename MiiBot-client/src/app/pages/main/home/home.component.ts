import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Action } from 'src/app/models/responses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public length: number = 0;
  public sizeOptions: number[] = [ 5, 10, 25, 50, 100 ];

  public actionList: Action[] = [];

  private pageConfig: { page: number, size: number } = { page: 0, size: 10 };

  constructor(private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

  public async getData(page: number, size: number): Promise<void> {
    const response1 = await this.httpService.getActionCount();
    response1.subscribe(data => this.length = data.result);

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
    this.pageConfig = { page: event.pageIndex * event.pageSize, size: event.pageSize };
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

}
