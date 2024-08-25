let buttons = document.querySelectorAll("button");
let active = document.querySelector("[data-selected]");
let buttons_container = document.querySelector(".flex__buttons");

function populate (timeframe) {
    let request = fetch("./data.json");
    request.then((response) => {
        if (response.status != 200) {
            throw new Error("Failed to load json");
        }
        return response.json();
    }).then((obj) => {
        for (let item of obj) {
            let curr_card_title = item.title.replace(" ", "-").toLowerCase();
            let card = document.querySelector(`.${curr_card_title}`);
            let selected = active.textContent.toLowerCase();
            for (let time of Object.keys(item.timeframes[selected])) {
                let el = card.querySelector(`.${time}`);
                el.textContent = item.timeframes[selected][time];
            }
        }
    }).catch((error) => {
        console.error("Fetch error" + error);
    });
}

window.addEventListener("load", (e) => {
    populate(active.textContent.toLowerCase());
})

buttons_container.addEventListener("click", (e) => {
    if (e.target.nodeName != "BUTTON") {
        return;}
    for (let b of buttons) {
        b.removeAttribute("data-selected");
    }
    e.target.dataset.selected = true;
    active = e.target;
    populate(e.target.textContent.toLowerCase());
    
})