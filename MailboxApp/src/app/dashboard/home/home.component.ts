import { Component, HostListener } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SignalrService } from 'src/app/common/signalr.service';
import { UserContextService } from 'src/app/common/user-context.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  message:any ={};
  userAcesse:boolean = false;
  private hubConnection: signalR.HubConnection;
  constructor(private signalRService: SignalrService,private userContextService: UserContextService){
   
     //SignalR
     this.hubConnection = new signalR.HubConnectionBuilder()
     .withUrl('http://localhost:5261/mailHub', {
       skipNegotiation: true,
       transport: signalR.HttpTransportType.WebSockets
     })
     .build();
  }
  async ngOnInit(): Promise<void> {
    this.userAcesse = this.userContextService.user$._value.userRole =="Admin"?true:false;
    this.message.Toemail = '';
    this.message.Subject = '';
    this.message.mailbody = '';
    // Call the API service function when the app component initializes
    try {
      await this.startSignalRConnection();
      this.signalRService.openNewPage();
      console.log("openNewPage is called");
    } catch (error) {
      console.error('Error starting SignalR connection:', error);
      // Handle connection startup errors here
    }
  }
  async startSignalRConnection(): Promise<void> {
    if (this.hubConnection.state === 'Disconnected') {
      await this.hubConnection
        .start()
        .then(() => {
          console.log('SignalR connection started successfully.');
          // Implement any logic you need after a successful connection
        })
        .catch((error) => {
          console.error('Error starting SignalR connection:', error);
          throw error; // Propagate the error
        });
    } else {
      console.warn('SignalR connection is already in a connected or connecting state.');
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.signalRService.leavePage();
    console.log("page is closed");
  }
  Send(){
    this.signalRService.sendPrivateMail(this.message.Toemail, this.message.Subject,this.message.mailbody , "New","0")
  }

  Logut(){
    this.signalRService.logOut();
  }
}
