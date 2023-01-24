import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImgbbUploadService {
  private readonly apiKey : string = "d296aa0e84870997059e70711820c71d";

  constructor( private readonly httpClient: HttpClient) { }

  upload(file: any){
    const formData = new FormData();
    formData.append('image', file);

    return this.httpClient
    .post('https://api.imgbb.com/1/upload', formData, {params: {key: this.apiKey}})

    // return this.httpClient
    // .post('/upload', formData, {params: {key: this.apiKey}})
  }

}