import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/common/common.service';
import { ConstantService } from 'src/app/common/constant.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  User:any={};
  roles: string[] = ['Admin', 'User'];
  userList:any=[];
  constructor(private commonService: CommonService,
    private toastrService: ToastrService,
    private constantsService: ConstantService,){

  }
  clearmodal(){
    this.User.id= 0;
    this.User.email= '';
    this.User.UserNamee= '';
    this.User.phoneNumber= '';
    this.User.location= '';
    this.User.password= '';
    this.User.role= '';
    this.User.isActive= true; 
  }
  ngOnInit():void{

    this.clearmodal()
    this.GetUserList()
  // "id": 0,
  // "email": "string",
  // "phoneNumber": "string",
  // "location": "string",
  // "password": "string",
  // "userNamee": "string",
  // "role": "string"
  }
  GetUserList(){

    let url= this.constantsService.UserList
    console.log(this.User)
    this.commonService.get(url).subscribe(res=>{
      this.userList = res.userLIst
      console.log(res);
  });
  }
  DeleteUser(id:any){
    let url= this.constantsService.DeleteUser
    console.log(this.User)
    this.commonService.get(url+"/"+id).subscribe(res=>{
      console.log(res);
      this.toastrService.info("User Has Been Deleted");
      this.clearmodal();
  });
  }
  EditUser(item:any){
    
    this.User.id= item.id;
    this.User.email= item.userNamee;
    this.User.UserNamee= item.email;
    this.User.phoneNumber=item.phoneNumber;
    this.User.location=item.location;
    this.User.password= item.password;
    this.User.role= item.role;
    this.User.isActive= true;
  }
  AddUpdate(){
    debugger;
    if(this.User.id ==0)
    {
        let url= this.constantsService.CreateUser
        console.log(this.User)
        this.commonService.post(url,this.User).subscribe(res=>{
          console.log(res);
          this.toastrService.info("User has been added successfully");
          this.clearmodal()
          this.GetUserList()
      });
    }
    else{
      let url= this.constantsService.UpdateUser
      console.log(this.User)
      this.commonService.post(url,this.User).subscribe(res=>{
        console.log(res);
        this.toastrService.info("User has been Updated successfully");
        this.clearmodal();
        this.GetUserList()
    });
    }
  }
}
