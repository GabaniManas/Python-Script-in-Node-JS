// require('/jquery-3.3.1.min.js') 
// console.log(jQuery)
var socket = io();
console.log('Connected')
socket.emit('input',jQuery.deparam(window.location.search))

socket.on('result',function(data){
	console.log(data);
	// jQuery('#result').text('Result:'+data.res[0])
	jQuery('#arg1').val(data.options.args[0])
	jQuery('#arg2').val(data.options.args[1])
	var p=jQuery('<p></p>')
	p.text('Result:'+data.res[0])
	jQuery('#myform').append(p)
	console.log(data);
	var img = jQuery('<img/>')
	console.log(data.image)
	img.attr('src',data.image)
	img.attr('id','output')
	jQuery('#myform').append(img)
	// jQuery('#submit').on('click','.remove_field')
})

// socket.on('image',function(data){
// 	// var imgChunks=[];
// 	// var div=jQuery('<div></div>')
// 	// div.attr('id','image')
// 	// var img = jQuery('<img id="output"/>')
// 	// impChunks.push(data);
// 	// img.attr('src','data:image/png'+window.btoa(imgChunks))
// 	// img.appendTo('#image')
// 	// jQuery('#myform').append(div)

// })

socket.on('connect',function(){
	console.log('Connected to Server')
})

socket.on('disconnect',function(){
	console.log('Disconnected to Server')
})