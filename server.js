var express = require("express"),
	cons = require("consolidate"),
	mongoClient = require("mongodb").MongoClient,
	app = express();

app.engine("html", cons.swig);
app.set("view engine", 'html');
app.set("views", __dirname + "/views/");

var mongoConnection = mongoClient.connect("mongodb://localhost:27017/meanDb", function(err, db){
	if(err) throw err;

	app.get("/", function(request, response){
				
		db.collection("Names").findOne({}, function(err, doc){
	
			if(err) throw err;
			response.render("Home", doc);
		});	
	});
	
	app.get("*", function(request, response){
		response.send("Page Not Found, please try a different path.")
	});
	
});

app.listen(8080);