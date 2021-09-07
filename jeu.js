// ==============================================
// === JEU ======================================
// ==============================================

class classJeu
{
    constructor()
    {
        this.name       = "jeu"; 
        
        this.niveau     = 0;
        this.temps      = 0;
        this.score      = 0;
        this.vies       = 3;
        this.difficulte = 0;

        this.demoMode   = true;

        this.getReady   = false;

    }

    start()
    {
        console.log(this.name + ".start()");

        
        this.arene = new classArene();
        this.arene.parent = this;
        this.arene.createElement();
        this.arene.openElement();

        this.arene.mur.loadLevel(this.niveau);
        this.arene.mur.createWall();
        this.arene.batte.createElement();
        this.arene.balles[0].createElement();

        let life = document.createElement("div");
        life.id  = "vies";
        life.innerHTML = "Vies : "+this.vies;
        document.getElementById("arene").appendChild(life); 

        this.demoStart();
        
    }

    quit()
    {
        document.location.href = "https://www.google.fr/";
    }

    newGame()
    {
        console.log("newGame()");

        this.demoMode = false;
        clearInterval(jeu.arene.batte.run);
        
        this.arene.mur.resetWall();
        //suppression des balles (anticipé Max de 3)
        for(let i=0; i <= 3; i++)
        {
            let el = document.getElementById("balle"+i);
            if(el)
            {
                console.log(i);
                this.arene.balles[i].reset(i);

                this.arene.balles[i] = new classBalle(i);
                this.arene.balles[i].createElement();

            }
        }
        this.countDown();
    }

    demoStart()
    {
        this.demoMode = true;
        setTimeout("jeu.arene.balles[0].go()", 5000);
        this.arene.batte.go();
    }

    countDown()
    {
        this.getReady = true;

        let cd = document.createElement("div");
        cd.id = "msg";
        document.getElementById("arene").appendChild(cd);
         
        let dcpt = 3;

        document.getElementById("msg").innerHTML = dcpt;

        setTimeout("document.getElementById('msg').innerHTML = "+dcpt--, 500);
        setTimeout("document.getElementById('msg').innerHTML = "+dcpt--, 1000);
        setTimeout("document.getElementById('msg').innerHTML = "+dcpt--, 1500);
        setTimeout("document.getElementById('msg').innerHTML = 'Jo!'", 2000);
        setTimeout("document.getElementById('msg').innerHTML = ''", 4000);
        
        this.arene.batte.startListenMouse();
        document.getElementById("arene").addEventListener
        ("click", function () 
            {
                jeu.getReady = false;

                jeu.arene.balles[0].go();
            }
        );
    }

    gameOver()
    {
        console.log("jeu.gameOver();");
        this.getReady = false;
        this.niveau = 0;
        this.arene.mur.resetWall(0)
        
        this.demoStart();
        console.log("jeu.getReady : "+this.getReady);
        console.log("jeu.demoMode : "+this.demoMode);
    }
}
