let container = document.querySelector(".container");
let startBtn = document.querySelector("button");
let topFive = document.querySelector(".top-5");

let allMembers = [];
let members = createMembers(); // Replace with members array and remove function

function createMembers() {
  let arr = [];
  for (let i = 0; i < 30; i++) {
    arr.push(`username${i + 1}`);
  }
  return arr;
}

init();

function init() {
  allMembers = members.map((member) => {
    return {
      username: member,
      points: 0
    };
  });
  createMembers(); // Remove if members is array
  creatememberCards();
}

startBtn.addEventListener("click", randomize);

function randomize() {
  startBtn.innerText = ". . .";
  startBtn.removeEventListener("click", randomize);

  let rand = Math.floor(Math.random() * members.length);
  let current = document.querySelector(`#member${rand}`);

  allMembers[rand].points += 5;

  current.style.width = allMembers[rand].points + "%";

  displayTop5();

  if (allMembers[rand].points !== 100) {
    setTimeout(randomize, 30);
  } else {
    displayTop5();
    startAgain();
  }
}

function startAgain() {
  startBtn.innerText = "Start again";
  startBtn.addEventListener("click", () => {
    init();
    randomize();
  });
}

function creatememberCards() {
  let text = "";
  members.forEach((member, index) => {
    text += `<div class="card">
                <div class="progress" id="member${index}"></div>
                <div class="info">${member.substr(0, 10)}</div>
              </div>
            `.trim();
    container.innerHTML = text;
  });
}

function displayTop5() {
  let allMembersCopy = [...allMembers];
  let sorted = allMembersCopy.sort((a, b) => {
    return a.points - b.points;
  });
  let a = sorted.pop();
  let b = sorted.pop();
  let c = sorted.pop();
  let d = sorted.pop();
  let e = sorted.pop();

  let text = `
    <h2>Top 5</h5>
    <p>${a.username}: ${a.points}</p>
    <p>${b.username}: ${b.points}</p>
    <p>${c.username}: ${c.points}</p>
    <p>${d.username}: ${d.points}</p>
    <p>${e.username}: ${e.points}</p>
  `.trim();
  topFive.innerHTML = text;
}
