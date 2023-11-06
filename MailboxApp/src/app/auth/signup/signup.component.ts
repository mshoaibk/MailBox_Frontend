import { Component } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { ConstantService } from 'src/app/common/constant.service';
import { UserContextService } from 'src/app/common/user-context.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isRegisterDivShow : boolean = true;
  isConfirmationCOdeDiveShow:boolean = false;
  ConfirmationCode : string = ""
  usersingUp: any = {};
  loginRole: any = {
    'admin': 'admin',
    'support': 'support'
  }
  SessinData: any = {};
  constructor(private commonService: CommonService,
    private constantsService: ConstantService, private userContextService: UserContextService,
    private router: Router,
    //, private routeStateService: RouteStateService,
   private toastrService: ToastrService,
    // private spinnerService: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.usersingUp.email = '';
    this.usersingUp.password = '';
     this.usersingUp.phoneNumber = ''; 
     this.usersingUp.location = ''; 
     this.usersingUp.userNamee = '';
  }

  SignUp() {
   

    let userModel = {
      id:0,
      email: this.usersingUp.email,
      password: this.usersingUp.password,
      phoneNumber: this.usersingUp.phoneNumber.toString(),
      location: this.usersingUp.location, 
      userNamee: this.usersingUp.userNamee,
     }
   // console.log('role', userModel)
   // this.spinnerService.show();
    let url = this.constantsService.Registration;
     this.commonService.post(url, userModel).subscribe(Response => {
     
    // //  this.spinnerService.hide();
       let res: any = Response;
       
      console.log(Response);
     if(res.status == true){
      //colse resitration dev 
      this.toastrService.success(res.message, 'Confirmation code sent to Your Email Address');
      this.isRegisterDivShow =false;
      //and show cofirmation code div
      this.isConfirmationCOdeDiveShow = true;
     }
     else if(res.status == false && res.message =="Already Sent")
        {
         this.toastrService.error(res.message, 'Already Sent');
          this.isRegisterDivShow =false;
          //and show cofirmation code div
          this.isConfirmationCOdeDiveShow = true;
        }
        else{
          this.toastrService.error(res.message, 'Please LogIn');
          this.router.navigateByUrl('/');
        }
    //    debugger;
    //     this.SessinData.token = userData.token.toString();
    //     this.SessinData.userRole = userData.userData.role;
    //     this.SessinData.location = userData.userData.location;
    //     this.SessinData.email = userData.userData.email;
    //     this.SessinData.id = userData.userData.id;
    //     this.SessinData.phoneNumber = userData.userData.phoneNumber;
    //     ;
    //     this.userContextService.setUser(this.SessinData); 
    //   //   userData.user.companyID = userData.companyID ? userData.companyID : 0;
    //   //   userData.user.companyName = userData.companyName ? userData.companyName : '';
    //   //   userData.user.employeeId = userData.employeeId ? userData.employeeId : '';
    //   //   userData.user.roles = userData.roles && userData.roles.length > 0 ? userData.roles : [];
    //   //   this.userContextService.setUserRoles(userData.roles);
    //   //   this.routeStateService.add("Dashboard", '/dashboard', null, true);   
    //   }
    //   // if (userData && userData.status) {
    //   //   userData.user.userRole = userData.userRole;
    //   //   userData.user.companyID = userData.companyID ? userData.companyID : 0;
    //   //   userData.user.companyName = userData.companyName ? userData.companyName : '';
    //   //   userData.user.employeeId = userData.employeeId ? userData.employeeId : '';
    //   //   userData.user.roles = userData.roles && userData.roles.length > 0 ? userData.roles : [];
    //   //   this.userContextService.setUserRoles(userData.roles);
    //    this.routeStateService.add("Dashboard", '/dashboard', null, true);
    //   //   return;
    //   // }
    
    //   return;
    });
  }
  SignUpWithCOnfirmationCode(){
    // "id": 0,
    // "email": "string",
    // "phoneNumber": "string",
    // "location": "string",
    // "password": "string",
    // "userNamee": "string",
    // "confirmationCOde": "string"
    let userModel = {
      id:0,
      email: this.usersingUp.email,
      password: this.usersingUp.password,
      phoneNumber: this.usersingUp.phoneNumber.toString(),
      location: this.usersingUp.location, 
      userNamee: this.usersingUp.userNamee,
      confirmationCOde:this.ConfirmationCode
     }
     debugger;
   // console.log('role', userModel)
   // this.spinnerService.show();
    let url = this.constantsService.VerifyConfirmationRegistration;
     this.commonService.post(url, userModel).subscribe(Response => {
    // //  this.spinnerService.hide();
       let res: any = Response;
      
      console.log(Response);
      if(res.status == true)
      {
        this.toastrService.success(res.message, 'Code confirmed.. Please Login');
        this.router.navigateByUrl('/');
      }
    });
  }
}
