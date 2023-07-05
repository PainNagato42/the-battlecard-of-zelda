const btnDifficulte = document.querySelectorAll(".btn_difficulte");
const choixDifficulte = document.querySelector(".choix_difficulte");
const vies = document.querySelector(".contain_vies");
const playerSprite = document.querySelector("#player_sprite");
const containOpponent = document.querySelector(".opponent");
const opponentSprite = document.querySelector("#opponent_sprite");
const spanLevel = document.querySelectorAll(".level span");
const opponentLife = document.querySelector(".opponent_life");
const playerCard = document.querySelector(".playerCard");
const opponentCard = document.querySelector(".opponentCard");
const action = document.querySelector(".action");
const combo = document.querySelector(".combo");
const spanCombo = document.querySelector("#nb_combo");
const popup = document.querySelector(".popup");
const mask = document.querySelector(".mask");



const tabCard = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const tabSymb = ["rubis_vert", "rubis_bleu", "rubis_rouge", "rubis_violet"];

let difficulty = 1;
let lvl = 1;
let barre_life = 100;
let damage;
let count = 0;
let nbCombo = 0;

window.addEventListener("load", () => {
    spanLevel.textContent = lvl;
    for (let i = 0; i < 40; i++) {
        let div = document.createElement("div");
        div.classList.add("coeur");
        vies.append(div);
    }
})

/*********************************************/
// Choix difficulte

btnDifficulte[0].addEventListener("click", () => {
    choixDifficulte.style.display = "none";
    opponentSprite.innerHTML = "<img src='http://localhost/jeux/the_battlecard_of_zelda/img/chuchu.png' alt=''>";
    spanLevel[1].textContent = "Chuchu bleu";
})
btnDifficulte[1].addEventListener("click", () => {
    choixDifficulte.style.display = "none";
    difficulty = 2;
    opponentSprite.innerHTML = "<img src='http://localhost/jeux/the_battlecard_of_zelda/img/chuchu_feu.png' alt=''>";
    spanLevel[1].textContent = "Chuchu de feu";
})
btnDifficulte[2].addEventListener("click", () => {
    choixDifficulte.style.display = "none";
    difficulty = 3;
    opponentSprite.innerHTML = "<img src='http://localhost/jeux/the_battlecard_of_zelda/img/chuchu_electrique.png' alt=''>";
    spanLevel[1].textContent = "Chuchu électrique";
})

/*******************************************/
// Evenement de tirage de carte
action.addEventListener("click", () => {
    tireCard()
})



/************************************************/
// FONCTION

function card() {
    let randomCard = Math.floor(Math.random() * tabCard.length);
    let cardValue = randomCard + 2;
    let randomSymb = Math.floor(Math.random() * tabSymb.length);
    let card = document.createElement("div");
    let cardFlip = document.createElement("label");
    let middleHTML = "<div class='middle center " + tabSymb[randomSymb] + "'></div>";
    switch (randomCard) {
        case 9:
            middleHTML = "<div class='middle center card_j'></div>";
            break
        case 10:
            middleHTML = "<div class='middle center card_q'></div>";
            break
        case 11:
            middleHTML = "<div class='middle center card_k'></div>";
            break
        case 12:
            middleHTML = "<div class='middle center card_As'></div>";
            break

    }
    let color;
    switch (randomSymb) {
        case 0:
            color = "vert"
            break;
        case 1:
            color = "bleu"
            break;
        case 2:
            color = "rouge"
            break;
        case 3:
            color = "violet"
            break;

    }
    card.classList.add("card");
    card.innerHTML = "<div class='" + color + "'><div class='left'>" + tabCard[randomCard] + "</div> " + middleHTML + "<div class='right'>" + tabCard[randomCard] + "</div></div>";
    cardFlip.innerHTML = "<input class='check_none' type='checkbox' checked><div data-value='" + cardValue + "'  class='card-flip " + color + "'><div class='front'><div><div class='left'>" + tabCard[randomCard] + "</div>" + middleHTML + "<div class='right'>" + tabCard[randomCard] + "</div></div></div><div class='back'></div></div>";
    count++
    switch (count) {
        case 1:
            playerCard.append(cardFlip);
            break;
        case 2:
            opponentCard.append(cardFlip);
            break;
    }
}

function tireCard() {
    action.classList.add("none");
    if (count <= 2) {
        card()
        setTimeout(() => {
            tireCard()
        }, 500)
    } else if (count === 3) {
        const cardsFlip = document.querySelectorAll(".card-flip");
        cardsFlip[0].style.transform = "rotateY(0deg)";
        cardsFlip[1].style.transform = "rotateY(-360deg)";
        count = 0;
        setTimeout(() => {
            if (parseInt(cardsFlip[0].getAttribute("data-value")) > parseInt(cardsFlip[1].getAttribute("data-value"))) {
                opponentSprite.classList.add("anim_damage");
                nbCombo++
                if(nbCombo > 1) {
                    spanCombo.textContent = nbCombo
                    combo.style.display = "block";
                }
                if(nbCombo === 5) {
                    spanCombo.style.color = "rgb(217, 141, 0)";
                    spanCombo.style.fontWeight = "bolder";
                }
                if(nbCombo === 10) {
                    spanCombo.style.color = "#c6362e";
                }
                setTimeout(() => {
                    calculDegats();
                }, 600);
                setTimeout(() => {
                    reset();
                }, 800)
            } else if (parseInt(cardsFlip[0].getAttribute("data-value")) < parseInt(cardsFlip[1].getAttribute("data-value"))) {
                playerSprite.classList.add("anim_damage");
                nbCombo = 0;
                spanCombo.style.color = "initial";
                spanCombo.style.fontWeight = "initial";
                combo.style.display= "none";
                setTimeout(() => {
                    vies.removeChild(vies.lastChild);
                    reset();
                }, 800)
            } else {
                setTimeout(() => {
                    playerCard.innerHTML = "";
                    opponentCard.innerHTML = "";
                    tireCard();
                }, 800)
            }
        }, 800)
    }
}

function reset() {
    playerCard.innerHTML = "";
    opponentCard.innerHTML = "";
    action.classList.remove("none");
    playerSprite.classList.remove("anim_damage");
    opponentSprite.classList.remove("anim_damage");
    if (barre_life === 0) {
        lvl++
        if (lvl <= 11) {
            spanLevel[0].textContent = lvl;
        } else if (lvl === 12 || lvl === 13) {
            spanLevel[0].textContent = "BOSS";
        } else {
            containOpponent.innerHTML = "";
            popup.style.display = "block";
            document.querySelector(".popup p").textContent = "Félicitation vous avez gagné";
            document.querySelector(".popup p").style.color = "#2aa928";
            mask.style.display = "block";
        }
        barre_life = 100;
        opponentLife.style.width = 100 + "%";
        opponent();
    }
    if (vies.childElementCount < 1) {
        popup.style.display = "block";
        mask.style.display = "block";
        document.querySelector(".popup p").textContent = "GAME OVER";
        document.querySelector(".popup p").style.color = "rgb(177, 9, 9)";
    }
}

function opponent() {
    if (difficulty === 1) {
        let tabNameImg = ["bokoblin", "moblin", "lezalfos", "trogoblin", "chef_boko", "hinox", "lithorock", "moldarquor", "lynel", "griock_feu", "ganondorf", "ganondorf_2"];
        let tabNameOpponent = ["Bokoblin", "Moblin", "Lézalfos", "Trogoblin", "Chef bokoblin", "Hinox", "Lithorock rare", "Moldarquor", "Lynel", "Griock des flammes", "Ganondorf", "Ganondorf puissance divine"];
        for (let i = 0; i < tabNameImg.length; i++) {
            switch (lvl) {
                case i + 2:
                    opponentSprite.innerHTML = "<img src='http://localhost/jeux/the_battlecard_of_zelda/img/" + tabNameImg[i] + ".png' alt=''>"
                    spanLevel[1].textContent = tabNameOpponent[i];
                    break;

            }
        }
    } else if (difficulty === 2) {
        let tabNameImg = ["bokoblin_noir", "moblin_noir", "lezalfos_noir", "trogoblin_noir", "chef_boko_noir", "hinox_bleu", "magrock", "golemax_ultime", "lynel_blanc", "griock_feu", "ganondorf", "ganondorf_2"];
        let tabNameOpponent = ["Bokoblin noir", "Moblin noir", "Lézalfos noir", "Trogoblin noir", "Chef bokoblin noir", "Hinox bleu", "Magrock", "Golemax ultime", "Lynel blanc", "Griock des flammes", "Ganondorf", "Ganondorf puissance divine"];
        for (let i = 0; i < tabNameImg.length; i++) {
            switch (lvl) {
                case i + 2:
                    opponentSprite.innerHTML = "<img src='http://localhost/jeux/the_battlecard_of_zelda/img/" + tabNameImg[i] + ".png' alt=''>"
                    spanLevel[1].textContent = tabNameOpponent[i];
                    break;

            }
        }
    } else if (difficulty === 3) {
        let tabNameImg = ["bokoblin_argent", "moblin_argent", "lezalfos_argent", "trogoblin_argent", "chef_boko_argent", "hinox_noir", "lithorock_fortifie", "gigatracien_opalin", "lynel_argent", "roi_griock", "ganondorf", "ganondorf_2"]
        let tabNameOpponent = ["Bokoblin argent", "Moblin argent", "Lézalfos argent", "Trogoblin argent", "Chef bokoblin argent", "Hinox noir", "Lithorock fortifié", "Gigatracien Opalin", "Lynel argent", "Roi Griock", "Ganondorf", "Ganondorf puissance divine"]
        for (let i = 0; i < tabNameImg.length; i++) {
            switch (lvl) {
                case i + 2:
                    opponentSprite.innerHTML = "<img src='http://localhost/jeux/the_battlecard_of_zelda/img/" + tabNameImg[i] + ".png' alt=''>"
                    spanLevel[1].textContent = tabNameOpponent[i];
                    break;

            }
        }
    }

}

function calculDegats() {
    if (difficulty === 1) {
        let tabDamage = [100, 90, 90, 85, 75, 75, 70, 70, 60, 55, 50, 45, 35]
        for (let i = 0; i < tabDamage.length; i++) {
            switch (lvl) {
                case i + 1:
                    damage = tabDamage[i];
                    break;
            }
        }
    } else if (difficulty === 2) {
        let tabDamage = [100, 80, 75, 75, 70, 60, 55, 50, 40, 40, 35, 30, 20]
        for (let i = 0; i < tabDamage.length; i++) {
            switch (lvl) {
                case i + 1:
                    damage = tabDamage[i];
                    break;
            }
        }
    } else if (difficulty === 3) {
        let tabDamage = [100, 70, 60, 50, 50, 45, 40, 40, 35, 30, 20, 10, 5]
        for (let i = 0; i < tabDamage.length; i++) {
            switch (lvl) {
                case i + 1:
                    damage = tabDamage[i];
                    break;
            }
        }
    }

    barre_life = barre_life - damage;
    if (barre_life < 0) {
        barre_life = 0;
    }
    opponentLife.style.width = barre_life + "%";
}