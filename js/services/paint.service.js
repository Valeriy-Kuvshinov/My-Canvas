'use strict'

let gCurrShape = 'line'
let gCurrStrokeColor = 'black'
let gCurrFillColor = 'black'
let gCanvasBGColor = 'white'
let gStrokeWidth = 1
let gIsDrawing = false

function drawLine(x, y, xEnd = gCanvasWidth / 2, yEnd = gCanvasHeight / 2) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.lineWidth = gStrokeWidth
    gCtx.strokeStyle = gCurrStrokeColor
    gCtx.stroke()
}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + 80, y + 80)
    gCtx.lineTo(x - 20, y + 100)
    gCtx.closePath()
    gCtx.strokeStyle = gCurrStrokeColor
    gCtx.stroke()
    gCtx.fillStyle = gCurrFillColor
    gCtx.fill()
}

function drawSquare(x, y) {
    gCtx.strokeStyle = gCurrStrokeColor
    gCtx.strokeRect(x, y, 120, 120)
    gCtx.fillStyle = gCurrFillColor
    gCtx.fillRect(x, y, 120, 120)
}

function drawRectangle(x, y) {
    gCtx.strokeStyle = gCurrStrokeColor
    gCtx.strokeRect(x, y, 120, 240)
    gCtx.fillStyle = gCurrFillColor
    gCtx.fillRect(x, y, 120, 240)
}

function drawArc(x, y) {
    gCtx.beginPath()
    // The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
    gCtx.arc(x, y, 20, 0, 2 * Math.PI) // draws a circle
    gCtx.strokeStyle = gCurrStrokeColor
    gCtx.stroke()
    gCtx.fillStyle = gCurrFillColor
    gCtx.fill()
}

function drawText(text, x, y) {
    gCtx.lineWidth = gStrokeWidth
    gCtx.strokeStyle = gCurrStrokeColor
    gCtx.fillStyle = gCurrFillColor
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawFreeStyle(x, y) {
    gCtx.lineWidth = gStrokeWidth // set the line width to 5 pixels
    gCtx.lineCap = 'round' // rounded end cap
    gCtx.strokeStyle = gCurrStrokeColor // line color

    gCtx.lineTo(x, y) // draw a line to from the current path to (x, y)
    gCtx.stroke() // render the line
    gCtx.beginPath() // begin a new path
    gCtx.moveTo(x, y) // move the path to your mouse
}

function setStrokeWidth(strokeWidth) {
    gStrokeWidth = strokeWidth
}

function setStrokeColor(color) {
    gCurrStrokeColor = color
}

function setFillColor(color) {
    gCurrFillColor = color
}

function setCanvasBackgroundColor(color) {
    gCanvasBGColor = color
    gElCanvas.style.backgroundColor = gCanvasBGColor
}

function setShape(shape) {
    gCurrShape = shape
}