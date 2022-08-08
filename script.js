let ns = 'http://www.w3.org/2000/svg'

function setAttributeNSmulti(object, attributes) {
    for (let i = 0; i < Object.keys(attributes).length; i++) {
        object.setAttributeNS(null, Object.keys(attributes)[i], attributes[Object.keys(attributes)[i]])
    }
}

function horGrid(param, marginX, marginY, height, width, degree, scale, block) {
    for (let i = 0; i <= param; i++) {
        let gridHor = document.createElementNS(ns, 'line')//Генерируем горизонтальные линии сетки графика
        setAttributeNSmulti(
            gridHor,
            {
            x1: marginX,
            y1: (height-i*degree/scale)+marginY,
            x2: width+marginX,
            y2: (height-i*degree/scale)+marginY,
            style: "stroke: rgb(145, 145, 145);",
            }
        )
        block.append(gridHor)

        let horScaleLineEl = document.createElementNS(ns, 'text')//Генерируем горизонтальную шкалу графика
        horScaleLineEl.textContent = i*degree
        setAttributeNSmulti(
            horScaleLineEl,
            {
                x: 0,
                y: (height-i*degree/scale)+marginY+4,//font-size/2/2 = 4
            }
        )
        block.append(horScaleLineEl)
    }
}

function vertGrid(data, width, height, marginX, marginY, block) {
    for (let i = 0; i < data.length; i++) {

        let gridVert = document.createElementNS(ns, 'line')//Генерируем вертикальные линии сетки графика
        setAttributeNSmulti(
            gridVert,
            {
                x1: i*width/(data.length-1)+marginX,
                y1: height+marginY,
                x2: i*width/(data.length-1)+marginX,
                y2: marginY,
                style: "stroke: rgb(145, 145, 145);", 
            }
        )

        let vertScaleLineEl = document.createElementNS(ns, 'text')//Генерируем вертикальную шкалу графика
        vertScaleLineEl.textContent = i+1
        setAttributeNSmulti(
            vertScaleLineEl,
            {
                x: i*width/(data.length-1)+marginX-4,//font-size/2/2 = 4
                y: height+marginY*2,
            }
        )

        block.append(vertScaleLineEl)
        block.append(gridVert)
    }
}

function linesGen(data, width, height, marginX, marginY, scale, block, type){
    for (let i = 1; i < data.length; i++) {//Генерируем линии графика
        let line = document.createElementNS(ns, 'line')

        if (data[i-1] != undefined) {
            setAttributeNSmulti(
                line,
                {
                    x1: i*width/(data.length-1)+marginX,
                    y1: height-data[i]/scale+marginY,
                    x2: (i-1)*width/(data.length-1)+marginX,
                    y2: height-data[i-1]/scale+marginY,
                }
            )
        }

        if (type == "single") {
            if (data[i] > data[i-1]) {
                line.setAttributeNS(null, "style", "stroke: #6CABB7; stroke-width: 2px;")
            } else if (data[i] < data[i-1]) {
                line.setAttributeNS(null, "style", "stroke: #1F4C57; stroke-width: 2px;")
            } else {
                line.setAttributeNS(null, "style", "stroke: #306E7B; stroke-width: 2px;")
            }
        } else if (type == "double2") {
            line.setAttributeNS(null, "style", "stroke: #323A3A; stroke-width: 2px;")
        } else {
            line.setAttributeNS(null, "style", "stroke: #6CABB7; stroke-width: 2px;")
        }

        block.append(line)
    }
}

function dotsNwindows(data, height, width, scale, marginX, marginY, block, type) {
    for (let i = 0; i < data.length; i++) {

        let dot = document.createElementNS(ns, 'circle')//Генерируем точки графика
        let color = (type == "single") ? "white" : (type == "double1") ? "white" : "rgb(190, 190, 190)"
        setAttributeNSmulti(
            dot,
            {
                cx: (data[i-1] != undefined) ? i*width/(data.length-1)+marginX : marginX,
                cy: height-data[i]/scale+marginY,
                r: 4,
                style: "cursor: pointer; stroke: black; fill:" + color + ";",
            }
        )
        dot.addEventListener("mouseenter", function( event ) {
            let SVGnodes = Array.prototype.slice.call(event.target.parentNode.childNodes)
            SVGnodes[SVGnodes.indexOf(dot)+1].setAttributeNS(null, "style", "stroke: black; fill: white; display: flex; stroke-width: 2px;")
            SVGnodes[SVGnodes.indexOf(dot)+2].setAttributeNS(null, "style", "display: flex;")
        });
        dot.addEventListener("mouseout", function( event ) {
            let SVGnodes = Array.prototype.slice.call(event.target.parentNode.childNodes)
            SVGnodes[SVGnodes.indexOf(dot)+1].setAttributeNS(null, "style", "display: none;")
            SVGnodes[SVGnodes.indexOf(dot)+2].setAttributeNS(null, "style", "display: none;")
        });

        let info = document.createElementNS(ns, 'rect')//Генерируем окна со значениями для графика
        setAttributeNSmulti(
            info,
            {
                x: i*width/(data.length-1)+marginX-((String(data[i]).length*8+10))/2,//font-size/2 = 8, отступ для текста = 10, делим на 2 тк нужна середина
                y: height-data[i]/scale+marginY-28,//Отсуп от точки = 20(высота) + 8(отступ)
                width: (String(data[i]).length*8)+10,//font-size/2 = 8, отступ для текста = 5 слева + 5 справа
                height: 20,//Размер шрифта + 2 сверху и + 2 снизу
                style: "display: none;",
            }
        )

        let text = document.createElementNS(ns, 'text')//Генерируем текст для окон графика
        setAttributeNSmulti(
            text,
            {
                x: i*width/(data.length-1)+marginX-(String(data[i]).length*8)/2,//font-size/2 = 8, делим на 2 тк нужна середина
                y: height-data[i]/scale+marginY-12,//Отступ от точки = 10 и 2 = отступ от края рамки
                style: "display: none;",
            }
        )
        text.textContent = data[i]
        //text.setAttributeNS(null, "font-size", "16px")

        block.append(dot)
        block.append(info)
        block.append(text)

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SGJ_line_graph(blockID, data, degree) {

    let block = document.querySelector("#"+blockID)//Блок для вставки графика

    let width = block.offsetWidth//Ширина блока
    let height = block.offsetHeight//Высота блока


    let line_graph = document.createElementNS(ns, 'svg')//Создаём холст
    setAttributeNSmulti(//Задаём высоту и ширину холста = высоте и ширине блока
        line_graph,
        {
            width: width,
            height: height,
        }
    )

    let maxDataValue = Math.max(...data)//Максимальное значение в массиве данных

    let marginX = (String(maxDataValue).length < String(degree).length) ? String(degree).length*10+5 : String(maxDataValue).length*10+5//Отсутп X для графика внутри холста, 5 = отступ от шкалы до графика
    let marginY = 30//Отсутп Y для графика внутри холста

    width-=marginX*2//Считаем размер графика с учётом отступов
    height-=marginY*2

    let scale = (maxDataValue%degree == 0) ? ((maxDataValue)/height) : ((maxDataValue+((maxDataValue-(maxDataValue%degree)+degree)/degree)*degree-maxDataValue)/height)//Считаем множитель для масштабирования

    let param = (maxDataValue%degree == 0) ? maxDataValue/degree : maxDataValue/degree+1

    horGrid(param, marginX, marginY, height, width, degree, scale, line_graph)
    vertGrid(data, width, height, marginX, marginY, line_graph)

    linesGen(data, width, height, marginX, marginY, scale, line_graph, "single")
    dotsNwindows(data, height, width, scale, marginX, marginY, line_graph, "single")

    block.appendChild(line_graph)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SGJ_tower_graph(blockID, data, degree, gridType=1) {

    let block = document.querySelector("#"+blockID)//Блок для вставки графика

    block.style.transition = "all ease 0.5s";

    let width = block.offsetWidth//Ширина блока
    let height = block.offsetHeight//Высота блока

    let tower_graph = document.createElementNS(ns, 'svg')//Создаём холст
    setAttributeNSmulti(//Задаём высоту и ширину холста = высоте и ширине блока
        tower_graph,
        {
            width: width,
            height: height,
        }
    )

    let maxDataValue = Math.max(...data)//Максимальное значение в массиве данных

    let marginX = (String(maxDataValue).length < String(degree).length) ? String(degree).length*10+5 : String(maxDataValue).length*10+5//Отсутп X для графика внутри холста, 5 = отступ от шкалы до графика
    let marginY = 30//Отсутп Y для графика внутри холста

    width-=marginX*2//Считаем размер графика с учётом отступов
    height-=marginY*2

    let scale = (maxDataValue%degree != 0) ? ((maxDataValue+((maxDataValue-(maxDataValue%degree)+degree)/degree)*degree-maxDataValue)/height) : ((maxDataValue)/height)//Считаем множитель для масштабирования

    let param = (gridType == 1) ? (maxDataValue%degree == 0) ? maxDataValue/degree : maxDataValue/degree+1 : data.length
    for (let i = 0; i <= param; i++) {
        let gridHor = document.createElementNS(ns, 'line')//Генерируем горизонтальные линии сетки графика
        setAttributeNSmulti(
            gridHor,
            {
            x1: marginX,
            y1: (gridType == 1) ? (height-i*degree/scale)+marginY : (i==data.length) ? height+marginY : height+marginY-data[i]/scale,
            x2: width+marginX,
            y2: (gridType == 1) ? (height-i*degree/scale)+marginY : (i==data.length) ? height+marginY : height+marginY-data[i]/scale,
            style: "stroke: rgb(145, 145, 145);",
            }
        )
        tower_graph.append(gridHor)

        let horScaleLineEl = document.createElementNS(ns, 'text')//Генерируем горизонтальную шкалу графика
            horScaleLineEl.textContent = (gridType == 1) ? i*degree : (i==data.length) ? 0 : data[i]
            setAttributeNSmulti(
                horScaleLineEl,
                {
                    x: 0,
                    y: (gridType == 1) ? (height-i*degree/scale)+marginY+4 : (i==data.length) ? height+marginY+4 : height+marginY-data[i]/scale+4,//font-size/2/2 = 4
                }
            )
            tower_graph.append(horScaleLineEl)
    }

    for (let i = 0; i < data.length; i++){
        let tower = document.createElementNS(ns, 'rect')//Генерируем башни графика
        setAttributeNSmulti(
            tower,
            {
                x: i*(width/(data.length+data.length-1))+marginX+(i*(width/(data.length+data.length-1))),
                y: height-data[i]/scale+marginY,
                width: width/(data.length+data.length-1),
                height: data[i]/scale,
                style: "transition: all ease 0.5s; fill: #6CABB7"
            }
        )
        tower.addEventListener("mouseenter", function( event ) {
            event.target.setAttributeNS(null, "style", "transition: all ease 0.5s; fill: #306E7B;")
        });
        tower.addEventListener("mouseout", function( event ) {
            event.target.setAttributeNS(null, "style", "transition: all ease 0.5s; fill: #6CABB7;")
        });
        tower_graph.append(tower)

        let vertScaleLineEl = document.createElementNS(ns, 'text')//Генерируем вертикальную шкалу графика
        vertScaleLineEl.textContent = data[i]
        setAttributeNSmulti(
            vertScaleLineEl,
            {
                x: i*(width/(data.length+data.length-1))*2+(width/(data.length+data.length-1))/2-String(maxDataValue).length*4+marginX,//font-size/2/2 = 4
                y: height+marginY*2,
            }
        )
        tower_graph.append(vertScaleLineEl)
    }
    block.appendChild(tower_graph)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SGJ_donut_graph(blockID, dataobject) {

    let dataKeys = Object.keys(dataobject)//Разбиваем данные на ключи и значения
    let data = []
    for (let i = 0; i < dataKeys.length; i++) {
        data.push(dataobject[dataKeys[i]])
    }

    let block = document.querySelector("#"+blockID)//Блок для вставки графика

    let width = block.offsetWidth//Ширина блока
    let height = block.offsetHeight//Высота блока

    let donut_graph = document.createElementNS(ns, 'svg')//Создаём холст
    setAttributeNSmulti(//Задаём высоту и ширину холста = высоте и ширине блока
    donut_graph,
        {
            width: width,
            height: height,
        }
    )

    let sum = (data) => data.reduce((acc, num) => acc + num, 0);
    sum = sum(data)//Получаем сумму всех значений

    /*let colors = []
    for (let i = 0; i < data.length; i++) {
        colors.push('#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase())
    }*/
    let colors = ["#1F4C57", "#306E7B", "#6CABB7", "#AAB7B8", "#323A3A"]//Палитра
    while (colors.length < data.length) {
        colors = colors.concat(colors)
    }
    
    let rad = (height<width) ? height/4 : width/4//Считаем радиус
    let offset = 0//Сдвиг для частей кольца
    let offset2 = 0//Сдвиг для точек легенды

    for (let i = 0; i < data.length; i++) {

        let donutPart = document.createElementNS(ns, 'circle')//Генерируем части кольца

        setAttributeNSmulti(
            donutPart,
            {
                style: "transition: all ease 0.5s; stroke: "+ colors[i] +"; stroke-dasharray: " + (2*Math.PI*rad)*data[i]/sum + " " + (2*Math.PI*rad) +"; stroke-dashoffset: -" + offset + "; fill: none; stroke-width:" + rad + ";",
                r: rad,
                cx: "50%",
                cy: "50%",
            }
        )
        let listenerOffset = offset
        donutPart.addEventListener("mouseenter", function( event ) {
            event.target.setAttributeNS(null, "style", "transition: all ease 0.5s; stroke: "+ colors[i] +"; stroke-dasharray: " + (2*Math.PI*rad)*data[i]/sum + " " + (2*Math.PI*rad) +"; stroke-dashoffset: -" + listenerOffset + "; fill: none; stroke-width:" + rad*1.1 + ";")
            setAttributeNSmulti(
                document.querySelector("#legendColor-"+i),
                {
                    width: 15,
                    height: 15,
                    y: 37+i*20,
                }
            )
        });
        donutPart.addEventListener("mouseout", function( event ) {
            event.target.setAttributeNS(null, "style", "transition: all ease 0.5s; stroke: "+ colors[i] +"; stroke-dasharray: " + (2*Math.PI*rad)*data[i]/sum + " " + (2*Math.PI*rad) +"; stroke-dashoffset: -" + listenerOffset + "; fill: none; stroke-width:" + rad + ";")
            setAttributeNSmulti(
                document.querySelector("#legendColor-"+i),
                {
                    width: 10,
                    height: 10,
                    y: 40+i*20,
                }
            )
        });
        donut_graph.appendChild(donutPart)

        let offset3 = (360*1/(sum/data[i]))/2//Сдвиг для точек легенды (половина части пончика)
        let sumOffset = offset2+offset3//Итоговый сдвиг для точек

        let dot = document.createElementNS(ns, 'text')//Генерируем точки легенды
        dot.textContent = Math.round(data[i]/sum*100)+"%" //data[i]
        setAttributeNSmulti(
            dot,
            {
                x: (width/2-String(data[i]).length-3*4+(rad+rad*0.8)*Math.cos(sumOffset*Math.PI/180)),
                y: (height/2+8+(rad+rad*0.8)*Math.sin(sumOffset*Math.PI/180)),
            }
        )
        donut_graph.append(dot)

        offset2+=360*1/(sum/data[i])//Длина части в градусах
        offset+=(2*Math.PI*(rad))*data[i]/sum//Длина части в пикселях

        let legendColor = document.createElementNS(ns, 'rect')//Генерируем квадраты легенды
        setAttributeNSmulti(
            legendColor,
            {
                id: "legendColor-"+i,
                x: 10,
                y: 40+i*20,
                width: 10,
                height: 10,
                style: "transition: all ease 0.5s; fill: "+colors[i]
            }
        )
        donut_graph.append(legendColor)

        let legendText = document.createElementNS(ns, 'text')//Генерируем текст легенды
        legendText.textContent = dataKeys[i]
        setAttributeNSmulti(
            legendText,
            {
                x: 30,
                y: 50+i*20,
            }
        )
        donut_graph.append(legendText)
    }

    block.appendChild(donut_graph)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SGJ_double_line_graph(blockID, data, data2, degree) {

    let block = document.querySelector("#"+blockID)//Блок для вставки графика

    let width = block.offsetWidth//Ширина блока
    let height = block.offsetHeight//Высота блока


    let double_line_graph = document.createElementNS(ns, 'svg')//Создаём холст
    setAttributeNSmulti(//Задаём высоту и ширину холста = высоте и ширине блока
        double_line_graph,
        {
            width: width,
            height: height,
        }
    )

    let maxDataValue = (Math.max(...data) > Math.max(...data2)) ? Math.max(...data) : Math.max(...data2)//Максимальное значение в массивах данных

    let marginX = (String(maxDataValue).length < String(degree).length) ? String(degree).length*10+5 : String(maxDataValue).length*10+5//Отсутп X для графика внутри холста, 5 = отступ от шкалы до графика
    let marginY = 16//Отсутп Y для графика внутри холста

    width-=marginX*2//Считаем размер графика с учётом отступов
    height-=marginY*2

    let scale = (maxDataValue%degree == 0) ? ((maxDataValue)/height) : ((maxDataValue+((maxDataValue-(maxDataValue%degree)+degree)/degree)*degree-maxDataValue)/height)//Считаем множитель для масштабирования

    let param = (maxDataValue%degree == 0) ? maxDataValue/degree : maxDataValue/degree+1

    horGrid(param, marginX, marginY, height, width, degree, scale, double_line_graph)

    linesGen(data, width, height, marginX, marginY, scale, double_line_graph, "double1")
    linesGen(data2, width, height, marginX, marginY, scale, double_line_graph, "double2")

    dotsNwindows(data, height, width, scale, marginX, marginY, double_line_graph, "double1")
    dotsNwindows(data2, height, width, scale, marginX, marginY, double_line_graph, "double2")

    block.appendChild(double_line_graph)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////