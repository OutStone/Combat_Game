const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const Meters2pixel = 20


class player{
    constructor(start_x, start_y){
        this.x = start_x
        this.y = start_y
        this.angle = Math.PI/4 //in radeans

        this.radius = 1 //in meters
    }
}
class View{
    constructor(lenght, angle){ //in meters and radeans
        this.angle = angle
        this.lenght = lenght
    }
}

class enemy{
    constructor(start_x, start_y){
        this.x = start_x
        this.y = start_y
        this.angle = Math.PI/2 //in radeans

        this.radius = 1 //in meters
        this.view = new View(15, Math.PI/2) //in meters and radeans

        this.color = "red"
    }

    look() {
        var delta = [P1.x - this.x, P1.y - this.y]
        if (Math.sqrt(delta[0]**2 + delta[1]**2) < P1.radius + this.view.lenght) { //colision of two circles

            var limits = [this.angle - (this.view.angle/2), this.angle + (this.view.angle/2)]
            var angle = Math.abs(Math.atan((P1.y-this.y)/(P1.x-this.x)))

            console.log((P1.y-this.y)/(P1.x-this.x))
            console.log((P1.y-this.y))
            console.log((P1.x-this.x))
            
            console.log(angle/Math.PI)
            console.log(isNaN(angle))
            
            
            if (isNaN(angle) && P1.y > this.y) {
                angle = Math.PI/2
            } else if (isNaN(angle)&& P1.y < this.y) {
                angle = 1.5 * Math.PI
            } else if (isNaN(angle) && P1.x < this.x) {
                angle = Math.PI
            } else if (isNaN(angle)) {
                angle = 0
            }

            console.log(angle)
            console.log(limits)
            if (limits[0] <= angle && limits[1] >= angle) {
                console.log("green")
                this.color = "green"

            }
            else {
                console.log("red1")
                this.color = "red"}
            
        }
        else {
            console.log("red")
            this.color = "red"
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, 420, canvas.height);
    console.log(E1.angle)
    console.log(E1.view.angle/2)

    ctx.beginPath();
    ctx.arc(E1.x * Meters2pixel, E1.y * Meters2pixel, E1.view.lenght * Meters2pixel, E1.angle - (E1.view.angle/2), E1.angle + (E1.view.angle/2));
    ctx.lineTo(E1.x * Meters2pixel, E1.y * Meters2pixel);
    //ctx.stroke();
    ctx.fill()

    /* ctx.beginPath();
    ctx.arc(E1.x * Meters2pixel, E1.y * Meters2pixel, E1.view.lenght * Meters2pixel, 0, Math.PI/2);
    ctx.lineTo(E1.x * Meters2pixel, E1.y * Meters2pixel);
    //ctx.stroke();
    ctx.fill() */

    ctx.beginPath();
    ctx.arc(E1.x * Meters2pixel, E1.y * Meters2pixel, E1.radius * Meters2pixel, E1.angle, 2* Math.PI + E1.angle);
    ctx.fillStyle = E1.color;
    ctx.fill()

//draw the player
    ctx.beginPath();
    ctx.arc(P1.x * Meters2pixel, P1.y * Meters2pixel, P1.radius * Meters2pixel, P1.angle, 2* Math.PI + P1.angle);
    ctx.fillStyle = "grey";
    ctx.fill()
}

function stop() {
    return true
}

E1 = new enemy(10, 4)
P1 = new player(15, 18)
console.log(E1)

while (true) {
    E1.look()
    draw()
    
    if (stop()) {
        break;
    }
}