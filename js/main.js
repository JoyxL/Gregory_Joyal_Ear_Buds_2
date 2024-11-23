(() => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  function toggleActiveClass() {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  }

  hamburger.addEventListener("click", toggleActiveClass);
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

  function moveDivisor() {
    console.log(slider.value);
    // divisor.style.width = slider.value + "%";
    divisor.style.width = `${slider.value}%`;
  }

  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  const frameCount = 376; //how many frame do we have

  const images = []; //array to hold all images

  //create an object called buds to hold the current frame
  const buds = {
    frame: 0,
  };

  // run a for loop to populate image array
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/stillframes/Comp 1_0${(i + 1)
      .toString()
      .padStart(4, "0")}.jpg`;
    images.push(img);
  }

  // console.table(images);

  gsap.to(buds, {
    frame: 375,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      markers: false,
      start: "top top",
    },
    onUpdate: render,
  });
  images[0].addEventListener("load", render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(buds.frame);
    console.log(images[buds.frame]);
    context.drawImage(images[buds.frame], 0, 0);
  }

  //variables
  const model = document.querySelector("model-viewer");
  const hotspots = document.querySelectorAll(".Hotspot");

  //Data

  const infoBoxes = [
    {
      title: "Silicone Buds",
      text: "comfortable fit and enhanced sound isolation",
      image: "images/soft.svg",
    },
    {
      title: "Metal body",
      text: " offer a perfect balance of durability and elegance",
      image: "images/metal_frame.svg",
    },
    {
      title: "ANC",
      text: "Block out the noise and immerse yourself in pure sound with ANC technology",
      image: "images/anc.svg",
    },
    {
      title: "Charging Area",
      text: "charging area designed for quick and hassle-free power-ups",
      image: "images/charging.svg",
    },
  ];

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const title = document.createElement("h2");
      title.textContent = infoBox.title;

      const text = document.createElement("p");
      text.textContent = infoBox.text;

      const image = document.createElement("img");
      image.src = infoBox.image;
      image.alt = infoBox.title;
      image.style.width = "100px";
      image.style.height = "auto";
      selected.appendChild(image);

      selected.appendChild(title);
      selected.appendChild(text);
    });
  }

  //call the function to load data
  loadInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  // model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  slider.addEventListener("input", moveDivisor);
})();
