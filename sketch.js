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

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
}

function draw() {
    background(209, 80, 30)

    let r = 100
    noFill()
    stroke(0, 0, 100, 10)
    strokeWeight(1)
    translate(width/4, height/2)
    // circle(0, 0, r*2)

    // // without this simple modification we'd get a wheel.
    // angle = a/50
    //
    // // we need coordinates for the point on our circle.
    // let x = r*cos(angle)
    // let y = r*sin(angle)
    //
    //
    // line(0, 0, x, y)
    // // let's go to our new circle grounds!
    // translate(x, y)
    //
    // r = r/2
    // circle(0, 0, r*2)
    //
    // x = r*cos(3*angle)
    // y = r*sin(3*angle)
    // r = r/2
    // line(0, 0, x, y)
    // translate(x, y)
    // circle(0, 0, r*2)

    // without this simple modification we'd get a wheel.
    angle = a/50

    let x = 0, y = 0

    // instead of the verbose code above, I'll make a for loop that
    // will encapsulate n. Always go one over the number you want!
    for (let n = 1; n < 200; n+=2) {
        r = 100*4/(n*PI)
        let prevX = x
        let prevY = y
        x += r*cos(n*angle)
        y += r*sin(n*angle)

        line(prevX, prevY, x, y)
        // translate(x, y)
        circle(prevX, prevY, r*2)
    }

    a++
}