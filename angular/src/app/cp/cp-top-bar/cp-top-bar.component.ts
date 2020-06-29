import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cp-top-bar',
  templateUrl: './cp-top-bar.component.html',
  styleUrls: ['./cp-top-bar.component.css']
})
export class CpTopBarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }


  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['admin/login']);
  }

}
