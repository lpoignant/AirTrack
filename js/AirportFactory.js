var AirportFactory = function (args) {
	if (!args.scene) {
		throw "No scene specified for the airport factory";
	}
	if (!args.ellipsoid) {
		throw "No ellipsoid specified";
	}
	
	this._scene = args.scene;
	this._ellipsoid = args.ellipsoid;
	this._airports = new AirportTypeCollection();
};

AirportFactory.prototype.createAirportCollection = function (args) {
	if (!args.type) throw "Please specify a type to add it to the factory";
	if (!args.imageSrc) throw "Please specify an image to use for the new type";
	
	var collection = new AirportCollection({
		scene: this._scene,
		imageSrc: args.imageSrc,
		name: args.name
	});
	
	this._airports.addType({
		type: args.type,
		collection: collection
	})
	
	return collection;
};

AirportFactory.prototype.create = function (airportDef) {
	if (!airportDef.type) throw "No type defined for the airport";
	if (!airportDef.longitude_deg) throw "No longitude specified";
	if (!airportDef.latitude_deg) throw "No latitude specified";
	
	var billboard = {
		position: this._ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(airportDef.longitude_deg, airportDef.latitude_deg)),
	};
	
	var airport = new Airport({
		options: billboard,
		collection: airports,
		meta: airportDef
	});
	
	this._airports.addAirport({
		type: airportDef.type,
		airport: airport
	});
	
	return airport;
};

AirportFactory.prototype.getAirportCollection = function () {
	return this._airports;
}