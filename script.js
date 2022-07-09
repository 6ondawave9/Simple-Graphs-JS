graph(config.heightScale, config.degrees, config.widthScale, SimpleGraphsJSData)

function graph(min, scaleV, scaleH, amount) {


    document.querySelector("#Simple-Graphs-JS-main").style.boxSizing = 'border-box'
    document.querySelector("#Simple-Graphs-JS-main").style.padding = '25px'
    document.querySelector("#Simple-Graphs-JS-main").style.paddingTop = '35px'
    document.querySelector("#Simple-Graphs-JS-main").style.overflow = 'auto'
    document.querySelector("#Simple-Graphs-JS-main").innerHTML = "<div id='Simple-Graphs-JS-point-wrap' style='display: flex; position: relative;'><div id='Simple-Graphs-JS-wrapper-vert' style='display: flex; position: relative; margin-right: 50px;'></div><canvas style='background-color: white;' height='500' width='500' id='Simple-Graphs-JS-graph'>Обновите браузер</canvas></div><div id='Simple-Graphs-JS-wrapper-hor' style='margin-left: 46px; margin-top: 10px; display: flex; position: relative;'></div>" //46 - 50 - половина ширины значения
    document.querySelector("#Simple-Graphs-JS-main").style.width = config.width
    document.querySelector("#Simple-Graphs-JS-main").style.height = config.height

    let canvas = document.querySelector("#Simple-Graphs-JS-graph")
    let wrapperH = document.querySelector("#Simple-Graphs-JS-wrapper-hor")
    let wrapperV = document.querySelector("#Simple-Graphs-JS-wrapper-vert")
    let ctx = canvas.getContext('2d')

    //Уставновка размеров канваса
    let raz = (Math.max(...amount))%scaleV
    if (raz == 0) {
        canvas.height = (Math.max(...amount))*min+1
    } else {
        canvas.height = (Math.max(...amount))*min+1 + scaleV - (Math.max(...amount))%scaleV
    }
    console.log(raz)
    //canvas.height = (Math.max(...amount))*min+1+scaleV - (Math.max(...amount))%scaleV
    canvas.width  = (amount.length-1)*scaleH+1 //кол-во линий = кол-во точек - 1
    //

    //Генерация вертикальной шкалы //-8 - сдвиг чисел чуть вниз, чтобы они были посередине
    if (config.vertLine) {
        for (let i = 0; i <= (Math.max(...amount))/scaleV; i++){
            wrapperV.innerHTML = wrapperV.innerHTML + "<p style='margin: 0; position: absolute; bottom:" + (i*scaleV-8/min)*min + "px;'>" + i*scaleV +"</p>" 
        }
        wrapperV.innerHTML = wrapperV.innerHTML + "<p style='margin: 0; position: absolute; bottom:" + (Math.max(...amount)-8/min)*min + "px;'>" + 
            Math.max(...amount) +"</p>"
    }
    //
    
    //Генерация горизонтальной шкалы
    let date = []
    let widthDate = []
    for(let i = 0; i < amount.length; i++){
        if (config.horLine) {
            wrapperH.innerHTML = wrapperH.innerHTML + "<p style=' margin: 0; position: absolute; left:" + i*scaleH + "px;'>" + (i+1) +"</p>"
        }
        date.push(i*scaleH)
        widthDate.push((i+1)*scaleH)
    }
    //

    //Генерация сетки
    if (config.grid) {
        for(let i = 0; i < amount.length; i++){
            //Вертикальные линии
            ctx.beginPath()
            ctx.moveTo(i*scaleH, 0)
            ctx.lineTo(i*scaleH, canvas.height)
            ctx.strokeStyle = 'rgb(134, 134, 134)'
            ctx.stroke()
            //
        }

        for(let i = 0; i <= (Math.ceil(Math.max(...amount)/scaleV)); i++){
            //Горизонтальные линии
            ctx.beginPath()
            ctx.moveTo(0, (i*scaleV*min))
            ctx.lineTo(canvas.width, (i*scaleV*min))
            ctx.strokeStyle = 'rgb(134, 134, 134)'
            ctx.stroke()
            //
        }
    }
    //

    for(let i = 0; i < amount.length; i++){

        //Генерация ключевых точек и модальных окон
        if (config.points) {
            let newMarker = document.createElement('div')

            let a = (amount[i]-5/min)*min //Точка - вертикаль //4 - половина высоты точки + 1
            let b = 0 //Точка - горизонталь //50 - (wrapper-vert) margin-right: 50px; //5 - половина ширины точки + 1
            if (i == 0) {
                b = 50 - 5
            } else {
                b = 50+scaleH*i - 5
            }

            let c = (amount[i])*min+10 //Окно - вертикаль // 10 - высота окна над точкой
            let d = 0 //Окно - горизонталь //50 - (wrapper-vert) margin-right: 50px; //26 - половина ширины окна + 1
            if (i == 0) {
                d = 50 - 26
            } else {
                d = 50+scaleH*i - 26
            }

            newMarker.innerHTML = "<div style='z-index: 99; justify-content: center; align-items: center; border: 2px solid black; border-radius: 15px; background-color: white; height: 20px; width: 50px; display: none; position: absolute; bottom:" + c + "px; left:" + d + "px;' class='Simple-Graphs-JS-window'>" + amount[i] + 
                "</div><div class='Simple-Graphs-JS-marker' style='width: 8px; height: 8px; background-color: white; border: 1px solid black; border-radius: 100%; cursor: pointer; position: absolute; bottom:" + a + "px; left:" + b + "px;'></div>"
            document.querySelector("#Simple-Graphs-JS-point-wrap").appendChild(newMarker)
            newMarker.addEventListener("mouseenter", function( event ) {
                event.target.firstChild.style.display = 'flex'
            });
            newMarker.addEventListener("mouseout", function( event ) {
                event.target.parentElement.firstChild.style.display = 'none'
            });
        }
        //

        //Отрисовка линий
        ctx.beginPath()
        ctx.moveTo(date[i-1], canvas.height-amount[i-1]*min)
        ctx.lineTo(date[i], canvas.height-amount[i]*min)
        if (amount[i-1] < amount[i]) {
            ctx.strokeStyle = config.upColor
        } else if (amount[i-1] > amount[i]) {
            ctx.strokeStyle = config.downColor
        } else {
            ctx.strokeStyle = config.sameColor
        }
        ctx.lineWidth = config.lineWidth
        ctx.stroke()
        //
    }
}

function towers() {

}