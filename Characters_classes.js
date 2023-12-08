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
            } else if (angle == 0 && P1.x < this.x) {
                angle = Math.PI
            } else if (angle == 0) {
                angle = 0
            } else if (P1.y < this.y) {
                angle += Math.PI
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