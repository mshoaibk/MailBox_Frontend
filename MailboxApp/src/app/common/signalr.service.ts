import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { UserContextService } from './user-context.service';
import { ToastrService } from 'ngx-toastr';
import { MailboxService } from '../dashboard/home/service/mailbox.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {

//#region ------------------- globle Var
  private userID: any;
  private email: any;
  private hubConnection: signalR.HubConnection;
  public inboxList:any=[];
  public sentboxList:any=[]
//#endregion

  //#region --------------------   constructor
  constructor(
    //connection
    private toastrService: ToastrService,
    private userContextService: UserContextService,
    private mailboxService:MailboxService,
    private router: Router,
    )
   {
    this.userID = this.userContextService.user$._value.id;
    this.email = this.userContextService.user$._value.email
    ;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5261/mailHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).build();
   this.startSignalRConnection();

  //#region Function Called From Backend
   this.hubConnection.on('Connected', (connectionId: string) => { });
   this.hubConnection.on('MessageSendNotifayMe', (message: string,status:string) => {
    if(status=="succss")
         this.toastrService.success(message)
  else{
         this.toastrService.error(message)
      }
    });
   this.hubConnection.on('notifayMe', (message: string,status:string) => {

    if(status=="Error")
    this.toastrService.error(message)
else{
    this.toastrService.success(message)
    }
    });

    this.hubConnection.on('ReceivePrivateMail', (boxId: any, SenderId: any, UserName: any, dateTime: any,lastEmailTitle:any ,LastEmailBody: any, photoPath: any) => {
      debugger;
     console.log(this.inboxList)
      const recMail = {
        'boxId': boxId,
        'dateTime': dateTime,
        'lastEmailBody': LastEmailBody,
        'lastEmailTitle': lastEmailTitle,
        'photoPath': photoPath,
        'senderId': SenderId,
        'userName': UserName,

      };
      console.log(recMail);

      // Add the received mail data to the top of the inboxList array
      this.inboxList.unshift(recMail);
    });

    this.hubConnection.on('Sentboxupdate', (boxId: any,SenderId:any,UserName:any,dateTime:any,lastEmailTitle:any,LastEmailBody:any,photoPath:any) =>
    {
      const sendMail={
        'boxId': boxId,
        'dateTime': dateTime,
        'lastEmailBody': LastEmailBody,
        'lastEmailTitle': lastEmailTitle,
        'photoPath': photoPath,
        'senderId': SenderId,
        'userName': UserName,
      }
      console.log(sendMail);
      this.sentboxList.unshift(sendMail);
    });
   //#endregion
   }
   //#endregion

  //#region -------------------- Connections & Pages open/close
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
   openNewPage(): void {

    const brwserInfo = navigator.userAgent;
    this.startSignalRConnection();
    // console.log('User-Agent:', userAgent);
    if (this.hubConnection.state === 'Connected') {
      this.hubConnection.invoke('OpenNewPage', this.userID.toString(), this.email ,brwserInfo.toString()).catch((error) => {
        console.error('Error JoinPrivateChat:', error);
      });
    } else {
      console.error('SignalR connection is not in the "Connected" state.');
    }
  }
  leavePage(): void {

    const brwserInfo = navigator.userAgent;
    // console.log('User-Agent:', userAgent);
    this.hubConnection.invoke('LeavePage',this.userID.toString());
  }
  logOut(){
    const brwserInfo = navigator.userAgent;
    // console.log('User-Agent:', userAgent);
    if (this.hubConnection.state === 'Connected') {
      this.hubConnection.invoke('LeaveApplication', this.userID.toString(), brwserInfo.toString()).catch((error) => {
        console.error('Error JoinPrivateChat:', error);
      });
    } else {
      console.error('SignalR connection is not in the "Connected" state.');
    }
    this.userContextService.logout();
    this.router.navigateByUrl('/');
  }
  //#endregion

  //#region Message Send
  //public async Task SendPrivateMail(string currentUserId, string recipientEmail, string Emailmessage,string emailType,string boxid /*,string filePath, string fileType*/)
  sendPrivateMail(recipientEmail: string,Subject:string ,mailbody: string, emailType: string, boxid:string): void {
    if(mailbody.trim()=="" || mailbody.trim() ==null ){
      return
    }
      // Ensure that the connection is in the 'Connected' state before sending the message
      if (this.hubConnection.state === 'Connected') {

        // Call a server-side hub method to send the private message
        this.hubConnection.invoke('SendPrivateMail', this.userID.toString(),recipientEmail,Subject,mailbody,emailType,boxid)
          .catch((error) => {
            console.error('Error sending private message:', error);
          });
      } else {
        console.error('SignalR connection is not in the "Connected" state.');
      }

    }
  //#endregion

  //#region inbox
  getInbox(){
  this.mailboxService.getInbox().subscribe(res=>{
 console.log(res);
 if(res.status==true)
    {
      this.inboxList = res.inbox
    }
    else{
      this.toastrService.error("error:getting inbox data")
    }
  });
  }
  getsentbox(){
    this.mailboxService.getsent().subscribe(res=>{
   console.log(res);
   if(res.status==true)
      {
        this.sentboxList = res.inbox
      }
      else{
        this.toastrService.error("error:getting inbox data")
      }
    });
    }
  //#endregion
}
