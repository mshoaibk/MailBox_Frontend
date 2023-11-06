import { Component } from '@angular/core';
import { SignalrService } from 'src/app/common/signalr.service';

@Component({
  selector: 'app-sentbox',
  templateUrl: './sentbox.component.html',
  styleUrls: ['./sentbox.component.scss']
})
export class SentboxComponent {
  
  constructor(public signalRService:SignalrService){

  }
  ngOnInit():void{

   this.signalRService.getsentbox();
  
  }
}
