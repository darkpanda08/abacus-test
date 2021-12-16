import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TestService } from '../../services/test.service';
import { TestData } from 'src/app/models/test-data.model';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  testId: string;
  isLoading: boolean = false;
  fetchedTest: TestData;

  constructor(public testService: TestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.testId = params['id'];
    });

    this.testService.getTest(this.testId).subscribe((response: TestData) => {
      this.fetchedTest = response;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

}
