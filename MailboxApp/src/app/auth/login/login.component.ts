import { Component } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { ConstantService } from 'src/app/common/constant.service';
import { UserContextService } from 'src/app/common/user-context.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userLogin: any = {};
  loginRole: any = {
    'admin': 'admin',
    'support': 'support'
  }
  SessinData: any = {};
  constructor(private commonService: CommonService,
    private constantsService: ConstantService, private userContextService: UserContextService
    ,private router: Router,
    private toastrService: ToastrService,
    // private spinnerService: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.userLogin.email = '';
    this.userLogin.password = '';
    this.userLogin.role = '';


    // this.SessinData.token = '';
    // this. SessinData.userRole =''; 
    // this. SessinData.location = '';
    // this. SessinData.email = '';
    // this. SessinData.id = '';
    // this.SessinData.phoneNumber =''; 
  }

  Login() {
    debugger;
    this.SessinData.token = '';
    this. SessinData.userRole =''; 
    this. SessinData.location = '';
    this. SessinData.email = '';
    this. SessinData.id = '';
    this.SessinData.phoneNumber =''; 

    let userModel = {
      Email: this.userLogin.email,
      Password: this.userLogin.password,
      //Role:this.userLogin.role
    }
    if(this.userLogin.email.trim()!=''&& this.userLogin.password.trim()!=''){
      let url = this.constantsService.urlLogin;
      this.commonService.post(url, userModel).subscribe(data => {
      //  this.spinnerService.hide();
        let userData: any = data;
        
        console.log(userData);
        if(userData.status == true){
          
         debugger;
          this.SessinData.token = userData.token.toString();
          this.SessinData.userRole = userData.userData.role;
          this.SessinData.location = userData.userData.location;
          this.SessinData.email = userData.userData.email;
          this.SessinData.id = userData.userData.id;
          this.SessinData.phoneNumber = userData.userData.phoneNumber;
          ;
          this.userContextService.setUser(this.SessinData); 
          this.router.navigateByUrl('/dashboard/home');
        }
        else{
          this.toastrService.error("Login Faild")
        }
      
        return;
      });
    }
    else{
      this.toastrService.error("Please enter valid Email and Password");
    }
   
  }
}
