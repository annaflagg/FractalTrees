/* ft.js */

window.onload = function() {
	document.getElementById("previewImage").onclick = previewImage;
	var elements = ["bgColor", "leafColor", "trunkColor"];
	for (var id in elements) {
		document.getElementById(elements[id]).onchange = previewImage;
	}
	previewImage();
	configureMakeImageButton();
}

function collectParameters() {
	return {
		bgColor:document.getElementById("bgColor").value,
		leafColor:colorFromID("leafColor"),
		numIterations:document.getElementById("numIterations").value,
		randomness:document.getElementById("randomness").value / 100.0,
		shrinkRate:(1.0 - document.getElementById("shrinkRate").value / 200.0),
		splitAngle:degreesToRadians(document.getElementById("splitAngle").value),
		trunkColor:colorFromID("trunkColor"),
		trunkLength:document.getElementById("trunkLength").value,
	}
}

function previewImage() {
	var canvas = document.getElementById("ftCanvas");
	var context = canvas.getContext("2d");
	params = collectParameters();
	// Set the canvas background color.
	context.fillStyle = params["bgColor"];
	context.fillRect(0, 0, canvas.width, canvas.height);
	// Set the coordinates of the tree root.
  var x = canvas.width / 2;
	var y = canvas.height;
	// Start the recursive branch drawing procedure.
	dB(context, params, params["numIterations"], x, y, params["trunkLength"], degreesToRadians(90.0));
}

function dB(context, params, iteration, x, y, length, angle) {
  if (iteration == 0) return;
	randomness = params["randomness"];
	length = (1.0 + (2*Math.random()-1)*randomness)*length;
  var X = x + length * Math.cos(angle);
  var Y = y - length * Math.sin(angle);
  context.beginPath();
	context.strokeStyle = getColor(params, iteration); // line color
  context.moveTo(x, y);
  context.lineTo(X, Y);
  context.stroke();
	iteration--;
	length *= params["shrinkRate"];
	var delAnglePlus = (1.0 + (2*Math.random()-1)*randomness)*params["splitAngle"];
	var delAngleNegative = (1.0 + (2*Math.random()-1)*randomness)*params["splitAngle"];
	//var delAngle = params["splitAngle"];
	dB(context, params, iteration, X, Y, length, angle+delAnglePlus);  
	dB(context, params, iteration, X, Y, length, angle-delAngleNegative);  
}

function getColor(params, iteration) {
	maxValue = params["numIterations"];
	var tip = params["leafColor"];
	var root = params["trunkColor"];
  var r = getComponentColor(root[0], tip[0], iteration, maxValue);
  var g = getComponentColor(root[1], tip[1], iteration, maxValue);
  var b = getComponentColor(root[2], tip[2], iteration, maxValue);
  return RGBtoHex(r,g,b);
}

function getComponentColor(root, tip, iteration, maxValue) {
  return Math.floor(iteration*(root-tip)/maxValue+tip);
}

function configureMakeImageButton() {
	var canvas = document.getElementById("ftCanvas");
	var button = document.getElementById("makeImage");
	button.onclick = function () {
		window.location = canvas.toDataURL('image/png');
	};
}
