import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/models/job/job.model';

const JOB_API = 'http://localhost:8080/api/jobs/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(JOB_API, job, httpOptions);
  }
  deleteJob(id: string): Observable<any> {
    return this.http.delete(JOB_API + id, httpOptions);
  }
  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(JOB_API + id);
  }
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(JOB_API);
  }
  getUserJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(JOB_API + "user");
  }
  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(JOB_API, job, httpOptions);
  }
}
