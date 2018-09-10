import { Http, Response } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/Rx';


@Injectable()
export class LanguagesService implements OnInit {

    frenchArray = [];
    portugueseArray = [];
    frenchChar = [];
    languages: any = [];

    constructor(private http: Http) {
        this.ngOnInit();
    }
    ngOnInit(): void {
        this.getLanguages().subscribe(
            (data: Response) => {
                this.languages = data;
            }
        );
    }

    getLanguages() {
        let languagesApi = '/assets/languages.model.json';
        return this.http.get(languagesApi).map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
        );
    }
    getFrench() {
        if (this.languages) {
            let langModel = this.languages.languages[0];
            if (langModel.prefix === 'fr') {
                this.frenchArray = (Array.from(langModel.keys));
            }
        }
        return this.frenchArray;
    }
    getPortuguese() {
        if (this.languages) {
            let langModel = this.languages.languages[2];
            if (langModel.prefix === 'po') {
                this.portugueseArray = (Array.from(langModel.keys));
            }
        }
        return this.portugueseArray;
    }


}

