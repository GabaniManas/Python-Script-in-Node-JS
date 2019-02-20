// const express = require('express');

// var app = express();

// // app.get('/',(req,res)=>{
// // 	res.send('Hello There!');
// // })

// // app.get(‘/dalembert’, callD_alembert);
// // function callD_alembert(req, res) {
// //   // using spawn instead of exec, prefer a stream over a buffer
// //   // to avoid maxBuffer issue
// //   var spawn = require(“child_process”).spawn;
// //   var process = spawn(‘python’, [“./d_alembert.py”,
// //     req.query.funds, // starting funds
// //     req.query.size, // (initial) wager size
// //     req.query.count, // wager count — number of wagers per sim
// //     req.query.sims // number of simulations
// //   ]);
// //   process.stdout.on(‘data’, function (data) {
// //     res.send(data.toString());
// //   });
// // }

const ps = require('python-shell');
const _ = require('lodash')
const fs=require('fs');
// app.get('/dalembert', callD_alembert);
// function callD_alembert(req, res) {
//   var options = {
//     args:
//     [
//       req.query.funds, // starting funds
//       req.query.size, // (initial) wager size
//       req.query.count, // wager count — number of wagers per sim
//       req.query.sims // number of simulations
//     ]
//   }
//   ps.PythonShell.run('./d_alembert.py', options, function (err, data) {
//     if (err) 
//     	res.send(err);
//     res.send(data.toString());
//   });
// }

// app.listen(3000,()=>{
// 	console.log('Server running on port 3000.');
// })


// var options = {
// 	mode: 'text',
// 	args: ['abc','xyz']
// }

// ps.PythonShell.run('myscript.py',null,function(err,res){
// 	if(err)
// 		throw err;
// 	console.log('results:',res);
const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const publicPath = path.join(__dirname + '/../public')
console.log(publicPath)
var app = express()
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server)
app.use(express.static(publicPath))
var encodedParser = bodyParser.urlencoded({extended:true})
app.use(bodyParser.json())
// app.get('/', (req, res) => {

    // const {spawn} = require('child_process');
    // const pyProg = spawn('python', ['./../myscript.py']);
    // // Retriving data from python
    // pyProg.stdout.on('data', function(data) {

    //     console.log(data.toString());
    //     res.write(data);
    //     res.end('end');
    // });
// })
// var options;
// var result;
// app.post('/',encodedParser,(request,response)=>{
// 	console.log(request.body)
	
//     // Retriving data from python
//     var options = {
//     	args:[
//     		request.body.arg1,
//     		request.body.arg2
//     	]
//     }
//     // console.log(options)
// 		ps.PythonShell.run('./../myscript.py',options,function(err,res){
// 			if(err)
// 				throw err;
// 			else
// 				// result=res;
// 				console.log(res);
// 				request.socket.emit('result',{result:res,options})
// 		}) 
		
// })
// console.log(options)
// app.get('/',(request,response)=>{
		// ps.PythonShell.run('./../myscript.py',options,function(err,res){
		// if(err)
		// 	throw err;
		// else
		// 	console.log(res)
		// 	response.send(res);
// 	})
// 	// console.log('results:',res);
// 	// const {spawn} = require('child_process');
//  //    const pyProg = spawn('python', ['./../myscript.py']);

// 	// pyProg.stdout.on('data', function(data) {

//  //        console.log(data.toString());
//  //        res.write(data);
//  //        res.end('end');
//  //    });
// })
// var result;
io.on('connection',(socket)=>{
	console.log('New Connection')
	// console.log(process.argv)
	// console.log(process.cwd()+'../../../../../Python27/Lib/site-packages')
	socket.on('input',function(data){
		var falsy={}
		if(!_.isEqual(data,falsy)){
			console.log(data)
			var options = {
				args:[
					data.arg1,
					data.arg2
				],
				// pythonPath:'C:/Users/manas/AppData/Local/Programs/Python/Python37-32', // 'C:/Python27/Lib/site-packages'
				// pythonOptions: ['-u']
			}
			ps.PythonShell.run('./../myscript.py',options,function(err,res){
				// console.log(process.argv)
				if(err)
					throw err;
				else
					console.log(res)
					// result=res;
					socket.emit('result',{res,options,image:"./output.png"}) // 
					// var readStream = fs.createReadStream(path.resolve(__dirname+'./output.png'),{
					// 	encoding:'binary'
					// }),chunks=[];
					// readStream.on('data',function(chunk){
					// 	chunks.push(chunk);
					// 	socket.emit('image',chunk);
					// })
					// fs.readFile('output.png',(err,data)=>{
					// 	// console.log(data);
					// 	// if(data)
					// 	// 	console.log('success');
					// 	socket.emit('image',{image:true,buffer:data})
					// })
				// response.send(res);
			})
		}
	})
	// socket.emit('data',)
	// socket.emit('Hello There!',{num:1})
});

server.listen(4000, () => console.log('Application listening on port 4000!'))
// ps.PythonShell.run('myscript.py',null,(err)=>{
// 	if(err)
// 		throw err;
// 	console.log('Successfully executed');
// })