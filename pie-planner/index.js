var canvas = document.getElementById("canvas");
var canvasContainer= document.getElementById("canvas-container");
var ctx = canvas.getContext('2d')

var dimension, height, radius,  width;

var hour12 = [
    {start:0, end:30, display:'04', clicked:false, index: ''},
    {start:30, end:60, display:'05', clicked: false, index: ''},
    {start:60, end:90, display:'06', clicked: false, index: ''},
    {start:90, end:120, display:'07', clicked: false, index: ''},
    {start:120, end:150, display:'08', clicked: false, index: ''},
    {start:150, end:180, display:'09', clicked: false, index: ''},
    {start:180, end:210, display:'10', clicked: false, index: ''},
    {start:210, end:240, display:'11', clicked: false, index: ''},
    {start:240, end:270, display:'12', clicked: false, index: ''},
    {start:270, end:300, display:'01', clicked: false, index: ''},
    {start:300, end:330, display:'02', clicked: false, index: ''},
    {start:330, end:360, display:'03', clicked: false, index: ''}
]

data = [{
        index: "A",
        name: "A스케줄",
        color: "rgba(211,14,12,0.7)",
        time: "02"
    }, {
        index: "A",
        name: "A스케줄",
        color: "rgba(211,14,12,0.7)",
        time: "03"
    }, {
        index: "A",
        name: "A스케줄",
        color: "rgba(211,14,12,0.7)",
        time: "04"
    }, {
        index: "A",
        name: "A스케줄",
        color: "rgba(211,14,12,0.7)",
        time: "05"
    }, {
        index: "A",
        name: "A스케줄",
        color: "rgba(211,14,12,0.7)",
        time: "08"
    }, {
        index: "B",
        name: "B스케줄",
        color: "rgba(45,127,156,0.8)",
        time: "06"
    }, {
        index: "B",
        name: "B스케줄",
        color: "rgba(45,127,156,0.8)",
        time: "07"
    }, {
        index: "C",
        name: "C스케줄",
        color: "rgba(95,181,73,0.8)",
        time: "10"
    }, {
        index: "C",
        name: "C스케줄",
        color: "rgba(95,181,73,0.8)",
        time: "11"
    }, {
        index: "C",
        name: "C스케줄",
        color: "rgba(95,181,73,0.8)",
        time: "15"
    }, {
        index: "C",
        name: "C스케줄",
        color: "rgba(95,181,73,0.8)",
        time: "16"
    }, {
        index: "C",
        name: "C스케줄",
        color: "rgba(95,181,73,0.8)",
        time: "17"
    }, {
        index: "C",
        name: "C스케줄",
        color: "rgba(95,181,73,0.8)",
        time: "18"
    }, {
        index: "D",
        name: "D스케줄",
        color: "rgba(212,156,213,0.8)",
        time: "20"
    }, {
        index: "D",
        name: "D스케줄",
        color: "rgba(212,156,213,0.8)",
        time: "21"
    }, {
        index: "D",
        name: "D스케줄",
        color: "rgba(212,156,213,0.8)",
        time: "22"
    }, {
        index: "D",
        name: "D스케줄",
        color: "rgba(212,156,213,0.8)",
        time: "23"
    }, {
        index: "D",
        name: "D스케줄",
        color: "rgba(212,156,213,0.8)",
        time: "24"
    }, {
        index: "E",
        name: "E스케줄",
        color: "rgba(177,46,201,0.8)",
        time: ""
    }]


function updateDimensions() {
    var canvas = document.getElementById("canvas");
    var canvasContainer= document.getElementById("canvas-container");
    var ctx = canvas.getContext('2d')
    dimension = Math.min(canvasContainer.clientWidth, canvasContainer.clientHeight)
    console.log("canvasContainer.clientWidth:", canvasContainer.clientWidth)
    console.log("canvasContainer.clientHeight:", canvasContainer.clientHeight)
    console.log(dimension);
    
    canvas.width = dimension;
    canvas.height = dimension;
    radius = dimension*0.3

}
updateDimensions();




function isInsideArc(x1, y1){
    var result = false
    var x = (canvasContainer.clientWidth)/2 - x1
    var y = (canvasContainer.clientHeight)/2 - y1
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
    ctx.moveTo(canvas.width/2, canvas.height/2)
    if (colour) {
        ctx.fillStyle = "#90EE90 "
        ctx.arc(canvas.width/2, canvas.height/2, radius * 0.98,(Math.PI / 180) * first, (Math.PI / 180) * last, false)
        ctx.fill()
    } else {
        ctx.arc(canvas.width/2, canvas.height/2, radius,(Math.PI / 180) * first, (Math.PI / 180) * last, false)
    }

    ctx.closePath()
    ctx.restore()
}



drawCircleBackBone();

function drawCircle() {
    hour12.forEach(function(hour) {
        //console.log("hour.clicked:", hour.clicked);
        drawCircleBackBone();
        drawArc(hour.start, hour.end, hour.clicked)
    }) 
}





function addHourLines() {
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
    })


}


function addHourTexts() {
    hour12.forEach(function(data){
        //텍스트(시간) 표시
        xx = Math.cos(degreesToRadians(data.end)) * radius*1.2 + canvas.width / 2
        yy = Math.sin(degreesToRadians(data.end)) * radius*1.2 + canvas.height / 2
        var minus = ctx.measureText(data.display).width / 2;
        ctx.fillStyle = ' #a9a9a9'
        ctx.fillText(data.display, xx-minus, yy)  //텍스트의 길이 빼 주기
        ctx.closePath()
        ctx.restore()
        

    })
}
addHourLines()
addHourTexts()

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
    var inn = isInsideArc(x1, y1)
    console.log("inn:", inn);
    if (isDown) {
        if (inn.result == true) {
            inn.hour.clicked = true;
            inn.hour.index = 'A';
        }
        //console.log(hour12);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle();
        addHourLines();
        addHourTexts()
        textMaker();

    }
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
});


window.addEventListener('resize', function(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateDimensions();
    drawCircle();
    addHourLines();
    addHourTexts();
    textMaker();
})

function textMaker(){
    var copyArr = Object.assign([], hour12)  //배열 복사
    var summery = []
    var eq = ''
    var start = -1
    var colors = ''
    copyArr.forEach(function(data, idx){
        if(idx == 0){  //가장 처음이면
            eq = data.index
            start = data.start
            colors = data.filledColor
        } else if(eq != data.index){   //인덱스가 다르면             
            summery.push({start : start, end : data.start, index : eq, filledColor: colors})
            eq = data.index
            start = data.start
            colors =  data.filledColor
            if(idx == copyArr.length-1){  //인덱스가 다르면서 마지막이면
                summery.push({start : start, end : data.end, index : eq, filledColor: data.filledColor})
            }                
        } else if(idx == copyArr.length-1){ //마지막이면
            summery.push({start : start, end : data.end, index : eq, filledColor: data.filledColor})
        }
    })

    var lastCheck = summery[0]
    var lastCheck2 = summery[summery.length-1]
    
    if(lastCheck.index == lastCheck2.index) {  //마지막 스타트가 처음 스타트로 오도록 변경 합니다.
        summery[0].start = lastCheck2.start
        summery.pop()
    }      
    
    summery.forEach(function(data){
        if(data.index != ''){  //스케줄이 등록된 경우만 그리게 합니다.
            var half = Math.abs(data.end - data.start) / 2  //부채꼴 크기의 절반입니다.
            
            if(data.start > data.end ){ //마지막 각도가 0도가 넘어간 경우 입니다.
                half = (360-data.start + data.end) / 2
            }
            var degg = data.start + half;
            var xx = Math.cos(degreesToRadians(degg)) * radius * 0.7 + canvas.width / 2;
            console.log(xx);
            var yy = Math.sin(degreesToRadians(degg)) * radius * 0.7 + canvas.height / 2;
            ctx.fillStyle = 'red'
            ctx.fillText(data.index, xx, yy)
            ctx.restore()
        }
    })           
}

textMaker();
