const p = []
const skyUse = [];
const landDuty = [];
const landUse = [];
const skyTag = [];
const landTag = [];
const notice = [];
const roles = [];
const frame = [];
const luck1 = [];



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

fetch('./js/luck1.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            luck1.push(post);
        });
    });



function DecideTell(){

    document.getElementById("debug2").innerHTML = "";
    document.getElementById("debug3").innerHTML = "";
    document.getElementById("debug4").innerHTML = "";
    document.getElementById("debug5").innerHTML = "";
    document.getElementById("debug7").innerHTML = "";
  
    document.getElementById("Year_LucksTitle").innerHTML = "";
    document.getElementById("year_lucks").innerHTML = "";


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
    let rp = "";

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
                        landTag[monthb-1].duty[2].idN // 월지 정기 지장간은 천간과 같다.
                    ];
    
    //console.log(ideaSet); // 천간 4개와 월지의 월령 배열로 얻음, 월령용신이 맨 뒤
    let myID = ideaSet[1]; // 일간에 해당되는 용희신을 myString에 할당
    console.log("myID ", myID);

    let orderID = skyTag.find(e => e.name === use.tag).id; 
    
    // let friends = [];
    // for(var i =0; i<ideaSet.length; i++){
    //     if(ideaSet[i] === myID){
    //         friends.push(ideaSet[i]);
    //         ideaSet.splice(i,1);
    //     }
    // }

    let set = ideaSet.filter((item, index) => (ideaSet.indexOf(item) === index) && (ideaSet.indexOf(item) !== myID)); // set 배열에는, 월령을 제외하고, 천간 중에 중복된 값을 뺀 새로운 배열
    
    let idea = [...ideaSet];
    //set = set.concat(friends);

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
            // console.log('생지 정기', wSet[i].duty[2].idN);
        }

        if((wSet[i].id%3) === 1){ //왕지 일때
            subSet.push(wSet[i].duty[0].idN);
            subSet.push(wSet[i].duty[2].idN);
            // console.log('왕지 여기', wSet[i].duty[0].idN);
            // console.log('왕지 정기', wSet[i].duty[2].idN);
        }

        if((wSet[i].id%3) === 2){
            subSet.push(wSet[i].duty[2].idN);
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
    let allIdea = check1.concat(combineSet); 

    let potential = inSet.filter(x => !allIdea.includes(x));
    potential = [...potential.filter((i, inx)=> potential.indexOf(i) === inx)];

    // 모든 지장간 (생지 여기 무토 제거)
    console.log("모든 지장간 ", inSet);

    //구응성패, 생화극제용
    console.log("근 유무 ", inSet.find(e => skyTag[e-1].type !== skyTag[myID-1].type));

    // 사용가능한 천간 
    console.log("사용가능한 천간 ", set);

    //구응성패, 생화극제용
    let p_allIdea = [...set];
    //p_allIdea.splice(0,1);
    console.log("일간 제외 사용가능한 천간 ", p_allIdea);

    // 사용가능한 지장간 (천간과도 중복 제거)
    console.log("사용가능한 지장간 (천간과도 중복 제거) ", combineSet);
    
    //구응성패, 생화극제용
    let p_al2 = [...combineSet];
    let p_allIdea2 = p_al2.filter(e => skyTag[e-1].type !== skyTag[myID-1].type);
    
    console.log("근 제외 사용가능한 지장간  ", p_allIdea2, skyTag[myID-1].type);


    //천간, 지장간의 사용 가능한 용희신 모두 합, (중복 없음)
    console.log("천간, 지장간의 사용 가능한 용희신 모두 합, (중복 없음) ", allIdea);
    //대기상태 지장간의 용희신 모두 합, (중복 없음)
    console.log("사용 대기 용희신 지장간, (중복 없음) ", potential);
    

    var isTalent = allIdea.find(e => e === nowGod);
    
    /****************************************************debugging***************************************************************/

    console.log(`${skyTag[orderID-1].name}${skyTag[orderID-1].type} 用神, ${skyTag[nowGod-1].name}${skyTag[nowGod-1].type} 喜神 갖고 있음? : ${(isTalent === undefined) ? "아니오" : "네"}`); 
    console.log(`${skyTag[myID-1].name}${skyTag[myID-1].type} 일간`); 

    /****************************************************debugging***************************************************************/
    // 희신, 지속, 중화, 확장, 기신, 한신 나열하기


    let skySetKey = [...set];
    let landSetKey = [...combineSet];
    let potKey = [...potential];
    let godAwake = 0; //희신 상태 2: 있음, 1: 대기, 0: 없음
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
        godAwake = 2;
    }
    else if(combineSet.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = combineSet.find(e => useSet[e-1].god === "희신");
        landSetKey.splice(landSetKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[nowGod-1].key}`;
        subMsg.push(msg1);
        godAwake = 2;
    }
    else if(potential.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = potential.find(e => useSet[e-1].god === "희신");
        potKey.splice(potKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}△) ${useSet[nowGod-1].key}`;
        potenMsg.push(msg1);
        godAwake = 1;
    }
    else{
        console.log("희신 없음");
        msg1 = "";
    }

    let msg2 = "";

    if(set.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = set.find(e => useSet[e-1].god === "지속");
        skySetKey.splice(skySetKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}) ${useSet[befGod-1].key}`;
        mainMsg.push(msg2);
    }
    else if(combineSet.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = combineSet.find(e => useSet[e-1].god === "지속");
        landSetKey.splice(landSetKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}) ${useSet[befGod-1].key}`;
        subMsg.push(msg2);
    }
    else if(potential.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = potential.find(e => useSet[e-1].god === "지속");
        potKey.splice(potKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}△) ${useSet[befGod-1].key}`;
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
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}) ${useSet[knowGod-1].key}`;
        mainMsg.push(msg3);
    }
    else if(combineSet.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = combineSet.find(e => useSet[e-1].god === "중화1");
        landSetKey.splice(landSetKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}) ${useSet[knowGod-1].key}`;
        subMsg.push(msg3);
    }
    else if(potential.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = potential.find(e => useSet[e-1].god === "중화1");
        potKey.splice(potKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}△) ${useSet[knowGod-1].key}`;
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
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}) ${useSet[nextGod-1].key}`;
        mainMsg.push(msg4);
    }
    else if(combineSet.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = combineSet.find(e => useSet[e-1].god === "확장");
        landSetKey.splice(landSetKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}) ${useSet[nextGod-1].key}`;
        subMsg.push(msg4);
    }
    else if(potential.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = potential.find(e => useSet[e-1].god === "확장");
        potKey.splice(potKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}△) ${useSet[nextGod-1].key}`;
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
        xmsg1 = `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg1);
    }
    else if(combineSet.find(e => useSet[e-1].god === "기신1") !== undefined){
        let x = combineSet.find(e => useSet[e-1].god === "기신1");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg1 = `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg1);
    }
    else if(potential.find(e => useSet[e-1].god === "기신1") !== undefined){
        let x = potential.find(e => useSet[e-1].god === "기신1");
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
    else if(potential.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = potential.find(e => useSet[e-1].god === "기신2");
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
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg3);
    }
    else if(combineSet.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = combineSet.find(e => useSet[e-1].god === "중화2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg3);
    }
    else if(potential.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = potential.find(e => useSet[e-1].god === "중화2");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}△) ${useSet[x-1].key}`;
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
    else if(potential.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = potential.find(e => useSet[e-1].god === "한신1");
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
    else if(potential.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = potential.find(e => useSet[e-1].god === "한신2");
        potKey.splice(potKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}`;
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
    console.log(godAwake);
    


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
        console.log("生支月", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령 `);

        console.log(fix);
        let checkOriginSky = otherIdea.find(e => e === fix);
        if(checkOriginSky !== undefined){
            console.log(`生支月 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === fix))]} `);
            frameSet.push(fix);
            frameMsg = `生支月 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === fix))]} `;
        }
        else{
            console.log(`生支月 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사 `);
            frameSet.push(fix);
            frameMsg = `生支月 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사 `;
        }

    }

    if(mObj.id%3 === 1){
        
        let v = landTag[mObj.id-1].duty[dty].idN;
        console.log("旺支月 ", `${landTag[mObj.id-1].duty[dty].name}${skyTag[v-1].type} 사령 `);
        if(dty===0 && otherIdea.find(e => e === v) !== undefined){
            console.log(`旺支月 ${skyTag[v-1].name}${skyTag[v-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]} `);
            frameSet.push(v);
            frameMsg = `旺支月 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]} `;
        }
        else{
            let k = landTag[mObj.id-1].duty[2].idN;
            console.log(`旺支月 ${skyTag[k-1].name}${skyTag[k-1].type} 용사 `);
            frameSet.push(k);
            frameMsg = `旺支月 ${skyTag[k-1].name}${skyTag[k-1].type} 용사 `;
        }
    }

    
    if(mObj.id%3 === 2){
        
        console.log("庫支月", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령 `);
        if(setT[0].length !== 0 && skyTag[myID-1].type !== skyTag[landTag[mObj.id-1].duty[1].idN-1].type){
            //중기 용사 (숫자)
            let cnt = landTag[mObj.id-1].duty[1].idN;
            let hcnt = cnt-1;
            //투간여부
            let checkOriginSky = otherIdea.find(e => e === cnt);
            let checkOtherSky = otherIdea.find(e => e === hcnt);
            //투간여부에 따른 용사 (숫자)
            if(checkOriginSky !== undefined){
                console.log(`庫支月 中氣 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === cnt))]} `);
                frameSet.push(cnt);
                frameMsg = `庫支月 中氣 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === cnt))]} `;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`庫支月 中氣 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === hcnt))]} `);
                frameSet.push(hcnt);
                frameMsg = `庫支月 中氣 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === hcnt))]} `;
            }
            else{
                console.log(`庫支月 中氣 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 `);
                frameSet.push(cnt);
                frameMsg =`庫支月 中氣 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 `;
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
                console.log(`庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]} `);
                frameSet.push(v);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]} `;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === h))]} `);
                frameSet.push(h);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === h))]} `;
            }
            else{
                console.log(`庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type} `);
                frameSet.push(v);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type} `;
            }
        }
    }

    /****************************************************debugging***************************************************************/
    // 
    // 구응성패
    let s = roles[frameSet[0]]
    let rs = roles[frameSet[0]-1].mr.find(e => e.id == frameSet[1]-1).tag
    console.log(frame.find(e => e.tag === rs).fr);
    frameSet.push(frame.find(e => e.tag === rs).fr);
    frameSet.push(frame.find(e => e.tag === rs).A);
    frameSet.push(frame.find(e => e.tag === rs).B);
    frameSet.push(frame.find(e => e.tag === rs).C);
    frameSet.push(frame.find(e => e.tag === rs).D);
    
    // frameSet = 일간id, 격용신id, 격국, 상신, 구신기신, 상신기신, 구신
    console.log(frameSet);
    


    /*****************************************다시 정의***********************************************/
    // 생화극제용, 사용가능 일간 제외 천간 (p_allIdea) + 근 제외 지장간 (p_allIdea2)
    let p_idea = p_allIdea.concat(p_allIdea2);
    p_allIdea = [times, months, years];
    console.log("일간 제외 사용 가능 천간 ", p_allIdea);
    console.log("근 제외 사용 가능 지장간 ", p_allIdea2);
    console.log("일간과 근 제외 사용 대기 천간 지장간 ", potential);



    /*****************************************다시 정의***********************************************/
    

    let typeRole = [];
    let wtypeRole = [];
    let untypeRole = [];
    
    // 상신
    for(var i=0; i<p_allIdea.length; i++){
        let x = skyTag[p_allIdea[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            typeRole.push('A');
        }
        
    }
    for(var i=0; i<p_allIdea2.length; i++){
        let x = skyTag[p_allIdea2[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            wtypeRole.push('A');
        }
        
    }
    for(var i=0; i<potential.length; i++){
        let x = skyTag[potential[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            untypeRole.push('A');
        }
        
    }
    //구신
    for(var i=0; i<p_allIdea.length; i++){
        let x = skyTag[p_allIdea[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            typeRole.push('D');
        }
        
    }
    for(var i=0; i<p_allIdea2.length; i++){
        let x = skyTag[p_allIdea2[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            wtypeRole.push('D');
        }
        
    }
    for(var i=0; i<potential.length; i++){
        let x = skyTag[potential[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            untypeRole.push('D');
        }
        
    }
    //상신기신
    for(var i=0; i<p_allIdea.length; i++){
        let x = skyTag[p_allIdea[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            typeRole.push('C');
        }
        
    }
    for(var i=0; i<p_allIdea2.length; i++){
        let x = skyTag[p_allIdea2[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            wtypeRole.push('C');
        }
        
    }
    for(var i=0; i<potential.length; i++){
        let x = skyTag[potential[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            untypeRole.push('C');
        }
        
    }
    //구신기신
    for(var i=0; i<p_allIdea.length; i++){
        let x = skyTag[p_allIdea[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            typeRole.push('B');
        }
        
    }
    for(var i=0; i<p_allIdea2.length; i++){
        let x = skyTag[p_allIdea2[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            wtypeRole.push('B');
        }
        
    }
    for(var i=0; i<potential.length; i++){
        let x = skyTag[potential[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            untypeRole.push('B');
        }
        
    }
    
    // 활용가능 천간의 구응성패
    console.log(typeRole);
    // 활용가능 지지의 구응성패
    console.log(wtypeRole);
    // 상태 대기 천간의 구응성패
    console.log(untypeRole);

    let roleMsg = "";
    let uroleMsg ="";
    let htmlMsg = "";

    // 상신과 구신 유무에 대한 통변 방법
    let addMsg = ""
    let roleSky = [];
    let roleLand = [];

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        roleMsg += (typeRole.find(e => e === 'A') ? ` 상신: ${frameSet[3]} ` : ``)
        + (typeRole.find(e => e === 'D') ? `구신: ${frameSet[6]} ` : ``)
        + (typeRole.find(e => e === 'C') ? `상신기신: ${frameSet[5]} ` : ``)
        + (typeRole.find(e => e === 'B') ? `구신기신: ${frameSet[4]} ` : ``);
        
        let a = (typeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (typeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (typeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (typeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleSky = [a, b, c, d];

        htmlMsg += (typeRole.find(e => e === 'A') ? `(상신) 능동적으로 실력을 입증하려 하고 자격 인허가로 나이들수록 신분이 높아집니다. `+"<br/>" : ``)
        + (typeRole.find(e => e === 'D') ? `(구신) 지위, 역할에 대한 지지 세력을 능동적으로 얻으려고 합니다. `+"<br/>" : ``)
        + (typeRole.find(e => e === 'C') ? `(상신의 기신) 자신의 신분을 통해 검증 받아 지지 세력을 모읍니다. `+"<br/>" : ``)
        + (typeRole.find(e => e === 'B') ? `(구신기신) 자신의 지지 세력을 넓힐 수 있습니다. `+"<br/>" : ``);
        

    }
    else{
        roleMsg += (typeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]} ` : ``)
        + (typeRole.find(e => e === 'D') ? `구신: ${frameSet[6]} ` : ``)
        + (typeRole.find(e => e === 'C') ? `상신기신: ${frameSet[5]} ` : ``)
        + (typeRole.find(e => e === 'B') ? `격기신: ${frameSet[4]} ` : ``);

        let a = (typeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (typeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (typeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (typeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleSky = [a, b, c, d];

        htmlMsg += (typeRole.find(e => e === 'A') ? `(상신) 타고난 사회의 규칙에 맞춰 자신의 역할을 수행합니다. `+"<br/>" : ``)
        + (typeRole.find(e => e === 'D') ? `(구신) 운이 좋게도 결과가 잘 나오며 성과에 따른 대우 받으려고 합니다. `+"<br/>" : ``)
        + (typeRole.find(e => e === 'C') ? `(상신기신) 주변에 경쟁자가 많고 금전적 이득을 만들어내며 우위를 점합니다. `+"<br/>" : ``)
        + (typeRole.find(e => e === 'B') ? `(격기신) 검증을 통해 명성과 인정 받으려고 하지만, 잘못이 드러나기도 합니다. `+"<br/>" : ``); 


    }

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        roleMsg += (wtypeRole.find(e => e === 'A') ? ` 지지 상신: ${frameSet[3]} ` : ``)
        + (wtypeRole.find(e => e === 'D') ? `지지 구신: ${frameSet[6]} ` : ``)
        + (wtypeRole.find(e => e === 'C') ? `지지 상신기신: ${frameSet[5]} ` : ``)
        + (wtypeRole.find(e => e === 'B') ? `지지 구신기신: ${frameSet[4]} ` : ``);

        let a = (typeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (typeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (typeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (typeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleLand = [a, b, c, d];

        htmlMsg += (wtypeRole.find(e => e === 'A') ? `(지지 상신) 실무에서 타인의 요청에 의해 자격 및 신분으로 지지 기반을 수동적으로 만들어 갑니다. `+"<br/>" : ``)
        + (wtypeRole.find(e => e === 'D') ? `(지지 구신) 실무에서 신분에 대한 지지 세력을 얻어 인정 받습니다. `+"<br/>" : ``)
        + (wtypeRole.find(e => e === 'C') ? `(지지 상신기신) 실무능력이 우수해 자신의 몸 값이 높아집니다. `+"<br/>" : ``)
        + (wtypeRole.find(e => e === 'B') ? `(지지 구신기신) 자신의 성과를 인정 받아 더 큰 지위로 나아갈 수 있습니다. `+"<br/>" : ``);
        
        
        
    }
    else{
        roleMsg += (wtypeRole.find(e => e === 'A') ? ` 지지 상신 ${frameSet[3]} ` : ``)
        + (wtypeRole.find(e => e === 'D') ? `지지 구신: ${frameSet[6]} ` : ``)
        + (wtypeRole.find(e => e === 'C') ? `지지 상신기신: ${frameSet[5]} ` : ``)
        + (wtypeRole.find(e => e === 'B') ? `지지 격기신: ${frameSet[4]} ` : ``);

        let a = (typeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (typeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (typeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (typeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleLand = [a, b, c, d];

        htmlMsg += (wtypeRole.find(e => e === 'A') ? `(지지 상신) 실무에서 격을 사용해가서 지지 기반을 만들어 갑니다. `+"<br/>" : ``)
        + (wtypeRole.find(e => e === 'D') ? `(지지 구신) 그동안 해온것에 대한 성과를 만들어 냅니다. `+"<br/>" : ``)
        + (wtypeRole.find(e => e === 'C') ? `(지지 상신기신) 하극상이나 아랫사람의 무시가 있을 수 있습니다. `+"<br/>" : ``)
        + (wtypeRole.find(e => e === 'B') ? `(지지 격기신) 자신이 일하면서 생기는 문제와 잘못이 자꾸 드러납니다. `+"<br/>" : ``);


    }

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        uroleMsg += (untypeRole.find(e => e === 'A') ? ` 상신: ${frameSet[3]}△ ` : ``)
        + (untypeRole.find(e => e === 'D') ? `구신: ${frameSet[6]}△ ` : ``)
        + (untypeRole.find(e => e === 'C') ? `상신기신: ${frameSet[5]}△ ` : ``)
        + (untypeRole.find(e => e === 'B') ? `구신기신: ${frameSet[4]}△ ` : ``);
        
        

    }
    else{
        uroleMsg += (untypeRole.find(e => e === 'A') ? ` 상신: ${frameSet[3]}△ ` : ``)
        + (untypeRole.find(e => e === 'D') ? `구신: ${frameSet[6]}△ ` : ``)
        + (untypeRole.find(e => e === 'C') ? `상신기신: ${frameSet[5]}△ ` : ``)
        + (untypeRole.find(e => e === 'B') ? `격기신: ${frameSet[4]}△ ` : ``);



    }
    
    
    console.log(roleMsg);


     /****************************************************debugging***************************************************************/
    //근왕 판단
    let self = (skyTag[myID-1].type === objSet[0].type)|| (skyTag[myID-1].type === objSet[1].type) || (skyTag[myID-1].type === objSet[3].type)
    console.log("근왕 판단", self);


    rp = RolePlay(myID, frameSet[2], typeRole, wtypeRole, untypeRole, p_allIdea, p_allIdea2, self);

    

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
    

    document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※" +"<br/>"+ 
    " (" + frontMsg + ") <br/>";
    

    //set의 길이에 따라 각각 다르게 통변 메세지 부여

    var addArray = ["또한 ", "그리고 ", "게다가 ", "그 외에도 ", "그 밖에도 ", "이와 더불어 "];
    // 천간과 지장간 해석 set 갯수

    document.getElementById("debug3").innerHTML = mainNotice + "<br/>" + useSet[orderID-1].key + "이 요구되는 사회 환경에" +"<br/>"
    for(var i=0; i<mainMsg.length; i++){
        document.getElementById("debug3").innerHTML += mainMsg[i] + " 있습니다." +"<br/>";
    }
    

    if(subMsg.length !== 0){
        document.getElementById("debug3").innerHTML += "실무 적으로, ";
    }
    
    for(var i=0; i<subMsg.length; i++){
        
        document.getElementById("debug3").innerHTML += subMsg[i] + "도 늘 합니다." + "<br/>";
    }

    if(potenMsg.length !== 0){
        document.getElementById("debug3").innerHTML +=  "때가 된다면, ";
    }

    for(var i=0; i<potenMsg.length; i++){
        
        document.getElementById("debug3").innerHTML += potenMsg[i] + "도 할 수 있습니다." + "<br/>";
    }

    
    // 삼합 방합 충 풀이
    if(setT[0].length !==0 && setO[0].length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 실력이 점진적으로 더 업데이트 되어 전문 기술력을 갖춥니다. " + "<br/>" 
    }
    else if(setT[0].length !==0 && setO[0].length ===0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "꾸준히 능력 개발해 중년 이후 실력을 갖춥니다. " + "<br/>";
    }

    if(setS[0].length !==0 && setO[0].length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 인맥 및 세력이 우호적으로 더 업데이트 되어 넓은 인맥과 세력으로 발전됩니다. " + "<br/>";
    }
    else if(setS[0].length !==0 && setO[0].length ===0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 우호세력이 있어서 중년 이후 지위를 갖춥니다. " + "<br/>";
    }
    
    if(setT[0].length ===0 && setS[0].length ===0 && setO[0].length !==0) {
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 능력과 주변 환경을 늘 새롭게 바꿔갑니다. " + "<br/>";
    }

    if(setJ.length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "주변 사람과 모의해 사적 관계에서 공적 관계로 만들어가지만, 관계 스트레스에 유념해야 합니다. " + "<br/>";
    }

    console.log((typeRole.find(e => e === 'A') === undefined && wtypeRole.find(e => e === 'A') === undefined));
    console.log((wtypeRole.find(e => e === 'D') === undefined && typeRole.find(e => e === 'D') === undefined));





    if((typeRole.find(e => e === 'A') === undefined && wtypeRole.find(e => e === 'A') === undefined) && (wtypeRole.find(e => e === 'D') === undefined && typeRole.find(e => e === 'D') === undefined)){
        addMsg += "(상신X 구신X) 역할과 성과에 대한 타인의 기대를 부응하기 보다 자신의 적성과 능력 위주로 살아갑니다. 이번 생은 휴가오셨습니다."  
    }

    document.getElementById("debug4").innerHTML = "※ 직업적 의지 (격국 구응성패) ※"+"<br/>"+  
    "(" + frameSet[2]+", " + roleMsg + " " + uroleMsg  + ")" +"<br/>";


    // 구응성패 천간과 지지 위치별 특성 통변
        
    // if(roleSky[0] !== undefined && roleLand[0] !== undefined){
    //     addMsg += "(상신 통근) 자신의 역할을 확실하게 잘하며 살아가는데 문제 없습니다. ";
    // }
    // else if(roleSky[0] !== undefined && roleLand[0] === undefined){
    //     addMsg += "(천간 상신) 자신의 역할을 의식적으로 염두해 능동적으로 살아갑니다. ";
    // }
    // // 상신 vs. 상신기신
    // // 상신O 상신기신X
    // if((roleSky[0] !== 0 || roleLand[0] !== 0) && (roleSky[2] === 0 || roleLand[2] === 0)){
    //     addMsg += "(상신 + 상신기신X) 자신의 신분에 대한 능력 검증이 없으므로, 보수적이고 안일함에 빠질 수 있습니다. ";
    // } //상신X 상신기신O
    // else if((roleSky[0] === 0 || roleLand[0] === 0) && (roleSky[2] !== 0 || roleLand[2] !== 0)){
    //     addMsg += "(상신X + 상신기신) 자신의 신분에 대한 능력 검증에 좋은 평가 받기 어려워 사람을 모으기 어렵습니다. ";
    // } //상신O 상신기신O
    // else if((roleSky[0] !== 0 || roleLand[0] !== 0) && (roleSky[2] !== 0 || roleLand[2] !== 0)){
    //     addMsg += "(상신 + 상신기신) 자신의 신분에 대한 능력 검증받아 세력을 모읍니다. ";
    // }

    // // 상신, 지장간 상신기신
    // if(roleSky[0] !== 0 && roleLand[2] === 0){
    //     addMsg += "(상신 + 지장간 상신기신) 의욕 대비 결과가 부족하여 하극상이나 아랫사람의 무시가 있을 수 있습니다. ";
    // } //상신 지장간, 상신기신
    // else if(roleSky[2] === 0 && roleLand[0] !== 0){
    //     addMsg += "(지장간 상신 + 상신기신) 자신의 실력을 쌓아 좋은 성과를 만들어 냅니다. ";
    // } //상신O 상신기신O
    // else if(roleSky[0] === 0 && roleLand[2] !== 0){
    //     addMsg += "(지장간 상신 + 지장간 상신기신) 실무능력이 우수해 자신의 몸 값이 높아집니다. ";
    // }

    // 상신 vs. 구신

    // 구신 vs. 격기신, 구신기신




    document.getElementById("debug5").innerHTML = htmlMsg + addMsg;
    // useSet.length = 0; // 제거
    // mainDuty.length = 0; //제거
    // idea.length = 0;
    // set.length = 0; 
    // inSet.length = 0; 
    // subSet.length = 0;

    document.getElementById('useGod').innerText = orderID;
    document.getElementById('useGod').style.color = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('god_state').innerText = godAwake;
    document.getElementById('god_state').style.color = `rgba(${0}, ${0}, ${0}, ${0})`;
    // let jup_lucks = Use_lucks(orderID, godAwake);
    console.log("orderID", orderID, "godAwake", godAwake);


    document.getElementById("debug6").innerHTML = "※ 직무능력 (육신의 생화극제) ※"+"<br/>"+ 
    " (" + frameMsg + frameSet[2]+", " + `${skyTag[myID-1].name}${skyTag[myID-1].type} 일간` + ")" +"<br/>";
    document.getElementById("debug7").innerHTML = rp;





    document.getElementById('lucks').innerHTML = 
    `<td><button onClick="Use_lucks()" style="font-size: 16px; font-weight: 750; text-align:center; width:300px; height: 28px;">운세보기</button></td>`




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

function Use_lucks(){
    let size = 0;
    document.getElementById("Year_LucksTitle").innerText = "";
    document.getElementById("year_lucks").innerText = "";
    
    let _useGod = document.getElementById('useGod').innerText*1;
    let _state = document.getElementById('god_state').innerText*1;
    let firstYear = document.getElementById('j01').innerText*1;
    console.log(_useGod, _state)

    // 1,2  3,4  5,6  7,8  9,10
    let awake = _state;
    let start = (firstYear+57)%10;
    if(start === 0) start = 10;
    

    let call = luck1.find(e => e.name === skyTag[_useGod-1].name);
    let godSet = Object.keys(call).filter(e => e !== 'name');
    let set = [...godSet];

    let front = set.slice(set.indexOf(set.find(e => skyTag[(e*1)-1].type === skyTag[start-1].type)));
    let back = set.filter(e => !front.includes(e));
    let years = front.concat(back);
    if(start%2 === 0) years = years.concat([years[0]]);

    size = years.length;
    
    let result = [];
    if(size === 5){
        let gap = 0;
        if(_useGod === 10 || _useGod === 1) gap = 4;
        if(_useGod === 2 || _useGod === 3) gap = 2;
        if(_useGod === 4 || _useGod === 7) gap = 2;
        if(_useGod === 8 || _useGod === 9) gap = 2;
        for(var i=0; i<size; i++){
            
            let fy = 2*(i)+firstYear;
            let by = fy+1;
            console.log(`${fy}년, ${by}년: `, call[years[i]][awake]);
            result.push(`${fy}년, ${by}년: `+ call[years[i]][awake]);
    
            let text = call[years[i]][awake];
            let str = [...text];
  
            if(text.indexOf("(확장운)") >= 0){
                str.splice(text.indexOf("(확장운)"), 5, `${fy-gap}년, ${by-gap}년`);
                console.log(`${fy}년, ${by}년: `, str.join(''));
                result.push(`${fy}년, ${by}년: `+ str.join(''));
            }
            else if(text.indexOf("(확장운)") <0){
                console.log(`${fy}년, ${by}년: `, str.join(''));
                result.push(`${fy}년, ${by}년: `+ str.join(''));
            }
    
        }
    }
    else{
        let gap = 0;
        if(_useGod === 10 || _useGod === 1) gap = 4;
        if(_useGod === 2 || _useGod === 3) gap = 2;
        if(_useGod === 4 || _useGod === 7) gap = 2;
        if(_useGod === 8 || _useGod === 9) gap = 2;

        for(var i=0; i<size; i++){

            if(i === 0){
                let fy = firstYear;
                let text = call[years[i]][awake];
                let str = [...text];
                if(text.indexOf("(확장운)") >= 0){
                    str.splice(text.indexOf("(확장운)"), 5, `${fy-gap-1}년, ${fy-gap}년`);
                    console.log(`${fy}년: `, str.join(''));
                    result.push(`${fy}년: `+ str.join(''));
                }
                else if(text.indexOf("(확장운)") <0){
                    console.log(`${fy}년: `, str.join(''));
                    result.push(`${fy}년: `+ str.join(''));
                }
            }
            else if( i >= 1 && i <=size-2){
                let ify = 2*(i)+firstYear-1;
                let iby = ify+1;
                let itext = call[years[i]][awake];
                let istr = [...itext];
                if(itext.indexOf("(확장운)") >= 0){
                    istr.splice(itext.indexOf("(확장운)"), 5, `${ify-gap}년, ${iby-gap}년`)
                    console.log(`${ify}년, ${iby}년: `, istr.join(''))
                    result.push(`${ify}년, ${iby}년: `+ istr.join(''))
                }
                else if(itext.indexOf("(확장운)") <0){
                    console.log(`${ify}년, ${iby}년: `, istr.join(''))
                    result.push(`${ify}년, ${iby}년: `+ istr.join(''))
                }
            }
            else{
                let lastY = firstYear + 9;
                let last = call[years[(size-1)]][awake];
                let strLast = [...last];
                if(last.indexOf("(확장운)") >= 0){
                    strLast.splice(last.indexOf("(확장운)"), 5, `${lastY-gap}년, ${lastY-gap+1}년`)
                    console.log(`${lastY}년: `, strLast.join(''))
                    result.push(`${lastY}년: `+ strLast.join(''))
                }
                else if(last.indexOf("(확장운)") <0){
                    console.log(`${lastY}년: `, strLast.join(''))
                    result.push(`${lastY}년: `+ strLast.join(''))
                }

            }
            
        }
        
    }
    

    
    document.getElementById("Year_LucksTitle").innterHTML = "※ 년도별 운세 (용신과 희기신 통변) ※" + "</br>";
    for(var i = 0; i<size; i++){
        document.getElementById("year_lucks").innerHTML  += result[i] + "</br>";
    }

}

function RoleType(frame_set){
    result = 0;

    if(fr === "偏官格"){
        result = 1;
    }
    else if(fr === "傷官格"){
        result = 2;
    }
    else if(fr === "羊刃格"){
        result = 3;
    }
    else if(fr === "建祿格"){
        result = 4;
    }
    else if(fr === "正官格"){
        result = 5;
    }
    else if(fr === "偏財格"){
        result = 6;
    }
    else if(fr === "正財格"){
        result = 7;
    }
    else if(fr === "偏印格"){
        result = 8;
    }
    else if(fr === "正印格"){
        result = 9;
    }
    else if(fr === "食神格"){
        result = 10;
    }
    return result;
}


function RolePlay(me, fr, skyR, landR, nullR, skyt, landt, selfR){
    let role_playMsg = "";
    let a = roles[me-1].mr.find(e => (e.tag === "食神")).id +1
    let b = roles[me-1].mr.find(e => (e.tag === "傷官")).id +1
    let c = roles[me-1].mr.find(e => (e.tag === "偏財")).id +1
    let d = roles[me-1].mr.find(e => (e.tag === "正財")).id +1
    let man1 = roles[me-1].mr.find(e => (e.tag === "偏官")).id +1
    let man2 = roles[me-1].mr.find(e => (e.tag === "正官")).id +1
    let woman1 = roles[me-1].mr.find(e => (e.tag === "偏印")).id +1
    let woman2 = roles[me-1].mr.find(e => (e.tag === "正印")).id +1
    let one = roles[me-1].mr.find(e => (e.tag === "比肩")).id +1
    let two = roles[me-1].mr.find(e => (e.tag === "劫財")).id +1


    if(fr === "偏官格"){
        if(selfR === true){
            if(skyR.find(e => e === 'A')){
                role_playMsg += "(根旺 偏官格 食神制殺) 모두가 인정하는 자격증/학위/공식적 경력이 필수 입니다. 실적으로 남들이 못하는 특별한 일을 수행합니다."+"</br>"
                console.log("모두가 인정하는 자격증/학위/공식적 경력이 필수 입니다. 실적으로 남들이 못하는 특별한 일을 수행합니다.");
                if(skyR.find(e => e === 'B')){
                    console.log("조직에서 리더로 성장합니다. 아마추어를 이끄는 리더로 활동합니다.");
                    role_playMsg += "(根旺 偏官格 財生殺) 조직에서 리더로 성장합니다. 아마추어를 이끄는 리더로 활동합니다."+"</br>";
                }
                 
                if(skyR.find(e => e === 'D')){
                    console.log("비상한 두뇌와 독창적인 전략으로 자신이 속한 조직을 더 큰 세상으로 진출합니다.");
                    role_playMsg += "(根旺 偏官格 比食) 비상한 두뇌와 독창적인 전략으로 자신이 속한 조직을 더 큰 세상으로 진출합니다."+"</br>";
                }
            }
            else{
                console.log("파벌로부터 인허가 받지 못해 월권으로 기득권 마찰이 생깁니다.");
                role_playMsg += "(根旺 偏官格 無食) 파벌로부터 인허가 받지 못해 월권으로 기득권 마찰이 생깁니다."+"</br>";
            }
            
        }
        else{
            if(skyR.find(e => e === 'C')){
                console.log("조직을 리드하기 보다 뒤에서 보좌하며 기발한 아이디어로 자신의 업적을 만듦니다."); 
                role_playMsg += "(根弱 偏官格 殺印相生) 조직을 리드하기 보다 뒤에서 보좌하며 기발한 아이디어로 자신의 업적을 만듦니다."+"</br>"; 

            }
            else if(skyR.find(e => e === 'A')){
                console.log("불안 대비책으로 많은 시간 낭비해 스스로 극복이 아니라 조직의 보호를 받아야 합니다.");
                role_playMsg += "(根弱 偏官格 食神) 불안 대비책으로 많은 시간 낭비해 스스로 극복이 아니라 조직의 보호를 받아야 합니다."+"</br>";
            }
        }
    }
    else if(fr === "傷官格"){
        if(selfR !== true){
            if(skyR.find(e => e === 'A') || landR.find(e => e === 'A'))
                console.log("그 누구보다 조직에 맞추고 원칙주의자이지만, 주변인에게 맞추는 헌신적인 인물입니다.");
                role_playMsg += "(根弱 傷官格 佩印) 그 누구보다 조직에 맞추고 원칙주의자이지만, 주변인에게 맞추는 헌신적인 인물입니다."+"</br>";
                if(skyR.find(e => e === 'B')){
                    console.log("능력에 대한 자격 요건 갖췄고, 조직에서 안정적인 생활을 유지하기 위해 삽니다.");
                    role_playMsg += "(根弱 傷官格 官印) 능력에 대한 자격 요건 갖췄고, 조직에서 안정적인 생활을 유지하기 위해 삽니다."+"</br>";
                }
                if(skyR.find(e => e === 'D')){
                    console.log("조직의 안좋은 관행이나 유통구조를 개선해 혁신을 이끌지만 기득권의 마찰을 피할 수 없습니다.");
                    role_playMsg += "(根弱 傷官格 劫傷) 조직의 안좋은 관행이나 유통구조를 개선해 혁신을 이끌지만 기득권의 마찰을 피할 수 없습니다."+"</br>";
                    if(skyR.find(e => e === 'C')&& (isTalent !== undefined)){
                        console.log("역사의 이름 남길 혁신의 주체가 되어 새로운 기득권으로 성장합니다. 만명 중 한명 인물 입니다.");
                        role_playMsg += "(根弱 傷官格 財剋印) 역사의 이름 남길 혁신의 주체가 되어 새로운 기득권으로 성장합니다. 만명 중 한명 인물 입니다."+"</br>";
                    }
                }  
        }
        else{
            console.log("(根旺 傷官格) 조직의 규칙보다 개인을 더 중시하며 윗사람의 무능함에 치를 떱니다. 시장에 대한 이해력 높고, 자영업/유통업에 적합니다.");
            role_playMsg += "(根旺 傷官格 生財) 조직의 규칙보다 개인 욕심 및 윗사람의 무능함에 치를 떱니다. 시장에 대한 이해력 높고, 자영업/유통업에 적합니다."+"</br>";
            if(skyR.find(e => e === 'A')){
                console.log("어쩔 수 없이 조직생활 하지만 불평이 많아집니다.");
                role_playMsg += "(根旺 傷官格 佩印) 어쩔 수 없이 조직생활 하지만 불평이 많아집니다."+"</br>";
            }
        }
        
    }
    else if(fr === "羊刃格"){
        
        
        if(skyt.find(e => skyTag[e-1].type === skyTag[me-1].type)){
            console.log("세상의 약자를 지키는 체면과 이상을 버리고, 자신부터 챙깁니다.");
            role_playMsg += "(羊刃格 比劫向) 세상의 약자를 지키는 체면과 이상을 버리고, 자신부터 챙깁니다."+"</br>";
            
            if(skyt.find(e => skyTag[e-1].type === skyTag[a-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                console.log("능력을 키워 전문가가 됩니다. (푸줏간, 도살장, 애견샵, 변호사, 의료인)");
                role_playMsg += "(羊刃格 用財) 능력을 키워 전문가가 됩니다. (푸줏간, 도살장, 애견샵, 변호사, 의료인)"+"</br>";
            }

            if(landt.find(e => skyTag[e-1].type === skyTag[c-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                console.log("무늬만 나랏일 하고, 개인이득 취득, 적십자 같이 자신을 먼저 챙긴 후, 대의를 그 다음에 지킵니다.");
                role_playMsg += "(羊刃格 比劫向 用殺) 무늬만 나랏일 하고, 개인이득 취득, 적십자 같이 자신을 먼저 챙긴 후, 대의를 그 다음에 지킵니다."+"</br>";
            }
        }
        else if(skyt.find(e => skyTag[e-1].type === skyTag[man1-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
            
            console.log("이상이 높으며 공무원, 공공기관 나랏일 수행합니다.");
            role_playMsg += "(羊刃格 露殺) 이상이 높으며 공무원, 공공기관 나랏일 수행합니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[c-1].type) || landt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                console.log("세상의 약자를 지키는 인물로, 대의를 위해 개인을 버립니다. (군인, 경찰, 사법부, 정보원, 국토  수호, 시민 보호)");
                role_playMsg += "(羊刃格 露殺 財生殺) 세상의 약자를 지키는 인물로, 대의를 위해 개인을 버립니다. (군인, 경찰, 사법부, 정보원, 국토  수호, 시민 보호)"+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[woman1-1].type) && skyt.find(e => skyTag[e-1].type !== skyTag[man1-1].type)){
                    console.log("세상 약자를 보호하기 위해 자신을 희생하는 우두머리 급의 인물입니다.");
                    role_playMsg += "(羊刃格 成格) 공공의 이익을 위해 자신을 희생하는 우두머리 급의 인물입니다."+"</br>";
                }
            }
        }
        else if(skyt.find(e => skyTag[e-1].type === skyTag[woman1-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[woman2-1].type) && (skyt.find(e => skyTag[e-1].type !== skyTag[man1-1].type) || skyt.find(e => skyTag[e-1].type !== skyTag[man2-1].type))){
            console.log("말과 글로 전하는 교육자, 작가 등으로 살 수 있습니다.");
            role_playMsg += "(羊刃格 破格) 말과 글로 전하는 교육자, 작가 등으로 살 수 있습니다."+"</br>";
        }
        else{
            console.log("주어진 일만 수행하나, 직업 찾기 어려워합니다.");
            role_playMsg += "(羊刃格 破格) 주어진 일만 수행하나, 직업 찾기 어려워합니다."+"</br>";
        }


        
    }
    else if(fr === "建祿格"){
        if(skyt.find(e => skyTag[e-1].type === skyTag[me-1].type)){
            console.log("세상의 약자를 지키는 체면과 이상을 버리고, 자신부터 챙깁니다.");
            role_playMsg += "(建祿格 比劫向) 세상의 약자를 지키는 체면과 이상을 버리고, 자신부터 챙깁니다."+"</br>";
            
            if(skyt.find(e => skyTag[e-1].type === skyTag[a-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                console.log("능력을 키워 전문가가 됩니다. (직업훈련, 정신수양, 상담사)");
                role_playMsg += "(建祿格 用財) 능력을 키워 전문가가 됩니다. (직업훈련, 정신수양, 상담사)"+"</br>";
            }

            if(landt.find(e => skyTag[e-1].type === skyTag[c-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                console.log("무늬만 나랏일 하고, 개인이득 취득, 적십자 같이 자신을 먼저 챙긴 후, 대의를 그 다음에 지킵니다.");
                role_playMsg += "(建祿格 比劫向 用殺) 무늬만 나랏일 하고, 개인이득 취득, 적십자 같이 자신을 먼저 챙긴 후, 대의를 그 다음에 지킵니다."+"</br>";
            }
        }
        else if(skyt.find(e => skyTag[e-1].type === skyTag[man1-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
            console.log("이상이 높으며 공무원, 공공기관 나랏일 수행합니다.");
            role_playMsg += "(建祿格 用官) 이상이 높으며 공무원, 공공기관 나랏일 수행합니다."+"</br>";
            
            if(landt.find(e => skyTag[e-1].type === skyTag[c-1].type) || landt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                console.log("세상의 가치를 지키고 대의를 위해 개인을 버립니다. (교사, 관공서 서비스, 금감원, 헌법 수호, 교육업)");
                role_playMsg += "(建祿格 用官 財生官) 세상의 가치를 지키고 대의를 위해 개인을 버립니다. (교사, 관공서 서비스, 금감원, 헌법 수호, 교육업)"+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[woman2-1].type) && skyt.find(e => skyTag[e-1].type !== skyTag[man2-1].type)){
                    console.log("공공의 이익을 위해 자신을 희생하는 우두머리 급의 인물입니다.");
                    role_playMsg += "(建祿格 成格) 공공의 이익을 위해 자신을 희생하는 우두머리 급의 인물입니다."+"</br>";
                }
            }
        }
        else if(landt.find(e => skyTag[e-1].type === skyTag[woman1-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[woman2-1].type)  && (skyt.find(e => skyTag[e-1].type !== skyTag[man1-1].type) || skyt.find(e => skyTag[e-1].type !== skyTag[man2-1].type))){
            console.log("말과 글로 전하는 교육자, 작가 등으로 살 수 있습니다.");
            role_playMsg += "(建祿格 破格) 말과 글로 전하는 교육자, 작가 등으로 살 수 있습니다."+"</br>";
        }
        else{
            console.log("주어진 일만 수행하나, 직업 찾기 어려워합니다.");
            role_playMsg += "(建祿格 破格) 주어진 일만 수행하나, 직업 찾기 어려워합니다."+"</br>";
        }
        
    }
    else if(fr === "正官格"){
        role_playMsg += "(正官格) 원리원칙에 어긋나거나 비도덕적인 행동에 대해 스트레스 받습니다."+"</br>";
        if(selfR !== true){
            role_playMsg += "(根弱 正官格) 조직에서 자신의 입지를 조금씩 다져나갑니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                role_playMsg += "(根弱 正官格 財生官) 사람 관계에 적응해야 하며 조직의 생리에 대한 이해도가 높습니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[two-1].type)){
                    role_playMsg += "(根弱 正官格 制劫) 경쟁력 있는 자신의 영역으로 지점, 본부장의 직위 혹은, 독립하여 자신의 사업을 할 수 있습니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                    role_playMsg += "(根弱 正官格 正官比肩合) 연대 참여로 용병술이며. 독립은 가능하나 동업의 형태입니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[c-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                role_playMsg += "(根弱 正官格 財剋印) 아랫사람부터 중시하고, 조직에 자기 사익을 챙기니 도리어 하극상 마주합니다."+"</br>";
            }
        }
        else{
            role_playMsg += "(根旺 正官格) 보통의 삶입니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[woman2-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
                role_playMsg += "(根旺 正官格 官印相生) 안정적인 생활을 선호하며, 공공기관이나 평생직장에서 근무하려 합니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                    role_playMsg += "(根旺 正官格 傷官佩印) 경쟁력 있는 전문 능력을 가졌지만, 시설관리 및 유지보수 등 안정적인 것을 선호합니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                    role_playMsg += "(根旺 正官格 食正官合) 연대 참여로 재능 있는 사람을 아웃소싱하고 전문성있는 사람을 다루는 일을 합니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[c-1].type) || skyt.find(e => skyTag[e-1].type === skyTag[d-1].type) || landt.find(e => skyTag[e-1].type === skyTag[c-1].type) || landt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                role_playMsg += "(根旺 正官格 財生官) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다."+"</br>";
            }

        }
    }
    else if(fr === "偏財格"){
        role_playMsg += "(偏財格) 이익 추구형으로, 새로운 분야를 개척하기를 원합니다."+"</br>";
        if(selfR !== true){
            role_playMsg += "(根弱 偏財格) 조직에서 자신의 입지를 조금씩 다져나갑니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                role_playMsg += "(根弱 偏財格 財生殺) 조직 및 기업에 들어가 배움을 가지고 자신의 꿈을 위한 과정을 거칩니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                    role_playMsg += "(根弱 偏財格 制比) 경쟁을 통해 영역을 확보해 함께할 뜻이 맞는 사람을 모아 더 큰 세상으로 뻗고자 합니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[two-1].type)){
                    role_playMsg += "(根弱 偏財格 劫財合殺) 연대를 통해 영역확보입니다. 공동 설립, 기존의 업체 또는 유통망에 관여합니다."+"</br>";
                }
            }
        }
        else{
            role_playMsg += "(根旺 偏財格) 자신의 실력으로 자유로운 활동합니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                role_playMsg += "(根旺 偏財格 食神生財) 재능을 키워 사업적으로 풀어냅니다. 타고난 사업가의 재능을 가지고 있습니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                    role_playMsg += "(根旺 偏財格 財剋印) 사업 영역을 확보하기 위해 공격적 투자, 모 아니면 도 방식으로 일확천금 성향입니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
                    role_playMsg += "(根旺 偏財格 財印交雜) 연대를 통한 지분, 혹은 자금을 통한 투자 합니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[man1-1].type) || landt.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                role_playMsg += "(根旺 偏財格 財生殺) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다."+"</br>";
            }
        }
    }
    else if(fr === "正財格"){
        role_playMsg += "(正財格) 안정적 삶과 경제성과 실용성을 추구하고 안정을 깨는 낭비를 경계합니다."+"</br>";
        if(selfR !== true){
            role_playMsg += "(根弱 正財格) 조직에서 안정적인 것을 중시합니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role_playMsg += "(根弱 正財格 財生官) 조직 및 기업에 들어가 배움을 가지고 자신의 꿈을 위한 과정을 거칩니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[two-1].type)){
                    role_playMsg += "(根弱 正財格 制劫) 경쟁을 통해 영역을 확보해 함께할 뜻이 맞는 사람을 모아 더 큰 세상으로 뻗고자 합니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                    role_playMsg += "(根弱 正財格 正官比肩合) 연대를 통해 영역확보입니다. 공동 설립, 기존의 업체 또는 유통망에 관여합니다."+"</br>";
                }
            }
        }
        else{
            role_playMsg += "(根旺 正財格) 자신의 실력으로 변화하는 시대를 리드 합니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                role_playMsg += "(根旺 正財格 傷官生財) 시대 변화에 맞춰 자신의 재능으로 미래를 위해 나아가 새로운 것을 개발 합니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
                    role_playMsg += "(根旺 正財格 傷官佩印) 경쟁력 있는 안전 자산 확보해 회사 지분 및 신제품 이익을 통한 안정적 수입 구축합니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                    role_playMsg += "(根旺 正財格 傷官合去) 연대를 통한 지분, 혹은 자금을 통한 투자 합니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[man2-1].type) || landt.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role_playMsg += "(根旺 正財格 財生官) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다."+"</br>";
            }
        }
    }
    else if(fr === "偏印格"){
        role_playMsg += "(偏印格) 아이디어 구체화 능력과 모든 일에 공감하고 지나치게 신념, 사상에 빠져들기 쉽습니다."+"</br>";
        if(selfR !== true){
            role_playMsg += "(根弱 偏印格) 생각에 휩쓸리며 자신을 감추고 조직생활을 합니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                role_playMsg += "(根弱 偏印格 殺印相生) 남들이 못하는 특수 임무를 수행하며 정말로 한 사람만이 할 수 있는 특수직입니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                    role_playMsg += "(根弱 偏印格 奪食) 직업재교육, 재수학원 등 실력부족으로 낙오된 사람을 이끌어 줘야합니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                    role_playMsg += "(根弱 偏印格 傷官合去) 실력있는 사람을 섭외하고, 자신은 전문가 용역 관리에만 집중합니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                role_playMsg += "(根弱 偏印格 印比) 자신의 마음에 사로 잡혀 자기가 하고싶은 것만 하는 매니아가 됩니다."+"</br>";
            }
        }
        else{
            role_playMsg += "(根旺 偏印格) 정신이 무너지지 않으며 자신이 하고 싶은 것에 집중합니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                role_playMsg += "(根旺 偏印格 印比) 자신이 좋아하는 일을 직업으로 만들 수 있습니다. "+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                    role_playMsg += "(根旺 偏印格 財剋印) 경쟁력 있는 창작물로 재산을 확보와 사회의 모순을 포착해 기회를 만듭니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                    role_playMsg += "(根旺 偏印格 財印交雜) 주변에 전문가가 많아 연대 참여로 타인의 타이틀이나 일궈 놓은 결과에 편승합니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[man1-1].type) || landt.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                role_playMsg += "(根旺 偏印格 殺印相生) 부여받은 특수 임무 수행에 불만이 있습니다."+"</br>";
            }
        }
    }
    else if(fr === "正印格"){
        role_playMsg += "(正印格) 객관적 지식습득을 좋아하며 주변환경을 잘 적응하고 정해진 임무를 잘 완수합니다."+"</br>";
        if(selfR !== true){
            role_playMsg += "(根弱 正印格) 조직에 잘 적응합니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role_playMsg += "(根弱 正印格 官印相生) 자신에게 주어진 일을 수행하고 안정적인 생활을 중시합니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                    role_playMsg += "(根弱 正印格 傷官佩印) 오랜시간 경력자로서 전문가가 됩니다. 자격증 등으로 자신을 입증하는 것이 좋습니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                    role_playMsg += "(根弱 正印格 食正印合) 실력있는 사람을 섭외하고, 자신은 전문가 용역 관리에만 집중합니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[two-1].type)){
                role_playMsg += "(根弱 正印格 印劫) 자기 재능으로 안정적 수입을 구축하는 것에 압박감을 느낍니다."+"</br>";
            }
        }
        else{
            role_playMsg += "(根旺 正印格) 조직에 부적응합니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[two-1].type)){
                role_playMsg += "(根旺 正印格 印劫) 재능을 공식적으로 인정받아 명성, 논문 및 성과 등으로 인지도를 올립니다. "+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                    role_playMsg += "(根旺 正印格 財剋印) 저작권을 통한 저작료, 판권에 대한 인세 등 불로소득 중 하나를 구축합니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                    role_playMsg += "(根旺 正印格 財印交雜) 주변에 전문가가 많아 연대 참여로 타인의 타이틀이나 일궈 놓은 결과에 편승합니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[man2-1].type) || landt.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role_playMsg += "(根旺 正印格 官印相生) 불로소득을 원하는데 규칙적인 업무와 경력 스트레스가 있습니다."+"</br>";
            }
        }
    }
    else if(fr === "食神格"){
        role_playMsg += "(食神格) 자신의 능력을 중시하고 한 분야에 연구 매진하기 좋아합니다."+"</br>";
        if(selfR !== true){
            role_playMsg += "(根弱 食神格) 전문성 유통기한이 빠르므로 주변 사람들을 통해 성장해야 합니다."+"</br>";
            if(skyt.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                role_playMsg += "(根弱 食神格 比食) 믿을 수 있는 것은, 주변능력자 뿐이라는 것을 압니다. 조직 및 타인에게 의탁합니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                    role_playMsg += "(根弱 食神格 食神制殺) 조직으로부터 의탁한 노력에 대해 인정 받아 일거리를 부여 받은 것입니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                    role_playMsg += "(根弱 食神格 食正官合) 자신의 능력을 연대할 상급 기관을 찾거나 자신의 능력을 납품해야 합니다."+"</br>";
                }
            }
        }
        else{
            role_playMsg += "(根旺 食神格) 자신을 믿고, 개인의 생존을 도모하려고 실력을 쌓아 재능을 직접 판매할 수 있습니다."+"</br>";
            if(landt.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                role_playMsg += "(根旺 食神格 食神生財) 활용도 많은 인재로, 사업과 직장생활 가리지 않고 요구 사항 해결해줍니다."+"</br>";
                if(skyt.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                    role_playMsg += "(根旺 食神格 偏印到食) 편의성을 수익으로 만들어, 지적재산권을 확보하고, 건물주, 플랫폼 개발자 등 됩니다."+"</br>";
                }
                else if(skyt.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
                    role_playMsg += "(根旺 食神格 食正印合) 연대하여 자신을 키워주고 콘텐츠를 만들어줄 매니저가 됩니다."+"</br>";
                }
            }
            else if(skyt.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                role_playMsg += "(根旺 食神格 比食) 능력 대비 할일 많아져 불안함을 느낍니다."+"</br>";
            }
        }
    }

    return role_playMsg;
}
