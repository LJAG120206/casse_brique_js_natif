//===============================================
//=== MUR =======================================
//===============================================

class classMur
{
    briques;
    total;
    constructor()
    {
        this.name = "mur";

        this.w    = 13;
        this.h    = 18;
        this.level = "";
    }

    loadLevel(niveau)
    {
        this.total = 0;
        this.level = "";
        console.log("test niveau dans loadLevel : "+niveau)
        let xhr = new XMLHttpRequest();
        xhr.open("get", "level" + niveau + ".txt", false);
        xhr.send(null);
        let map = xhr.responseText;

        for (let m = 0; m < map.length; m++)
        {
            var c = map.substring(m, m+1);
            if (c == "_" || (c >= "0" && c <= "8"))
            {
                this.level += c;
                
            }
            if(c >= "0" && c <= "8")
            {
                this.total++;
                
            }
        }
        console.log("jeu.arene.mur.total = "+this.total);
        console.log(this.level);
    }

    createWall()
    {
        let i = 0;
        this.briques = new Array();

        for(let y = 0 ; y < 18; y++)
        {
            for(let x = 0; x < 13; x++)
            {
                
                this.briques[i] = new classBrique(i,x*40,y*20, this.level.substring(i, i+1));
                i++;
            }
        }
    }

    resetWall()
    {

        console.log("test resetWall");
        for (let m = 0; m < 234; m++)
        {
            this.briques[m]    = "";
            let el = document.getElementById("brique"+m);

            if(el)
            {
                el.remove();
            }
        }
        console.log("Dans mur jeu.niveau après++ : "+jeu.niveau);

        this.loadLevel(jeu.niveau);

        this.createWall();
    }
}