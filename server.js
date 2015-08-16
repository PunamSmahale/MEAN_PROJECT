var express = require("express"),
	cons = require("consolidate"),
	mongoClient = require("mongodb").MongoClient,
	app = express(),
	config = require("./config");

app.engine("html", cons.swig);
app.set("view engine", 'html');
app.set("views", __dirname + "/views/");


app.get("*", function(request, response){
	response.render("Home" , "Pratham");
	//	response.send("Page Not Found, please try a different path.")
	});
	
	
var mongoConnection = mongoClient.connect(config.MONGO_URI, function(err, db){
	if(err) throw err;

console.log("Inside the Mongo connect");

	app.get("/", function(request, response){
		
			response.send("Home");
				
		// db.collection("Names").findOne({}, function(err, doc){
	
		// 	if(err) {
		// 		//throw err;
		// 		response.render("Home", err);
		// 	} 
		// 	response.render("Home", doc);
		// });	
	});
	
	
	
	
	
// });

app.listen(config.PORT , function(){
	console.log("Listening to port" + config.PORT);
});