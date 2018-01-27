class AngularModule
{
	load(packagePath)
	{
		this.CEF = mp.browsers.new(packagePath);
	}	
	
	listen(eventName, callback)
	{
		mp.events.add(eventName, (responseId, ...args) =>
		{
			var response = callback(...args);
			
			if(typeof response === "object") 
			{
				response = JSON.stringify(response);
				response = response.replace(/\\"/g, '\\\\"');
			}
			
			this.CEF.execute('RageJS.sendFuncResponseToRAGE(\'' + responseId + '\',\'' + eventName + '\',\'' + response + '\')');
		});	
	}
}

var Angular = new AngularModule();

exports.load = Angular.load;
exports.listen = Angular.listen;
