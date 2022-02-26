var canvas = document.getElementById("canvas");
var canvasContainer= document.getElementById("canvas-container");
let dimension = Math.min(canvasContainer.clientWidth/2, canvasContainer.clientHeight)
canvas.width = dimension;
canvas.height = dimension;



var width = canvas.clientWidth
console.log(width);
var height = canvas.clientHeight
console.log(height);
var radius = width*0.3
var ctx = canvas.getContext('2d')

function isInsideArc(x1, y1){
    var result = false
    var x = (canvasContainer.clientWidth)/2 - x1
    var y = height/2 - y1
    var myLen = Math.sqrt(Math.abs(x * x) + Math.abs(y * y)) //삼각함수
    if(radius >= myLen){
        result = true
    }
    var rad = Math.atan2(y, x)
    rad = (rad*180)/Math.PI  //-180 ~ 180의 값이 나옵니다.
    rad += 180  //캔버스의 각도로 변경하여 줍니다.
    return {result:result, degree : rad}
}


canvas.addEventListener('mousemove', function (event) {
    var x1 = event.clientX - canvas.parentElement.offsetLeft  //빼주는 값은 나중에 설명 합니다.
    var y1 = event.clientY - canvas.parentElement.offsetTop //빼주는 값은 나중에 설명 합니다.
    var inn = isInsideArc(x1, y1)
    console.log(inn)
})



function drawCircle(targets, first, last){
    targets.save()
    targets.beginPath()
    targets.arc(width/2, height/2, radius,(Math.PI / 180) * first, (Math.PI / 180) * last, false)
    targets.lineWidth = 3
    targets.strokeStyle='#dfdfdf'
    targets.stroke()
    targets.closePath()
    targets.restore()
}

drawCircle(ctx, 0, 360, true);

var hour12 = [
    {start:0, end:30, display:'04'},
    {start:30, end:60, display:'05'},
    {start:60, end:90, display:'06'},
    {start:90, end:120, display:'07'},
    {start:120, end:150, display:'08'},
    {start:150, end:180, display:'09'},
    {start:180, end:210, display:'10'},
    {start:210, end:240, display:'11'},
    {start:240, end:270, display:'12'},
    {start:270, end:300, display:'01'},
    {start:300, end:330, display:'02'},
    {start:330, end:360, display:'03'}
]


//내부 선
hour12.forEach(function(data){
    //내부 실선 표시
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle='#dfdfdf'
    ctx.lineWidth = 0.3
    ctx.moveTo(width/2, height/2)
    var xx = Math.cos(degreesToRadians(data.end)) * radius + width / 2
    var yy = Math.sin(degreesToRadians(data.end)) * radius + height / 2
    ctx.lineTo(xx,yy)
    ctx.stroke()
    //텍스트(시간) 표시
    xx = Math.cos(degreesToRadians(data.end)) * radius*1.2 + width / 2
    yy = Math.sin(degreesToRadians(data.end)) * radius*1.2 + height / 2
    var minus = ctx.measureText(data.display).width / 2;
    ctx.fillText(data.display, xx-minus, yy)  //텍스트의 길이 빼 주기
    ctx.closePath()
    ctx.restore()
})

//각도를 라디안으로
function degreesToRadians(degrees) {
    const pi = Math.PI
    return degrees * (pi / 180)
}

var doubleClickedCnt = 0;


canvas.addEventListener('mousemove', function (event) {
var x1 = event.clientX - canvas.parentElement.offsetLeft
    var y1 = event.clientY - canvas.parentElement.offsetTop
    var inn = isInsideArc(x1, y1)
})

canvas.addEventListener('mousedown', function (event) {
    isUp = true
    setTimeout(function(){
        doubleClickedCnt++
    },100)
})

canvas.addEventListener('mouseup', function (event) {
    isUp = false
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
