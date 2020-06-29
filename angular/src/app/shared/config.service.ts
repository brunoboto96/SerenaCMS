import { Injectable } from '@angular/core';
import { Config } from './config.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  selectedPost: Config = {
		title: '',
		description: ''
	};
	noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };


  constructor(private http: HttpClient) { }
  	//HttpMethods

	editPost(post: Config) {
		return this.http.post(environment.apiBaseUrl + '/admin/cp/config/edit', post, this.noAuthHeader);
	}

	getPost() {
		return this.http.get(environment.apiBaseUrl + '/admin/cp/config', this.noAuthHeader);
	}
	
/*
	deletePost(id) {		
		return this.http.get(environment.apiBaseUrl + '/admin/cp/config/delete/' + id, this.noAuthHeader);
	}

	setPost(data: FormData): Observable<any> {
		return this.http.post(environment.apiBaseUrl + '/admin/cp/posts', data);
	}
*/

	//Helper Methods

	uploadFile(data: FormData): Observable<any> {
		return this.http.post(environment.apiBaseUrl + '/admin/cp/upload', data, this.noAuthHeader); 
	}



}


