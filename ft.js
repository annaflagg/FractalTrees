/* ft.js */

window.onload = function() {
	var button = document.getElementById("previewImage");
	button.onclick = previewHandler;
	var id;
	var elements = ["backgroundColor", "leafColor", "trunkColor"];
	for (id in elements) {
		document.getElementById(elements[id]).onchange = previewHandler;
	}
	previewHandler()

	// Easter Egg
	makeImage();
}

function previewHandler() {
	var canvas = document.getElementById("ftCanvas");
	var context = canvas.getContext("2d");
	fillBackgroundColor(canvas, context);
	// experiment with trunk length (try 120)
	var trunkLength = document.getElementById("trunkLength").value;
	// experiment with factor to contract the trunk each iteration (try 0.7)
  var trunkContrationFactor = 0.8;
	var theta = degreesToRadians(90.0);
	var deltaTheta = degreesToRadians(document.getElementById("splitAngle").value);
  var startX = canvas.width / 2;
	var startY = canvas.height;
	var iteration = 16;
	var trunkColorHexCode = document.getElementById("trunkColor").value;
	var randomness = document.getElementById("randomness").value;
	//var root_col = [107,42,34];
	var root_col = [hexToR(trunkColorHexCode),hexToG(trunkColorHexCode),hexToB(trunkColorHexCode)];
	var leafColorHexCode = document.getElementById("leafColor").value;
	//var root_col = [107,42,34];
	var tip_col = [hexToR(leafColorHexCode),hexToG(leafColorHexCode),hexToB(leafColorHexCode)];
	//var tip_col = [93,150,35];
	drawBranch(context, iteration, startX, startY, trunkLength, trunkContrationFactor, theta, deltaTheta, root_col, tip_col, randomness);
}
// http://www.javascripter.net/faq/hextorgb.htm
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
// color the tree with a gradient from root_col to tip_col
// interpolate linearly to get color at a given position in the gradient
function getColor(root_col, tip_col, iteration) {
  var r = getColorComponent(root_col[0], tip_col[0], iteration)
  var g = getColorComponent(root_col[1], tip_col[1], iteration)
  var b = getColorComponent(root_col[2], tip_col[2], iteration)
  return RGBtoHex(r,g,b);
}

function getColorComponent(root_col, tip_col, iteration) {
	var root = 20;
  return Math.floor(iteration*(root_col-tip_col)/root+tip_col);
}

function RGBtoHex(r,g,b) {return toHex(r)+toHex(g)+toHex(b)}

function toHex(n) {
 if (n==null) return "00";
 n=parseInt(n); if (n==0 || isNaN(n)) return "00";
 n=Math.max(0,n); n=Math.min(n,255); n=Math.round(n);
 return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}
function drawBranch(context, iteration, startX, startY, trunkLength, trunkContrationFactor, theta, deltaTheta, root_col, tip_col, randomness) {
  if (iteration == 0) return;
	var t = (1.0 + (2*Math.random()-1)*randomness/100.0)*trunkLength;
	//var t = trunkLength;
  var endX = startX + t * Math.cos(theta);
  var endY = startY - t * Math.sin(theta);
  context.beginPath();
	context.strokeStyle = getColor(root_col, tip_col, iteration); // line color
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
	iteration--;
	trunkLength *= trunkContrationFactor;
	var d = (1.0 + (2*Math.random()-1)*randomness/100.0)*deltaTheta;
	//var d = 2*Math.random()*deltaTheta;
	drawBranch(context, iteration, endX, endY, trunkLength, trunkContrationFactor, theta + d, deltaTheta, root_col, tip_col, randomness);  
	drawBranch(context, iteration, endX, endY, trunkLength, trunkContrationFactor, theta - d, deltaTheta, root_col, tip_col, randomness);  
}
// This is where we'll set the background color
function fillBackgroundColor(canvas, context) {
	var bgColor = document.getElementById("backgroundColor").value;
	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

// Draws a circle at a random location
function drawCircle(canvas, context) {
	var radius = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.beginPath();
	context.arc(x, y, radius, 0, degreesToRadians(360), true);
	context.fillStyle = "lightblue";
	context.fill();
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}

// Easter Egg
function makeImage() {
	var canvas = document.getElementById("ftCanvas");
	var button = document.getElementById("makeImage");
	button.onclick = function () {
		window.location = canvas.toDataURL('image/png');
	};
}
