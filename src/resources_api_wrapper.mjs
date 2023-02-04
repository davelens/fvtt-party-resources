export default class PartyResources{
	static getById(id){
		return window.pr.api.get(id);
	}
	
	static _getResourceId(name){
		return window.pr.api.resources().resources.find(r=>r.name == name)?.id;
	}
	
	static getByName(name){
		return PartyResources.getById(this._getResourceId(name));
	}
	
	static incrementById(id, amount){
		window.pr.api.increment(id, amount);
	}
	
	static decrementById(id, amount){
		window.pr.api.decrement(id, amount);
	}
	
	static incrementByName(name, amount){
		PartyResources.incrementById(_getResourceId(name), amount);
	}
	
	static decrementByName(name, amount){
		PartyResources.decrementById(_getResourceId(name), amount);
	}
	
	static getResources(){
		return window.pr.api.resources().resources;
	}
}