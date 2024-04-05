let score = 0;
let sellCount = 0;
let moneyCount = 0;

const body = document.querySelector("body");

const scoreDisplay = document.querySelector("#score");
const sellBtn = document.querySelector("#btn");
const sellDisplay = document.querySelector("#sell");
const moneyDisplay = document.querySelector("#rate-count");

const produceSection = document.querySelector("#producer-list");

const cowImg = document.querySelector("#cow-img");

const producers = [
  {
    id: 1,
    name: "Workers",
    isVisible: false,
    quantity: 0,
    count: 1,
    cost: 15,
    button: "$25 Hire Worker",
    image: "img/contacts-64 (1).png",
  },
  {
    id: 2,
    name: "Cows",
    isVisible: false,
    quantity: 0,
    count: 2,
    cost: 40,
    button: "$40 Buy Cow",
    image: "img/cow-64 (1).png",
  },
  {
    id: 3,
    name: "Tractors",
    isVisible: false,
    quantity: 0,
    count: 10,
    cost: 150,
    button: "$150 Buy Tractor",
    image: "img/tractor-64 (3).png",
  },
  {
    id: 4,
    name: "Offices",
    isVisible: false,
    quantity: 0,
    count: 100,
    cost: 1000,
    button: "$1000 Marketing Office",
    image: "img/organization-64 (1).png",
  },
  {
    id: 5,
    name: "Milkyways",
    isVisible: false,
    quantity: 0,
    count: 750,
    cost: 15000,
    button: "$15000 Rule Milkyway",
    image: "img/planet-64 (1).png",
  },
];

function makeMilk(producer) {
  // moneyDisplay.replaceChildren();

  let img = document.createElement("img");
  img.src = producer.image;
  img.style.marginBottom = "5px";

  let h3 = document.createElement("h3");
  h3.textContent = producer.name;
  const button = document.createElement("button");
  button.textContent = producer.button;
  button.id = producer.name;
  button.className = "buttons";
  button.addEventListener("click", function (clickEvent) {
    if (moneyCount < producer.cost) {
      alert("Need more money");
      return;
    }
    moneyCount -= producer.cost;
    score += producer.count * producer.quantity;
    producer.quantity++;
    producer.cost = Math.floor(producer.cost * 1.25);
    moneyDisplay.innerText = moneyCount.toFixed(2);
    scoreDisplay.innerText = score;
    pCount.textContent = `Milk/second: ${producer.count}`;
    pQua.innerText = `Quantity: ${producer.quantity}`;
    pCost.innerText = `Cost: $ ${producer.cost}`;
  });
  let pQua = document.createElement("p");
  pQua.textContent = `Quantity: ${producer.quantity}`;
  pQua.id = producer.id;
  let pCount = document.createElement("p");
  pCount.textContent = `Milk/second: ${producer.count}`;
  let pCost = document.createElement("p");
  pCost.textContent = `Cost: ${producer.cost}`;

  const produceInfo = document.createElement("div");

  produceInfo.className = "producer";
  produceInfo.appendChild(h3);
  produceInfo.appendChild(pQua);
  produceInfo.appendChild(pCount);
  produceInfo.prepend(button);
  produceInfo.appendChild(pCost);
  produceInfo.appendChild(img);

  produceSection.appendChild(produceInfo);
}

function render() {
  for (let producer of producers) {
    if (!producer.isVisible && moneyCount >= Math.floor(producer.cost / 2)) {
      makeMilk(producer);
      producer.isVisible = true;
    }
  }
}

function gotMilk() {
  for (let producer of producers) {
    if (producer.quantity > 0) {
      score += producer.count * producer.quantity;
      sellCount += 0.5 * producer.quantity;
      sellDisplay.textContent = sellCount.toFixed(2);
      scoreDisplay.innerText = score;
    }
  }
  render();
}

setInterval(gotMilk, 1000);

cowImg.addEventListener("click", () => {
  sellBtn.style.visibility = "visible";
  score++;
  scoreDisplay.textContent = score;
  sellCount += 0.5;
  sellDisplay.textContent = sellCount.toFixed(2);
});

sellBtn.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
  moneyCount += sellCount;
  moneyDisplay.textContent = moneyCount.toFixed(2);
  sellCount = 0;
  sellDisplay.textContent = sellCount.toFixed(2);
});
