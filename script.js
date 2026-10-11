
// 游標位置與慣性
let lastDustTime = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  // 移動時隨機生成金色粉塵
  const now = performance.now();

  if (now - lastDustTime > 6) {
    createDust(mouseX, mouseY);
    lastDustTime = now;
  }
});

// 隨機魔法粉塵
function createDust(x, y) {
  const dot = document.createElement("span");

  const size = 5 + Math.random() * 8;
  const offsetX = (Math.random() - 0.5) * 30;
  const offsetY = (Math.random() - 0.5) * 30;

  dot.style.position = "fixed";
  dot.style.left = x + offsetX + "px";
  dot.style.top = y + offsetY + "px";
  dot.style.width = size + "px";
  dot.style.height = size + "px";
  dot.style.borderRadius = "50%";
  dot.style.background = "#F2AF29";
  dot.style.pointerEvents = "none";
  dot.style.zIndex = "2147483646";
  dot.style.opacity = String(0.45 + Math.random() * 0.55);
  dot.style.boxShadow = "0 0 10px #F2AF29";
  dot.style.transition =
    "opacity 500ms ease-out, transform 500ms ease-out";

  document.body.appendChild(dot);

  requestAnimationFrame(() => {
    dot.style.opacity = "0";
    dot.style.transform =
      `translate(${(Math.random() - 0.5) * 30}px, ` +
      `${8 + Math.random() * 22}px) scale(0.3)`;
  });

  setTimeout(() => dot.remove(), 550);
}

// 點擊時星星向四周炸開
document.addEventListener("click", (event) => {
  for (let i = 0; i < 8; i++) {
    const star = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 8;
    const distance = 65;

    star.textContent = i % 2 === 0 ? "✦" : "✧";
    star.style.position = "fixed";
    star.style.left = event.clientX + "px";
    star.style.top = event.clientY + "px";
    star.style.zIndex = "2147483646";
    star.style.pointerEvents = "none";
    star.style.color = "#F2AF29";
    star.style.fontSize = "22px";
    star.style.transform = "translate(-50%, -50%)";
    star.style.transition =
      "left 500ms ease-out, top 500ms ease-out, " +
      "opacity 500ms ease-out, transform 500ms ease-out";

    document.body.appendChild(star);

    requestAnimationFrame(() => {
      star.style.left =
        event.clientX + Math.cos(angle) * distance + "px";
      star.style.top =
        event.clientY + Math.sin(angle) * distance + "px";
      star.style.opacity = "0";
      star.style.transform =
        "translate(-50%, -50%) rotate(180deg) scale(1.5)";
    });

    setTimeout(() => star.remove(), 600);
  }
});