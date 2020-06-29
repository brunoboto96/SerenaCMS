import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { MediaService } from '../shared/media.service';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

	projectList;
	mediaList;
	url;
	filesList;
	constructor(private posts: PostService, private media: MediaService, ) { }

	ngOnInit() {
		this.url = environment.backendBaseUrl;
		this.posts.getPost().subscribe(
			res => {
				//detects urls in the description and adds html link
				let i = 0;
				for(let d of res['posts']) {
					console.log(res['posts'][i]['description'])
					//this.projectList['posts'][i]['description'] = this.urlify(res['posts'][i]['description']);
					res['posts'][i]['description'] = this.urlify(res['posts'][i]['description']);
					console.log(this.urlify(res['posts'][i]['description']));
					
					i++;
				}
				this.projectList = res['posts'];
				console.log(res['posts']);
				console.log(this.projectList);
			},
			err => {
				console.log(err);

			}
		);

		this.media.getMedia().subscribe(
			res => {
				this.mediaList = res['mediaFiles'];
				this.checkId(this.projectList, this.mediaList);
				//console.log(res['mediaFiles']);
			},
			err => {
				console.log(err);

			}
		);
	}

	public checkId(proj: any, medi: any) {
		var fileList: any[][] = [];
		var idx: number = 0;

		for (let x = 0; x < proj.length; x++) {
			for (let y = 0; y < medi.length; y++) {
				//console.log(x,y)
				//console.log(medi[y])
				if (y == 0) {
					fileList[x] = []
					idx = 0
				}
				if (medi[y].postId == proj[x]._id) {
					fileList[x][idx] = medi[y]
					idx++
					//console.log("idx: "+idx)
				}
			}
		}
		this.filesList = fileList;
		console.log("fileList: ", this.filesList);
	}

	public urlify(text) {
		var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(urlRegex, function(url) {
			return '<a href="' + url + '">' + url + '</a>';
		});
	}
}
