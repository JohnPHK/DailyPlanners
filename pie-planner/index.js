var canvas = document.getElementById("canvas");
var canvasContainer= document.getElementById("canvas-container");
var ctx = canvas.getContext('2d')

var dimension, height, radius,  width;

var hour12 = [
    {start:0, end:30, display:'04', clicked:false},
    {start:30, end:60, display:'05', clicked: false},
    {start:60, end:90, display:'06', clicked: false},
    {start:90, end:120, display:'07', clicked: false},
    {start:120, end:150, display:'08', clicked: false},
    {start:150, end:180, display:'09', clicked: false},
    {start:180, end:210, display:'10', clicked: false},
    {start:210, end:240, display:'11', clicked: false},
    {start:240, end:270, display:'12', clicked: false},
    {start:270, end:300, display:'01', clicked: false},
    {start:300, end:330, display:'02', clicked: false},
    {start:330, end:360, display:'03', clicked: false}
]


function updateDimensions() {
    dimension = Math.min(canvasContainer.clientWidth/2, canvasContainer.clientHeight)
    canvas.width = dimension;
    canvas.height = dimension;
    radius = canvas.width*0.3

}
updateDimensions();




function isInsideArc(x1, y1){
    var result = false
    var x = (canvasContainer.clientWidth)/2 - x1
    var y = canvas.height/2 - y1
    var myLen = Math.sqrt(Math.abs(x * x) + Math.abs(y * y)) //삼각함수
    if(radius >= myLen){
        result = true
    }
    var rad = Math.atan2(y, x)
    rad = (rad*180)/Math.PI  //-180 ~ 180의 값이 나옵니다.
    rad += 180  //캔버스의 각도로 변경하여 줍니다.

    var filtered = hour12.filter(function(hour, index) {
        return hour.start <= rad && rad <= hour.end 
    })
    return {result:result, degree : rad, hour: filtered[0]}
}



function drawCircleBackBone() {
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.strokeStyle='#dfdfdf'
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, (Math.PI / 180) * 360, false)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
}

function drawArc(first, last, colour){
    ctx.save()
    ctx.beginPath()
    if (colour) {
        ctx.moveTo(canvas.width/2, canvas.height/2)
        ctx.fillStyle = "#90EE90 "
        ctx.arc(canvas.width/2, canvas.height/2, radius,(Math.PI / 180) * first, (Math.PI / 180) * last, false)
        ctx.fill()
    } else {
        ctx.arc(canvas.width/2, canvas.height/2, radius,(Math.PI / 180) * first, (Math.PI / 180) * last, false)
    }

    ctx.closePath()
    ctx.restore()
    drawCircleBackBone();
}



drawCircleBackBone();

function drawCircle() {
    hour12.forEach(function(hour) {
        console.log("hour.clicked:", hour.clicked);
        drawArc(hour.start, hour.end, hour.clicked)
    }) 
}


addHours();

function drawSeparators() {
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle='#dfdfdf'
    ctx.lineWidth = 0.3
    ctx.moveTo(canvas.width/2, canvas.height/2)
    var xx = Math.cos(degreesToRadians(data.end)) * radius + canvas.width / 2
    var yy = Math.sin(degreesToRadians(data.end)) * radius + canvas.height / 2
    ctx.lineTo(xx,yy)
    ctx.stroke()

}



function addHours() {
    hour12.forEach(function(data){
        //내부 실선 표시
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle='#dfdfdf'
        ctx.lineWidth = 0.3
        ctx.moveTo(canvas.width/2, canvas.height/2)
        var xx = Math.cos(degreesToRadians(data.end)) * radius + canvas.width / 2
        var yy = Math.sin(degreesToRadians(data.end)) * radius + canvas.height / 2
        ctx.lineTo(xx,yy)
        ctx.stroke()
        //텍스트(시간) 표시
        xx = Math.cos(degreesToRadians(data.end)) * radius*1.2 + canvas.width / 2
        yy = Math.sin(degreesToRadians(data.end)) * radius*1.2 + canvas.height / 2
        var minus = ctx.measureText(data.display).width / 2;
        ctx.fillText(data.display, xx-minus, yy)  //텍스트의 길이 빼 주기
        ctx.closePath()
        ctx.restore()
    })


}
//내부 선
//각도를 라디안으로
function degreesToRadians(degrees) {
    const pi = Math.PI
    return degrees * (pi / 180)
}

var doubleClickedCnt = 0;
var isDown = false;

canvas.addEventListener('mousemove', function (event) {
    var x1 = event.clientX - canvas.parentElement.offsetLeft
    var y1 = event.clientY - canvas.parentElement.offsetTop
    console.log(inn);
    if (isDown) {
        var inn = isInsideArc(x1, y1)
        if (inn.result == true) {
            inn.hour.clicked = true;
        }
        console.log(hour12);
        drawCircle();

    }
    drawSeparators();
})

canvas.addEventListener('mousedown', function (event) {
    isDown = true
    setTimeout(function(){
        doubleClickedCnt++
    },100)
})

canvas.addEventListener('mouseup', function (event) {
    isDown = false 
    //더블클릭
    setTimeout(function(){
        if(doubleClickedCnt >1){
            var x1 = event.clientX - canvas.parentElement.offsetLeft
            var y1 = event.clientY - canvas.parentElement.offsetTop
            var inn = isInsideArc(x1, y1)
        }
        doubleClickedCnt = 0

    },250)
})


window.addEventListener('resize', function(event) {
    updateDimensions()
    drawCircle(0, 360, true);
    addHours();
}, true);

