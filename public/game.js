
const socket = io();
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const logBox = document.getElementById("logBox");
console.log("LogBox:", logBox);

let player = { x: 100, y: 100 };
let otherPlayer = { x: 200, y: 200 };

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.y -= 10;
  if (e.key === "ArrowDown") player.y += 10;
  if (e.key === "ArrowLeft") player.x -= 10;
  if (e.key === "ArrowRight") player.x += 10;

  socket.emit("move", player);
});

socket.on("playerMove", (data) => {
  otherPlayer = data;
});

socket.on("log", (message) => {
  console.log("LOG RECEIVED:", message);

  const p = document.createElement("p");
  p.textContent = message;
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
});

function draw() {
  ctx.clearRect(0, 0, 500, 500);

  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, 30, 30);

  ctx.fillStyle = "red";
  ctx.fillRect(otherPlayer.x, otherPlayer.y, 30, 30);

  requestAnimationFrame(draw);
}

draw();