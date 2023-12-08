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
spawn_enemy(5, 5)
P1 = new player(15, 4)

console.log(Hostile_NPC[0].angle)

var i = 0

function gameLoop() {
    Hostile_NPC.forEach(mob => {
        mob.look()
        mob.move()
    });
    i++
    draw()
    if (i < 500) {
        window.requestAnimationFrame(gameLoop);
    } else {alert('end')}
}

window.addEventListener('keydown', key => {
    if (key.key == "w") {
        P1.y -= 3
    }
});

window.requestAnimationFrame(gameLoop);
console.log(Hostile_NPC)
