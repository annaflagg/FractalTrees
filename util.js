// http://www.javascripter.net/faq/hextorgb.htm
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
function RGBtoHex(r,g,b) {return toHex(r)+toHex(g)+toHex(b)}
function toHex(n) {
	if (n==null) return "00";
	n=parseInt(n); if (n==0 || isNaN(n)) return "00";
	n=Math.max(0,n); n=Math.min(n,255); n=Math.round(n);
	return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}

function colorFromID(id) {
	var code = document.getElementById(id).value;
	return [hexToR(code),hexToG(code),hexToB(code)];
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}

