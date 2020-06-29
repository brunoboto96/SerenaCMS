import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/shared/post.service';
import { FileUploader } from 'ng2-file-upload';
import { timer } from 'rxjs';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	showSucessMessage: boolean;
	serverErrorMessages = ''

	//uploadForm: FormGroup;

	public uploader: FileUploader = new FileUploader({
		isHTML5: true
	});


	constructor(private fb: FormBuilder, private postService: PostService) {
	}

	onSubmit(form: NgForm) {
		for (let i = 0; i < this.uploader.queue.length; i++) {
			let fileItem = this.uploader.queue[i]._file;
			if (fileItem.size > 30000000) {
				alert("Each File should be less than 30 MB of size.");
				return;
			}
		}
		//upload posts
		this.postService.postPost(form.value).toPromise().then(
			res => {
				//console.log(res["posts"]["_id"])
				//uploadFiles


				for (let j = 0; j < this.uploader.queue.length; j++) {
					let data = new FormData();
					let fileItem = this.uploader.queue[j]._file;
					console.log("Uploaded: " + fileItem.name);
					data.append('file', fileItem);
					data.append('postId', res["posts"]["_id"]);
					
					this.postService.uploadFile(data).toPromise().then(() => {
						this.uploader.progress = 100;
						this.uploader.queue[j].progress = 100;

						//reset procedures
						this.aftersubmit(form)
					});
				}
				if (this.uploader.queue.length <= 0) 
					this.aftersubmit(form)

			},
			err => {
				if (err.status === 422) {
					this.serverErrorMessages = err.error.join('<br/>');
					console.log(this.serverErrorMessages)
				}
				else
					this.serverErrorMessages = 'Something went wrong.Please contact admin.';
			}
		);
	}

	aftersubmit(form) {

		this.showSucessMessage = true;
		const source = timer(3000);
		source.toPromise().then(() => {
			this.resetForm(form)
		});
	}

	resetForm(form: NgForm) {

		this.uploader.clearQueue();
		this.showSucessMessage = false;
		this.postService.selectedPost = {
			title: '',
			description: ''
		};
		form.resetForm();
		this.serverErrorMessages = '';
	}



	ngOnInit() {
		/*this.uploadForm = this.fb.group({
			title: [null, Validators.compose([Validators.required])],
			description: [null, Validators.compose([Validators.required])]
		});*/

	}
}
