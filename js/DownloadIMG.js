
function convert2Image(){
    var c = document.getElementById('result');
    var ctx = c.getContext("2d");
    ctx.reset();
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(0, 0, 500, 750);
    
    var main00 = new Image();
    var main01 = new Image();
    var main02 = new Image();
    var main03 = new Image();
    var main10 = new Image();
    var main11 = new Image();
    var main12 = new Image();
    var main13 = new Image();
    
    main00.src = document.getElementById("SKY0").src.split("karma/")[1];
    main01.src = document.getElementById("SKY1").src.split("karma/")[1];
    main02.src = document.getElementById("SKY2").src.split("karma/")[1];
    main03.src = document.getElementById("SKY3").src.split("karma/")[1];
    main10.src = document.getElementById("LAND0").src.split("karma/")[1];
    main11.src = document.getElementById("LAND1").src.split("karma/")[1];
    main12.src = document.getElementById("LAND2").src.split("karma/")[1];
    main13.src = document.getElementById("LAND3").src.split("karma/")[1];

    main00.onload = function() {ctx.drawImage(main00, 60, 50, 80, 80);}
    main01.onload = function() {ctx.drawImage(main01, 160, 50, 80, 80);}
    main02.onload = function() {ctx.drawImage(main02, 260, 50, 80, 80);}
    main03.onload = function() {ctx.drawImage(main03, 360, 50, 80, 80);}
    main10.onload = function() {ctx.drawImage(main10, 60, 140, 80, 80);}
    main11.onload = function() {ctx.drawImage(main11, 160, 140, 80, 80);}
    main12.onload = function() {ctx.drawImage(main12, 260, 140, 80, 80);}
    main13.onload = function() {ctx.drawImage(main13, 360, 140, 80, 80);}

    var weather00 = new Image();
    var weather01 = new Image();
    var weather02 = new Image();
    var weather03 = new Image();
    var weather04 = new Image();
    var weather05 = new Image();
    var weather06 = new Image();
    var weather07 = new Image();
    var weather08 = new Image();
    var weather09 = new Image();

    var weather10 = new Image();
    var weather11 = new Image();
    var weather12 = new Image();
    var weather13 = new Image();
    var weather14 = new Image();
    var weather15 = new Image();
    var weather16 = new Image();
    var weather17 = new Image();
    var weather18 = new Image();
    var weather19 = new Image();

    weather00.src = document.getElementById("001i").src.split("karma/")[1];
    weather01.src = document.getElementById("002i").src.split("karma/")[1];
    weather02.src = document.getElementById("003i").src.split("karma/")[1];
    weather03.src = document.getElementById("004i").src.split("karma/")[1];
    weather04.src = document.getElementById("005i").src.split("karma/")[1];
    weather05.src = document.getElementById("006i").src.split("karma/")[1];
    weather06.src = document.getElementById("007i").src.split("karma/")[1];
    weather07.src = document.getElementById("008i").src.split("karma/")[1];
    weather08.src = document.getElementById("009i").src.split("karma/")[1];
    weather09.src = document.getElementById("010i").src.split("karma/")[1];

    weather10.src = document.getElementById("001p").src.split("karma/")[1];
    weather11.src = document.getElementById("002p").src.split("karma/")[1];
    weather12.src = document.getElementById("003p").src.split("karma/")[1];
    weather13.src = document.getElementById("004p").src.split("karma/")[1];
    weather14.src = document.getElementById("005p").src.split("karma/")[1];
    weather15.src = document.getElementById("006p").src.split("karma/")[1];
    weather16.src = document.getElementById("007p").src.split("karma/")[1];
    weather17.src = document.getElementById("008p").src.split("karma/")[1];
    weather18.src = document.getElementById("009p").src.split("karma/")[1];
    weather19.src = document.getElementById("010p").src.split("karma/")[1];

    weather00.onload = function() {ctx.drawImage(weather00, 410, 250, 40, 40);}
    weather01.onload = function() {ctx.drawImage(weather01, 370, 250, 40, 40);}
    weather02.onload = function() {ctx.drawImage(weather02, 330, 250, 40, 40);}
    weather03.onload = function() {ctx.drawImage(weather03, 290, 250, 40, 40);}
    weather04.onload = function() {ctx.drawImage(weather04, 250, 250, 40, 40);}
    weather05.onload = function() {ctx.drawImage(weather05, 210, 250, 40, 40);}
    weather06.onload = function() {ctx.drawImage(weather06, 170, 250, 40, 40);}
    weather07.onload = function() {ctx.drawImage(weather07, 130, 250, 40, 40);}
    weather08.onload = function() {ctx.drawImage(weather08, 90, 250, 40, 40);}
    weather09.onload = function() {ctx.drawImage(weather09, 50, 250, 40, 40);}
    
    weather10.onload = function() {ctx.drawImage(weather10, 410, 300, 40, 40);}
    weather11.onload = function() {ctx.drawImage(weather11, 370, 300, 40, 40);}
    weather12.onload = function() {ctx.drawImage(weather12, 330, 300, 40, 40);}
    weather13.onload = function() {ctx.drawImage(weather13, 290, 300, 40, 40);}
    weather14.onload = function() {ctx.drawImage(weather14, 250, 300, 40, 40);}
    weather15.onload = function() {ctx.drawImage(weather15, 210, 300, 40, 40);}
    weather16.onload = function() {ctx.drawImage(weather16, 170, 300, 40, 40);}
    weather17.onload = function() {ctx.drawImage(weather17, 130, 300, 40, 40);}
    weather18.onload = function() {ctx.drawImage(weather18, 90, 300, 40, 40);}
    weather19.onload = function() {ctx.drawImage(weather19, 50, 300, 40, 40);}

}

