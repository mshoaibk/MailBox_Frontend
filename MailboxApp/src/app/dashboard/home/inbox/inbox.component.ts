import { Component } from '@angular/core';
import { SignalrService } from 'src/app/common/signalr.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent {
  
constructor(public signalRService:SignalrService){

}
ngOnInit():void{
  //this.showAllChat()
 this.signalRService.getInbox();

}
}
