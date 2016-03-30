var express = require('express');
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var http = require("http");
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies



 app.use(express.static(__dirname + '/sample'));
 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'helpdesk'
});
 app.get('/load',function(req,res){
	//res.set('Access-Control-Allow-Origin', '*');
	connection.query("SELECT * from ManagePunchout",function(err,rows){
		if(err)
		{
		console.log("Problem with MySQL"+err);
		}
		else
		{
		res.end(JSON.stringify(rows));
		}
		});
}); 
 
 app.post('/add', function (req, res) {

  res.set('Access-Control-Allow-Origin', '*');
 
    console.log("got data");
	console.log(req.body);
	var punchout = req.body.punchout == 'true'? 1:0;
	var users = req.body.users == 'true'? 1:0;
	var locations = req.body.locations == 'true'? 1:0;
	var restrictions = req.body.restrictions == 'true'? 1:0;
	var webreq = req.body.webreq == 'true'? 1:0;
	var extrinsics = req.body.extrinsics == 'true'? 1:0;
	
	
	console.log(ln);
	 connection.query('insert into ManagePunchout (AribaNetwork,punchout,users,locations,restrictions,webreq,extrinsics,CompanyId,FisherAccount,FisherISACode) values ("' + req.body.AribaNetwork + '", "' + punchout + '", "' + users + '", "' + locations + '", "' + restrictions + '", "' + webreq + '", "' + extrinsics + '", "' + req.body.CompanyId + '", "' + req.body.FisherAccount + '", "' + req.body.FisherISACode + '")',function(err, rows, fields) {

	if (!err)
    console.log('The solution is: ', rows);
	else
    console.log('Error while performing Query.');
	}); 
	res.send(req.body);
   });
   
   // delete functionallity
   app.post('/delete', function (req, res) {

  res.set('Access-Control-Allow-Origin', '*');
 
    console.log("got data");
	console.log(req.body);
	var eid = req.body.eid;
	var ename = req.body.ename;
	
	
	 connection.query('delete from emp where eid = ("' + eid + '")',function(err, rows, fields) {
	if (!err)
    console.log('The solution is: ', rows);
	else
    console.log('Error while performing Query.');
	}); 
	res.send(req.body);
   });
   
   
   //update values
   app.post('/update', function (req, res) {

  res.set('Access-Control-Allow-Origin', '*');
 
    console.log("got data");
	console.log(req.body);
	var eid = req.body.eid;
	var ename = req.body.ename;
	
	
	 connection.query('UPDATE emp SET ename="' + ename + '" WHERE eid="' + eid + '";',function(err, rows, fields) {
	if (!err)
    console.log('The solution is: ', rows);
	else
    console.log('Error while performing Query.');
	}); 
	res.send(req.body);
   });
   app.listen(8084);
