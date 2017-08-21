import { Injectable } from '@angular/core';

declare var window: any;

@Injectable()
export class RAGE {

    constructor() {
		window.RAGE = {};

        if ( typeof window.RAGEInit === 'function') {
		     window.RAGEInit();
        }
    }
}
