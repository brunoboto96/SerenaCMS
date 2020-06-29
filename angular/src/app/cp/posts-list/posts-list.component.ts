import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/shared/media.service';
import { PostService } from 'src/app/shared/post.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  projectList;
  mediaList;
  url;
  filesList;
  constructor(private posts: PostService, private media: MediaService) { }

  ngOnInit() {
    this.url = environment.backendBaseUrl;
    this.posts.getPost().subscribe(
      res => {
        this.projectList = res['posts'];
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

  deletePost(id, idx) {
		if (confirm("Are you sure you want to delete this?")) {


			this.posts.deletePost(id).toPromise().then(
				res => {
					console.log(res)
          
					JSON.stringify(this.projectList.splice(idx, 1))
          console.log(this.projectList)
          console.log(this.filesList)
          window.location.reload();
				},
				err => {
					console.log(err)
				}
			);
		}
	}

}
