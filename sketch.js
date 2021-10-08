/*
@author Winry
@date 2021-10-06

coding plan:
    initial circle
    second circle on the radius of the first
    parameterize n for 4*sin(nθ)/n
    draw wave with unshift
    clear vertices with pop

 */
let font
let angle = 0, a = 0
// we'll have a wave! It could very well result in a square wave, but we only
// have so much space. That means we'll need to trim it at times.
let wave = []
let anchorR = 50

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
}

// this returns the formula for the x and y of a square wave.
function getSawtoothWaveValue(i) {
    let n = i+1
    let r = anchorR*2/(n*PI)
    if (n % 2 === 1) {
        r *= -1
    }

    return new functionValues(r*cos(n*angle), r*sin(n*angle), r)
}

// my new hybrid sawtooth-square wave that I accidentally got! Is it a
// mathematical revolution? Am I the first to discover it? Born when I
// wanted the sawtooth to be a little faster.
function getSquareToothWaveValue(i) {
    let n = i+1
    let r = anchorR*2/(n*PI)
    if (n % 2 === 1) {
        r *= -2
    }

    return new functionValues(r*cos(n*angle), r*sin(n*angle), r)
}

function getSquareWaveValue(i) {
    let n = i*2 + 1
    let r =  anchorR*4/(n*PI)
    return new functionValues(r*cos(n*angle), r*sin(n*angle), r)
}

// this is a container holding the x, y, and radius values of a fourier
// series tuple
class functionValues {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
    }
}

function draw() {
    background(209, 80, 30)

    noFill()
    stroke(0, 0, 100, 100)
    strokeWeight(1)
    translate(width/4, height/2)

    // without this simple modification we'd get a wheel.
    angle = a/50

    let prev = new p5.Vector(0, 0);
    let functionValue = new p5.Vector(0, 0);

    push()
    // instead of the verbose code above, I'll make a for loop that
    // will encapsulate n. Always go one over the number you want!
    for (let i = 0; i < 50; i++) {
        prev = new p5.Vector(functionValue.x, functionValue.y)

        let values = getSquareWaveValue(i)

        let r = values.r
        functionValue.add(new p5.Vector(values.x,
                                        values.y))

        stroke(0, 0, 100)
        line(prev.x, prev.y, functionValue.x, functionValue.y)
        // translate(x, y)
        stroke(0, 0, 100, 20)
        circle(prev.x, prev.y, r*2)
        // circle(values.x, values.y, values.r)
    }
    pop()
    wave.unshift(functionValue.y)
    stroke(0, 0, 100, 20)
    line(functionValue.x, wave[0], 300, wave[0])

    translate(300, 0)
    beginShape()
    stroke(0, 0, 100, 80)
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i])
    }

    if (wave.length > 200) {
        wave.pop()
    }

    endShape()

    a++
}