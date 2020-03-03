var maps = [ //所有地图数据
	[ //第一关
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[0, 0, 2, 0, 0, 0, 0, 0, 3, 3, 3, 4, 4],
		[0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 3, 4, 4],
		[5, 5, 2, 1, 3, 3, 0, 0, 4, 4, 4, 4, 4],
		[5, 5, 2, 4, 4, 4, 0, 0, 5, 5, 5, 5, 5],
		[5, 5, 0, 4, 4, 4, 0, 0, 1, 1, 1, 1, 1],
		[5, 5, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0],
		[5, 5, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 4],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2],
		[4, 4, 0, 0, 0, 3, 3, 3, 0, 0, 0, 4, 4],
		[0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0]
	],
	[ //第二关
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[4, 0, 0, 4, 0, 5, 5, 5, 0, 3, 0, 0, 3],
		[4, 4, 0, 4, 0, 5, 0, 0, 0, 3, 0, 0, 3],
		[4, 0, 4, 4, 0, 5, 0, 0, 0, 3, 0, 0, 3],
		[4, 0, 0, 4, 0, 5, 5, 5, 0, 3, 3, 3, 3],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 0],
		[0, 0, 1, 2, 0, 2, 0, 0, 3, 4, 0, 4, 0],
		[1, 1, 1, 2, 0, 2, 3, 3, 3, 4, 0, 4, 0],
		[1, 0, 0, 2, 0, 2, 3, 0, 0, 4, 0, 4, 0],
		[1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 0],
	]
];
//地图数据对应的图片
var imgSrc = [ 
	"img/ground.png",
	"img/hongQiang.png",
	"img/tieQiang.png",
	"img/shui.png",
	"img/caoDi.png",
	"img/xueDi.png"
];
//地图板块对应的等级
var MapBlockLevel = [99, 1, 1, 99, 99, 99];
//地图块id对于的生命值
var MapBlockHp = [0, 1, 3, 0, 0, 0]; 
//子弹宽度
var bulletWidth = 4; 
//子弹高度
var bulletHeight = 10; 
//子弹速度
var bulletSpeed = 5; 
//子弹伤害值
var bulletDamage = 1; 
//子弹颜色
var bulletColor = "#FFFFFF"; 
//获取画布和画笔
var canvas;
var context;
//定义画布的宽高
var cW = 650,
	cH = 650;
var cellSize = 50;
//地面地图块id
var groundMapBlockId = 0; 
//红墙地图块id
var hongQiangMapBlockId = 1; 
//铁墙地图块id
var tieQiangMapBlockId = 2; 
//水面地图块id
var shuiMapBlockId = 3; 
//草坪地图块id
var caoDiMapBlockId = 4; 
//雪地地图块id
var xueDiMapBlockId = 5; 
//自动改变方向，数值越大可能性越小
var ChangeDirection = 30; 
 //自动开火，数值越大可能性越小
var FireStarter = 77;
//地图对象
var tankMap = new Map();
//玩家坦克
var mytank = new Tank();
//设置生命值为50
mytank.hp = 10;
//敌人坦克数组
var tanks = [];
//操控游戏对象
var control = new Control();
//得分对象
var score;
//得分
var num=0;
//历史最高分
var best=0;
//从本地得到历史得分
if(!localStorage.getItem("value")) {
	localStorage.setItem("value", "[0]");
}
//历史得分数组
var ls;
window.onload = function() {
	//获取画布
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	//设置画布宽高
	canvas.width = cW;
	canvas.height = cH;
	//获取音乐
	audios = document.getElementById("audio");
	mp3=document.getElementById("mp3");
	die=document.getElementById("die");
	//获取得分对象
	score=document.getElementById("score");
	//获取生命值对象
	life = document.getElementById("HP");
	//获取地图图片
    tankMap.getMapImgArray();
    //获取地图板块数组
	tankMap.getMapBlock();
	//预生成敌人坦克
	createTanks();
	alert("准备好开始了吗");
	//开始游戏
	//audios.play();
	getBest();
	timer=setInterval(playGame, 20);
	

}

function playGame() {
	//清屏
	context.clearRect(0, 0, cW, cH);
	//控制游戏更新
	control.update();
	//画地图
	tankMap.drawMap();
	//画出玩家坦克
	mytank.draw();
	//画出玩家子弹
	mytank.drawBullet();
	//画出地方坦克
	drawTanks();
	//画出得分
	gameScore();
	//当玩家坦克生命为0时结束游戏
	if(mytank.hp<=0){
		//画出得分
	gameScore();
		clearInterval(timer);
		alert("你的得分:"+num+"\n历史得分:"+(best>num?best:num))
		//当历史记录没有当前分数时加入
		if(!ls.includes(num)){
		ls.push(num);
	}
	localStorage.setItem("value",JSON.stringify(ls));
		window.location.reload();
	}
}
//更新得分
function gameScore(){
	score.innerText="当前得分："+num;
	life.innerText="玩家生命值："+mytank.hp;
}

//得到历史最高分
function getBest(){
	ls=JSON.parse(localStorage.getItem("value"));
	ls=ls.sort(function(a,b){return b-a;});
	best=ls[0];
}

//检查obj是否与数组中的元素有相同
function inArray(obj, array) {
	for(var i = 0; i < array.length; i++) {
		if(obj == array[i]) {
			return true;
		}
	}
	return false;
}

//将obj加入数组
function addArray(obj, array) {
	var a = [];
	for(var i in array) {
		a[i] = array[i];
	}
	a[a.length] = obj;
	return a;
}

//地图对象
function Map() {
	this.imgs = [];
	this.mapBlocks = [];
	this.smap = maps[1];
//加载所有图像数据	
	this.getMapImgArray = function() { 			
		for(var i = 0; i < imgSrc.length; i++) {
			this.imgs[i] = new Image();
			this.imgs[i] = getImage(imgSrc[i]);
		}

	}
//根据地图图片数组和地图图片数据生成地图块数组		
	this.getMapBlock = function() { 	

		for(var i = 0; i < this.smap.length; i++) {
			this.mapBlocks[i] = [];
			for(var j = 0; j < this.smap[0].length; j++) {
				this.mapBlocks[i][j] = new MapBlock(this.imgs[this.smap[i][j]], j * cellSize, i * cellSize, cellSize, cellSize, this.smap[i][j]);
			}
		}
	}
//画出地图
	this.drawMap = function() {
		for(let i = 0; i < this.mapBlocks.length; i++) {
			for(let j = 0; j < this.mapBlocks[0].length; j++) {
				context.drawImage(this.mapBlocks[i][j].img, this.mapBlocks[i][j].x, this.mapBlocks[i][j].y, this.mapBlocks[i][j].width, this.mapBlocks[i][j].height);

			}
		}
	}
}

//地图块类
function MapBlock(img, x, y, width, height, id) { 
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.id = id;
	this.hp = MapBlockHp[id]; //地图块生命值
	this.level = MapBlockLevel[id]; //地图块等级，低等级子弹无法对高等级地图块造成伤害
}


//坦克对象
function Tank() {
	this.x = 100;
	this.y = 350;
	this.width = cellSize;
	this.height = cellSize;
	this.speed = 3; //移动速度
	this.hp = 1; //初始生命值
	this.maxBulletNumber = 10; //最大子弹数
	this.id = 0;
	this.bullets = [];
	this.camp = 0; //所属阵营 0表示玩家 1表示敌人
	this.direction = "up";
	this.img = getImage("img/tank_1.png");
	this.level = 1;
	this.previousX = null; //上次移动时的x
	this.previousY = null; //上次移动时的y
	this.update = function() {
		switch(this.direction) {
			case "up":
				this.y -= this.speed;
				break;
			case "down":
				this.y += this.speed;
				break;
			case "left":
				this.x -= this.speed;
				break;
			case "right":
				this.x += this.speed;
				break;
		}

		////碰撞检测，并跳过空地地图块
		var col = (collisionDetection(this, tankMap.mapBlocks, [groundMapBlockId])); 
		if(JSON.stringify(col) != "{}") {
			//有些可以行走的地图块判定（雪地、草地）
			for(var i = 0; i < col[this].length; i++) {
				if(col[this][i].id == xueDiMapBlockId || col[this][i].id == caoDiMapBlockId) { //判断是否为坦克可行走地图块				
					continue;
				}
				//不可行走地图块，根据方向调整坦克位置
				switch(this.direction) {
					case "up":
						if(this.y < col[this][i].y + col[this][i].height) {
							this.y = col[this][i].y + col[this][i].height;
						}
						break;
					case "down":
						if(this.y > col[this][i].y - this.height) {
							this.y = col[this][i].y - this.height;
						}
						break;
					case "left":
						if(this.x < col[this][i].x + col[this][i].width) {
							this.x = col[this][i].x + col[this][i].width;
						}
						break;
					case "right":
						if(this.x > col[this][i].x - this.width) {
							this.x = col[this][i].x - this.width;
						}
						break;
				}
			}
		}
		//超出边界判定
		if(this.x < 0) {
			this.x = 0;
		} else if(this.x > cW - cellSize) {
			this.x = cW - cellSize;
		}
		if(this.y < 0) {
			this.y = 0;
		} else if(this.y > cH - cellSize) {
			this.y = cH - cellSize;
		}

	}
//根据阵营和方向画出图片
	this.draw = function() {
		if(this.camp == 0) {
			this.img = getImage("img/tank_1.png");
		} else {
			this.img = getImage("img/tank_2.png");
		}
//根据方向旋转图片 并画出
		switch(this.direction) {
			case "up":
				context.drawImage(this.img, this.x, this.y, cellSize, cellSize);
				break;
			case "down":
				context.save();
				context.translate(this.x + 25, this.y + 25);
				context.rotate(180 * Math.PI / 180);
				context.drawImage(this.img, -25, -25);
				context.restore();

				break;
			case "left":
				context.save();
				context.translate(this.x + 25, this.y + 25);
				context.rotate(270 * Math.PI / 180);
				context.drawImage(this.img, -25, -25);
				context.restore();
				break;
			case "right":
				context.save();
				context.translate(this.x + 25, this.y + 25);
				context.rotate(90 * Math.PI / 180);
				context.drawImage(this.img, -25, -25);
				context.restore();
				break;
		}
	}
	
//自动控制敌方坦克移动和射击
	this.autoControl = function() { 

		this.update();
		//根据随机数改变方向
		if(0 == parseInt(Math.random() * ChangeDirection)) { 
			var dir=["up", "down", "left", "right"];
			this.direction = dir[parseInt(Math.random() * 4)];
		}
		//如果坦克未移动 改变方向
		if(this.x == this.previousX && this.y == this.previousY) {
			var dir=["up", "down", "left", "right"];
			this.direction = dir[parseInt(Math.random() * 4)];
		}
		this.previousX = this.x;
		this.previousY = this.y;
//根据随机数自动开火
		if(0 == parseInt(Math.random() * FireStarter)) { 
			this.fire();
		}
	}

//射击函数
	this.fire = function() {
		//如果子弹数未超出最大子弹数
		if(this.bullets.length < this.maxBulletNumber) {
			//设定子弹方向
			var bulletPosition = {
				"up": {
					"x": this.x + (this.width - bulletWidth) / 2,
					"y": this.y - bulletHeight,
					"width": bulletWidth,
					"height": bulletHeight,
					"speedX": 0,
					"speedY": -bulletSpeed
				},
				"down": {
					"x": this.x + (this.width - bulletWidth) / 2,
					"y": this.y + this.height,
					"width": bulletWidth,
					"height": bulletHeight,
					"speedX": 0,
					"speedY": bulletSpeed
				},
				"left": {
					"x": this.x - bulletHeight,
					"y": this.y + (this.height - bulletWidth) / 2,
					"width": bulletHeight,
					"height": bulletWidth,
					"speedX": -bulletSpeed,
					"speedY": 0
				},
				"right": {
					"x": this.x + this.width,
					"y": this.y + (this.height - bulletWidth) / 2,
					"width": bulletHeight,
					"height": bulletWidth,
					"speedX": bulletSpeed,
					"speedY": 0
				}
			};
//根据方向获取子弹出现位置
			var bu = bulletPosition[this.direction]; 
//放入子弹数组
			this.bullets.push(new Bullet(bu.x, bu.y, bu.width, bu.height, bu.speedX, bu.speedY, bulletColor, bulletDamage, this.camp));
		}
	}
//画出子弹射击
	this.drawBullet = function() {
		for(var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].update();
			context.fillStyle = this.bullets[i].color;
			context.fillRect(this.bullets[i].x, this.bullets[i].y, this.bullets[i].width, this.bullets[i].height);
		}
	}

}
//初始化敌方坦克
function createTanks() {
	for(var i = 0; i < 10; i++) { 
		let tank = new Tank();
		tank.camp = 1;
		tank.x = parseInt(Math.random() * cW);
		tank.y = parseInt(Math.random() * cH);
		tanks.push(tank);
	}
}
//画出敌方坦克
function drawTanks() {
	for(i = 0; i < tanks.length; i++) {
		tanks[i].draw();
		tanks[i].drawBullet();
	}
}


//碰撞检测
function collisionDetection(tank, blocks, ground) { 
	var rect_0, rect_1;
	var collisionObj = {};
	for(var i = 0; i < blocks.length; i++) {
		for(var j = 0; j < blocks[0].length; j++) {
			//检测是否要跳过
			if(inArray(blocks[i][j].id, ground)) { 
				continue;
			}
			//坦克的上下左右坐标
			r_0 = {
				"left": tank.x,
				"top": tank.y,
				"right": tank.x + tank.width,
				"bottom": tank.y + tank.height
			};
			//板块的上下左右坐标
			r_1 = {
				"left": blocks[i][j].x,
				"top": blocks[i][j].y,
				"right": blocks[i][j].x + blocks[i][j].width,
				"bottom": blocks[i][j].y + blocks[i][j].height
			};
			//如果发生碰撞
			if(isCollision(r_0, r_1)) { 

				if(collisionObj[tank]) {
					collisionObj[tank].push(blocks[i][j]);
				} else {
					collisionObj[tank] = [];
					collisionObj[tank].push(blocks[i][j]);
				}

			}
		}
	}
	//返回碰撞的板块
	return collisionObj;
}
//判断是否碰撞 （列出不碰撞的条件 其它的就都是碰撞）
function isCollision(r_0, r_1) { 
	if(r_0.left >= r_1.left && r_0.left >= r_1.right) {
		return false;
	} else if(r_0.left <= r_1.left && r_0.right <= r_1.left) {
		return false;
	} else if(r_0.top >= r_1.top && r_0.top >= r_1.bottom) {
		return false;
	} else if(r_0.top <= r_1.top && r_0.bottom <= r_1.top) {
		return false;
	}
	return true;
}

//子弹类
function Bullet(x, y, width, height, speedX, speedY, color, damage, camp) { 
	//横坐标
	this.x = x; 
	//纵坐标
	this.y = y; 
	//宽度
	this.width = width;
	//高度
	this.height = height; 
	//颜色
	this.color = color; 
	//每次横向移动距离
	this.speedX = speedX; 
	//每次纵向移动距离
	this.speedY = speedY; 
	//伤害值
	this.damage = damage; 
	//所属阵营 0表示玩家 1表示敌人
	this.camp = camp; 
	this.save = true;
	//子弹等级
	this.level = 1; 
//更新子弹坐标，在屏幕之外的返回false
	this.update = function() { 

		this.x += this.speedX;
		this.y += this.speedY;
		if(this.x + this.width < 0 || this.y + this.height < 0 || this.x > cW || this.y > cH) {
			this.save = false;
		}

		//与地图块碰撞检测，并跳过空地地图块
		var col = collisionDetection(this, tankMap.mapBlocks, [groundMapBlockId, shuiMapBlockId, caoDiMapBlockId, xueDiMapBlockId]);
		if(JSON.stringify(col) != "{}") {
			for(var i = 0; i < col[this].length; i++) {				
				this.save = false
				//判断子弹等级是否大于地图块等级，低等级子弹无法对高等级地图块造成伤害
				if(this.level >= col[this][i].level) {
					col[this][i].hp -= this.damage; //根据伤害值减少生命值
					if(col[this][i].hp <= 0) { //如果生命值小于等于0
						col[this][i].id = groundMapBlockId;
						col[this][i].img = tankMap.imgs[col[this][i].id];
					}
				}
			}
		}
		//与敌方坦克块碰撞检测，并跳过空地地图块
		var tempTanks = addArray(mytank, tanks);
		col = collisionTank(this, tempTanks, []);
		if(JSON.stringify(col) != "{}") {
			for(var i = 0; i < col[this].length; i++) {

				//判断子弹等级是否大于地图块等级，低等级子弹无法对高等级地图块造成伤害
				//子弹等级大于等于坦克等级且子弹和坦克不属于同一阵营则造成伤害
				if(this.level >= col[this][i].level && this.camp != col[this][i].camp) {
					col[this][i].hp -= this.damage; //根据伤害值减少生命值
					this.save = false
				}

			}
		}
	}
}

//子弹和坦克的碰撞检测 原理和与板块碰撞一致
function collisionTank(bullet, tank) {
	var rect_0, rect_1;
	var collisionObj = {};
	for(var i = 0; i < tank.length; i++) {
		r_0 = {
			"left": bullet.x,
			"top": bullet.y,
			"right": bullet.x + bullet.width,
			"bottom": bullet.y + bullet.height
		};
		r_1 = {
			"left": tank[i].x,
			"top": tank[i].y,
			"right": tank[i].x + tank[i].width,
			"bottom": tank[i].y + tank[i].height
		};
		if(isCollision(r_0, r_1)) { //如果发生碰撞

			if(collisionObj[bullet]) {
				collisionObj[bullet].push(tank[i]);
			} else {
				collisionObj[bullet] = [];
				collisionObj[bullet].push(tank[i]);
			}

		}

	}
	return collisionObj;
}

//控制类，检测键盘按键
function Control() { 
	//方向
	this.direction = null; 

	this.update = function() {
		//更新坦克
		this.updateTank();
		//更新玩家坦克子弹
		mytank.bullets = this.updateBullet(mytank.bullets);
//敌方坦克数组自动控制	
		for(var i = 0; i < tanks.length; i++) {
			tanks[i].autoControl(); 		
			tanks[i].bullets = this.updateBullet(tanks[i].bullets);
		}

		tanks = this.delTank(tanks);
	}
//更新玩家坦克
	this.updateTank = function() { 
		//判断方向控制是否为空 为空代表坦克未动 停在原地
		if(this.direction != null) { 
			mytank.direction = this.direction;
			mytank.update();
		}
	}

//更新子弹
	this.updateBullet = function(bullets) { 
		var bu = [];
		for(var i = 0; i < bullets.length; i++) {
			//更新子弹坐标，在屏幕之外或消失的子弹的save为false
			if(bullets[i].save) { 
				bu.push(bullets[i]);
			}
		}
		return bu;
	}
//删除生命值小于等于0的坦克
	this.delTank = function(tanks) { 
		var tTanks = [];
		for(var i in tanks) {
			if(tanks[i].hp > 0) {
				tTanks.push(tanks[i]);
			} 
			//重新生成坦克
			else{
				die.play();
				let ntank = new Tank();
				ntank.camp=1;
				ntank.x = parseInt(Math.random() * cW);
				ntank.y = parseInt(Math.random() * cH);
				tTanks.push(ntank);
				num++;
			}
		}
		return tTanks;

	}

}

window.onkeydown = function(event) { 
	//37左，38上，39右，40下
	if(event.keyCode >= 37 && event.keyCode <= 40) {
		var keyValues = ["left", "up", "right", "down"];
//判断按键与原本的是否不相等
		if(control.direction != keyValues[event.keyCode - 37]) { 
			control.direction = keyValues[event.keyCode - 37];
		}
	}
	//空格键32 按下开火
	if(event.keyCode == 32) {
		mp3.play();
		mytank.fire();
	}
}
window.onkeyup = function(event) { 
	//37左，38上，39右，40下
	if(event.keyCode >= 37 && event.keyCode <= 40) {
		var keyValues = ["left", "up", "right", "down"];
//判断按键与原本的是否相等
		if(control.direction == keyValues[event.keyCode - 37]) { 
			control.direction = null;
		}
	}
}



//得到图片
function getImage(path) {
	var img = new Image();
	img.src = path;
	return img;
}