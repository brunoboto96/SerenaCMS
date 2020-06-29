import { Injectable } from '@angular/core';
import { Media } from './media.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  selectedPost: Media = {
    path: '',
    type: '',
    postId: ''
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods



  getMedia() {
    return this.http.get(environment.apiBaseUrl + '/mediafiles', this.noAuthHeader);
  }

  getMediaByPostId(id) {
    return this.http.get(environment.apiBaseUrl + '/mediafiles/' + id, this.noAuthHeader);
  }
  
  getMediaConfig() {
    return this.http.get(environment.apiBaseUrl + '/mediafiles/config' , this.noAuthHeader);
  }

  deleteFile(id) {
    return this.http.get(environment.apiBaseUrl + '/admin/cp/mediafiles/delete/' + id, this.noAuthHeader);
  }


}
