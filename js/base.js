// background-canvas
(function (){
	var body = document.getElementsByTagName("body")[0];
	var canvas = document.createElement("canvas");
	canvas.className = 'background-canvas'; 
	body.appendChild(canvas);

	var width = document.body.clientWidth; 
	var height = document.body.clientHeight; 
	canvas.width = width;
	canvas.height = height;


	var cxt=canvas.getContext("2d");
	var Points = new Array();
	init();
	// function init(){}//初始化
	// function randomPoint(){}//随机一个点
	// function randomPoints(){}//随机一个点
	// function march(){}//修改一个点的坐标，使得其运动
	// function inspectPoint(){}//检查是否溢出,是则清除并重新生成一个随机点
	// function marchAll(){}//修改所有点的坐标，使得其运动
	// function drawPoint(){}//画一个点
	// function drawPoints(){}//从点数组里得到坐标画出所有点
	// function drawLine(){}//画一条线
	// function drawLines(){}//画出所有的线
	function init(){//初始化
		randomPoints();
		var timer1=window.setInterval(function(){
			cxt.clearRect(0,0,width,height);
			drawLines(200);
			drawPoints();
			marchAll();

		},16);
	}

	function randomPoint(){//随机一个点
		var x,y,growthX,growthY;
		x = Math.floor(Math.random()*width);
		y = Math.floor(Math.random()*height);
		growthX = (Math.random() - 0.5);
		growthY = (Math.random() - 0.5);
		Points.push({x:x,y:y,growthX:growthX,growthY:growthY});
	}
	function randomPoints(){//随机所有点
		for (var i = 0; i < 50; i++) {
			randomPoint();
		}
	}
	function marchAll(){//修改所有点的坐标，使得其运动
		for (var i = Points.length - 1; i >= 0; i--) {
			Points[i].x += Points[i].growthX;
			Points[i].y += Points[i].growthY;
			if(Points[i].x < 0 || Points[i].x >width ||Points[i].y < 0 || Points[i].y >height ){
				Points.splice(i,1);
				randomPoint();
			}
		}
	}
	function drawPoint(x,y,r,color){
		cxt.fillStyle=color;
		cxt.beginPath();
		cxt.arc(x,y,r,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
	}
	function drawPoints(){//从点数组里得到坐标画出所有点
		for (var i = Points.length - 1; i >= 0; i--) {
			drawPoint(Points[i].x,Points[i].y,5,"#999");
		}
	}
	function drawLine(x1,y1,x2,y2,color,width){//画一条线
		cxt.beginPath();
		cxt.lineWidth=width;
		cxt.strokeStyle=color;
		cxt.moveTo(x1,y1);
		cxt.lineTo(x2,y2);
		cxt.stroke();
	}
	function drawLines(Mix){//画出所有的线
		var s;
		var x1,y1,x2,y2;
		Mix *= Mix;
		var MinC = 0x55;	//浅的颜色
		var MaxC = 0xaa;	//深的颜色
		for (var i = Points.length - 1; i >= 0; i--) {
			x1 = Points[i].x;
			y1 = Points[i].y;
			for (var j = Points.length - 1; j > i; j--) {
			x2 = Points[j].x;
			y2 = Points[j].y;
				diff_x = x1 - x2;
				diff_y = y1 - y2;
				s = diff_x * diff_x + diff_y * diff_y;
				if(s < Mix && s > 0){
					var Color =Math.floor(MinC - (MinC - MaxC) * s / Mix).toString(16);
					drawLine(x1,y1,Points[j].x,Points[j].y,"#"+Color+Color+Color,1);
				}
			}
		}
	}
})();
// nav fixed top
(function(){
	var nav = document.getElementsByTagName('nav')[0];
	var pseudoNav = document.createElement("div");
	pseudoNav.style.height = nav.clientHeight+'px';
	pseudoNav.className = 'hidden';
	document.body.insertBefore(pseudoNav,nav); // 这两种方法均可实现 
	var y0= nav.getBoundingClientRect().top+document.body.scrollTop;
	if (window.innerHeight) var winHeight = window.innerHeight;else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight;
	// if(document.body.offsetHeight-nav.offsetHeight-y0>winHeight)
		window.addEventListener("scroll",function(){
			var y= document.body.scrollTop;
			if(y>=y0){
				nav.className = 'fixed-top';
				pseudoNav.className = 'block';
			}else{
				nav.className = '';
				pseudoNav.className = 'hidden';
			}
		});
})();