import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpHeaders, HttpClient, HttpEventType } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	selectedPost: Post = {
		title: '',
		description: ''
	};
	noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

	constructor(private http: HttpClient) { }

	//HttpMethods

	postPost(post: Post) {
		return this.http.post(environment.apiBaseUrl + '/admin/cp/post', post, this.noAuthHeader);
	}

	editPost(post: Post, id) {
		return this.http.post(environment.apiBaseUrl + '/admin/cp/posts/edit/' + id, post, this.noAuthHeader);
	}

	getPost() {
		return this.http.get(environment.apiBaseUrl + '/posts', this.noAuthHeader);
	}
	
	getPostById(id)
	{
		return this.http.get(environment.apiBaseUrl + '/posts/' + id, this.noAuthHeader);
	}

	deletePost(id) {		
		return this.http.get(environment.apiBaseUrl + '/admin/cp/posts/delete/' + id, this.noAuthHeader);
	}
/*
	setPost(data: FormData): Observable<any> {
		return this.http.post(environment.apiBaseUrl + '/admin/cp/posts', data);
	}
*/

	//Helper Methods

	uploadFile(data: FormData): Observable<any> {
		return this.http.post(environment.apiBaseUrl + '/admin/cp/upload', data, this.noAuthHeader); 
	}



}
