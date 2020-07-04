import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'
import {User} from '../model'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService{
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private urlAPI = '192.168.1.15:8080';
    constructor(private  http:HttpClient)
    {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('currentUser'))
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User{
        return this.currentUserSubject.value;
    }
    public login = (username: String, password: String) =>
    {
        console.log(username);
        console.log(password);
        const loginUrl = `${this.urlAPI}/api/user/login`;
        console.log(loginUrl);
        return this.http.post<any>(loginUrl,{ username,password,})
        .pipe(map((user) => {
            if(user != null)
            {
                const newUser = {} as User;
                newUser.id = user.id;
                newUser.username = user.username;
                newUser.password = user.password;
                this.currentUserSubject.next(newUser);
                return user;
            }else{
                return null;
            }
        }))
    }
    public logout = () =>{
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        this.currentUserSubject.next(null);
    }
}