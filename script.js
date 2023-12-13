const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const Meters2pixel = 20
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Hostile_NPC.forEach(mob => {
        ctx.beginPath();
        ctx.arc(mob.x * Meters2pixel, mob.y * Meters2pixel, mob.view.lenght * Meters2pixel, mob.angle - (mob.view.angle/2), mob.angle + (mob.view.angle/2));
        ctx.lineTo(mob.x * Meters2pixel, mob.y * Meters2pixel);
        ctx.fillStyle = "black";
        ctx.fill()

        ctx.beginPath();
        ctx.arc(mob.x * Meters2pixel, mob.y * Meters2pixel, mob.radius * Meters2pixel, mob.angle, 2* Math.PI + mob.angle);
        ctx.fillStyle = mob.color;
        ctx.fill()
    });

//draw the player
    ctx.beginPath();
    ctx.arc(P1.x * Meters2pixel, P1.y * Meters2pixel, 8 * Meters2pixel, P1.angle - (Math.PI/4), P1.angle + (Math.PI/4));
    ctx.lineTo(P1.x * Meters2pixel, P1.y * Meters2pixel);
    ctx.fillStyle = "yellow";
    ctx.fill()

    ctx.beginPath();
    ctx.arc(P1.x * Meters2pixel, P1.y * Meters2pixel, P1.radius * Meters2pixel, P1.angle, 2* Math.PI + P1.angle);
    ctx.fillStyle = "grey";
    ctx.fill()
}

function stop() {
    return true
}
function spawn_enemy(x, y) {
    Hostile_NPC.push(new enemy(x, y))
}

Hostile_NPC = []
spawn_enemy(5, 15)
P1 = new player(5, 5)


var stop_game = false
var last_time = new Date()

function gameLoop() {
    
    const now_time = new Date();
    const delta_time = (now_time.getTime() - last_time.getTime()) / 1000;
    last_time = new Date();
    Hostile_NPC.forEach(mob => {
        mob.look()
        mob.move()
    });

    switch (P1.movement.direction) {
        case "w":
            var gain_velocity = P1.movement.acceleration * delta_time

            if (P1.movement.max_speed[0] - P1.movement.speed >= gain_velocity) {
                var distance = P1.movement.speed * delta_time + gain_velocity * delta_time / 0.5
            } else {
                gain_velocity = P1.movement.max_speed[0] - P1.movement.speed
                var distance = P1.movement.speed * delta_time + gain_velocity * delta_time / 0.5
            }
            P1.movement.speed += gain_velocity
            console.log(P1.movement.speed)
            
            var change_in_position = [Math.cos(P1.angle) * distance, Math.sin(P1.angle) * distance]
            P1.x += change_in_position[0]
            P1.y += change_in_position[1]
            
            break;
        case "s":
            var gain_velocity = (-P1.movement.acceleration) * delta_time

            if (-P1.movement.max_speed[0] - P1.movement.speed <= gain_velocity) {
                var distance = P1.movement.speed * delta_time + gain_velocity * delta_time / 0.5
            } else {
                gain_velocity = - P1.movement.max_speed[0] - P1.movement.speed
                var distance = P1.movement.speed * delta_time + gain_velocity * delta_time / 0.5
            }
            P1.movement.speed += gain_velocity
            console.log(P1.movement.speed)
            
            var change_in_position = [Math.cos(P1.angle) * distance, Math.sin(P1.angle) * distance]
            P1.x += change_in_position[0]
            P1.y += change_in_position[1]
            break;
        case "a":
            P1.angle -= turning_speed * delta_time
            break;
        case "d":
            P1.angle += turning_speed * delta_time
            break;
    }

    draw();
    if (!stop_game) {
        window.requestAnimationFrame(gameLoop);
    } else {alert('end')}
}

window.addEventListener('keydown', key => {
    console.log(key.key)
    switch (key.key) {
        case "Escape":
            stop_game = true;
            break;
        case "w":
            if (P1.movement.direction == "w") {
                P1.movement.direction = ""
            } else {P1.movement.direction = "w"}
            break;
        case "s":
            if (P1.movement.direction == "s") {
                P1.movement.direction = ""
            } else {P1.movement.direction = "s"}
            break;
        case "a":
            if (P1.movement.direction == "a") {
                P1.movement.direction = ""
            } else {P1.movement.direction = "a"}
            break;
        case "d":
            if (P1.movement.direction == "d") {
                P1.movement.direction = ""
            } else {P1.movement.direction = "d"}
            break;
    }
});
/* window.addEventListener('keyup', key => {
    switch (key.key) {
        case "w":
            P1.movement.direction = ""
            break;
        case "s":
            P1.movement.direction = ""
            break;
        case "a":
            P1.movement.direction = ""
            break;
        case "d":
            P1.movement.direction = ""
            break;
    }
}); */

window.requestAnimationFrame(gameLoop);
