import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ParticipantDto, ParticipantResponse } from "../participant/model/paticipant";
import { MatPaginator } from "@angular/material/paginator";
import { Page } from "../model/http";

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {

    readonly apiURL: string = 'http://localhost:8081';

    constructor(private http: HttpClient) {
    }

    get(code: number): Observable<any> {
        return this.http.get(`${this.apiURL}/participant/find-by-id?code=${code}`);
    }

    find(name: string, page: MatPaginator): Observable<any> {
        const params = new HttpParams()
        params.set('name', name);
        params.set('page', page?.pageIndex);
        params.set('size', page?.pageSize);
        return this.http.get(`${this.apiURL}/participant/find?name=${name}&page=${page?.pageIndex}&size=${page?.pageSize}`, {
           params: params
        });
    }

    deleteByCodeList(codes: number[]): Observable<any> {
        return this.http.put(`${this.apiURL}/participant/delete-by-code-list`, codes);
    }

    save(participantRequest: ParticipantDto): Observable<any> {
        return this.http.post(`${this.apiURL}/participant/insert`, participantRequest);
    }
} 