/*
 *
 *  function Template
 *
 *  function Shape_name(data){
 *	//data -> parameters Required for the Shape
 *	let points = [];
 *
 *	// Calculate points
 *
 *	return points;
 * }
 *
 * example:
 * 	function line(x0, y0, x1, y1){
 * 	  //x0, y0 -> Initial Points of Line
 *	  //x1, y1 ->  End Points of the line
 *        let points = []
 * 	
 *	  //Calculate points
 *
 *	  return points
 *	
 */


class Point {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}



function line(p1, p2){
	/* this function calculates the points of the line with endpoints p1 &p2
	 */
 	let points = [];
  	let dx = Math.abs(p2.x - p1.x);
  	let sx = p1.x < p2.x ? 1 : -1;
  	let dy = -Math.abs(p2.y - p1.y);
  	let sy = p1.y < p2.y ? 1 : -1;
  	let err = dx + dy;

	let x1 = p1.x;
	let y1= p1.y;
  	while (true) {
   		points.push(new Point(x1, y1));
    	if (x1 == p2.x&& y1 == p2.y) {
     		 break;
    	}
    	let e2 = 2 * err;
		if (e2 >= dy) {
    		err += dy;
    		x1 += sx;
		}

    	if (e2 <= dx) {
    		err += dx;
    		y1 += sy;
    	}
  	}
	return points;
}


function drawrect(p1, p2){
	/* p1 is upper left corner of rectangle, p2 is lower right corner of rectangle */
	let points = [];

	let xTL = p1.x;
	let yTL = p1.y;
	points.push(new Point(xTL, yTL));

	let xBR = p2.x;
	let yBR = p2.y;
	points.push(new Point(xBR, yBR));

	let xTR = p2.x;
	let yTR = p1.y;
	points.push(new Point(xTR, yTR));

	let xBL = p1.x;
	let yBL = p2.y;
	points.push(new Point(xBL, yBL));

	let dx = Math.abs(p2.x - p1.x);
	let dy = Math.abs(p2.y - p1.y);

	let formX = (p2.x-p1.x)/(Math.abs(p2.x - p1.x));
	let formY = (p2.y-p1.y)/(Math.abs(p2.y - p1.y));

	for (let i = 1; i < dx; i++) {
		points.push(new Point(p1.x + formX * i, p1.y));
	}

	for (let i = 1; i < dx; i++) {
		points.push(new Point(p1.x + formX * i, p2.y));
	}

	for (let i = 1; i < dy; i++) {
		points.push(new Point(p1.x, p1.y + formY * i));
	}

	for (let i = 1; i < dy; i++) {
		points.push(new Point(p2.x, p1.y + formY * i));
	}

	return points;
}


function triangle(p1, p2, p3){
	/* p1, p2, and p3 are the three points of the triangle */
	let points = [];

	let arr1 = line(p1, p2);
	let arr2 = line(p2, p3);
	let arr3 = line(p1, p3);

	points.push(...arr1, ...arr2, ...arr3);

	return points;
}


function star(p1, p2){
	/* p1 and p2 are the edges of the box containing the star */
	let points = [];

	let midpointx = Math.floor((p1.x + p2.x)/2);
	let midpoint = new Point(midpointx, p1.y);

	let dx = Math.abs(p2.x - p1.x) + 1;
	let dy = Math.abs(p2.y - p1.y);

	let rem = dx % 3;

	if (rem == 1) {
		let in1len = parseInt(dx / 3);
		let in1 = new Point(p1.x + in1len, p1.y + in1len);
		let in2 = new Point(p2.x-in1len, p1.y + in1len);
		let arr1 = line(midpoint, in1)
		let arr2 = line(midpoint, in2)
		points.push(...arr1, ...arr2);
	}
	else if (rem == 2) {

	}
	else {

	}

	return points;
}

console.log(star(new Point(0, 0), new Point(12, 12)));


function circle(r, pc){
				/* This function returns points of Circle with radius r and center as pc*/

	let points = [];
	let x=0;
	let y=r;
	points.push(new Point(x, y));
	p = 1 - r;
	
	while(x<=y){
		//conditions
		x++;
		
		if(p<0){
			points.push(new Point(x, y));
			p=p+(2*x)+1;
		}else if(p>=0){
			y--;
			points.push(new Point(x, y));
			p=p+(2*x)+1-(2*y);
		}
	}

	points = _sym8(points);
	for(let pt of points){
		pt.x += pc.x;
		pt.y += pc.y;
	}

	return points;
}

function _sym8(points){
				/* This is a helper function for circle which calculates points on all the 8 symmetries */
	let nPoints = [];

	Array.prototype.push.apply(nPoints, points);

	for(let p of points){
		nPoints.push(new Point(p.y, p.x));
	}
	for(let p of points){
		nPoints.push(new Point(-p.y, p.x));
	}
	for (let p of points) {
		nPoints.push(new Point(-p.x, p.y));
	}
	for (let p of points) {
		nPoints.push(new Point(-p.x, -p.y));
	}
	for (let p of points) {
		nPoints.push(new Point(-p.y, -p.x));
	}
	for (let p of points) {
		nPoints.push(new Point(p.y, -p.x));
	}
	for (let p of points) {
		nPoints.push(new Point(p.x, -p.y));
	}
	return nPoints;
}


function ellipse(rx, ry, pc){
	/* This function return the points of the ellipse with major axis rx and minor axis ry with center pc */
	let points = [];
	let x = 0;
	let y = ry;
	points.push(new Point(x, y));

	//Region 1
	let p1 = Math.pow(ry, 2)+ (1/4)*Math.pow(rx,2) - Math.pow(rx, 2) * ry;

	while((2 * Math.pow(ry,2)*x) < (2*Math.pow(rx,2)*y)){
		x++;
		console.log(x);
		if(p1 < 0){
			points.push(new Point(x, y));
			p1 = p1 + 2*Math.pow(ry, 2)*x + Math.pow(ry, 2);
		}else{
			y--;
			points.push(new Point(x, y));
			p1 = p1+ 2*Math.pow(ry,2)*x - 2*Math.pow(rx,2)*y + Math.pow(ry, 2);
		}
	}

	//Region 2
	let x0 = points[points.length-1].x;
	let y0 = points[points.length-1].y;

	let p2 = Math.pow(ry,2)*Math.pow((x0+1/2),2) + Math.pow(rx,2)*Math.pow((y0-1),2) - Math.pow(rx, 2)*Math.pow(ry, 2);

	while(y0 >= 0){
		y0--;

		if(p2<0){
			points.push(new Point(x0, y0));
			p2 = p2 - 2*Math.pow(rx,2)*y0 + Math.pow(rx,2);
		}
		else{
			x0++;
			points.push(new Point(x0, y0));
			p2 = p2 + 2*Math.pow(ry,2)*x0 - 2*Math.pow(rx,2)*y0 + Math.pow(rx,2);
		}
	}
	points = _sym4(points);
	for(let pt of points){
		pt.x += pc.x;
		pt.y += pc.y;
	}
	return points;
}

function _sym4(points){
				/* This is a helper function for ellipse which calculates points on all the 4 symmetries */
	let nPoints = [];

	Array.prototype.push.apply(nPoints, points);

	for (let p of points) {
		nPoints.push(new Point(-p.x, p.y));
	}
	for (let p of points) {
		nPoints.push(new Point(-p.x, -p.y));
	}
	for (let p of points) {
		nPoints.push(new Point(p.x, -p.y));
	}
	return nPoints;
}

//console.log(ellipse(5, 5,new Point(0, 0)));
//console.log(circle(5,new Point(0, 0)));

