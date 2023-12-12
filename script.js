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
    const delta_time = now_time.getTime() - last_time.getTime();
    last_time = new Date()
    Hostile_NPC.forEach(mob => {
        mob.look()
        mob.move()
    });

    switch (P1.movement) {
        case "w":
            const distance = speed * (delta_time / 1000)
            const change_in_position = [Math.cos(P1.angle) * distance, Math.sin(P1.angle) * distance]
            P1.x += change_in_position[0]
            P1.y += change_in_position[1]
            
            break;
        case "s":
            const distance1 = speed * (delta_time / 1000)
            const change_in_position1 = [Math.cos(P1.angle) * distance1, Math.sin(P1.angle) * distance1]
            P1.x -= change_in_position1[0]
            P1.y -= change_in_position1[1]
            break;
        case "a":
            P1.angle -= turning_speed * (delta_time / 1000)
            break;
        case "d":
            P1.angle += turning_speed * (delta_time / 1000)
            break;
    }

    draw();
    if (!stop_game) {
        window.requestAnimationFrame(gameLoop);
    } else {alert('end')}
}

window.addEventListener('keydown', key => {
    switch (key.key) {
        case "Escape":
            stop_game = true;
            break;
        case "w":
            P1.movement = "w"
            break;
        case "s":
            P1.movement = "s"
            break;
        case "a":
            P1.movement = "a"
            break;
        case "d":
            P1.movement = "d"
            break;
    }
});
window.addEventListener('keyup', key => {
    switch (key.key) {
        case "Escape":
            stop_game = true;
            break;
        case "w":
            P1.movement = ""
            break;
        case "s":
            P1.movement = ""
            break;
        case "a":
            P1.movement = ""
            break;
        case "d":
            P1.movement = ""
            break;
    }
});

window.requestAnimationFrame(gameLoop);
