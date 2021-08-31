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

    /*startListenMouse()
    {
        //console.log("batte.startListenMouse()");
        document.onmousemove = function (e) {
            let bcr =parseInt(document.getElementById("arene").getBoundingClientRect().left);
            this.x = e.clientX - bcr - 7;

        };
    }
*/
    move()
    {
        //console.log("test balle.move")
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
                //=== Collision brique ==============

                let dx = this.x + this.xs;
                let dy = this.y + this.ys;

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

                        for(let i = 0; i < 8; i++)                
                        {
                            if((points[i].x > brique.x1 && points[i].x < brique.x2) && (points[i].y > brique.y1 && points[i].y < brique.y2))
                            {
                                points[i].isIn = true;
                                //console.log("points[i].isIn = true;");
                            }
                        }

                        //===Collisions  verticales==
                        if((points[0].isIn && !points[4].isIn)||
                        (points[4].isIn && !points[0].isIn)
                        )
                        {
                            //console.log("Collisions  verticales");

                            this.ys = this.ys * -1;
                            collision = true;
                        }

                        //=== Collisions horizontales
                        if((points[2].isIn && !points[6].isIn)||
                        (points[6].isIn && !points[2].isIn)
                        )
                        {
                            //console.log("Collisions  horizontales");

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
                            //console.log("Collisions  diagonales");

                            this.xs = this.xs * -1;
                            this.ys = this.ys * -1;
                            collision = true;
                        }
                        //console.log("collision brique/balle :" + collision);

                        if(collision)
                        {
                            let el = document.getElementById("brique"+brique.id);
                            if(el)
                            {
                                el.parentNode.removeChild(el);
                            }
                            brique.c = '_';
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

        document.getElementById("balle"+this.id).style.left = (this.x - 7) + "px";
        document.getElementById("balle"+this.id).style.top  = (this.y - 7) + "px";
    }

    setOnClickEvent()
    {
        
    }

    onClickAction(id)
    {

    }

    reset()
    {

    }

    go()
    {
        console.log("jeu.arene.balles["+this.id+"].go()");

        this.run = setInterval("jeu.arene.balles["+this.id+"].move()",5);
    }

    stop()
    {
        
    }

}