//Colors from https://flatuicolors.com/
var globalColorArray = ["#C91F37","#DC3023","#9D2933","#CF000F","#E68364","#F22613","#CF3A24","#C3272B","#8F1D21","#D24D57","#F08F90","#F47983","#DB5A6B","#C93756","#FCC9B9","#FFB3A7","#F62459","#F58F84","#875F9A","#5D3F6A","#89729E","#763568","#8D608C","#A87CA0","#5B3256","#BF55EC","#8E44AD","#9B59B6","#BE90D4","#4D8FAC","#5D8CAE","#22A7F0","#19B5FE","#59ABE3","#48929B","#317589","#89C4F4","#4B77BE","#1F4788","#003171","#044F67","#264348","#7A942E","#8DB255","#5B8930","#6B9362","#407A52","#006442","#87D37C","#26A65B","#26C281","#049372","#2ABB9B","#16A085","#36D7B7","#03A678","#4DAF7C","#D9B611","#F3C13A","#F7CA18","#E2B13C","#A17917","#F5D76E","#F4D03F","#FFA400","#E08A1E","#FFB61E","#FAA945","#FFA631","#FFB94E","#E29C45","#F9690E","#CA6924","#F5AB35","#BFBFBF","#F2F1EF","#BDC3C7","#ECF0F1","#D2D7D3","#757D75","#EEEEEE","#ABB7B7","#6C7A89","#95A5A6"];

function randomRange(min, max){
	return randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

//From StackOverflow - http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors 
function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function Picaso(Obj){

	var about = {
		Version: 0.1,
		Author: "Rohan Lopes",
		Created: "Aug 2016",
		Updated: "Aug 2016"
	};

	if(Obj){
		if (window === this) {
			return new Picaso(Obj);
		}
		this.e = Obj;
		return this;
	} else {
		return about;
	}
}

Picaso.prototype = {
	canvas: function(){
		console.log(this);
	    var lineCanvas = document.getElementById("myCanvas");
	    var winH = this.e.height;
	    var winW = this.e.width;
	    var blocksX = (this.e.blocksX > 5) ? this.e.blocksX : 5;
	    var blocksY = (this.e.blocksY > 5) ? this.e.blocksY : 5;
	    var type = (this.e.type) ? this.e.type : "rect";

	    lineCanvas.width  = winW - 5;
		lineCanvas.height = winH - 5;
		var ctx = lineCanvas.getContext("2d");
		
		var horSquares = winW/5;
		var verSquares = winH/5;
		var blocksObj = {};
		var x1 = 0;
		var x2 = 0;
		var y1 = 0;
		var y2 = 0;

		var designObj = [];

		for(var i = 0; i < verSquares; i++) {
			for(var j = 0; j < horSquares; j++) {
				x2 = x1 + blocksX;
				y2 = y1 + blocksY;
				// ctx.globalAlpha = 0.9;

				type = (randomRange(0, 6) == 6) ? "circle" : "rect";
				var shadePercentage = [-50, -40, -20, 20, 40, 80];

				switch(type) {
					case "circle" :
						var color = shadeColor(globalColorArray[randomRange(0, globalColorArray.length-1)], shadePercentage[randomRange(0, shadePercentage.length)]);
						ctx.save();
			            ctx.beginPath();
			            var tmpX = (x2 - x1)/2;
			            var tmpY = (y2 - y1)/2;
			            var cenX = x1 + (blocksX/2);
			            var cenY = y1 + (blocksY/2);
						var radius = (tmpX > tmpY) ? tmpX : tmpY;
						// console.log(color);
						ctx.arc(cenX, cenY, radius, 0, 2*Math.PI);
						ctx.fillStyle = color;
						ctx.fill();
						ctx.restore();
						designObj.push({"x1" : x1, "y1" : y1, "x2" : x2, "y2" : y2, "cx" : x2, "cy" : y2, "r":radius, "color" : color});
						break;
					case "rect" :
						var color = shadeColor(globalColorArray[randomRange(10, globalColorArray.length-1)], shadePercentage[randomRange(0, shadePercentage.length)]);
						ctx.fillStyle = color;
						ctx.fillRect(x1, y1, x2, y2);
						/*var rad = 2 * Math.PI - 25 * Math.PI / 180;    
						ctx.rotate(rad);*/
						designObj.push({"x1" : x1, "y1" : y1, "x2" : x2, "y2" : y2, "color" : color});
						break;
					default:
						ctx.fillStyle = color;
						ctx.fillRect(x1, y1, x2, y2);
						designObj.push({"x1" : x1, "y1" : y1, "x2" : x2, "y2" : y2, "color" : color});
				}
				
				x1 += blocksX;
			}
			x1 = 0;
			y1 += blocksY;
		}

		this.ArrayData = designObj;

		ctx.stroke();
		return lineCanvas;
	},
	ArrayData : []
};

/*Picaso({
	"blocksX" : 20,
	"blocksY" : 20,
	"height"  : window.innerHeight,
	"width"	  : window.innerWidth,
	"type"	  : "rect",
	"shade"   : "random"
}).canvas();*/

var timer = setInterval(function(){
	var xy = randomRange(20, 50);
	Picaso({
		"blocksX" : xy,
		"blocksY" : xy,
		"height"  : window.innerHeight,
		"width"	  : window.innerWidth,
		"type"	  : "rect",
		"shade"   : "random"
	}).canvas();
}, 1000);
