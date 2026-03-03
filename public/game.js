
const socket = io();
let username = prompt("What should they call you?:");
if (!username) username = "Player";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


const logBox = document.getElementById("logBox");
console.log("LogBox:", logBox);

let player = { 
  x: 100, 
  y: 100,
  name: username
};

let otherPlayer = { x: 200, y: 200 };

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.y -= 10;
  if (e.key === "ArrowDown") player.y += 10;
  if (e.key === "ArrowLeft") player.x -= 10;
  if (e.key === "ArrowRight") player.x += 10;



  player.x = Math.max(0, Math.min(player.x, canvas.width - 30));
  player.y = Math.max(0, Math.min(player.y, canvas.height - 30));
  socket.emit("move", player);
});

socket.on("playerMove", (data) => {
  otherPlayer = data;
});

socket.on("log", (message) => {
  console.log("LOG RECEIVED:", message);

  const p = document.createElement("p");
p.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // BLUE PLAYER
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, 30, 30);

  ctx.fillStyle = "white";
  ctx.font = "12px monospace";
  ctx.textAlign = "center";
  ctx.fillText(player.name, player.x + 15, player.y + 45);

  // RED PLAYER
  ctx.fillStyle = "red";
  ctx.fillRect(otherPlayer.x, otherPlayer.y, 30, 30);

  ctx.fillStyle = "white";
  ctx.fillText(otherPlayer.name, otherPlayer.x + 15, otherPlayer.y + 45);

  requestAnimationFrame(draw);
}

draw();