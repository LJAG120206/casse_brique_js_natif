//===============================================
//=== BALLE =====================================
//===============================================
class point
{
    x;
    y;
    isIn;
    constructor(x,y)
    {

        this.x  = x;
        this.y  = y;

        this.isIn = false;
    }
}


class classBalle
{
    name;
    id;
    isMoving;
    isFixed;
    xs;
    ys;
    run;
    soundRun;

    constructor(id)
    {
        this.name      ="balle";

        this.id        = id;

        this.isMoving  = false;

        this.isFixed   = true;
        this.x         = 260;
        this.y         = 400;
        this.xs        = 1;
        this.ys        = 2;
        this.run       = null;
        this.soundRun  = true;
    }

    createElement()
    {
        console.log("jeu.arene.balles["+this.id+"].createElement();");

        let balle            = document.createElement("div");
        balle.id             = "balle" + this.id;
        balle.className      = "balle";
        balle.style.position ="absolute";
        balle.style.left     = this.x + "px";
        balle.style.top      = this.y + "px";
        document.getElementById("arene").appendChild(balle);
    }

    move()
    {
        //=== mode demo =========================
        if(this.isMoving == false )
        {
            this.isMoving = true;

            // Les bords horizontaux
            if( this.x < 7 || this.x >513)
            {
                this.xs = this.xs * -1;
            }
            else
            if( this.y < 7 || this.y >513)
            {
                this.ys = this.ys * -1;
            }
            else         
            // La batte
            if(jeu.arene.batte.x1 < this.x && this.x < jeu.arene.batte.x2 && this.y > 453)
            {
                this.ys = this.ys * -1;               
            }
            else
            {                
                //=== Collision bas et brique ==============

                let dx = this.x + this.xs;
                let dy = this.y + this.ys;

                //=== Perte de vie ===
               
                if(this.y+7 >= 510)
                {
                    this.reset(0);

                    jeu.arene.balles[0] = new classBalle(0);
                    jeu.arene.balles[0].createElement();
                    jeu.vies--;
                    console.log(jeu.vies);

                    if(jeu.vies == 0)
                    {
                        jeu.vies = 3;
                        let audio = new Audio("SM_GO.mp3");
                        audio.play();
                        document.getElementById('msg').innerHTML =" GAME";
                        setTimeout("document.getElementById('msg').innerHTML = 'OVER'", 2000);
                        setTimeout("document.getElementById('msg').innerHTML = ''", 4000);
                        setTimeout("jeu.gameOver();", 2100);
                    }

                    document.getElementById("vies").innerHTML = "Vies : "+jeu.vies;
                    jeu.getReady = true;

                }

                jeu.arene.mur.briques.forEach(brique =>
                {
                    if (brique.c != "_")
                    {
                        //console.log("collision")
                        let collision = false;
                        let points = new Array(8);
                        
                        points[0] = new point(dx    , dy - 7 );
                        points[1] = new point(dx + 5, dy - 5 );
                        points[2] = new point(dx + 7, dy     );
                        points[3] = new point(dx + 5, dy + 5 );
                        points[4] = new point(dx    , dy + 7 );
                        points[5] = new point(dx - 5, dy + 5 );
                        points[6] = new point(dx - 7, dy     );
                        points[7] = new point(dx - 5, dy - 5 );

                        
                        


                        //=== Collision avec les briques

                        for(let i = 0; i < 8; i++)                
                        {
                            if((points[i].x > brique.x1 && points[i].x < brique.x2) && (points[i].y > brique.y1 && points[i].y < brique.y2))
                            {
                                points[i].isIn = true;
                            }
                        }

                        //===Collisions  verticales==
                        if((points[0].isIn && !points[4].isIn)||
                        (points[4].isIn && !points[0].isIn)
                        )
                        {
                            this.ys = this.ys * -1;
                            collision = true;
                        }

                        //=== Collisions horizontales
                        if((points[2].isIn && !points[6].isIn)||
                        (points[6].isIn && !points[2].isIn)
                        )
                        {
                            this.xs = this.xs * -1;
                            collision = true;
                        }

                        //=== Collisions diagonales =
                        if(
                            (points[1].isIn && !points[5].isIn)||
                            (points[5].isIn && !points[1].isIn)||
                            (points[3].isIn && !points[7].isIn)||
                            (points[7].isIn && !points[3].isIn)
                        )
                        {
                            this.xs = this.xs * -1;
                            this.ys = this.ys * -1;
                            collision = true;
                        }
                        
                        if(collision)
                        {
                            let el = document.getElementById("brique"+brique.id);
                            if(el)
                            {
                                el.parentNode.removeChild(el);
                                jeu.arene.mur.total--;
                                if(this.soundRun)
                                {   
                                    //this.soundRun = false;
                                    let audio = new Audio("bip.mp3");
                                    audio.play();
                                    //setTimeout("jeu.arene.balles[0].soundRun = true;", 1100);
                                    //setTimeout("console.log('jeu.arene.balles[0].soundRun')", 1200);
                                }
                            }

                            brique.c = '_';

                            if(jeu.arene.mur.total == 0)
                            {
                                if(jeu.demoMode == true)
                                {
                                    jeu.arene.mur.total = 0;
                                   
                                    this.reset(0);
                                    jeu.arene.balles[0] = new classBalle(0);
                                    jeu.arene.balles[0].createElement();
                                    jeu.arene.mur.resetWall();

                                    jeu.demoStart();
                                }
                                else
                                {                                   
                                    this.reset(0);

                                    jeu.arene.balles[0] = new classBalle(0);
                                    jeu.arene.balles[0].createElement();
                                    jeu.arene.mur.total = 0;

                                    jeu.niveau++;

                                    if(jeu.niveau < 8)
                                    {
                                        jeu.arene.mur.resetWall();
                                        jeu.countDown();
                                    }
                                    else
                                    {
                                        let audio = new Audio("applause.mp3");
                                        audio.play();
                                        document.getElementById("msg").innerHTML = "CONGRATS!"
                                        setTimeout("document.getElementById('msg').innerHTML = 'CONGRATS!'", 3000);

                                    }
                                }
                            }
                        }                   
                    }
                });
            }
                    
            this.x = this.x + this.xs; 
            this.y  = this.y + this.ys;

            this.moveTo(this.x,this.y);

            this.isMoving = false;
            
        }
    }

    moveTo(x,y)
    {
        //console.log("jeu.arene.balles["+this.id+"]..moveTo()");

        if(jeu.getReady == false)
        {
            document.getElementById("balle"+this.id).style.left = (this.x - 7) + "px";
            document.getElementById("balle"+this.id).style.top  = (this.y - 7) + "px";
        }

        if(jeu.getReady)
        {
            this.x = x+33;
            this.y = y-7;
            document.getElementById("balle"+this.id).style.left = (x+33) + "px";
            document.getElementById("balle"+this.id).style.top  = (y-7) + "px";
        }
    }

    setOnClickEvent()
    {
        
    }

    onClickAction(id)
    {

    }

    reset(id)
    {
        this.stop();
        this.x = 260;
        this.y = 400;
        document.getElementById("balle"+id).remove();
    }

    go()
    {
        if(this.run == null)
        {
            console.log("jeu.arene.balles["+this.id+"].go()");
            console.log("run : "+this.run);
        
            this.run = setInterval("jeu.arene.balles["+this.id+"].move()",2);
        }
        console.log("run après go() : "+this.run);
    }

    stop()
    {
        clearInterval(this.run);
    }

}