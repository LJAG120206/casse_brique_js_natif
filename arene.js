//===============================================
//=== ARENE =====================================
//===============================================

class classArene
{
    constructor()
    {
        this.name     = "arene";

        this.w        = 0;
        this.h        = 0;

        this.mur        = new classMur();
        this.batte      = new classBatte();
        
        this.balles     = new Array();
        this.balles[0]  = new classBalle(0);
        this.balles[1]  = new classBalle(1);
        this.balles[2]  = new classBalle(2);
    }

    createElement()
    {
        console.log(this.name + ".createElement");
        let div = document.createElement("div");
        div.id = "arene";
        div.style.width = this.w;
        div.style.height = this.h;
        //div.onclick = jeu.arene.batte.startListenMouse();
        document.getElementById("logo").after(div);
    }
    
    openElement()
    {
        //console.log(this.name + ".openElement");

        btnStart.disable();
        btnQuit.disable();
        
        btnStart.set("New Game", function(){jeu.newGame()});
        btnQuit.set("Home", function(){jeu.arene.closeElement();});

        document.getElementById("arene").style.display = "block";
        setTimeout('document.getElementById("arene").style.width = "520px";',1000);
        setTimeout('document.getElementById("arene").style.height = "520px";',3000);
        setTimeout('document.getElementById("logo").style.top = "-300px";',3000);
        setTimeout('document.getElementById("arene").style.top = "50px";',3000);

        setTimeout('btnStart.enable();',5000);
        setTimeout('btnQuit.enable();',5000);
    }

    closeElement()
    {
        //console.log("jeu.arene.closeElement()");

        btnStart.disable();
        btnQuit.disable();

        btnStart.set("Start", function(){jeu.start();});
        btnQuit.set("Quit", function(){jeu.quit();});
        
        setTimeout('document.getElementById("arene").style.height = "0px";',1000);
        setTimeout('document.getElementById("logo").style.top = "0px";',3000);
        setTimeout('document.getElementById("arene").style.top = "240px";',3000);
        setTimeout('document.getElementById("arene").style.width = "0px";',4000);
        setTimeout('document.getElementById("arene").remove()',6000);

        setTimeout('btnStart.enable();',6000);
        setTimeout('btnQuit.enable();',6000);
        
    }
}
