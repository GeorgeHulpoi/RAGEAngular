import { Injectable, EventEmitter } from "@angular/core";

declare var window: any;

@Injectable()
export class RAGE
{
    private CustomEvents: EventEmitter<RAGEEvent> = new EventEmitter<RAGEEvent>();

    constructor()
	{
		window.RAGE =
		{
            call: this.call,
            Client:
			{
                response: this.Client.response,
            }
        };

        if (typeof window.RageJS === "object")
		{
            window.RageJS.Init();
        }
    }

    private call: Function = (func: string | number, ...args: any[]): void  =>
	{
        this.CustomEvents.emit({
            func: func,
            args: args
        });
    }

    get listen(): EventEmitter<RAGEEvent>
	{
        return this.CustomEvents;
    }

    public Client: RAGEClient =
	{
        /**
		 * This array contain all functions which are waiting for a response from the client
         */
        waitingResponses: [],

		
		/**
		 * This is the callback function
		 *
		 * @callback RAGEClientCallback
		 * @param {number|string|object} response
		 */

        /**
		 * This function is used to call the client (mp.trigger)
         * @param {RAGEClientCall} data - Here it will be the function name/id and the arguments
         * @param {RAGEClientCallback} [callback] - This is the function which it will be called when the service receive a response from the client
         */
        call: (data: RAGEClientCall, callback?: (response: string | number | object) => void) =>
		{
            if ( typeof window.RageJS.callClient !== "function") throw "RageJS.callClient isn't set in index.html";

            // We prepare the data for the client
            let to_client: any =
			{
                Arguments: data.args,
            }

			// If the callback function is defined, we will put the callback function in the waitingResponses
			// And when we receive a response, we will call the callback function
            if(typeof callback === "function")
            {
                // It's necessary, if 2+ functions are called in the same time?
                let id = this.Client.addToWaitingResponses(data.fn, callback);

                to_client.catchResponse =
				{
                    id: id,
                    fnCalled: data.fn,
                }
            }

            // After we managed the data, we send to client
            window.RageJS.callClient(data.fn, to_client);
        },

        /**
		 * This function is used to filter all responses from the client and call the callback function
         * @param {string} id - The unique id from waiting responses
         * @param {string|number} fn - The first function called (from Angular to Client)
         * @param {string|number|Object} response - The response from the client
         */
        response: (id: string, fn: string | number, response: string | number | object) =>
		{
            // Getting the index from waitingResponses
            let index = this.Client.getWaitingResponseIndex(id, fn);
            if(index === -1) throw "RAGE ERROR: A response came from client but the function wasn't in waiting responses";

            // Calling the callback function
            this.Client.waitingResponses[index].callback(response);
        },

        /**
		 * This function is used to search the index from waitingResponses based on the function name/id
         * @param {string} id - The unique id
         * @param {string|number} fn - The function
		 * @returns {number} The index from waitingResponses
         */
        getWaitingResponseIndex: function(id: string, fn: string | number): number
		{
            let length = this.waitingResponses.length;
            let index = -1;

            for(let i = 0; i < length; ++i)
            {
                if( this.waitingResponses[i].id === id && this.waitingResponses[i].fnCalled === fn )
                {
                    index = i;
                    break;
                }
            }

            return index;
        },

        /**
		 * This function register in the waitingResponses the callback function
         * @param {string|number} func - The function name/id
         * @param {RAGEClientCallback} callback - The callback function
         * @returns {string} The unique id (not index) from waitingResponses
         */
        addToWaitingResponses: (func: string | number, callback: (response: string | number | object) => void): string =>
		{
            let id = Math.random().toString(36).substr(2,9);

            this.Client.waitingResponses.push({
                id: id,
                fnCalled: func,
                callback: callback,
            });

            return id;
        }
    };
}

export interface RAGEClient {
    waitingResponses: Array<RAGEWaitingResponse>;
    call: (data: RAGEClientCall, callback?: (response: string | number | object) => void) => void;
    response: (id: string, fn: string | number, response: string | number | object) => void;
    getWaitingResponseIndex: (id: string, fn: string | number) => number;
    addToWaitingResponses: (func: string | number, callback: (response: string | number | object) => void) => string;
}

/**
 * The object with client call data
 * @typedef {Object} RAGEClientCall
 * @property {string|number} fn - The function called
 * @property {(number|string|object)[]} args - The arguments
 */
export interface RAGEClientCall {
    fn: string | number;
    args: Array<number | string | object>;
}

/**
 * The object which is in waitingResponses
 * @typedef {Object} RAGEWaitingResponse
 * @property {string} id - The unique id
 * @property {string|number} fnCalled - The function name/id
 * @property {RAGEClientCallback} callback - The function callback
 */
export interface RAGEWaitingResponse {
    id: string;
    fnCalled: string | number;
    callback: (response: string | number | object) => void;
}

export interface RAGEEvent {
    func: string | number;
    args: any[];
}
