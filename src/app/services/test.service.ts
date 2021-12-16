import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { TestData } from "../models/test-data.model";

const BACKEND_URL = environment.apiUrl + "/test";

@Injectable({ providedIn: "root" })
export class TestService {

    constructor(private http: HttpClient, private router: Router) {}

    getTests() {
        return this.http.get<TestData[]>(BACKEND_URL + '/');
    }

    getTest(id: string) {
        return this.http.get(BACKEND_URL + '/' + id);
    }

    startTest(id: string) {
        return this.http.get(BACKEND_URL + '/start/' + id);
    }
}