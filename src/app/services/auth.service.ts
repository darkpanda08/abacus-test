import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AdminData, AuthData, SignUpData } from "../models/auth-data.model";
import { map, Observable, Subject } from "rxjs";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";

const BACKEND_URL_USER = environment.apiUrl + "/user";
const BACKEND_URL_ADMIN = environment.apiUrl + "/admin";

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private isAdmin: boolean = false;
    private token: string;
    private tokenTimer: any;

    private authStatusListener = new Subject<boolean>();
    private adminStatusListener = new Subject<boolean>();
    private loginStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAdmin() {
        return this.isAdmin;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getAdminStatusListener() {
        return this.adminStatusListener.asObservable();
    }

    createUser(name: string, age: number, school: string, email: string, password: string) {
        const authData: SignUpData = { name, age, school, email, password };
        return this.http.post( BACKEND_URL_USER + '/signup', authData, {observe: 'response'});
    }

    createAdmin(name: string, school: string, email: string, password: string) {
        const adminData: AdminData = { name, school, email, password };
        return this.http.post( BACKEND_URL_ADMIN + '/signup', adminData, {observe: 'response'});
    }

    login(email: string, password: string) {
        const authData: AuthData = { email, password };
        this.http.post<{token: string, expiresIn: number}>(BACKEND_URL_USER + '/login', authData).subscribe(response => {
            console.log(response);
            const token = response.token;
            this.token = token;
            if (token) {
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(token, expirationDate);
                this.router.navigate(['/dashboard']);
            }
        });
    }

    loginAdmin(email: string, password: string) {
        const authData: AuthData = { email, password };
        return this.http.post<{token: string, expiresIn: number}>(BACKEND_URL_ADMIN + '/login', authData).subscribe(response => {
            const token = response.token;
            this.token = token;
            if (token) {
                this.isAdmin = this.getTokenData(token).isAdmin;
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.adminStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.saveAuthData(token, expirationDate);
                this.router.navigate(['/admin']);
            }
        });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            if(this.getTokenData(authInformation.token).isAdmin) {
                this.isAdmin = true;
                this.adminStatusListener.next(true);
            }
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }

    }

    logout() {
        this.token = null;
        this.isAdmin = false;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.adminStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    getUser() {
        return this.http.get(BACKEND_URL_USER + '/profile');
    }

    getAdmin() {
        return this.http.get(BACKEND_URL_ADMIN + '/profile');
    }

    getUsersList() {
        return this.http.get(BACKEND_URL_USER + '/list');
    }

    private setAuthTimer(duration: number) {
        console.log('Setting timer: ' + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        };
    }

    private getTokenData(token: string) {
        const tokenData = token.split('.')[1];
        return JSON.parse(window.atob(tokenData));
    }
}