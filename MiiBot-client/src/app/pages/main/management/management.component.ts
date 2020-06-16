import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice.service';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/models/responses';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public length: number = 0;
  public sizeOptions: number[] = [ 5, 10, 25, 50, 100 ];

  public userList: User[] = [];

  private pageConfig: { page: number, size: number } = { page: 0, size: 10 };

  constructor(private advice: AdviceService, private httpService: HttpService) { }

  public ngOnInit(): void {
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

  public async getData(page: number, size: number): Promise<void> {
    const response1 = await this.httpService.getUserCount();
    response1.subscribe(data => this.length = data.result);

    const response2 = await this.httpService.getUserList(page, size);
    response2.subscribe(data => {
      if (data.result === null) {
        return;
      }

      this.userList = data.result;
    });
  }

  public pager(event: { length: number, pageIndex: number, pageSize: number, previousPageIndex: number }): void {
    this.pageConfig = { page: event.pageIndex * event.pageSize, size: event.pageSize };
    this.getData(this.pageConfig.page, this.pageConfig.size);
  }

  public showDeleteDialog(item: User): void {
    // this.advice.showDialog();

    this.deleteUser(item.id);
  }

  private async deleteUser(id: string) {
    const response = await this.httpService.deleteUser(id);
    response.subscribe(data => {
      if (data.result) {
        this.getData(this.pageConfig.page, this.pageConfig.size);
      }
    });
  }
}
