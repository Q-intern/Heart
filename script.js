// ==========================================================
// CẤU HÌNH
// ==========================================================

// Đổi ngày bắt đầu tình yêu tại đây.
const LOVE_START = "2025-10-06T00:00:00";

// Nếu có music.mp3 trong thư mục thì nhạc sẽ được phát.
// Trình duyệt thường yêu cầu người dùng click trước khi phát,
// vì vậy chúng ta bắt đầu nhạc sau khi bấm "Mở món quà".

const colors = [
  "#ff1744",
  "#ff315b",
  "#ff4d6d",
  "#e91e48",
  "#ff6b81",
  "#ff8798",
  "#d90429"
];

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");


// ==========================================================
// MỞ WEBSITE
// ==========================================================

startBtn.addEventListener("click", async () => {

  intro.classList.add("hide");
  mainContent.classList.remove("hidden");

  // Bắt đầu hiệu ứng
  typeTitle();
  revealMessage();
  createParticles();
  createHeartTree();
  initPinkHeartCanvas();

  // Thử phát nhạc
  try {
    await music.play();
    musicBtn.textContent = "♫";
  } catch (error) {
    // Nếu không có music.mp3 hoặc trình duyệt chặn,
    // website vẫn tiếp tục chạy bình thường.
    musicBtn.textContent = "♪";
  }
});


// ==========================================================
// NÚT NHẠC
// ==========================================================

musicBtn.addEventListener("click", async () => {

  if (music.paused) {

    try {
      await music.play();
      musicBtn.textContent = "♫";
    } catch (error) {
      alert(
        "Hãy đặt file music.mp3 vào cùng thư mục với index.html."
      );
    }

  } else {

    music.pause();
    musicBtn.textContent = "♪";
  }
});


// ==========================================================
// HIỆU ỨNG CHỮ GÕ TỪNG KÝ TỰ
// ==========================================================

const titleText = "Cảm ơn em đã bước vào cuộc đời anh ❤️";
const titleElement = document.getElementById("typingTitle");

function typeTitle() {

  titleElement.textContent = "";

  let index = 0;

  function type() {

    if (index < titleText.length) {

      titleElement.textContent += titleText[index];

      index++;

      setTimeout(type, 75);

    }
  }

  type();
}


// ==========================================================
// HIỆN TỪNG DÒNG LỜI YÊU
// ==========================================================

function revealMessage() {

  const lines = document.querySelectorAll(".message .type-line");

  lines.forEach((line, index) => {

    setTimeout(() => {
      line.classList.add("show");
    }, 900 + index * 850);

  });
}


// ==========================================================
// TRÁI TIM + TUYẾT RƠI
// ==========================================================

function createParticles() {

  const container = document.getElementById("particles");

  // Trái tim
  for (let i = 0; i < 35; i++) {

    const heart = document.createElement("div");

    heart.className = "falling-heart";

    const size = Math.random() * 15 + 8;
    const duration = Math.random() * 9 + 8;
    const delay = -Math.random() * duration;

    heart.style.left = `${Math.random() * 100}%`;

    heart.style.setProperty(
      "--size",
      `${size}px`
    );

    heart.style.setProperty(
      "--duration",
      `${duration}s`
    );

    heart.style.setProperty(
      "--color",
      colors[
        Math.floor(Math.random() * colors.length)
      ]
    );

    heart.style.setProperty(
      "--opacity",
      Math.random() * .5 + .4
    );

    heart.style.setProperty(
      "--drift",
      `${Math.random() * 160 - 80}px`
    );

    heart.style.animationDelay = `${delay}s`;

    container.appendChild(heart);
  }

  // Tuyết
  for (let i = 0; i < 55; i++) {

    const snow = document.createElement("div");

    snow.className = "snow";

    const size = Math.random() * 6 + 2;
    const duration = Math.random() * 12 + 10;

    snow.style.left = `${Math.random() * 100}%`;

    snow.style.setProperty(
      "--size",
      `${size}px`
    );

    snow.style.setProperty(
      "--duration",
      `${duration}s`
    );

    snow.style.setProperty(
      "--drift",
      `${Math.random() * 220 - 110}px`
    );

    snow.style.animationDelay =
      `${-Math.random() * duration}s`;

    container.appendChild(snow);
  }
}


// ==========================================================
// TẠO CÂY TRÁI TIM
// ==========================================================

function createHeartTree() {

  const tree = document.getElementById("heartTree");

  // Cho tán cây phóng to
  setTimeout(() => {
    tree.classList.add("grow");
  }, 600);

  const total = 520;

  /*
    Công thức hình trái tim:

    x = 16 sin³(t)

    y = 13cos(t)
        - 5cos(2t)
        - 2cos(3t)
        - cos(4t)

    Sau đó ta lấy điểm ngẫu nhiên phía trong
    để tạo thành một tán cây hình trái tim.
  */

  for (let i = 0; i < total; i++) {

    const t =
      Math.random() *
      Math.PI *
      2;

    const edgeX =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );

    const edgeY =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);

    // Căn cứ sqrt để phân bố tương đối đều
    const fill =
      Math.sqrt(Math.random());

    let x = edgeX * fill;
    let y = edgeY * fill;

    // Kích thước tán
    x *= 14.5;
    y *= 14.5;

    const heart =
      document.createElement("div");

    heart.className =
      "tree-heart";

    const size =
      Math.random() * 11 + 7;

    heart.style.setProperty(
      "--size",
      `${size}px`
    );

    heart.style.setProperty(
      "--color",
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ]
    );

    heart.style.left =
      `calc(50% + ${x}px)`;

    heart.style.top =
      `calc(50% - ${y}px)`;

    // Xuất hiện lần lượt từ từ
    heart.style.animationDelay =
      `${0.5 + Math.random() * 3}s`;

    tree.appendChild(heart);
  }
}


// ==========================================================
// BỘ ĐẾM THỜI GIAN
// ==========================================================

function updateCounter() {

  const start =
    new Date(LOVE_START);

  const now =
    new Date();

  let diff =
    now.getTime() -
    start.getTime();

  if (diff < 0) {

    setCounter(
      0,
      0,
      0,
      0
    );

    return;
  }

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days =
    Math.floor(diff / day);

  diff %= day;

  const hours =
    Math.floor(diff / hour);

  diff %= hour;

  const minutes =
    Math.floor(diff / minute);

  diff %= minute;

  const seconds =
    Math.floor(diff / second);

  setCounter(
    days,
    hours,
    minutes,
    seconds
  );
}


function setCounter(
  days,
  hours,
  minutes,
  seconds
) {

  const values =
    document.querySelectorAll(
      "#counter strong"
    );

  values[0].textContent =
    days;

  values[1].textContent =
    String(hours).padStart(2, "0");

  values[2].textContent =
    String(minutes).padStart(2, "0");

  values[3].textContent =
    String(seconds).padStart(2, "0");
}

updateCounter();

setInterval(
  updateCounter,
  1000
);


// ==========================================================
// CLICK MÀN HÌNH TẠO TRÁI TIM
// ==========================================================

document.addEventListener("click", (event) => {

  if (
    event.target.closest("button")
  ) {
    return;
  }

  const heart =
    document.createElement("div");

  heart.className =
    "falling-heart";

  heart.style.position =
    "fixed";

  heart.style.left =
    `${event.clientX}px`;

  heart.style.top =
    `${event.clientY}px`;

  heart.style.setProperty(
    "--size",
    "16px"
  );

  heart.style.setProperty(
    "--color",
    "#ff315b"
  );

  heart.style.setProperty(
    "--opacity",
    "1"
  );

  heart.style.setProperty(
    "--duration",
    "2s"
  );

  heart.style.setProperty(
    "--drift",
    `${Math.random() * 100 - 50}px`
  );

  document.body.appendChild(
    heart
  );

  setTimeout(() => {
    heart.remove();
  }, 2000);
});


// ==========================================================
// HIỆU ỨNG TIM BAY TRONG PHẦN TRỐNG CỦA HERO
// ==========================================================

function initPinkHeartCanvas() {
  const canvas = document.getElementById("pinkboard");
  if (!canvas || canvas.dataset.started === "1") return;

  canvas.dataset.started = "1";

  const settings = {
    particles: {
      length: 500,
      duration: 2,
      velocity: 100,
      effect: -0.75,
      size: 30
    }
  };

  const Point = function(x, y) {
    this.x = typeof x !== "undefined" ? x : 0;
    this.y = typeof y !== "undefined" ? y : 0;
  };

  Point.prototype.clone = function() {
    return new Point(this.x, this.y);
  };

  Point.prototype.length = function(length) {
    if (typeof length === "undefined") {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    this.normalize();
    this.x *= length;
    this.y *= length;
    return this;
  };

  Point.prototype.normalize = function() {
    const length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  };

  function Particle() {
    this.position = new Point();
    this.velocity = new Point();
    this.acceleration = new Point();
    this.age = 0;
  }

  Particle.prototype.initialize = function(x, y, dx, dy) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.acceleration.x = dx * settings.particles.effect;
    this.acceleration.y = dy * settings.particles.effect;
    this.age = 0;
  };

  Particle.prototype.update = function(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;
    this.age += deltaTime;
  };

  Particle.prototype.draw = function(context, image) {
    function ease(t) {
      return (--t) * t * t + 1;
    }

    const size =
      image.width * ease(this.age / settings.particles.duration);

    context.globalAlpha =
      1 - this.age / settings.particles.duration;

    context.drawImage(
      image,
      this.position.x - size / 2,
      this.position.y - size / 2,
      size,
      size
    );
  };

  function ParticlePool(length) {
    this.particles = new Array(length);
    this.firstActive = 0;
    this.firstFree = 0;

    for (let i = 0; i < length; i++) {
      this.particles[i] = new Particle();
    }
  }

  ParticlePool.prototype.add = function(x, y, dx, dy) {
    this.particles[this.firstFree].initialize(x, y, dx, dy);

    this.firstFree++;

    if (this.firstFree === this.particles.length) {
      this.firstFree = 0;
    }

    if (this.firstActive === this.firstFree) {
      this.firstActive++;
    }

    if (this.firstActive === this.particles.length) {
      this.firstActive = 0;
    }
  };

  ParticlePool.prototype.update = function(deltaTime) {
    const particles = this.particles;

    if (this.firstActive < this.firstFree) {
      for (let i = this.firstActive; i < this.firstFree; i++) {
        particles[i].update(deltaTime);
      }
    }

    if (this.firstFree < this.firstActive) {
      for (let i = this.firstActive; i < particles.length; i++) {
        particles[i].update(deltaTime);
      }

      for (let i = 0; i < this.firstFree; i++) {
        particles[i].update(deltaTime);
      }
    }

    while (
      particles[this.firstActive].age >= settings.particles.duration &&
      this.firstActive !== this.firstFree
    ) {
      this.firstActive++;

      if (this.firstActive === particles.length) {
        this.firstActive = 0;
      }
    }
  };

  ParticlePool.prototype.draw = function(context, image) {
    const particles = this.particles;

    if (this.firstActive < this.firstFree) {
      for (let i = this.firstActive; i < this.firstFree; i++) {
        particles[i].draw(context, image);
      }
    }

    if (this.firstFree < this.firstActive) {
      for (let i = this.firstActive; i < particles.length; i++) {
        particles[i].draw(context, image);
      }

      for (let i = 0; i < this.firstFree; i++) {
        particles[i].draw(context, image);
      }
    }

    context.globalAlpha = 1;
  };

  const context = canvas.getContext("2d");
  const particles = new ParticlePool(settings.particles.length);
  const particleRate =
    settings.particles.length / settings.particles.duration;

  let time;

  function pointOnHeart(t) {
    return new Point(
      160 * Math.pow(Math.sin(t), 3),
      130 * Math.cos(t)
        - 50 * Math.cos(2 * t)
        - 20 * Math.cos(3 * t)
        - 10 * Math.cos(4 * t)
        + 25
    );
  }

  const image = (() => {
    const imageCanvas = document.createElement("canvas");
    const imageContext = imageCanvas.getContext("2d");

    imageCanvas.width = settings.particles.size;
    imageCanvas.height = settings.particles.size;

    function to(t) {
      const point = pointOnHeart(t);

      point.x =
        settings.particles.size / 2 +
        point.x * settings.particles.size / 350;

      point.y =
        settings.particles.size / 2 -
        point.y * settings.particles.size / 350;

      return point;
    }

    imageContext.beginPath();

    let t = -Math.PI;
    let point = to(t);

    imageContext.moveTo(point.x, point.y);

    while (t < Math.PI) {
      t += 0.01;
      point = to(t);
      imageContext.lineTo(point.x, point.y);
    }

    imageContext.closePath();

    const gradient = imageContext.createLinearGradient(
      0,
      0,
      settings.particles.size,
      settings.particles.size
    );

    gradient.addColorStop(0, "#ff4d6d");
    gradient.addColorStop(0.5, "#ff1744");
    gradient.addColorStop(1, "#ea80b0");

    imageContext.fillStyle = gradient;
    imageContext.fill();

    const img = new Image();
    img.src = imageCanvas.toDataURL();
    return img;
  })();

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function render() {
    requestAnimationFrame(render);

    const newTime = Date.now() / 1000;
    const deltaTime = Math.min(
      newTime - (time || newTime),
      0.05
    );

    time = newTime;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    context.clearRect(0, 0, width, height);

    const amount = particleRate * deltaTime;

    for (let i = 0; i < amount; i++) {
      const pos = pointOnHeart(
        Math.PI - 2 * Math.PI * Math.random()
      );

      const dir = pos.clone().length(
        settings.particles.velocity
      );

      particles.add(
        width / 2 + pos.x,
        height / 2 - pos.y,
        dir.x,
        -dir.y
      );
    }

    particles.update(deltaTime);
    particles.draw(context, image);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  render();
}
