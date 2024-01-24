const turning_speed = Math.PI/1.25;
const speed = 5;
const fight_distance = 1;
const forward_backward_speed_ratio = 2/3

class player {
    constructor(start_x, start_y){
        this.x = start_x;
        this.y = start_y;
        this.angle = Math.PI/4; //in radeans

        this.radius = 1; //in meters

        this.movement = new Movement();
    }
}

class View {
    constructor(lenght, angle){ //in meters and radeans
        this.angle = angle;
        this.lenght = lenght;
    }
}
class Movement {
    constructor(){
        this.direction = "";
        this.turning = "";
        this.max_speed = [50,10];
        this.acceleration = 25;
        this.deacceleration = -90;
        this.speed = 0;
    
    }
}
//#################################################################-------ENEMY class------############################################
class enemy {
    constructor(start_x, start_y){
        this.x = start_x;
        this.y = start_y;
        this.angle = 1.5 * Math.PI; //in radeans

        this.radius = 1; //in meters
        this.view = new View(15, Math.PI/2); //in meters and radeans

        this.time = new Date();
        this.movement = new Movement();

        this.color = "red";
        this.playerSee = false;
        this.playerAngle = 0;
    }

    look() {
        const delta = [P1.x - this.x, P1.y - this.y]
        if (Math.sqrt(delta[0]**2 + delta[1]**2) < P1.radius + this.view.lenght) { //colision of two circles


            var limits = [this.angle - (this.view.angle/2), this.angle + (this.view.angle/2)]
            var angle = Math.abs(Math.atan((P1.y-this.y)/(P1.x-this.x)))
            
            var crossed_null = [false,false] //full circle creates problems, which are fixed by this
            if (limits[0] < 0) {
                limits[0] += 2*Math.PI
                crossed_null[0] = true
            }
            if (limits[1] >= 2*Math.PI) {
                limits[1] -= 2*Math.PI
                crossed_null[1] = true
            }

            switch (isNaN(angle)) { //under certain conditions the math does not work propely, so this fixes it
                case true:
                    if (P1.y < this.y) {
                        angle = 0.5 * Math.PI
                    } else {
                        angle = 1.5 * Math.PI
                    }
                    break;
                case false:
                    switch (angle) {
                        case 0:
                            if (P1.x < this.x) {
                                angle = Math.PI
                            } else {
                                angle = 0
                            }
                            break;
                        default:
                            if (P1.y < this.y) {
                                if (P1.x < this.x) {
                                    angle += Math.PI
                                } else {
                                    angle = 2 * Math.PI - angle
                                }
                            } else if (P1.x < this.x) {
                                angle = Math.PI - angle
                            }
                            break;
                    }
                    break;
            }

            if (limits[0] <= angle && limits[1] >= angle) {
                this.color = "green"
                this.playerSee = true
                this.playerAngle = angle

            } else if (crossed_null[0] || crossed_null[1]) {
                if ((limits[0] - 2*Math.PI <= angle && limits[1] >= angle) || 
                    (limits[0]<= angle && limits[1] + 2*Math.PI  >= angle)) {
                    this.color = "green"
                    this.playerSee = true
                    this.playerAngle = angle
    
                } else {
                    this.playerSee = false
                    this.playerAngle = 0
                    this.color = "red"
                }
            } else {
                this.playerSee = false
                this.playerAngle = 0
                this.color = "red"
            }
            
        } else {
            this.playerSee = false
            this.playerAngle = 0
            this.color = "red"
        }
    }
    move() {
        var moveThisTime = false
        const d = new Date();
        const delta_time =( d.getTime() - this.time.getTime()) / 1000;
        this.time = new Date()

        if (this.playerSee) {
            const delta_angle = this.playerAngle - this.angle
            if ((delta_angle > 0.1 && delta_angle <= Math.PI) || delta_angle < -Math.PI) {

                this.angle += turning_speed * delta_time
                if (this.angle >= Math.PI * 2) {
                    this.angle -= 2 * Math.PI
                    stop_game = true;
                }
                if (this.playerAngle - this.angle < 0) {
                    this.angle = this.playerAngle
                    
                }
            } else if ((delta_angle < -0.1 && delta_angle >= -Math.PI) || delta_angle > Math.PI) {

                this.angle -= turning_speed * delta_time
                if (this.angle <= -1*(Math.PI * 2)) {
                    this.angle += 2 * Math.PI
                    stop_game = true;
                }
                if (this.playerAngle - this.angle > 0) {
                    this.angle = this.playerAngle
                    
                }
            } else {//nearly facing player
                //it can move towards him

                const delta = [P1.x - this.x, P1.y - this.y]
                if (Math.sqrt(delta[0]**2 + delta[1]**2) > P1.radius + this.radius + fight_distance) {//it keeps automatily some distance from player
                    moveThisTime = true

                    var gained_velocity = this.movement.acceleration * delta_time
                    
                    if (gained_velocity > this.movement.max_speed[0] - this.movement.speed) {
                        gained_velocity = this.movement.max_speed[0] - this.movement.speed
                    }
            

                    const distance = this.movement.speed * delta_time + (gained_velocity * delta_time)/2
                    this.movement.speed += gained_velocity
                    const change_in_position = [Math.cos(this.angle) * distance, Math.sin(this.angle) * distance/*  * Math.sign(delta[1]) */] //TODO: this sign is the reason for the condition on next line
                    /* if (P1.y < this.y) {
                        change_in_position[1] = -change_in_position[1];
                    } */
                    this.x += change_in_position[0]
                    this.y += change_in_position[1]
                    
                }
            }
        } else {
            // here will be function to look around
        } 
        if (Math.abs(this.movement.speed) > 0 && moveThisTime == false) { //TODO: change the condition so it works for reverse too
            console.log("breaking")
            var lost_velocity = this.movement.deacceleration * delta_time
            if (lost_velocity > this.movement.speed) {
                lost_velocity = -this.movement.speed
            }
            
            const distance = this.movement.speed * delta_time + (lost_velocity * delta_time)/2
            this.movement.speed += lost_velocity
            const change_in_position = [Math.cos(this.angle) * distance, Math.sin(this.angle) * distance/*  * Math.sign(delta[1]) */] //TODO: this sign is the reason for the condition on next line
            /* if (P1.y < this.y) {
                change_in_position[1] = -change_in_position[1];
            } */
            this.x += change_in_position[0]
            this.y += change_in_position[1]
        }

    }
}