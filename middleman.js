function RageMP() 
{
	this.Loaded = false;

	this.Init = function() 
	{
		this.Loaded = true;
	}
	
	this.sendFuncResponseToRAGE = function (id, fn, response)
	{
		if(!this.Loaded) return;
		if (typeof id !== "string") return;
		if (typeof fn !== "string" && typeof fn != "number") return;
		if (typeof response !== "string" && typeof response !== "number") return;

		// Be carefully here, if you want to sent a string, don't put at first character '{'
		RAGE.Client.response(id, fn, 
			(typeof response === "string" && response[0] === "{") ? JSON.parse(response) : response
		);
	}

	this.callClient = function (func, data)
	{
		mp.trigger(func, data.catchResponse.id, ...data.Arguments);
	}
}

var RageJS = new RageMP();
