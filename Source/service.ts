import { Injectable, EventEmitter } from '@angular/core';

declare var window: any;

@Injectable()
export class RAGE {
    private CustomEvents: EventEmitter<RAGEEvent> = new EventEmitter<RAGEEvent>();

    constructor() {
		window.RAGE = {
            call: this.call,
        };

        if ( typeof window.RAGEInit === 'function') {
		    window.RAGEInit();
        }
        else if ( typeof window.RLoaded === 'boolean' ) {
            window.RLoaded = true;
        }
    }

    private call: Function = (func: string | number, ...args: any[]): void  => {
        this.CustomEvents.emit({
            func: func,
            args: args
        });
    }

    get listen(): EventEmitter<RAGEEvent> {
        return this.CustomEvents;
    }

    callClient(func: string | number, ...args: any []): void  {
        if ( typeof window.callClient !== 'function') throw 'callClient isn\'t set in index.html';
        window.callClient(func,args);
    }
}

export interface RAGEEvent {
    func: string | number;
    args: any[];
}
