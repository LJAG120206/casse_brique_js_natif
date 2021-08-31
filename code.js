//===============================================
//=== COMMUN ====================================
//===============================================

class classBoutton
{
    constructor(id)
    {
        this.name    = "bouton";

        this.id      = id;                              
    }

    createElement()
    {
        let button = document.createElement("button");
        button.id = this.id;
        document.getElementById("boutons").appendChild(button)
    }

    set(libelle,action)
    {
        document.getElementById(this.id).innerHTML = libelle;
        document.getElementById(this.id).onclick = action;
    }

    disable()
    {
        document.getElementById(this.id).setAttribute("disabled", "disabled");
    }

    enable()
    {
        document.getElementById(this.id).removeAttribute("disabled");
    }
}

let jeu;
let logo;
let boutons;
let btnStart;
let btnQuit;

//===============================================

function init()
{
    jeu       = new classJeu();

    logo      = document.createElement("img");
    logo.id   = "logo";
    logo.setAttribute("src", "logo.svg");
    document.body.appendChild(logo);

    boutons = document.createElement("div");
    boutons.id  = "boutons";
    document.getElementById("logo").after(boutons);

    btnStart = new classBoutton("btnStart");
    btnQuit  = new classBoutton("btnQuit");

    btnStart.createElement();
    btnQuit.createElement();

    btnStart.set("Start", function(){jeu.start();});
    btnQuit.set("Quit", function(){jeu.quit();});

}