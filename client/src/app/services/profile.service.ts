import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';
import { baseURL } from '../shared/baseURL';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPService } from './process.http.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(private http: HttpClient, private processHTTPService: ProcessHTTPService) { }

    addProfile(profileData): Observable<Profile | string> {
        return this.http.post<Profile | string>(baseURL + 'profiles', profileData)
            .pipe(catchError(this.processHTTPService.handleError));
    }

    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(baseURL + 'profiles')
            .pipe(catchError(this.processHTTPService.handleError));
    }

    getProfileDetails(id): Observable<Profile> {
        return this.http.get<Profile>(baseURL + 'profiles/' + id)
            .pipe(catchError(this.processHTTPService.handleError));
    }

    removeProfile(id): Observable<Profile> {
        return this.http.delete<Profile>(baseURL + 'profiles/' + id)
            .pipe(catchError(this.processHTTPService.handleError));
    }

}