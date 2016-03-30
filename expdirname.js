var express = require('express')
var app = express()
 
app.use(express.static(__dirname + '/public'));
/*  app.get("/emp",function(req,res){
	 var emp1={"empid":"452620"};
	 var emp2={"empid":"426116"};
	 var emp=[emp1,emp2];
	 res.json(emp);
 }); */
app.listen(8080)