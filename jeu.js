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
        //this.arene.balles[1].createElement();
        //this.arene.balles[2].createElement();

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
        jeu.arene.batte.startListenMouse();
        //clearInterval(jeu.arene.balles[0].run);
        //jeu.arene.balles[0].x = jeu.arene.batte.x1;
        //jeu.arene.balles[0].startListenMouse();
        
    
        /*for(let i = 1; i < 1; i++)
        {
            setTimeout("jeu.arene.balles["+i+"].go()", i*3000);
            console.log("setTimeout('jeu.arene.balles["+i+"].go()', i*3000);");
        }*/
        jeu.countDown();
        

    }

    demoStart()
    {
     
        this.arene.balles[0].go(); 
        this.arene.batte.go();
        
    }

    countDown()
    {
        let cd = document.createElement("div");
        cd.id = "msg";
        //cd.className = "msg";
        cd.style.position = "relative";
        cd.style.left = "100px";
        cd.style.top = "200px";
        document.getElementById("arene").appendChild(cd);

        
        var affiche = "dcpt";
         
        for ( let dcpt = 3; dcpt >= 0; dcpt--)
        {
            
            affiche = dcpt;
            /*if(dcpt >= 0)
            {
                
            }
            
            else
            {
                //var affiche = 'Redirection dans '+dcpt+' seconde';
            }*/
        }

        document.getElementById('msg').innerHTML = affiche;
        

        // for(let i = 3; i>=0; i--)
        // {
        //     setTimeout('document.getElementById("msg").innerHTML = cd;', i*1000);
            
        //     if(i = 0)
        //     {
        //        document.getElementById("arene").removeChild(cd); 
        //     }
        // }
    }

}
