'use strict'

let gElCanvas
let gCtx
let gCanvasWidth
let gCanvasHeight

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addEventListeners()
    reloadDefaultSettings()

    gElCanvas.style.backgroundColor = gCanvasBGColor
    gCanvasWidth = gElCanvas.width
    gCanvasHeight = gElCanvas.height
    console.log('gCtx', gCtx)
}

function onSetShape(shape) {
    setShape(shape)
}

// Canvas options
function onSetStrokeColor(color) {
    setStrokeColor(color)
}
function onSetFillColor(color) {
    setFillColor(color)
}
function onSetCanvasBackgroundColor(color) {
    setCanvasBackgroundColor(color)
}
function onSetStrokeWidth(strokeWidth) {
    setStrokeWidth(strokeWidth)
}

// Clearing options
function onClearCanvasFull() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    gElCanvas.width = gCanvasWidth
    gElCanvas.height = gCanvasHeight

    gCanvasWidth = gElCanvas.width
    gCanvasHeight = gElCanvas.height
    // Clear the whole canvas
}
function onClearCanvasQuarter(quarterValue) {
    // Clear only a part of the canvas
    switch (quarterValue) {
        case 1:
            gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
            break
        case 2:
            gCtx.clearRect(gElCanvas.width / 2, 0, gElCanvas.width / 2, gElCanvas.height / 2)
            break
        case 3:
            gCtx.clearRect(0, gElCanvas.height / 2, gElCanvas.width / 2, gElCanvas.height / 2)
            break
        case 4:
            gCtx.clearRect(gElCanvas.width / 2, gElCanvas.height / 2, gElCanvas.width / 2, gElCanvas.height / 2)
            break
    }
}
function onClearCanvasHalf(halfValue) {
    // Clear only a part of the canvas
    switch (halfValue) {
        case 'left':
            gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height)
            break
        case 'right':
            gCtx.clearRect(gElCanvas.width / 2, 0, gElCanvas.width / 2, gElCanvas.height)
            break
        case 'top':
            gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height / 2)
            break
        case 'bottom':
            gCtx.clearRect(0, gElCanvas.height / 2, gElCanvas.width, gElCanvas.height / 2)
            break
    }
}

function onDraw(ev) {
    const { offsetX, offsetY } = ev
    console.log('offsetX, offsetY:', offsetX, offsetY)

    switch (gCurrShape) {
        case 'line':
            drawLine(offsetX, offsetY)
            break
        case 'freestyle':
            drawFreeStyle(offsetX, offsetY)
            break
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'square':
            drawSquare(offsetX, offsetY)
            break
        case 'rectangle':
            drawRectangle(offsetX, offsetY)
            break
        case 'circle':
            drawArc(offsetX, offsetY)
            break
        case 'text':
            drawText('Hello', offsetX, offsetY)
            break
    }
}

function onImgUpload(img) {
    if (!img) return

    let imgName = img.name

    // Check if the file's name ends with .png, .jpg, or .jpeg
    if (!(imgName.endsWith('.png') || imgName.endsWith('.jpg') || imgName.endsWith('.jpeg'))) {
        alert('Please upload a valid image (jpg, jpeg, png).')
        return
    }
    const imageObj = new Image() // Create a new image object

    imageObj.src = URL.createObjectURL(img) // Set the image source to the uploaded image data

    // When the image has loaded, draw it on the canvas
    imageObj.onload = function () {
        // Resize the canvas to the image's size
        gElCanvas.width = imageObj.width
        gElCanvas.height = imageObj.height

        // Draw the image across the whole canvas
        gCtx.drawImage(imageObj, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function downloadCanvas() {
    // Create a temporary canvas of the same size
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = gElCanvas.width
    tempCanvas.height = gElCanvas.height

    const tempCtx = tempCanvas.getContext('2d')

    tempCtx.fillStyle = "white" // Set a background color and clear the canvas
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

    tempCtx.drawImage(gElCanvas, 0, 0) // Now, draw the original canvas content over this background

    const dataUrl = tempCanvas.toDataURL("image/png") // Convert temporary canvas to Data URL
    const elLink = document.createElement('a') // Create a temporary anchor element to initiate download

    elLink.href = dataUrl
    elLink.download = 'my-img.png'
    elLink.style.display = 'none' // Hide the link

    document.body.appendChild(elLink) // Add to DOM
    elLink.click() // Simulate click to download
    document.body.removeChild(elLink) // Clean up and remove the link
}

function reloadDefaultSettings() {
    $('#strokeColor').setValue('#000000')
    $('#fillColor').setValue('#000000')
    $('#canvasBGColor').setValue('##FFFFFF')
    $('#strokeWidth').setValue('1')
    $('#shapeType').setValue('line')
    $('#uploadFile').setValue('')
}

function addEventListeners() {
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)
}

function onMouseDown() {
    gIsDrawing = true
}

function onMouseMove(ev) {
    if (gIsDrawing && gCurrShape === 'freestyle') {
        const { offsetX, offsetY } = ev
        drawFreeStyle(offsetX, offsetY)
    }
}

function onMouseUp() {
    gIsDrawing = false
}