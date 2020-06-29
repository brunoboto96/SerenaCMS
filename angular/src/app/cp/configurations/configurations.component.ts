import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/shared/media.service';
import { PostService } from 'src/app/shared/post.service';
import { environment } from '../../../environments/environment';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/config.service';



@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
	uploadForm: FormGroup;
	public uploader: FileUploader = new FileUploader({
		isHTML5: true
	});

	post;
	mediaList;
	url;


	showSucessMessage: boolean;
	serverErrorMessages: string;



	constructor(private config: ConfigService, private media: MediaService, private fb: FormBuilder,
		private route: ActivatedRoute) { }

	ngOnInit() {
		//this.postId = this.route.snapshot.params['postId'];
		this.uploadForm = this.fb.group({
			title: [null, Validators.compose([Validators.required])],
			description: [null, Validators.compose([Validators.required])]
		});
		this.url = environment.backendBaseUrl;

		this.config.getPost().toPromise().then(
			res => {
				this.post = res['posts'][0];
				console.log(res['posts'][0]);
			},
			err => {
				console.log(err);

			}
		);

		this.media.getMediaConfig().toPromise().then(
			res => {
				this.mediaList = res['mediaFiles'];
				console.log(res['mediaFiles']);
			},
			err => {
				console.log(err);

			}
		);
	}



	onSubmit(form: NgForm) {
		if (confirm("Are you sure you want to edit this?")) {
			for (let i = 0; i < this.uploader.queue.length; i++) {
				let fileItem = this.uploader.queue[i]._file;
				if (fileItem.size > 30000000) {
					alert("Each File should be less than 30 MB of size.");
					return;
				}
			}
			//upload posts
			this.config.editPost(form.value).toPromise().then(
				res => {
					if (this.uploader.queue.length < 1)
						window.location.reload();
					//uploadFiles
					for (let j = 0; j < this.uploader.queue.length; j++) {
						let data = new FormData();
						let fileItem = this.uploader.queue[j]._file;
						console.log("Uploaded: " + fileItem.name);
						data.append('file', fileItem);
						this.config.uploadFile(data).subscribe(data => {
							this.uploader.progress = 100;
							this.uploader.queue[j].progress = 100;


							this.showSucessMessage = true;
							const source = timer(4000);
							source.subscribe(val => {
								window.location.reload();
							});
						});
					}
				},
				err => {
					if (err.status === 422) {
						this.serverErrorMessages = err.error.join('<br/>');
					}
					else
						this.serverErrorMessages = 'Something went wrong.Please contact admin.';
				}
			);


		}

		//this.uploader.clearQueue();

	}

	deleteMedia(id, idx) {
		if (confirm("Are you sure you want to delete this?")) {


			this.media.deleteFile(id).toPromise().then(
				res => {
					console.log(res)
					JSON.stringify(this.mediaList.splice(idx, 1))
					console.log(this.mediaList)
				},
				err => {
					if (err.status === 422) {
						this.serverErrorMessages = err.error.join('<br/>');
					}
					else
						this.serverErrorMessages = 'Something went wrong.Please contact admin.';
				}
			);
		}
	}





}
