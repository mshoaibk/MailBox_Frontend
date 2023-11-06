import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }
  //Auth
  public readonly urlLogin = environment.ApiUrl + '/api/AppUser/Login';
  public readonly Registration = environment.ApiUrl + '/api/AppUser/Registration';
  public readonly VerifyConfirmationRegistration = environment.ApiUrl + '/api/AppUser/VerifyConfirmationRegistration';

  //Dashboard
  // public readonly SendPrivatEmail = environment.ApiUrl + '/api/PrivateEmail/SendPrivatEmail';
   public readonly Inbox = environment.ApiUrl + '/api/PrivateEmail/Inbox'; 
   public readonly Sentbox = environment.ApiUrl + '/api/PrivateEmail/Sentbox';

  //Admin
   public readonly CreateUser = environment.ApiUrl + '/api/User/CreateUser';
   public readonly UserList = environment.ApiUrl + '/api/User/UserList';
   public readonly User = environment.ApiUrl + '/api/User/User';
   public readonly DeleteUser = environment.ApiUrl + '/api/User/Delete';
   public readonly UpdateUser = environment.ApiUrl + '/api/User/UpdateUser';


}