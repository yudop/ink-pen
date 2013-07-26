//To hold the data for each action on the screen
var undoHistory = [];

//Function to save the states in history
function saveActions() {
	var imgData = document.getElementById("canvas1").toDataURL("image/png");
	undoHistory.push(imgData);
	$('#undo').removeAttr('disabled');
}

//Actual Undo Function
function undoDraw(){
	if(undoHistory.length > 0){
		var undoImg = new Image();
		$(undoImg).load(function(){
			var context = document.getElementById("canvas1").getContext("2d");
			context.drawImage(undoImg, 0,0);
		});
		undoImg.src = undoHistory.pop();
		if(undoHistory.length == 0)
			$('#undo').attr('disabled','disabled');
	}
}

//Set the canvas defaults
//Including a white background
function canvasInit(){
	// canvas = document.getElementById("canvas1");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 60;
	var context = canvas.getContext("2d");
	context.lineWidth = 5;
	context.lineCap = "round";
	//Fill it with white background
	context.save();
	context.fillStyle = '#fff';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	context.restore();

    canvas.addEventListener("mousedown", beginMovingObj, false);
    canvas.addEventListener("mousemove", moveObj, false);
    canvas.addEventListener("mouseup", stopMovingObj, false);

    canvas.addEventListener("touchstart", beginMovingObjT, false);
    canvas.addEventListener("touchmove", moveObjT, false);
    canvas.addEventListener("touchend", stopMovingObjT, false);
}

function beginMovingObjT(e) {
	e.preventDefault();
    beginMovingObj(getEvent(e));
}

function stopMovingObjT(e) {
	e.preventDefault();
    stopMovingObj(getEvent(e));
}

function moveObjT(e) {
	e.preventDefault();
    moveObj(getEvent(e));
}

function getEvent(e) {
    if (e.touches && e.touches.length) {
		// for (var i = 0; i < e.touches.length; i++)
		// {
			// var logLine = e.touches[i].identifier + ' ' + e.touches[i].pageX + ' ' + e.touches[i].pageY + ' ' + e.touches[i].force;
			// console.log(logLine);
		// }
        return e.touches[0];
    } else if (e.changedTouches && e.changedTouches.length) {
        return e.changedTouches[0];
    }
    return e;
}

function beginMovingObj(e){
	// if(e.button == 0)
	{
		draw = 1;
		timeInMs = Date.now();
		deltaTime = 0;
		oldTime = timeInMs;

		//Start The drawing flow
		//Save the state
		// saveActions();
		cntxt.beginPath();
		cntxt.moveTo(e.pageX-left, e.pageY-cvTop);
		// console.log(e.pageX-left, '__', e.pageY-cvTop);
		var logLine = "start " + (e.pageX-left) + "  " + (e.pageY-cvTop);
		console.log(logLine);
	}
	// else{
		// draw = 0;
	// }
}

function stopMovingObj(e){
	// if(e.button != 0)
	// {
		// draw = 1;
	// }
	// else
	{
		draw = 0;
		cntxt.lineTo(e.pageX-left+1, e.pageY-cvTop+1);
		cntxt.stroke();
		cntxt.closePath();
		var logLine = "end " + (e.pageX-left) + "  " + (e.pageY-cvTop);
		console.log(logLine);
	}
}

function moveObj(e){
	if(draw == 1){
		timeInMs = Date.now();
		deltaTime = timeInMs - oldTime;
		oldTime = timeInMs;
		console.log(Math.round(deltaTime / 20));
		cntxt.lineWidth = Math.min(7, Math.round(deltaTime / 20));
		cntxt.lineTo(e.pageX-left+1, e.pageY-cvTop+1);
		cntxt.stroke();
		// var logLine = "move " + (e.pageX-left) + "  " + (e.pageY-cvTop)  + "  " + (e.force);
		// console.log(logLine);
	}
}

var canvas, cntxt, cvTop, left, draw, draw = 0;
var timeInMs, oldTime, deltaTime;

$(function(){
	//Get the canvas element
	//var canvas = $("#canvas1");
	canvas = document.getElementById("canvas1");
	cntxt = canvas.getContext("2d");
	cvTop = $('#canvas1').offset().top;
	left = $('#canvas1').offset().left;
	console.log(cvTop);
	canvasInit();

	//Extra Links Code
	$('#export').click(function(e){
		e.preventDefault();
		window.open(canvas.toDataURL(), 'Canvas Export','height=400,width=400');
		//console.log(canvas.toDataURL());
	});
	$('#clear').click(function(e){
		e.preventDefault();
		canvas.width = canvas.width;
		canvas.height = canvas.height;
		canvasInit();
		$('#colors li:first').click();
		$('#brush_size').change();
		undoHistory = [];
	});
	$('#brush_size').change(function(e){
		cntxt.lineWidth = $(this).val();
	});
	$('#colors li').click(function(e){
		e.preventDefault();
		$('#colors li').removeClass('selected');
		$(this).addClass('selected');
		cntxt.strokeStyle = $(this).css('background-color');
	});

	//Undo Binding
	$('#undo').click(function(e){
		e.preventDefault();
		undoDraw()
	});

	//Init the brush and color
	$('#colors li:first').click();
	$('#brush_size').change();

})
