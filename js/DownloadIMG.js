


function Convert2Image(){
    var c = document.getElementById('result');
    var ctx = c.getContext("2d");
    ctx.reset();
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(0, 0, 500, 750);
    
    var m = [8];
    for (i=0; i<8; i++){
        m[i] = new Image();
        
        var k = i%4;
        var idN = '';
        if(i<4){
            idN = 'SKY';
        }
        else{
            idN = 'LAND'
        }

        idN += k.toString();
        m[i].src = document.getElementById(idN).src.split('karma/')[1];
    }

    m[0].onload = function() {ctx.drawImage(m[0], 60, 50, 80, 80);}
    m[1].onload = function() {ctx.drawImage(m[1], 160, 50, 80, 80);}
    m[2].onload = function() {ctx.drawImage(m[2], 260, 50, 80, 80);}
    m[3].onload = function() {ctx.drawImage(m[3], 360, 50, 80, 80);}
    m[4].onload = function() {ctx.drawImage(m[4], 60, 140, 80, 80);}
    m[5].onload = function() {ctx.drawImage(m[5], 160, 140, 80, 80);}
    m[6].onload = function() {ctx.drawImage(m[6], 260, 140, 80, 80);}
    m[7].onload = function() {ctx.drawImage(m[7], 360, 140, 80, 80);}

    var luck = [20];
    for(i=0; i<20; i++){
        luck[i] = new Image();
        var k = '';
        if(i<10){
            k = 'i';
        }
        else{
            k = 'p';
        }
        var n = (i%10)+1;
        luck[i].src = document.getElementById(n.toString().padStart(3, '0') + k).src.split('karma/')[1];
    }

    luck[0].onload = function() {ctx.drawImage(luck[0], 410, 250, 40, 40);}
    luck[1].onload = function() {ctx.drawImage(luck[1], 370, 250, 40, 40);}
    luck[2].onload = function() {ctx.drawImage(luck[2], 330, 250, 40, 40);}
    luck[3].onload = function() {ctx.drawImage(luck[3], 290, 250, 40, 40);}
    luck[4].onload = function() {ctx.drawImage(luck[4], 250, 250, 40, 40);}
    luck[5].onload = function() {ctx.drawImage(luck[5], 210, 250, 40, 40);}
    luck[6].onload = function() {ctx.drawImage(luck[6], 170, 250, 40, 40);}
    luck[7].onload = function() {ctx.drawImage(luck[7], 130, 250, 40, 40);}
    luck[8].onload = function() {ctx.drawImage(luck[8], 90, 250, 40, 40);}
    luck[9].onload = function() {ctx.drawImage(luck[9], 50, 250, 40, 40);}
    luck[10].onload = function() {ctx.drawImage(luck[10], 410, 300, 40, 40);}
    luck[11].onload = function() {ctx.drawImage(luck[11], 370, 300, 40, 40);}
    luck[12].onload = function() {ctx.drawImage(luck[12], 330, 300, 40, 40);}
    luck[13].onload = function() {ctx.drawImage(luck[13], 290, 300, 40, 40);}
    luck[14].onload = function() {ctx.drawImage(luck[14], 250, 300, 40, 40);}
    luck[15].onload = function() {ctx.drawImage(luck[15], 210, 300, 40, 40);}
    luck[16].onload = function() {ctx.drawImage(luck[16], 170, 300, 40, 40);}
    luck[17].onload = function() {ctx.drawImage(luck[17], 130, 300, 40, 40);}
    luck[18].onload = function() {ctx.drawImage(luck[18], 90, 300, 40, 40);}
    luck[19].onload = function() {ctx.drawImage(luck[19], 50, 300, 40, 40);}

    let times = new Date();
    let today_date = (times.getMonth()+1).toString().padStart(2, '0') + times.getDate().toString().padStart(2, '0') + '_' + times.getHours().toString().padStart(2, '0') + times.getMinutes().toString().padStart(2, '0');
    var base64String = c.toDataURL('image/jpeg');
    var link = document.createElement('a');
    link.href = base64String;
    link.download = today_date;
    link.click();
}



