import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { ConstantService } from 'src/app/common/constant.service';
@Injectable({
  providedIn: 'root'
})
export class MailboxService {

  constructor(private Common: CommonService, private Constants: ConstantService) { }
  getInbox(): Observable<any> {
    let url = this.Constants.Inbox;
    return this.Common.get(url);
  }
  getsent(): Observable<any> {
    let url = this.Constants.Sentbox;
    return this.Common.get(url);
  }
}
