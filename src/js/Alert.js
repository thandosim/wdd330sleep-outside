export default class Alert {
  // i think this is how we do classes zz
  async init() {
    const response = await fetch("/json/alerts.json");
    const alertsArr = await response.json();

    const section = document.createElement("section");
    section.classList.add("alert-list");

    console.log("Main found?", document.querySelector("main"));

    alertsArr.forEach((a) => {
      const p = document.createElement("p");
      p.textContent = a.message;
      p.style.backgroundColor = a.background;
      p.style.color = a.color;
      p.style.border = "1px solid red";
      section.appendChild(p);
      console.log("Adding alert:", a.message); // i can't see it :(
    });

    document.querySelector("main").prepend(section);
  }
}
