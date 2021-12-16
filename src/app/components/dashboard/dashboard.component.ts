import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Router } from '@angular/router';

import { TestData } from 'src/app/models/test-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  fetchedTests: TestData[] = [];

  constructor(public testService: TestService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.testService.getTests().subscribe((response: TestData[]) => {
        this.fetchedTests = response;
        this.isLoading = false;
      });
  }

  onStartTest(id: string) {
    this.router.navigate(['/test', id]);
    // this.testService.startTest(id).subscribe((response: TestData) => {
    //   console.log(response);
    // });
  }

}
