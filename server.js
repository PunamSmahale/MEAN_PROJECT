var express = require("express"),
	cons = require("consolidate"),
	mongoClient = require("mongodb").MongoClient,
	app = express(),
	config = require("./config");

app.engine("html", cons.swig);
app.set("view engine", 'html');
app.set("views", __dirname + "/views/");

app.get("/", function(request, response){
	mongoClient.connect(config.MONGO_URI, function(err, db){
		if(err) throw err;
	
		db.collection("Names").findOne({}, function(err, doc){
				if(err) {
					//throw err;
					response.render("Home", err);
				} 
			response.render("Home", doc);
		});	
	});
	
});


app.get("*", function(request, response){
	response.send("Page Not Found");
});

app.listen(config.PORT , function(){
	console.log("Listening to port" + config.PORT);
});