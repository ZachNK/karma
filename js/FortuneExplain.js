const p = []
const skyUse = [];
const landDuty = [];
const landUse = [];
const skyTag = [];
const landTag = [];
const notice = [];
const roles = [];
const frame = [];




fetch('./js/initialdate.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            p.push(post);
        });
    });

fetch('./js/sky.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            skyTag.push(post);
        });
    });

fetch('./js/land.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            landTag.push(post);
        });
    });

fetch('./js/interp.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            notice.push(post);
        });
    });

fetch('./js/role.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            roles.push(post);
        });
    });

fetch('./js/frames.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            frame.push(post);
        });
    });





function DecideTell(){

    document.getElementById("debug2").innerHTML = "";
    document.getElementById("debug3").innerHTML = "";

    let mainMsg = [];
    let subMsg = [];
    let potenMsg = [];

    let useSet = []; //월령용신의 甲~癸까지
    let mainDuty = []; //정기 지장간 불러오기


    let mainGod = 0;
    let befGod = 0;
    let knowGod = 0;
    let nextGod = 0;

    let xmsg1 = ""
    let xmsg2 = ""
    let xmsg3 = ""
    let umsg1 = ""
    let umsg2 = ""

    var times = Number(out('time_sky')[1]);
    var days = Number(out('day_sky')[1]);
    var months = Number(out('month_sky')[1]);
    var years = Number(out('year_sky')[1]);
    var timeb = Number(out('time_land')[1]);
    var dayb = Number(out('day_land')[1]);
    var monthb = Number(out('month_land')[1]);
    var yearb = Number(out('year_land')[1]);
    
    var yyyy = document.getElementById("year_msg").value;
    var md = document.getElementById("monthday_msg").value;
    var mm = md.substring(0,2).toString().padStart(2, '0');
    var dd = md.substring(2,4).toString().padStart(2, '0');
    
    
    var ordId = zm(yyyy, mm, dd)[2]; // 당령용신 번호 찾기 ex) 午 = 0:丙, 1:丁 ==> 0 혹은 1 / 辰 = 0:乙 1:癸 ==>무조건 0 / 寅 = 0:丙, 1:甲 ==>무조건 1
    var dty = zm(yyyy, mm, dd)[3]// 사령용신 번호 찾기 
    var use = landTag[monthb-1]['use'][ordId]; // 당령용신 string ex) 癸, 丙 ...

    for(var i=0; i<10; i++){ //용신과 희기신의 key들 불러오기 == 甲~癸까지 천간 순서로 useSet에 배열
        var obj = skyTag[i].use;
        useSet.push(obj.find(e => e.tag === use.tag));
    }

    /****************************************************debugging***************************************************************/

    console.log(useSet); //useSet에 용신과 희기신의 key 세트. 여기에서 모든 용희기신 가려낸다.

    /****************************************************debugging***************************************************************/


    for(var i=0; i<12; i++){ //월지별 지장간 세트 불러오기 ex) mainDuty[${"지지 번호"}]에서 배열 순서  = 지장간 0:여기, 1:중기, 2:정기
        var arr = landTag[i].duty;
        mainDuty.push(arr);
    }
    //console.log("mainDuty ", mainDuty);
    
    //당령용신에 따른, 천간 4개 글자만의 key 세트
    var ideaSet =[
                        times, //times = 천간의 숫자, 천간의 숫자로 당령에 따른 용신의 key(문구)를 가져옴.
                        days, 
                        months, 
                        years,
                        skyTag.find(e => e.name === use.tag).id
                    ];
    
    //console.log(ideaSet); // 천간 4개와 월지의 월령 배열로 얻음, 월령용신이 맨 뒤
    let myID = ideaSet[1]; // 일간에 해당되는 용희신을 myString에 할당

    let orderID = ideaSet.pop(); // result배열의 맨 마지막에 있는 월령을 빼고, orderString에 할당시킴

    let set = ideaSet.filter((item, index) => ideaSet.indexOf(item) === index); // set 배열에는, 월령을 제외하고, 천간 중에 중복된 값을 뺀 새로운 배열
    
    let idea = [...ideaSet];

    var my =0; //set 배열 중 일간 위치 index값
    for(var i=0; i<set.length;i++){
        if(set[i]===myID){
            my = i; // set에서 일간 위치 index값을 my에 할당
        } 
    }
    set.splice(my, 1); // set배열에서 일간에 해당되는 용희신을 제거
    set.unshift(myID); //다시 set배열에서 맨 앞칸 (index=0)에 끼워넣기 (unshift() 사용) 
    // => 이제 set배열은, 맨 앞칸이 일간의 용희신이고, 나머지 중복제거된 천간들만 배열됨.
    
    let setT = Tri('time_land', 'day_land', 'month_land', 'year_land', true);
    let setS = Sqr('time_land', 'day_land', 'month_land', 'year_land', true);
    let setO = Opp('time_land', 'day_land', 'month_land', 'year_land', true);

    let otherT = Tri('time_land', 'day_land', 'month_land', 'year_land', false);
    let otherS = Sqr('time_land', 'day_land', 'month_land', 'year_land', false);

    let setJ = Jup('time_land', 'day_land', 'month_land', 'year_land');
    
    console.log("월지 제외 삼합 ", otherT);
    console.log("월지 제외 방합 ", otherS);
    console.log("일지와 년지 육합 ",setJ);


    let tObj = landTag[timeb-1]; //시지 객체
    let dObj = landTag[dayb-1]; //일지 객체
    let mObj = landTag[monthb-1]; //월지 객체
    let yObj = landTag[yearb-1]; //년지 객체
    //console.log(tObj.duty[0].idN, tObj.duty[1].idN, tObj.duty[2].idN);//시지 지장간의 천간 숫자
    let objSet = [tObj, dObj, mObj, yObj];
    let wSet = [tObj, dObj, yObj];

    let inSet = []; //모든 지장간
    for(var i=0; i< wSet.length; i++){
        
        if((wSet[i].id%3) === 0){ 
            inSet.push(wSet[i].duty[1].idN);
            inSet.push(wSet[i].duty[2].idN);
        }
        else if((wSet[i].id%3) === 1){//왕지 일때
            inSet.push(wSet[i].duty[0].idN);
            inSet.push(wSet[i].duty[2].idN);
            // console.log('왕지 여기', objSet[i].duty[0].idN);
            // console.log('왕지 정기', objSet[i].duty[2].idN);

        }
        else{
            inSet.push(wSet[i].duty[0].idN);
            inSet.push(wSet[i].duty[1].idN);
            inSet.push(wSet[i].duty[2].idN);
        }
    }

    // 지장간 풀이
    
    let subSet = []; // 활용 가능한 지장간
    for(var i=0; i< wSet.length; i++){
        if((wSet[i].id%3) === 0){ //생지 일때
            subSet.push(wSet[i].duty[2].idN);
            // console.log('생지 정기', objSet[i].duty[2].idN);
        }

        if((wSet[i].id%3) === 1){ //왕지 일때
            subSet.push(wSet[i].duty[0].idN);
            subSet.push(wSet[i].duty[2].idN);
            // console.log('왕지 여기', objSet[i].duty[0].idN);
            // console.log('왕지 정기', objSet[i].duty[2].idN);
        }
    }
    // idea = 모든 천간, set = 중복 제거 천간, inSet = 모든 지장간, subSet = 정기 지장간, 왕지 여기 지장간, setT[1] 월지삼합으로쓰는 setS[1] 월지방합으로쓰는 지장간, otherT[1] 월지 외 삼합 쓰는 지장간, otherS[1] 월지 외 방합 쓰는 지장간
    //console.log(idea, set, inSet, subSet, setT[1], setS[1], otherT[1], otherS[1]);
    
    var addSet0 = subSet.concat(setT[1]); //월지 삼합 set
    var addSet1 = addSet0.concat(setS[1]); //월지 방합 set
    var addSet2 = addSet1.concat(otherT[1]); //월지 외 삼합 set
    var addSet3 = addSet2.concat(otherS[1]); //월지 외 방합 set
    var combineSet = addSet3.filter((i, inx) => addSet2.indexOf(i) === inx); // 지장간에 쓸 수 있는 set
    var ex = combineSet.filter(it => set.includes(it));
   
    for(var i = 0; i<ex.length; i++){
        for(var j = 0; j<combineSet.length; j++){
            if(combineSet[j] === ex[i]) 
            combineSet.splice(j,1);
        }
        
    }
    
    /****************************************************debugging***************************************************************/

    //희신 찾기 == nowGod
    let nowGod = notice.find(e => e.id === orderID).pw;
    // console.log('nowGod', nowGod); //용신에 맞는 희신 맞게 할당 되었는지 확인

    let check1 = [...set];
    let check2 = check1.concat(combineSet); 

    let difference = inSet.filter(x => !check2.includes(x));
    difference = [...difference.filter((i, inx)=> difference.indexOf(i) === inx)];

    // 모든 지장간 (생지 여기 무토 제거)
    console.log("모든 지장간 ", inSet);
    // 사용가능한 천간 
    console.log("사용가능한 천간 ", set);
    // 사용가능한 지장간 (천간과도 중복 제거)
    console.log("사용가능한 지장간 (천간과도 중복 제거) ", combineSet);
    //천간, 지장간의 사용 가능한 용희신 모두 합, (중복 없음)
    console.log("천간, 지장간의 사용 가능한 용희신 모두 합, (중복 없음) ", check2);
    //대기상태 지장간의 용희신 모두 합, (중복 없음)
    console.log("사용 대기 용희신 지장간, (중복 없음) ", difference);
    

    var isTalent = check2.find(e => e === nowGod);
    
    /****************************************************debugging***************************************************************/

    console.log(`${skyTag[orderID-1].name}${skyTag[orderID-1].type} 用神, ${skyTag[nowGod-1].name}${skyTag[nowGod-1].type} 喜神 갖고 있음? : ${(isTalent === undefined) ? "아니오" : "네"}`); 
    console.log(`${skyTag[myID-1].name}${skyTag[myID-1].type} 일간`); 

    /****************************************************debugging***************************************************************/
    // 희신, 지속, 중화, 확장, 기신, 한신 나열하기


    let skySetKey = [...set];
    let landSetKey = [...combineSet];
    let potKey = [...difference];
    console.log("천간에 해석할 용신 희기신 ", skySetKey);
    console.log("지지에 해석할 용신 희기신 ", landSetKey);





    
    if(set.find(e => useSet[e-1].god === "용신") !== undefined){
        mainGod = set.find(e => useSet[e-1].god === "용신");
        skySetKey.splice(skySetKey.indexOf(mainGod), 1);
    }
    else if(combineSet.find(e => useSet[e-1].god === "용신") !== undefined){
        mainGod = combineSet.find(e => useSet[e-1].god === "용신");
        landSetKey.splice(landSetKey.indexOf(mainGod), 1);
    }
    else{
        console.log("ERROR");
    }



    let msg1 = "";
    
    if(set.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = set.find(e => useSet[e-1].god === "희신");
        skySetKey.splice(skySetKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[nowGod-1].key}`;
        mainMsg.push(msg1);
    }
    else if(combineSet.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = combineSet.find(e => useSet[e-1].god === "희신");
        landSetKey.splice(landSetKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[nowGod-1].key}`;
        subMsg.push(msg1);
    }
    else if(difference.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = difference.find(e => useSet[e-1].god === "희신");
        potKey.splice(potKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}△) ${useSet[nowGod-1].key}`;
        potenMsg.push(msg1);
    }
    else{
        console.log("희신 없음");
        msg1 = "";
    }

    let msg2 = "";

    if(set.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = set.find(e => useSet[e-1].god === "지속");
        skySetKey.splice(skySetKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[befGod-1].key}`;
        mainMsg.push(msg2);
    }
    else if(combineSet.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = combineSet.find(e => useSet[e-1].god === "지속");
        landSetKey.splice(landSetKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[befGod-1].key}`;
        subMsg.push(msg2);
    }
    else if(difference.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = difference.find(e => useSet[e-1].god === "지속");
        potKey.splice(potKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}${skyTag[nowGod-1].name}△) ${useSet[befGod-1].key}`;
        potenMsg.push(msg2);
    }
    else{
        console.log("지속 없음");
        msg2 = "";
    }

    let msg3 = "";

    if(set.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = set.find(e => useSet[e-1].god === "중화1");
        skySetKey.splice(skySetKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[orderID-1].name}${skyTag[knowGod-1].name}) ${useSet[knowGod-1].key}`;
        mainMsg.push(msg3);
    }
    else if(combineSet.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = combineSet.find(e => useSet[e-1].god === "중화1");
        landSetKey.splice(landSetKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[orderID-1].name}${skyTag[knowGod-1].name}) ${useSet[knowGod-1].key}`;
        subMsg.push(msg3);
    }
    else if(difference.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = difference.find(e => useSet[e-1].god === "중화1");
        potKey.splice(potKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[orderID-1].name}${skyTag[knowGod-1].name}△) ${useSet[knowGod-1].key}`;
        potenMsg.push(msg3);
    }
    else{
        console.log("중화 없음");
        msg3 = "";
    }

    let msg4 = "";

    if(set.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = set.find(e => useSet[e-1].god === "확장");
        skySetKey.splice(skySetKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}${skyTag[nextGod-1].name}) ${useSet[nextGod-1].key}`;
        mainMsg.push(msg4);
    }
    else if(combineSet.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = combineSet.find(e => useSet[e-1].god === "확장");
        landSetKey.splice(landSetKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}${skyTag[nextGod-1].name}) ${useSet[nextGod-1].key}`;
        subMsg.push(msg4);
    }
    else if(difference.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = difference.find(e => useSet[e-1].god === "확장");
        potKey.splice(potKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}${skyTag[nextGod-1].name}△) ${useSet[nextGod-1].key}`;
        potenMsg.push(msg4);
    }
    else{
        console.log("확장 없음");
        msg4 = "";
    }
    
    console.log(msg1);
    console.log(msg2);
    console.log(msg3);
    console.log(msg4);




    if(set.find(e => useSet[e-1].god === "기신1") !== undefined){
        let x = set.find(e => useSet[e-1].god === "기신1");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg1 = `(${skyTag[x-1].name}${skyTag[nowGod-1].name}${(isTalent === undefined) ? "X" : "O"}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg1);
    }
    else if(combineSet.find(e => useSet[e-1].god === "기신1") !== undefined){
        let x = combineSet.find(e => useSet[e-1].god === "기신1");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg1 = `(${skyTag[x-1].name}${skyTag[nowGod-1].name}${(isTalent === undefined) ? "X" : "O"}) ${useSet[x-1].key}`;
        subMsg.push(xmsg1);
    }
    else if(difference.find(e => useSet[e-1].god === "기신1") !== undefined){
        let x = difference.find(e => useSet[e-1].god === "기신1");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg1 = `(${skyTag[x-1].name}${skyTag[nowGod-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg1);
    }
    else{
        console.log("용신의 음양기신 없음");
        xmsg1 = "";
    }
    
    if(set.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = set.find(e => useSet[e-1].god === "기신2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg2);
    }
    else if(combineSet.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = combineSet.find(e => useSet[e-1].god === "기신2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg2);
    }
    else if(difference.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = difference.find(e => useSet[e-1].god === "기신2");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg2);
    }
    else{
        console.log("희신의 음양기신 없음");
        xmsg2 = "";
    }

    if(set.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = set.find(e => useSet[e-1].god === "중화2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg3);
    }
    else if(combineSet.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = combineSet.find(e => useSet[e-1].god === "중화2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg3);
    }
    else if(difference.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = difference.find(e => useSet[e-1].god === "중화2");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg3);
    }
    else{
        console.log("중화 기신 없음");
        xmsg3 = "";
    }

    if(set.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = set.find(e => useSet[e-1].god === "한신1");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        umsg1 = `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(umsg1);
    }
    else if(combineSet.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = combineSet.find(e => useSet[e-1].god === "한신1");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        umsg1 = `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        subMsg.push(umsg1);
    }
    else if(difference.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = difference.find(e => useSet[e-1].god === "한신1");
        potKey.splice(potKey.indexOf(x), 1);
        umsg1 = `(${skyTag[x-1].name}${skyTag[nowGod-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(umsg1);
    }
    else{
        console.log("용신의 상극기신 없음");
        umsg1 = "";
    }
    
    if(set.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = set.find(e => useSet[e-1].god === "한신2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(umsg2);
    }
    else if(combineSet.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = combineSet.find(e => useSet[e-1].god === "한신2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        subMsg.push(umsg2);
    }
    else if(difference.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = difference.find(e => useSet[e-1].god === "한신2");
        potKey.splice(potKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        potenMsg.push(umsg2);
    }
    else{
        console.log("희신의 상극기신 없음");
        umsg2 = "";
    }


    console.log(skySetKey);
    console.log(landSetKey);
    
    console.log(mainMsg);
    console.log(subMsg);
    console.log(potenMsg);
    


    /****************************************************debugging***************************************************************/
    //격국 통변
    //일간, 격용신, 격상신, 격기신, 상신기신, 격구신
    let frameSet =[]; 
    let frameMsg = ""
    frameSet.push(myID);
    var otherIdea = [idea[0], idea[2], idea[3]];
    console.log(otherIdea = [idea[3], idea[2], idea[0]]);

    let posSky = ["年干 투간", "月干 투간", "時干 투간"];

    if(mObj.id%3 === 0){
        
        let fix = landTag[mObj.id-1].duty[2].idN;
        console.log("生支月", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령`);

        console.log(fix);
        let checkOriginSky = otherIdea.find(e => e === fix);
        if(checkOriginSky !== undefined){
            console.log(`生支月 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === fix))]}`);
            frameSet.push(fix);
            frameMsg = `生支月 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === fix))]}`;
        }
        else{
            console.log(`生支月 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사`);
            frameSet.push(fix);
            frameMsg = `生支月 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사`;
        }

    }

    if(mObj.id%3 === 1){
        
        let v = landTag[mObj.id-1].duty[dty].idN;
        console.log("旺支月 ", `${landTag[mObj.id-1].duty[dty].name}${skyTag[v-1].type} 사령`);
        if(dty===0 && otherIdea.find(e => e === v) !== undefined && otherIdea.find(e => e === v+1) === undefined){
            console.log(`旺支月 ${skyTag[v-1].name}${skyTag[v-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]}`);
            frameSet.push(v);
            frameMsg = `旺支月 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]}`;
        }
        else{
            let k = landTag[mObj.id-1].duty[2].idN;
            console.log(`旺支月 ${skyTag[k-1].name}${skyTag[k-1].type} 용사`);
            frameSet.push(k);
            frameMsg = `旺支月 ${skyTag[k-1].name}${skyTag[k-1].type} 용사`;
        }
    }

    
    if(mObj.id%3 === 2){
        
        console.log("庫支月", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령`);
        if(setT[0].length !== 0 && skyTag[myID-1].type !== skyTag[landTag[mObj.id-1].duty[1].idN-1].type){
            //중기 용사 (숫자)
            let cnt = landTag[mObj.id-1].duty[1].idN;
            let hcnt = cnt-1;
            //투간여부
            let checkOriginSky = otherIdea.find(e => e === cnt);
            let checkOtherSky = otherIdea.find(e => e === hcnt);
            //투간여부에 따른 용사 (숫자)
            if(checkOriginSky !== undefined){
                console.log(`庫支月 中氣 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === cnt))]}`);
                frameSet.push(cnt);
                frameMsg = `庫支月 中氣 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === cnt))]}`;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`庫支月 中氣 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === hcnt))]}`);
                frameSet.push(hcnt);
                frameMsg = `庫支月 中氣 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === hcnt))]}`;
            }
            else{
                console.log(`庫支月 中氣 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사`);
                frameSet.push(cnt);
                frameMsg =`庫支月 中氣 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사`;
            }
        }
        else{
            let mod_dty = (dty<2) ? 0 : 2;
            let remain_sky = skyTag[landTag[mObj.id-1].duty[0].idN-1]
            let loard_sky = skyTag[landTag[mObj.id-1].duty[2].idN-1]
            if(skyTag[myID-1].type === remain_sky.type){
                mod_dty = 2;
            }

            if(skyTag[myID-1].type === loard_sky.type){
                mod_dty = 0;
            }

            let v = landTag[mObj.id-1].duty[mod_dty].idN;
            let h = (v%2===0) ? v-1 : v+1;
            //투간여부
            let checkOriginSky = otherIdea.find(e => e === v);
            let checkOtherSky = otherIdea.find(e => e === h);
            if(checkOriginSky !== undefined){
                console.log(`庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]}`);
                frameSet.push(v);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]}`;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === h))]}`);
                frameSet.push(h);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === h))]}`;
            }
            else{
                console.log(`庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type}`);
                frameSet.push(v);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type}`;
            }
        }
    }

    /****************************************************debugging***************************************************************/
    // 
    // 격
    let s = roles[frameSet[0]]
    let rs = roles[frameSet[0]-1].mr.find(e => e.id == frameSet[1]-1).tag
    console.log(frame.find(e => e.tag === rs).fr);
    frameSet.push(frame.find(e => e.tag === rs).fr);
    frameSet.push(frame.find(e => e.tag === rs).A);
    frameSet.push(frame.find(e => e.tag === rs).B);
    frameSet.push(frame.find(e => e.tag === rs).C);
    frameSet.push(frame.find(e => e.tag === rs).D);
    
    
    /****************************************************debugging***************************************************************/
    
    let mainNotice = "";
    if(isTalent === undefined){
        mainNotice = notice.find(e => e.id === orderID).off;
        mainNotice += " 합니다."
        //console.log("희신 없음");
    }
    else{
        mainNotice = notice.find(e => e.id === orderID).on;
        mainNotice += "이 있습니다."
        //console.log("희신 있음");
    }
    
    let frontMsg = `${skyTag[orderID-1].name}${skyTag[orderID-1].type} 用神 출생, `
    frontMsg += `${skyTag[nowGod-1].name}${skyTag[nowGod-1].type} 喜神 ${(isTalent === undefined) ? "없음" : "있음"}. `;
    

    document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※" + "<br/>" +
    "(" + frontMsg +  frameMsg +", "+ `${skyTag[myID-1].name}${skyTag[myID-1].type} 일간  ${frameSet[2]}`+ ") <br/>";
    
    //set의 길이에 따라 각각 다르게 통변 메세지 부여

    var addArray = ["또한 ", "그리고 ", "게다가 ", "그 외에도 ", "그 밖에도 ", "이와 더불어 "];
    // 천간과 지장간 해석 set 갯수


    
    if(mainMsg.length == 1){
        document.getElementById("debug3").innerHTML += mainNotice + "<br/>" +
        useSet[orderID-1].key + "이 요구되는 사회 환경에" + "<br/>" + 
        mainMsg[0] + "을 삼아 재능을 발휘 하려고 합니다.";
    }
    else if(mainMsg.length == 2){
        document.getElementById("debug3").innerHTML = mainNotice + "<br/>" +
        useSet[orderID-1].key + "이 요구되는 사회 환경에" +"<br/>" + 
        mainMsg[0] + "을 하려고 하며" +"<br/>" + 
        mainMsg[1] + "을 삼아 재능을 발휘 하려고 합니다.";
    }
    else if(mainMsg.length == 3){
        document.getElementById("debug3").innerHTML = mainNotice + "<br/>" +
        useSet[orderID-1].key + "이 요구되는 사회 환경에" +"<br/>" +
        mainMsg[0] + "을 하려고 합니다."+"<br/>" +
        addArray[Math.floor(Math.random() * addArray.length)] + mainMsg[1] + "을 갖추고 있으며" +"<br/>" +
        mainMsg[2] + "을 삼아 재능을 발휘 하려고 합니다.";
    }
    else{
        document.getElementById("debug3").innerHTML = mainNotice + "<br/>" +
        useSet[orderID-1].key + "이 요구되는 사회 환경에" +"<br/>" +
        mainMsg[0] + "을 하려고 합니다." + "<br/>" +
        addArray[Math.floor(Math.random() * addArray.length)] + mainMsg[1] + "을 갖추고 있으며" +"<br/>" + 
        mainMsg[2] + "과 " + "<br/>" + mainMsg[3] +"을 삼아 재능을 발휘 하려고 합니다." + "<br/>";
    }

    if(subMsg.length !== 0){
        document.getElementById("debug3").innerHTML += "실무 적으로 ";
    }
    
    for(var i=0; i<subMsg.length; i++){
        if(i>0){
            document.getElementById("debug3").innerHTML += addArray[Math.floor(Math.random() * addArray.length)];
        }
        document.getElementById("debug3").innerHTML += subMsg[i] + "으로도 잘 하고 있습니다." + "<br/>";
    }

    if(potenMsg.length !== 0){
        document.getElementById("debug3").innerHTML +=  "때가 된다면, ";
    }

    for(var i=0; i<potenMsg.length; i++){
        if(i>0){
            document.getElementById("debug3").innerHTML += addArray[Math.floor(Math.random() * addArray.length)];
        }
        document.getElementById("debug3").innerHTML += potenMsg[i] + "으로도 할 수 있습니다." + "<br/>";
    }

    
    // 삼합 방합 충 풀이
    if(setT[0].length !==0 && setO[0].length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 실력이 더 좋아지고 자신의 전문 기술력이 점점 발전됩니다. " + "<br/>" 
    }
    else if(setT[0].length !==0 && setO[0].length ===0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "꾸준히 능력 개발하여 중년 이후 전문 기술을 갖춥니다. " + "<br/>";
    }

    if(setS[0].length !==0 && setO[0].length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 우호적인 세력이 더 좋아지고 자신의 지위가 점점 발전됩니다. " + "<br/>";
    }
    else if(setS[0].length !==0 && setO[0].length ===0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 우호세력이 있어서 중년 이후 지위를 갖춥니다. " + "<br/>";
    }
    
    if(setT[0].length ===0 && setS[0].length ===0 && setO[0].length !==0) {
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 능력과 주변 환경을 늘 새롭게 바꿔갑니다. " + "<br/>";
    }

    // useSet.length = 0; // 제거
    // mainDuty.length = 0; //제거
    // idea.length = 0;
    // set.length = 0; 
    // inSet.length = 0; 
    // subSet.length = 0;

}

function out(id_tag){
    var print = document.getElementById(id_tag).children[0];
    var srcName = print.getAttribute('src');
    let imgFileName = srcName.split('.')[0].split('/')[2]; // ex) img/modern/p01.png에서 imgFileName == p01
    let stem_branch = imgFileName.split('')[0]; // i == 천간, p == 지지
    var result =[stem_branch, imgFileName.substring(1,3)]       
    return result;                                               
}

function Tri(t_tag, d_tag, m_tag, y_tag, isMonth){ //삼합
    // t=시지 tag id: Number(out('time_land')[1]), d=일지 tag id: Number(out('day_land')[1]),  
    // m=월지 tag id: Number(out('month_land')[1]), y=년지 tag id: Number(out('year_land')[1])

    let t = Number(out(t_tag)[1]);
    let d = Number(out(d_tag)[1]);
    let m = Number(out(m_tag)[1]);
    let y = Number(out(y_tag)[1]);
    
    let tObj = landTag[t-1]; //시지 객체
    let dObj = landTag[d-1]; //일지 객체
    let mObj = landTag[m-1]; //월지 객체
    let yObj = landTag[y-1]; //년지 객체

    let formSet = [{id:0, value: tObj}, {id:1, value: dObj}, {id:2, value: yObj}]; //월지 제외 나머지 지지의 배열 0:시지, 1:일지, 2:년지
    
    // console.log(tObj.id); //시지 지지 순번
    // console.log(tObj.name);  //시지 이름
    // console.log(tObj.duty[0].name, tObj.duty[1].name, tObj.duty[2].name);  //시지 지장간
    var result = [];
    if(isMonth === true){
        result = [...formSet.filter(e => ((e['value'].id%4) === (mObj.id % 4) && e['value'].id !== mObj.id))]; //삼합이 있는 것들만 배열
    }
    else{
        var yearFocus = [...formSet.filter(e => ((e['value'].id%4) === (yObj.id % 4) && e['value'].id !== yObj.id))];
        var dayFocus = [...formSet.filter(e => ((e['value'].id%4) === (dObj.id % 4) && e['value'].id !== dObj.id))];
        result = yearFocus.concat(dayFocus);
        result = [...result.filter((item, index) => result.indexOf(item) === index )];
    }
    
    // 지장간 중 활용 가능한 set = keyWord
    let keyWord = [];
    for(var i=0; i<result.length; i++){
        let p = result[i];
        let inNum = p.value.id;
        if((inNum%3)%2===1){
            // console.log('왕지 ', landTag[inNum-1].duty[0].idN);
            // console.log('왕지 ', landTag[inNum-1].duty[2].idN);
            keyWord.push(landTag[inNum-1].duty[0].idN);
            //keyWord.push(landTag[inNum-1].duty[2].idN);
        }
        else{
            // console.log('생지, 혹은 고지', landTag[inNum-1].duty[1].idN);
            keyWord.push(landTag[inNum-1].duty[1].idN);
        }
    }
    // 삼합 확인
    // console.log("삼합: ", result);
    return [result, keyWord];
}

function Sqr(t_tag, d_tag, m_tag, y_tag, isMonth){ //방합
    // t=시지 tag id: Number(out('time_land')[1]), d=일지 tag id: Number(out('day_land')[1]),  
    // m=월지 tag id: Number(out('month_land')[1]), y=년지 tag id: Number(out('year_land')[1])

    let t = Number(out(t_tag)[1]);
    let d = Number(out(d_tag)[1]);
    let m = Number(out(m_tag)[1]);
    let y = Number(out(y_tag)[1]);

    let tObj = landTag[t-1]; //시지 객체
    let dObj = landTag[d-1]; //일지 객체
    let mObj = landTag[m-1]; //월지 객체
    let yObj = landTag[y-1]; //년지 객체

    let formSet = [{id:0, value: tObj}, {id:1, value: dObj}, {id:2, value: yObj}]; //월지 제외 나머지 지지의 배열 0:시지, 1:일지, 2:년지

    var result = [];
    if(isMonth === true){
        result = [...formSet.filter(e => (Math.floor((e['value'].id%12)/3) === Math.floor((mObj.id % 12)/3) && e['value'].id !== mObj.id))];
    }
    else{
        var yearFocus = [...formSet.filter(e => (Math.floor((e['value'].id%12)/3) === Math.floor((yObj.id % 12)/3) && e['value'].id !== yObj.id))];
        var dayFocus = [...formSet.filter(e => (Math.floor((e['value'].id%12)/3) === Math.floor((dObj.id % 12)/3) && e['value'].id !== dObj.id))];
        result = yearFocus.concat(dayFocus);
        result = [...result.filter((item, index) => result.indexOf(item) === index )];
    }
    

    // 지장간 중 활용 가능한 set = keyWord
    let keyWord = [];
    for(var i=0; i<result.length; i++){
        let p = result[i];
        let inNum = p.value.id;
        if(inNum%3 === 0){
            // console.log('생지');
        }
        else if(inNum%3 === 1){
            // console.log('왕지 ', landTag[inNum-1].duty[0].idN);
            // console.log('왕지 ', landTag[inNum-1].duty[2].idN);
            keyWord.push(landTag[inNum-1].duty[0].idN);
        }
        else{
            // console.log('고지');
            keyWord.push(landTag[inNum-1].duty[0].idN);
            keyWord.push(landTag[inNum-1].duty[2].idN);
        }
    }
    // 방합확인
    // console.log("방합: ", result);
    return [result, keyWord];
}

function Opp(t_tag, d_tag, m_tag, y_tag, isMonth){ //충
    // t=시지 tag id: Number(out('time_land')[1]), d=일지 tag id: Number(out('day_land')[1]),  
    // m=월지 tag id: Number(out('month_land')[1]), y=년지 tag id: Number(out('year_land')[1])

    let t = Number(out(t_tag)[1]);
    let d = Number(out(d_tag)[1]);
    let m = Number(out(m_tag)[1]);
    let y = Number(out(y_tag)[1]);

    let tObj = landTag[t-1]; //시지 객체
    let dObj = landTag[d-1]; //일지 객체
    let mObj = landTag[m-1]; //월지 객체
    let yObj = landTag[y-1]; //년지 객체

    let formSet = [{id:0, value: tObj}, {id:1, value: dObj}, {id:2, value: yObj}]; //월지 제외 나머지 지지의 배열 0:시지, 1:일지, 2:년지
    // 지장간 중 활용 가능한 set = keyWord
    
    let keyWord = [];

    var result = [];
    if(isMonth === true){
        result = [...formSet.filter(e => Math.abs(e['value'].id - Math.abs(mObj.id)) === 6)];
    }
    else{
        var yearFocus = [...formSet.filter(e => Math.abs(e['value'].id - Math.abs(yObj.id)) === 6)];
        var dayFocus = [...formSet.filter(e => Math.abs(e['value'].id - Math.abs(dObj.id)) === 6)];
        result = yearFocus.concat(dayFocus);
        result = [...result.filter((item, index) => result.indexOf(item) === index )];
    }
    
    return [result, keyWord];
}


function Jup(t_tag, d_tag, m_tag, y_tag){ //육합
    // t=시지 tag id: Number(out('time_land')[1]), d=일지 tag id: Number(out('day_land')[1]),  
    // m=월지 tag id: Number(out('month_land')[1]), y=년지 tag id: Number(out('year_land')[1])

    let t = Number(out(t_tag)[1]);
    let d = Number(out(d_tag)[1]);
    let m = Number(out(m_tag)[1]);
    let y = Number(out(y_tag)[1]);

    let tObj = landTag[t-1]; //시지 객체
    let dObj = landTag[d-1]; //일지 객체
    let mObj = landTag[m-1]; //월지 객체
    let yObj = landTag[y-1]; //년지 객체

    let formSet = [{id:0, value: tObj}, {id:1, value: dObj}, {id:2, value: mObj}, {id:3, value: yObj}]; //월지 제외 나머지 지지의 배열 0:시지, 1:일지, 2:년지
    // 지장간 중 활용 가능한 set = keyWord
    

    let result = [];

    let yearFocus = [...formSet.filter(e => (e['value'].id + Math.abs(yObj.id))%12 === 3)];
    console.log("yearFocus", yearFocus);
    let dayFocus = [...formSet.filter(e => (e['value'].id + Math.abs(dObj.id))%12 === 3)];
    console.log("dayFocus", dayFocus)
    result = yearFocus.concat(dayFocus);
    //result = [...result.filter((item, index) => result.indexOf(item) === index )];

    
    return result;
}

