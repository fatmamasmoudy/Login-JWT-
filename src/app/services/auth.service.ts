import { User } from './../model/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  public loggedUser:string;
  public isloggedIn: Boolean = false;
  public roles:string[];

   
  apiURL: string = 'http://localhost:8083/women/user';
  token:string;
  constructor(private router: Router,
          private http : HttpClient) { }

login(user : User)
{
return this.http.post<User>(this.apiURL+'/signin', user , {observe:'response'});
}
signup(user : User)
{
return this.http.post<User>(this.apiURL+'/signup', user , {observe:'response'});
}

loadToken() {
  this.token = localStorage.getItem('jwt');
}

getToken():string {
  return this.token;
  }

saveToken(jwt:string){
 localStorage.setItem('jwt',jwt);
 this.token = jwt;
 this.isloggedIn = true; 
 }

logout() { 
  this.isloggedIn= false;
  this.loggedUser = undefined;
  this.roles = undefined;
  localStorage.removeItem('loggedUser');
  localStorage.setItem('isloggedIn',String(this.isloggedIn));
  this.router.navigate(['/signin']);
}

  /*SignIn(user :User):Boolean{
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if(user.username=== curUser.username && user.password==curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser',this.loggedUser);
        localStorage.setItem('isloggedIn',String(this.isloggedIn));
      }
    });

     return validUser;
  }

  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
       return false;
    return (this.roles.indexOf('ADMIN') >-1);
   
  }

  */setLoggedUserFromLocalStorage(login : string) {
    this.loggedUser = login;
    this.isloggedIn = true;
   
  }/*

  getUserRoles(username :string){    
    this.users.forEach((curUser) => {
      if( curUser.username == username) {
          this.roles = curUser.roles;
      }
    });
  }*/

}
