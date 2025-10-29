<<<<<<< HEAD
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
const luck2 = [];


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

fetch('./js/framelucks.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            luck2.push(post);
        });
    });


function Divination(){

    console.log("=======================================Divination=======================================");
    document.getElementById("debug2").innerHTML = "";
    document.getElementById("debug3").innerHTML = "";
    document.getElementById("debug4").innerHTML = "";
    document.getElementById("debug5").innerHTML = "";
    document.getElementById("debug7").innerHTML = "";
  
    document.getElementById("GLucks").innerHTML = "";
    document.getElementById("Lucks_main").innerHTML = "";
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

    let yObj = landTag[yearb-1];
    let mObj = landTag[monthb-1];
    let dObj = landTag[dayb-1];
    let tObj = landTag[timeb-1];
    
    
    var yyyy = document.getElementById("year_msg").value;
    var md = document.getElementById("monthday_msg").value;
    var mm = md.substring(0,2).toString().padStart(2, '0');
    var dd = md.substring(2,4).toString().padStart(2, '0');
    
    
    var ordId = zm(yyyy, mm, dd)[2]; // 당령용신 번호 찾기 ex) 午 = 0:丙, 1:丁 ==> 0 혹은 1 / 辰 = 0:乙 1:癸 ==>무조건 0 / 寅 = 0:丙, 1:甲 ==>무조건 1
    var dty = zm(yyyy, mm, dd)[3]// 사령용신 번호 찾기 
    var use = landTag[monthb-1]['use'][ordId]; // 당령용신 string ex) 癸, 丙 ...

    for(var i=0; i<10; i++){ //용신과 희기신의 key들 불러오기 == 甲~癸까지 천간 순서로 useSet에 Array
        var obj = skyTag[i].use;
        useSet.push(obj.find(e => e.tag === use.tag));
    }

    /****************************************************debugging***************************************************************/

    console.log("----용신과 희기신의 key 객체 세트", useSet); //useSet에 용신과 희기신의 key 세트. 여기에서 모든 용희기신 가려낸다.
    
    /****************************************************debugging***************************************************************/
    // 천간숫자 = n, 지지숫자 = i, 지지 객체 = landTag[i-1] = obj
    // 천간 숫자=> 한자 = skyTag[n-1].name
    // 지지 숫자=> 한자 = landTag[i-1].name
    // 천간 숫자=> 오행 = skyTag[n-1].type
    // 지지 숫자=> 오행 = landTag[i-1].type
    // 지지 객체 => 숫자 = obj.id
    // 지지 객체 => 한자 = obj.name
    // 지지 객체 => 오행 = obj.type
    // 지지(생지) 객체 => 당령(한자): obj.use[1].tag
    // 지지(왕지) 객체 => 당령1(한자): obj.use[0].tag
    // 지지(왕지) 객체 => 당령2(한자): obj.use[1].tag
    // 지지(생지) 객체 => 당령(한자): obj.use[0].tag

    // 지지 객체 => 여기 사령(객체), 중기 사령(객체), 정기 사령(객체) = obj.duty[0], obj.duty[1], obj.duty[2]
    // 지지 객체 => 여기 사령천간(숫자), 중기 사령천간(숫자), 정기 사령천간(숫자) = obj.duty[0].idN, obj.duty[1].idN, obj.duty[2].idN
    // 지지 객체 => 여기 사령천간(한자), 중기 사령천간(한자), 정기 사령천간(한자) = obj.duty[0].name, obj.duty[1].name, obj.duty[2].name

    // 일간 숫자(a)가 보는 육친 세트 = roles[a-1].mr
    // 일간 숫자(a)가 보는 b의 육친 = roles[a-1].mr[b-1].tag
    
    // 월령용신 숫자 = m, 다른 천간 숫자 = x
    // 월령용신 숫자 => 월령용신의 천간key 객체 세트(A) = let A = []; for(var i=0; i<10; i++) A.push(skyTag[i].use.find(e=> e.tag === skyTag[m-1].name));
    // 월령용신 숫자가 보는 천간숫자의 희기신(객체) = skyTag[x-1].use.find(e=> e.tag === skyTag[m-1].name)
    
    //console.log("------Debug ")

    /****************************************************debugging***************************************************************/
    //1.오행용 세트
    //1-1.천간 배열
    let idea = [times, days, months, years];
    let ideaRole = [times, months, years];

    // soul 천간 오행 배열, skys 천간 육신 배열 (일간 제외)
    let soul = [...idea.filter((i,v)=>idea.indexOf(i)===v)]
    let skys = [...ideaRole.filter((i,v)=>ideaRole.indexOf(i)===v)]

    // 지장간 배열 (왕지 중기는 0으로 표시됨, 1~10 = 甲~癸)
    let pObj = [
        tObj,
        dObj,
        mObj,
        yObj
    ]

    // 모든 지장간 풀어쓰기 0: 시지 여기 ~ 11: 년지 정기 
    // (오행용)
    let eidos =[
        pObj[0].duty[0].idN,pObj[0].duty[1].idN,pObj[0].duty[2].idN,
        pObj[1].duty[0].idN,pObj[1].duty[1].idN,pObj[1].duty[2].idN,
        pObj[2].duty[0].idN,pObj[2].duty[1].idN,pObj[2].duty[2].idN,
        pObj[3].duty[0].idN,pObj[3].duty[1].idN,pObj[3].duty[2].idN,
    ]

    let eidosRole = [...eidos] // (육신용)

    //오중기토 제거 (오행, 육신 모두 다)
    for(var i=0; i<4; i++){
        if(pObj[i].id === 7){
            eidos[(3*i)+1] = 0;
            eidosRole[(3*i)+1] = 0;
        }
    }

    //왕지생 월지의 여기 혹은 정기 둘중 하나만 들어감 (오행용)
    if(dty === 2){
        eidos[6] = 0;
    }
    else{
        eidos[8] = 0;
    }

    //생지 여기 무토 제거 (육신용)
    for(var i=0; i<4; i++){
        if(eidosRole[(3*i)] === 5){
            eidosRole[(3*i)] = 0;
        }
    }
    

    //1-2.사용가능 지장간 배열
    // 월지안에 있는 것은 생지 여기, 생지 중기, 고지 중기 빼고 다 사용 가능
    //월지, 타지 왕지) 삼합 방합 여부 상관없이 다 가능

    // 월지 지장간 
    let stage = [];

    // subSet 정기 지장간 배열 세트
    let subSet = []; // 오행
    let subSetRole = []; // 육신
    for(var i=0; i<4; i++){
        let f = []; // 오행
        let r = []; // 육신
        if(pObj[i].id%3 === 0){
            f.push(pObj[i].duty[2].idN);
            r.push(pObj[i].duty[2].idN);
            if(i===2){
                stage.push(pObj[i].duty[2].idN);
            }
            
        }
        else if(pObj[i].id%3 === 1){
            
            if(i === 2){
                f.push(pObj[i].duty[dty].idN);
                r.push(pObj[i].duty[dty].idN);
                stage.push(pObj[i].duty[dty].idN);
            }
            else{
                f.push(pObj[i].duty[0].idN);
                f.push(pObj[i].duty[2].idN);
                r.push(pObj[i].duty[0].idN);
                r.push(pObj[i].duty[2].idN);
            }
            

        }
        else if(pObj[i].id%3 === 2){
            if(i===2){
                f.push(pObj[i].duty[0].idN);
                r.push(pObj[i].duty[0].idN);
                f.push(pObj[i].duty[2].idN);
                r.push(pObj[i].duty[2].idN);
                stage.push(pObj[i].duty[0].idN);
                stage.push(pObj[i].duty[2].idN);
            }
            
        }
        subSet.push(f);
        subSetRole.push(r);
        
    }



    // subs 정기 지장간 배열
    let subs = [...subSet[0], ...subSet[1], ...subSet[2], ...subSet[3]];
    let subr = [...subSetRole[0], ...subSetRole[1], ...subSetRole[2], ...subSetRole[3]];
    subs = [...subs.filter((i,v)=>subs.indexOf(i) === v)];
    subr = [...subr.filter((i,v)=>subr.indexOf(i) === v)];
    
    // 타지 중, 고지) 
    //월지 방합 고지): 여기 가능, 중기 대기, 정기 가능
    //타지 방합 고지): 여기 가능, 중기 대기, 정기 대기
    //월지 방합 생지): 여기 무토 대기, 중기 대기, 정기 가능
    //타지 방합 생지): 여기 무토 대기, 중기 대기, 정기 가능

    // sqrSet 방합 지장간 배열 세트
    let sqrSet = [];
    for(var i=0; i<4; i++){
        var x = [pObj[0], pObj[1], pObj[2], pObj[3]];
        x.splice(i, 1)
        var ins = [...x.filter(e => Math.floor((e.id%12)/3) === Math.floor((pObj[i].id%12)/3))]
        let p = [];
        if(ins.length !==0){
            if(pObj[i].id%3===2){
                if(Math.floor((pObj[i].id%12)/3) === Math.floor((pObj[2].id%12)/3)){
                    p.push(pObj[i].duty[2].idN)
                }
                p.push(pObj[i].duty[0].idN)
                sqrSet.push(p)
            }
            else if((pObj[i].id%3===1)){
                p.push(pObj[i].duty[0].idN)
                sqrSet.push(p)
            }
            else{
                sqrSet.push(p)
            }
        }
        else{
            sqrSet.push(p)
        }
    }
   
    // sqrs 방합 지장간 배열, 방합 확인 용도
    let sqrs = [...sqrSet[0], ...sqrSet[1], ...sqrSet[2], ...sqrSet[3]];
    sqrs = [...sqrs.filter((i,v)=>sqrs.indexOf(i) === v)];

    //월지 삼합 고지): 여기 대기, 중기 가능, 정기 대기
    //타지 삼합 고지): 여기 대기, 중기 가능, 정기 대기
    //월지 삼합 생지): 여기 무토 대기, 중기 가능, 정기 가능
    //타지 삼합 생지): 여기 무토 대기, 중기 대기, 정기 가능   

    // triSet 삼합 지장간 배열 세트
    let triSet = [];
    // triUse 월지 삼합 지장간 배열 세트
    let triUse = [];
    for(var i=0; i<4; i++){
        let p = [];
        let u = [];

        if(i !== 2){
            if(pObj[i].id !== pObj[2].id && pObj[i].id%4 === pObj[2].id%4){
                if(pObj[i].id%3 === 1){
                    console.log("타 왕지")
                    u.push(pObj[2].duty[1].idN);
                    
                }
                else{
                    console.log("타 생지, 고지")
                    u.push(pObj[i].duty[1].idN);
    
                }
                
                
            }
            triUse.push(u);
            
        }
        else{
            if(pObj[i].id%3 !== 1 && ((pObj[i].id%4 === pObj[0].id%4 && pObj[i].id !== pObj[0].id) || (pObj[i].id%4 === pObj[1].id%4 && pObj[i].id !== pObj[1].id) || (pObj[i].id%4 === pObj[3].id%4 && pObj[i].id !== pObj[3].id)) && landTag[pObj[i].id-1].type !== skyTag[days-1].type){
                console.log("월지 중기")
                stage.push(pObj[i].duty[1].idN);
                u.push(pObj[i].duty[1].idN);
            }
            
            
            triUse.push(u);
        }
        
       


        var x = [pObj[0], pObj[1], pObj[2], pObj[3]];
        x.splice(i, 1)
        
        

        for(var j=0; j<3; j++){
            if(pObj[i].id !== pObj[2].id && pObj[i].id%4 === x[j].id%4 && pObj[i].id%3 !== 1 && Math.floor((pObj[i].id%12)/3) === Math.floor((pObj[2].id%12)/3)){

                p.push(pObj[i].duty[1].idN);

                
            }
            
        }
        triSet.push(p);

    }

    // tris 삼합 지장간 배열, 삼합 확인 용도
    let tris = [...triSet[0], ...triSet[1], ...triSet[2], ...triSet[3]];
    let triu = [...triUse[0], ...triUse[1], ...triUse[2], ...triUse[3]]
    tris = [...tris.filter((i,v)=>tris.indexOf(i) === v)];
    triu = [...triu.filter((i,v)=>triu.indexOf(i) === v)];


    // oppSet 충 지지 배열 세트
    let oppSet = [];
    for(var i=0; i<4; i++){
        var x = [pObj[0], pObj[1], pObj[2], pObj[3]];
        x.splice(i, 1)
        var ins = [...x.filter(e => Math.abs(e.id-pObj[i].id) === 6)]
        let p = [];
        if(ins.length !==0){
            p.push(pObj[i].id)
            oppSet.push(p)
        }
        else{
            oppSet.push(p)
        }
    }

    // opps 지지 충 배열, 충 확인 용도
    let opps = [...oppSet[0], ...oppSet[1], ...oppSet[2], ...oppSet[3]]
    opps = [...opps.filter((i,v)=>opps.indexOf(i) === v)];

    // jupSet 육합 지지 배열 세트
    let jupSet = [];
    for(var i=0; i<4; i++){
        var x = [pObj[0].id, pObj[1].id, pObj[2].id, pObj[3].id];
        x.splice(i, 1)
        var temp = pObj[i].id
        let r = [];
        if(temp ===1){
           temp +=13 
        }
        var ins = [...x.filter(e => e+temp === 15)]
        if(ins.length !==0){
            r.push(pObj[i].id);
            jupSet.push(r);
        }
        else{
            jupSet.push(r);
        }
    }

    // jups 육합 지지 배열, 육합 확인 용도
    let jups = [...jupSet[0], ...jupSet[1], ...jupSet[2], ...jupSet[3]]
    jups = [...jups.filter((i,v)=>jups.indexOf(i) === v)];

    // pairSet 배열 지지 배열 세트
    let pairSet = [];
    for(var i=0; i<4; i++){
        var x = [pObj[0].id, pObj[1].id, pObj[2].id, pObj[3].id];
        x.splice(i, 1)
        var temp = pObj[i].id
        let r = [];
        
        var pr = [2, 1, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11]
        var ins = [...x.filter(e=> pr[e-1] === temp)]
        if(ins.length !== 0){
            r.push(pObj[i].id);
            pairSet.push(r);
        }
        else{
            pairSet.push(r);
        }
    }

    // pair 배열 지지 배열, 배열 확인 용도
    let pair = [...pairSet[0], ...pairSet[1], ...pairSet[2], ...pairSet[3]]
    pair = [...pair.filter((i,v)=>pair.indexOf(i) === v)];

    // spirit 사용 가능 지장간 오행 배열, mens 사용 가능 지장간 육신 배열
    let spirit = [];
    let mens = [];
    for(var i=0; i<4; i++){
        mens = mens.concat([...subSetRole[i]]);
        mens = mens.concat([...sqrSet[i]]);
        mens = mens.concat([...triSet[i]]);
        mens = mens.concat([...triUse[i]]);
        mens = [...mens.filter((i,v) => mens.indexOf(i) === v)];

        spirit = spirit.concat([...subSet[i]]);
        spirit = spirit.concat([...sqrSet[i]]);
        spirit = spirit.concat([...triSet[i]]);
        spirit = spirit.concat([...triUse[i]]);
        spirit = [...spirit.filter((i,v) => spirit.indexOf(i) === v)];
        
    }
    spirit = spirit.filter(e=>!soul.includes(e));
    //  mens 사용 가능 지장간 육신 배열 (근 제외)
    mens = mens.filter(e=>skyTag[e-1].type !==skyTag[days-1].type);
    


    /****************************************************debugging***************************************************************/

    //1-3.사용대기 지장간 Array
    //body 사용대기 오행 Array, lands 사용대기 육신 Array (근 제외)
    let body = eidos.filter(e=>!soul.includes(e))
    let lands = eidosRole.filter(e=>!skys.includes(e))
    body = body.filter(e=>!spirit.includes(e))
    lands = lands.filter(e=>!mens.includes(e))
    //  lands 사용 대기 지장간 육신 Array (근 제외)
    body = [...body.filter(e=> e !== 0)]
    lands = [...lands.filter(e=> e !== 0)]
    lands = lands.filter(e=>skyTag[e-1].type !== skyTag[days-1].type)

    body = [...body.filter((i,v)=>body.indexOf(i) === v)]
    lands = [...lands.filter((i,v)=>lands.indexOf(i) === v)]
    

    // 월지 지장간 중 비견 겁재는 mens으로 붙여넣게 따로 빼놓기
    for(var i=0; i<3; i++){
        if(eidosRole[(i+6)] !== 0  && skyTag[eidosRole[(i+6)]-1].type === skyTag[days-1].type){
            lands.push(eidosRole[(i+6)]);
        }
    }


    //1-1.천간 Array
    console.log("----천간 (오행용)", soul)
    //1-2.사용가능 지장간 Array
    console.log("----지장간 (오행용) ", spirit)
    //1-3.사용대기 지장간 Array
    console.log("----사용대기 지장간 (오행용) ", body)

    //2. 육신용 세트
    //2-1. 일간 제외 천간 Array
    console.log("----일간 제외 천간 (육신용)", skys)
    //2-2. 근 제외 사용가능 지장간 Array
    console.log("----근 제외 지장간 (육신용) ", mens)
    //2-3. 근 제외 사용대기 지장간 Array
    console.log("----근 제외 사용대기 지장간 (육신용) ", lands)
    console.log("----월지 지장간 (육신용) ", stage);

    
    console.log("----(확인용) 지지 방합",sqrSet, sqrs)
    console.log("----(확인용) 지지 삼합", triSet, tris, triu)
    console.log("----(확인용) 지지 충", opps)
    console.log("----(확인용) 지지 육합", jups)
    console.log("----(확인용) 지지 배열",pair)





    /****************************************************debugging***************************************************************/
    //console.log("================orderID 등등", orderID, nowGod, isTalent, myID) === [9, 8, undefined, 10]
    let orderID = mObj.use[ordId].id
    let nowGod = mObj.use[ordId].pw
    let isTalent = [...soul, ...spirit].find(e => e === nowGod);
    let myID = days
    console.log(`----변수 확인 orderID (용신번호): ${orderID} nowGod (희신번호): ${nowGod} isTalent (희신유무): ${isTalent} myID (일간번호): ${myID}`)
    console.log(`${skyTag[orderID-1].name}${skyTag[orderID-1].type} 用神, ${skyTag[nowGod-1].name}${skyTag[nowGod-1].type} 喜神 갖고 있음? : ${(isTalent > 0) ? "네" : "아니오"}`); 
    console.log(`${skyTag[myID-1].name}${skyTag[myID-1].type} 일간`); 

    
    // 희신, 지속, 중화, 확장, 기신, 한신 나열하기

    let skySetKey = [...soul];
    let landSetKey = [...spirit];
    let potKey = [...body];
    let godAwake = 0; //희신 상태 2: 있음, 1: 대기, 0: 없음
    console.log("----(확인용) 천간 (오행용) ", skySetKey);
    console.log("----(확인용) 지장간 (오행용) ", landSetKey);
    console.log("----(확인용) 사용대기 지장간 (오행용) ", potKey);

    /****************************************************debugging***************************************************************/
    
    if(soul.find(e => useSet[e-1].god === "용신") !== undefined){
        mainGod = soul.find(e => useSet[e-1].god === "용신");
        skySetKey.splice(skySetKey.indexOf(mainGod), 1);
    }
    else if(spirit.find(e => useSet[e-1].god === "용신") !== undefined){
        mainGod = spirit.find(e => useSet[e-1].god === "용신");
        landSetKey.splice(landSetKey.indexOf(mainGod), 1);
    }
    else{
        console.log("ERROR");
    }

    let msg1 = "";
    
    if(soul.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = soul.find(e => useSet[e-1].god === "희신");
        skySetKey.splice(skySetKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[nowGod-1].key}`;
        mainMsg.push(msg1);
        godAwake = 2;
    }
    else if(spirit.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = spirit.find(e => useSet[e-1].god === "희신");
        landSetKey.splice(landSetKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[nowGod-1].key}`;
        subMsg.push(msg1);
        godAwake = 2;
    }
    else if(body.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = body.find(e => useSet[e-1].god === "희신");
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

    if(soul.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = soul.find(e => useSet[e-1].god === "지속");
        skySetKey.splice(skySetKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}) ${useSet[befGod-1].key}`;
        mainMsg.push(msg2);
    }
    else if(spirit.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = spirit.find(e => useSet[e-1].god === "지속");
        landSetKey.splice(landSetKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}) ${useSet[befGod-1].key}`;
        subMsg.push(msg2);
    }
    else if(body.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = body.find(e => useSet[e-1].god === "지속");
        potKey.splice(potKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}△) ${useSet[befGod-1].key}`;
        potenMsg.push(msg2);
    }
    else{
        console.log("지속 없음");
        msg2 = "";
    }

    let msg3 = "";

    if(soul.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = soul.find(e => useSet[e-1].god === "중화1");
        skySetKey.splice(skySetKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}) ${useSet[knowGod-1].key}`;
        mainMsg.push(msg3);
    }
    else if(spirit.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = spirit.find(e => useSet[e-1].god === "중화1");
        landSetKey.splice(landSetKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}) ${useSet[knowGod-1].key}`;
        subMsg.push(msg3);
    }
    else if(body.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = body.find(e => useSet[e-1].god === "중화1");
        potKey.splice(potKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}△) ${useSet[knowGod-1].key}`;
        potenMsg.push(msg3);
    }
    else{
        console.log("중화 없음");
        msg3 = "";
    }

    let msg4 = "";

    if(soul.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = soul.find(e => useSet[e-1].god === "확장");
        skySetKey.splice(skySetKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}) ${useSet[nextGod-1].key}`;
        mainMsg.push(msg4);
    }
    else if(spirit.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = spirit.find(e => useSet[e-1].god === "확장");
        landSetKey.splice(landSetKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}) ${useSet[nextGod-1].key}`;
        subMsg.push(msg4);
    }
    else if(body.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = body.find(e => useSet[e-1].god === "확장");
        potKey.splice(potKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}△) ${useSet[nextGod-1].key}`;
        potenMsg.push(msg4);
    }
    else{
        console.log("확장 없음");
        msg4 = "";
    }


    if(soul.find(e => useSet[e-1].god === "기신1") !== undefined){
        console.log("용신의 음양기신 있음");
        let x = soul.find(e => useSet[e-1].god === "기신1");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg1);
    }
    else if(spirit.find(e => useSet[e-1].god === "기신1") !== undefined){
        console.log("용신의 음양기신 있음");
        let x = spirit.find(e => useSet[e-1].god === "기신1");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg1);
    }
    else if(body.find(e => useSet[e-1].god === "기신1") !== undefined){
        console.log("용신의 음양기신 있음");
        let x = body.find(e => useSet[e-1].god === "기신1");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg1);
    }
    else{
        console.log("용신의 음양기신 없음");
        xmsg1 = "";
    }
    
    if(soul.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = soul.find(e => useSet[e-1].god === "기신2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg2);
    }
    else if(spirit.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = spirit.find(e => useSet[e-1].god === "기신2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg2);
    }
    else if(body.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = body.find(e => useSet[e-1].god === "기신2");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg2);
    }
    else{
        console.log("희신의 음양기신 없음");
        xmsg2 = "";
    }

    if(soul.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = soul.find(e => useSet[e-1].god === "중화2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg3);
    }
    else if(spirit.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = spirit.find(e => useSet[e-1].god === "중화2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg3);
    }
    else if(body.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = body.find(e => useSet[e-1].god === "중화2");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg3);
    }
    else{
        console.log("중화 기신 없음");
        xmsg3 = "";
    }

    if(soul.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = soul.find(e => useSet[e-1].god === "한신1");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        umsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(umsg1);
    }
    else if(spirit.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = spirit.find(e => useSet[e-1].god === "한신1");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        umsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        subMsg.push(umsg1);
    }
    else if(body.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = body.find(e => useSet[e-1].god === "한신1");
        potKey.splice(potKey.indexOf(x), 1);
        umsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(umsg1);
    }
    else{
        console.log("용신의 상극기신 없음");
        umsg1 = "";
    }
    
    if(soul.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = soul.find(e => useSet[e-1].god === "한신2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(umsg2);
    }
    else if(spirit.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = spirit.find(e => useSet[e-1].god === "한신2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        subMsg.push(umsg2);
    }
    else if(body.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = body.find(e => useSet[e-1].god === "한신2");
        potKey.splice(potKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(umsg2);
    }
    else{
        console.log("희신의 상극기신 없음");
        umsg2 = "";
    }


    /****************************************************debugging***************************************************************/
    //격국 통변
    //일간, 격용신, 격상신, 격기신, 상신기신, 격구신
    let frameSet =[]; 
    let frameMsg = ""
    frameSet.push(myID);

    let posSky = ["時干 투간", "月干 투간", "年干 투간"];

    if(mObj.id%3 === 0){
        
        let fix = landTag[mObj.id-1].duty[2].idN;
        console.log("生支月", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령 `);
        let checkOriginSky = ideaRole.find(e => e === fix);
        if(checkOriginSky !== undefined){
            console.log(`生支月 용사 ${skyTag[fix-1].name}${skyTag[fix-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === fix))]} `);
            frameSet.push(fix);
            frameMsg = `生支月 용사 ${skyTag[fix-1].name}${skyTag[fix-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === fix))]} `;
        }
        else{
            console.log(`生支月 용사 ${skyTag[fix-1].name}${skyTag[fix-1].type} `);
            frameSet.push(fix);
            frameMsg = `生支月 용사 ${skyTag[fix-1].name}${skyTag[fix-1].type} `;
        }

    }

    if(mObj.id%3 === 1){
        
        let v = landTag[mObj.id-1].duty[dty].idN;
        console.log("旺支月 ", `${landTag[mObj.id-1].duty[dty].name}${skyTag[v-1].type} 사령 `);
        if(dty===0 && ideaRole.find(e => e === v) !== undefined && skyTag[myID-1].type !== skyTag[v-1].type){
            console.log(`旺支月 용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === v))]} `);
            frameSet.push(v);
            frameMsg = `旺支月 용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === v))]} `;
        }
        else{
            let k = landTag[mObj.id-1].duty[2].idN;
            console.log(`旺支月 용사 ${skyTag[k-1].name}${skyTag[k-1].type} `);
            frameSet.push(k);
            frameMsg = `旺支月 용사 ${skyTag[k-1].name}${skyTag[k-1].type} `;
        }
    }

    
    if(mObj.id%3 === 2){
        
        console.log("庫支月", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령 `);
        if(triu.length !== 0 && skyTag[myID-1].type !== skyTag[landTag[mObj.id-1].duty[1].idN-1].type){
            //중기 용사 (숫자)
            let cnt = landTag[mObj.id-1].duty[1].idN;
            let hcnt = cnt-1;
            //투간여부
            let checkOriginSky = ideaRole.find(e => e === cnt);
            let checkOtherSky = ideaRole.find(e => e === hcnt);
            //투간여부에 따른 용사 (숫자)
            if(checkOriginSky !== undefined){
                console.log(`庫支月 中氣 용사 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === cnt))]} `);
                frameSet.push(cnt);
                frameMsg = `庫支月 中氣 용사 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === cnt))]} `;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`庫支月 中氣 용사 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === hcnt))]} `);
                frameSet.push(hcnt);
                frameMsg = `庫支月 中氣 용사 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === hcnt))]} `;
            }
            else{
                console.log(`庫支月 中氣 용사 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} `);
                frameSet.push(cnt);
                frameMsg =`庫支月 中氣 용사 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} `;
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
            let checkOriginSky = ideaRole.find(e => e === v);
            let checkOtherSky = ideaRole.find(e => e === h);
            if(checkOriginSky !== undefined){
                console.log(`庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === v))]} `);
                frameSet.push(v);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === v))]} `;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === h))]} `);
                frameSet.push(h);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === h))]} `;
            }
            else{
                console.log(`庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[v-1].name}${skyTag[v-1].type} `);
                frameSet.push(v);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[v-1].name}${skyTag[v-1].type} `;
            }
        }
    }

    /****************************************************debugging***************************************************************/
    // 
    // 구응성패
    let s = roles[frameSet[0]]
    let rs = roles[frameSet[0]-1].mr.find(e => e.id == frameSet[1]-1).tag
    console.log("----격: ", frame.find(e => e.tag === rs).fr);
    frameSet.push(frame.find(e => e.tag === rs).fr);
    frameSet.push(frame.find(e => e.tag === rs).A);
    frameSet.push(frame.find(e => e.tag === rs).B);
    frameSet.push(frame.find(e => e.tag === rs).C);
    frameSet.push(frame.find(e => e.tag === rs).D);
    
    // frameSet = 일간id, 격용신id, 격국, 상신, 구신기신, 상신기신, 구신
    console.log("---- 격국 구응성패 세트: ", frameSet);
    


    /*****************************************다시 정의***********************************************/
    console.log("----일간 제외 천간 (육신용)", skys)
    console.log("----근 제외 지장간 (육신용) ", mens)
    console.log("----근 제외 사용대기 지장간 (육신용) ", lands)
    console.log("----근 제외 월지 지장간 (육신용) ", stage)



    /*****************************************다시 정의***********************************************/
    

    let typeRole = [];
    let wtypeRole = [];
    let untypeRole = [];
    let stypeRole = [];
    
    // 상신
    for(var i=0; i<skys.length; i++){
        let x = skyTag[skys[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            typeRole.push('A');
        }
        
    }
    for(var i=0; i<mens.length; i++){
        let x = skyTag[mens[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            wtypeRole.push('A');
        }
        
    }
    for(var i=0; i<lands.length; i++){
        let x = skyTag[lands[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            untypeRole.push('A');
        }
        
    }
    for(var i=0; i<stage.length; i++){
        let x = skyTag[stage[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            stypeRole.push('A');
        }
        
    }
    //구신
    for(var i=0; i<skys.length; i++){
        let x = skyTag[skys[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            typeRole.push('D');
        }
        
    }
    for(var i=0; i<mens.length; i++){
        let x = skyTag[mens[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            wtypeRole.push('D');
        }
        
    }
    for(var i=0; i<lands.length; i++){
        let x = skyTag[lands[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            untypeRole.push('D');
        }
        
    }
    for(var i=0; i<stage.length; i++){
        let x = skyTag[stage[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            stypeRole.push('D');
        }
        
    }
    //상신기신
    for(var i=0; i<skys.length; i++){
        let x = skyTag[skys[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            typeRole.push('C');
        }
        
    }
    for(var i=0; i<mens.length; i++){
        let x = skyTag[mens[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            wtypeRole.push('C');
        }
        
    }
    for(var i=0; i<lands.length; i++){
        let x = skyTag[lands[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            untypeRole.push('C');
        }
        
    }
    for(var i=0; i<stage.length; i++){
        let x = skyTag[stage[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            stypeRole.push('C');
        }
        
    }
    //구신기신
    for(var i=0; i<skys.length; i++){
        let x = skyTag[skys[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            typeRole.push('B');
        }
        
    }
    for(var i=0; i<mens.length; i++){
        let x = skyTag[mens[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            wtypeRole.push('B');
        }
        
    }
    for(var i=0; i<lands.length; i++){
        let x = skyTag[lands[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            untypeRole.push('B');
        }
        
    }
    for(var i=0; i<stage.length; i++){
        let x = skyTag[stage[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            stypeRole.push('B');
        }
        
    }
    
    // 활용가능 천간의 구응성패
    console.log("----활용가능 천간의 구응성패", typeRole);
    // 활용가능 지지의 구응성패
    console.log("----활용가능 지지의 구응성패", wtypeRole);
    // 상태 대기 천간의 구응성패
    console.log("----상태 대기 천간의 구응성패", untypeRole);
    // 상태 대기 천간의 구응성패
    console.log("----활용가능 월지의 구응성패", stypeRole);

    let roleMsg = "";
    let uroleMsg ="";
    let htmlMsg = "";

    // 상신과 구신 유무에 대한 통변 방법
    let roleSky = [];
    let roleLand = [];
    let roleStage = [];

    // 길신격, 흉신격
    let follower = (frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格") ? false : true;

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        roleMsg += (typeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]} ` : ``)
        + (typeRole.find(e => e === 'D') ? ` 구신 ${frameSet[6]} ` : ``)
        + (typeRole.find(e => e === 'C') ? ` 상신기신 ${frameSet[5]} ` : ``)
        + (typeRole.find(e => e === 'B') ? ` 구신기신 ${frameSet[4]} ` : ``)
        
        let a = (typeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (typeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (typeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (typeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleSky = [a, b, c, d];


    }
    else{
        roleMsg += (typeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]} ` : ``)
        + (typeRole.find(e => e === 'D') ? ` 구신 ${frameSet[6]} ` : ``)
        + (typeRole.find(e => e === 'C') ? ` 상신기신 ${frameSet[5]} ` : ``)
        + (typeRole.find(e => e === 'B') ? ` 격기신 ${frameSet[4]} ` : ``)

        let a = (typeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (typeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (typeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (typeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleSky = [a, b, c, d];


    }

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        roleMsg += ((wtypeRole.find(e => e === 'A') !== undefined && stypeRole.find(e => e === 'A') === undefined) ? ` 상신(지지) ${frameSet[3]} ` : ``)
        + ((wtypeRole.find(e => e === 'D') !== undefined && stypeRole.find(e => e === 'D') === undefined) ? ` 구신(지지) ${frameSet[6]} ` : ``)
        + ((wtypeRole.find(e => e === 'C') !== undefined && stypeRole.find(e => e === 'C') === undefined) ? ` 상신기신(지지) ${frameSet[5]} ` : ``)
        + ((wtypeRole.find(e => e === 'B') !== undefined && stypeRole.find(e => e === 'B') === undefined) ? ` 구신기신(지지) ${frameSet[4]} ` : ``)

        let a = (wtypeRole.find(e => e === 'A') !== undefined && stypeRole.find(e => e === 'A') === undefined) ? 1: 0; 
        let b = (wtypeRole.find(e => e === 'B') !== undefined && stypeRole.find(e => e === 'B') === undefined) ? 1: 0; 
        let c = (wtypeRole.find(e => e === 'C') !== undefined && stypeRole.find(e => e === 'C') === undefined) ? 1: 0; 
        let d = (wtypeRole.find(e => e === 'D') !== undefined && stypeRole.find(e => e === 'D') === undefined) ? 1: 0; 
        roleLand = [a, b, c, d];

        
    }
    else{
        roleMsg += ((wtypeRole.find(e => e === 'A') && stypeRole.find(e => e === 'A') === undefined) ? ` 상신(지지) ${frameSet[3]} ` : ``)
        + ((wtypeRole.find(e => e === 'D') !== undefined && stypeRole.find(e => e === 'D') === undefined) ? ` 구신(지지) ${frameSet[6]} ` : ``)
        + ((wtypeRole.find(e => e === 'C') !== undefined && stypeRole.find(e => e === 'C') === undefined) ? ` 상신기신(지지) ${frameSet[5]} ` : ``)
        + ((wtypeRole.find(e => e === 'B') !== undefined && stypeRole.find(e => e === 'B') === undefined) ? ` 격기신(지지) ${frameSet[4]} ` : ``)

        let a = (wtypeRole.find(e => e === 'A') !== undefined && stypeRole.find(e => e === 'A') === undefined) ? 1: 0; 
        let b = (wtypeRole.find(e => e === 'B') !== undefined && stypeRole.find(e => e === 'B') === undefined) ? 1: 0; 
        let c = (wtypeRole.find(e => e === 'C') !== undefined && stypeRole.find(e => e === 'C') === undefined) ? 1: 0; 
        let d = (wtypeRole.find(e => e === 'D') !== undefined && stypeRole.find(e => e === 'D') === undefined) ? 1: 0; 
        roleLand = [a, b, c, d];


    }

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        roleMsg += (stypeRole.find(e => e === 'A') ? ` 상신(월지) ${frameSet[3]} ` : ``)
        + (stypeRole.find(e => e === 'D') ? ` 구신(월지) ${frameSet[6]} ` : ``)
        + (stypeRole.find(e => e === 'C') ? ` 상신기신(월지) ${frameSet[5]} ` : ``)
        + (stypeRole.find(e => e === 'B') ? ` 구신기신(월지) ${frameSet[4]} ` : ``)
        
        let a = (stypeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (stypeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (stypeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (stypeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleStage = [a, b, c, d];


    }
    else{
        roleMsg += (stypeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]} ` : ``)
        + (stypeRole.find(e => e === 'D') ? ` 구신(월지) ${frameSet[6]} ` : ``)
        + (stypeRole.find(e => e === 'C') ? ` 상신기신(월지) ${frameSet[5]} ` : ``)
        + (stypeRole.find(e => e === 'B') ? ` 격기신(월지) ${frameSet[4]} ` : ``)

        let a = (stypeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (stypeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (stypeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (stypeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleStage = [a, b, c, d];


    }

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        uroleMsg += (untypeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]}△ ` : ``)
        + (untypeRole.find(e => e === 'D') ? ` 구신 ${frameSet[6]}△ ` : ``)
        + (untypeRole.find(e => e === 'C') ? ` 상신기신 ${frameSet[5]}△ ` : ``)
        + (untypeRole.find(e => e === 'B') ? ` 구신기신 ${frameSet[4]}△ ` : ``)
        
        

    }
    else{
        uroleMsg += (untypeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]}△ ` : ``)
        + (untypeRole.find(e => e === 'D') ? ` 구신 ${frameSet[6]}△ ` : ``)
        + (untypeRole.find(e => e === 'C') ? ` 상신기신 ${frameSet[5]}△ ` : ``)
        + (untypeRole.find(e => e === 'B') ? ` 격기신 ${frameSet[4]}△ ` : ``)



    }


    console.log("----천간 구응성패", roleSky)
    console.log("----지장간 구응성패", roleLand);
    console.log("----월지 구응성패", roleLand);
    console.log("----구응성패 종합메세지: ", roleMsg);


     /****************************************************debugging***************************************************************/
    //근왕 판단

    let self = (skyTag[myID-1].type === pObj[0].type)|| (skyTag[myID-1].type === pObj[1].type) || (skyTag[myID-1].type === pObj[3].type)
    console.log("근왕 판단", self);


    rp = RolePlay(myID, frameSet[2], typeRole, wtypeRole, untypeRole, stypeRole, skys, mens, self, isTalent);

    

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
    frontMsg += `${skyTag[nowGod-1].name}${skyTag[nowGod-1].type}`;
    if(godAwake == 2){
        frontMsg += ` 喜神 O `;
    }
    else if(godAwake == 1){
        frontMsg += ` 喜神 △ `;
    }
    else{
        frontMsg += ` 喜神 X `;
    }
    

    document.getElementById("debug2").innerHTML = "※ 타고난 재능 (오행) ※" +"<br/>"+ 
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
        
        document.getElementById("debug3").innerHTML += subMsg[i] + " 늘 발휘 합니다." + "<br/>";
    }

    if(potenMsg.length !== 0){
        document.getElementById("debug3").innerHTML +=  "때가 된다면, ";
    }

    for(var i=0; i<potenMsg.length; i++){
        
        document.getElementById("debug3").innerHTML += potenMsg[i] + "도 발휘 할 수 있습니다." + "<br/>";
    }

    
    // 삼합 방합 충 풀이
    if(triu.length !==0 && opps.length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 실력이 점진적으로 더 업데이트 되어 전문 기술력을 갖춥니다. " + "<br/>" 
    }
    else if(triu.length !==0 && opps.length ===0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "꾸준히 능력 개발해 중년 이후 실력을 갖춥니다. " + "<br/>";
    }

    if(sqrs.length !==0 && opps.length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 인맥 및 세력이 우호적으로 더 업데이트 되어 넓은 인맥과 세력으로 발전됩니다. " + "<br/>";
    }
    else if(sqrs.length !==0 && opps.length ===0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 우호세력이 있어서 중년 이후 지위를 갖춥니다. " + "<br/>";
    }
    
    if(triu.length ===0 && sqrs.length ===0 && opps.length !==0) {
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 능력과 주변 환경을 늘 새롭게 바꿔갑니다. " + "<br/>";
    }

    if(jups.length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "주변 사람과 모의해 사적 관계에서 공적 관계로 만들어가지만, 관계 스트레스에 유념해야 합니다. " + "<br/>";
    }

    document.getElementById("debug4").innerHTML = "※ 사회적 역할 (구응성패) ※"+"<br/>"+  
    "( " + frameSet[2] + roleMsg + uroleMsg  + " )" +"<br/>";



    
    // 구응성패 천간과 지지 위치별 특성
    if(ideaRole.find(e => e === frameSet[1]) !== undefined){
        if(follower === false && (roleSky[0] === 1 || roleStage[0] === 1)){
            htmlMsg += `(격투간 상신O) 자신의 사회적 자격 타이틀을 의식하는 직업적 사명감과 그에 맞는 실질적인 역할 수행도 잘 하려고 합니다.` + "<br/>";
        }
        else if(follower === true && (roleLand[0] === 1 || roleStage[0] === 1)){
            htmlMsg += `(격투간 상신O) 자신의 사회적 역할 타이틀을 의식하는 직업적 사명감과 그에 맞는 실질적인 역할 수행도 잘 하려고 합니다.` + "<br/>";
        }
        else{
            if(roleSky[0] === 0 && roleLand[0] === 0 && roleStage[0] === 0){

                if(godAwake === 2){
                    htmlMsg += `(격투간 상신X) ${ (follower === false) ? `사회적 자격 보다` : `사회적 역할 수행 보다` } 오로지 자신의 적성과 능력으로 직업으로 정하여 살아갑니다. 직업적 사명감 보다, 재능에 대한 사명감이 강합니다. ` + "<br/>";
                }
                else if(godAwake === 1){
                    htmlMsg += `(격투간 상신X) ${ (follower === false) ? `사회적 자격 보다` : `사회적 역할 수행 보다` } 점점 재능에 대한 사명감을 찾아가며 살아 갑니다. ` + "<br/>";
                }
                else if(godAwake === 0){
                    
                    htmlMsg += `(격투간 상신X) ${ (follower === false) ? `사회적 자격 보다` : `사회적 역할 수행 보다` } 오로지 자신이 하고 싶어 하는 것을 직업으로 삼아 더 존중받으려는 마음이 강합니다. ` + "<br/>";
                }
            }
            
        }

        
    }


    if((roleSky[0] === 1 && roleLand[0] === 1) || roleStage[0] === 1){
        htmlMsg += `(상신 건왕) ${(follower === false) ? `자격에 맞는 역할을` : `주어진 사회적 역할을`} 확실하게 잘하며 살아가는데 문제 없고 매우 바쁜 삶을 살아갑니다. ` + "<br/>";
    }
    else if(roleSky[0] === 1 && roleLand[0] === 0){
        htmlMsg += `(천간 상신) ${(follower === false) ? `사회적 자격을 의식적으로 염두해 능동적으로 살아갑니다. ` : `사회적 역할의 후광과 노력 대비 사명감에 살아갈 수 있습니다. `}` + "<br/>";
    }
    else if(roleSky[0] === 0 && roleLand[0] === 1){
        htmlMsg += `(지지 상신) ${(follower === false) ? `자신의 사회적 자격과 사명감을 실무를 통해 쌓아갑니다. ` : `자신에게 주어진 사회적 역할을 묵묵히 수행하며 살아갑니다. `}` + "<br/>";
    }
    
    if(isTalent !== undefined && (roleSky[0] === 1 ||  roleLand[0] === 1 || roleStage[0] === 1)){
        htmlMsg += `(희신O 상신O) 자신의 재능을 살린 일에 직업적 사명감으로 일치되어 살아갑니다.` + "<br/>";
    }
    else if(isTalent === undefined && (roleSky[0] === 1 ||  roleLand[0] === 1 || roleStage[0] === 1)){
        htmlMsg += `(희신X 상신O) 자신이 하고 싶은 일을 삼아 직업적 사명감을 갖습니다.` + "<br/>";
    }

    // 상신 vs. 상신기신
    //상신O 상신기신O
    if((roleSky[0] === 1 || roleLand[0] === 1 || roleStage[0] === 1) && (roleSky[2] === 1 || roleLand[2] === 1  || roleStage[2] === 1)){
        htmlMsg += `(상신O 상신기신O) ${(follower === false) ? `사회적 자격을 갖췄을 뿐만 아니라, 자격 능력 검증받아 지위를 갖추려고 합니다. ` : `사회적 역할 충실히 하면서, 역할에 대한 실력이 있어 유리한 환경 혜택으로 이득을 취하려고 합니다. `}` + "<br/>";
    }// 상신O 상신기신X
    else if((roleSky[0] === 1 || roleLand[0] === 1 || roleStage[0] === 1) && (roleSky[2] === 0 && roleLand[2] === 0 || roleStage[2] === 0)){
        htmlMsg += `(상신O 상신기신X) ${(follower === false) ? `자격 능력에 경쟁과 검증 지속적이지 않으므로, 보수적이고 안일함에 빠질 수 있습니다. ` : `역할 능력에 경쟁과 검증이 지속적이지 않으므로, 보수적이고 안일함에 빠질 수 있습니다. `}` + "<br/>";
    } //상신X 상신기신O
    else if((roleSky[0] === 0 && roleLand[0] === 0 && roleStage[0] === 0) && (roleSky[2] === 1 || roleLand[2] === 1 || roleStage[2] === 1)){
        htmlMsg += `(상신X 상신기신O) ${(follower === false) ? `사회적 자격 능력 대비 부족한 평가를 받아 지위를 갖추기 어렵습니다. ` : `사회적 역할 대비 검증이 많아 지속적인 경쟁력을 갖추기 어려워 합니다. `}` + "<br/>";
    }else if((roleSky[0] === 0 && roleLand[0] === 0 && roleStage[0] === 0) && (roleSky[2] === 0 && roleLand[2] === 0 || roleStage[2] === 0)){
        htmlMsg += `(상신X 상신기신X) ${(follower === false) ? `사회가 기대할 만한 자격이 주어지지 않았고 능력에 대한 경쟁력을 갖추지 않아도 됩니다. ` : `자신의 사회적 역할에 누가 기대하지 않았고 역할 능력에 경쟁력이 일정 부분 이상 의미 없습니다. `}` + "<br/>";
    }

    
    // 상신, 상신기신
    if((roleSky[0] === 1 || roleStage[0] === 1) && (roleSky[2] === 1 || roleStage[2] === 1)){
        htmlMsg += `(천간 상신 + 천간 상신기신) ${(follower === false) ? `사회적 자격에 경쟁력있는 능력을 갖추는데` : `실력있는 사회적 역할 수행에 환경적`} 혜택이 타고났지만 오만에 빠지지 않도록 주의해야 합니다. ` + "<br/>";
    }// 상신, 지장간 상신기신
    else if((roleSky[0] === 1 || roleStage[0] === 1) && roleLand[2] === 1){
        htmlMsg += `(천간 상신 + 지장간 상신기신) ${(follower === false) ? `자격에 맞는 역할 대비 검증된 능력이 부족하여` : `역할에 대한 의욕 대비 성과가 부족하여`} 하극상이나 아랫사람의 무시가 있을 수 있습니다. ` + "<br/>";
    } //상신 지장간, 상신기신
    else if((roleSky[2] === 1 || roleStage[2] === 1) && roleLand[0] === 1){
        htmlMsg += `(지장간 상신 + 천간 상신기신) ${(follower === false) ? `자격 능력에 대한 지속적인 검증으로 경쟁력을 갖추게 됩니다.` : `주어진 역할에 대한 실력을 쌓아 좋은 성과를 만들어 냅니다.`} ` + "<br/>";
    } //지장간 상신O 지장간 상신기신O
    else if(roleLand[0] === 1 && roleLand[2] === 1){
        htmlMsg += `(지장간 상신 + 지장간 상신기신) ${(follower === false) ? `사회적 자격 능력에 검증하는 환경에 스스로 놓이게 해야` : `사회적 역할에 대한 실무능력이 우수해`} 자신의 몸 값이 높아집니다. ` + "<br/>";
    }


    
    if(roleSky[3] === 1 && roleLand[3] === 1 || roleStage[3] === 1){
        htmlMsg += `(구신 통근) ${(follower === false) ? `자격 능력으로 부터 얻은 지위에` : `주어진 역할 수행에`} 쉽게 지쳐 사람과 경쟁을 기피할 수 있습니다. ` + "<br/>";
    }
    else if(roleSky[3] === 1 && roleLand[3] === 0){
        htmlMsg += `(천간 구신) ${(follower === false) ? `자격 능력으로 부터 얻은 지위에` : `자신의 역할 수행과 성과에`}  스스로 고평가해서 다른 사람과 자신을 비교하려고 합니다. ` + "<br/>";
    }
    
    // 상신 vs. 구신
    //상신O 구신O
    if((roleSky[0] === 1 || roleLand[0] === 1  || roleStage[0] === 1) && (roleSky[3] === 1 || roleLand[3] === 1 || roleStage[3] === 1)){
        htmlMsg += `(상신O 구신O) ${(follower === false) ? `능동적으로 자신의 사회적 자격과 세력를 얻고자 합니다. ` : `능동적으로 자신의 주어진 역할 수행과 그에 맞는 성과를 냅니다. `}` + "<br/>";
    }// 상신O 구신X
    else if((roleSky[0] === 1 || roleLand[0] === 1  || roleStage[0] === 1) && (roleSky[3] === 0 && roleLand[3] === 0 && roleStage[3] === 0)){
        htmlMsg += `(상신O 구신X) ${(follower === false) ? `자신의 사회적 자격 능력으로 세력을 얻는데 부족합니다. ` : `자신의 역할 수행 노력에 대한 댓가와 성과는 부족합니다. `}` + "<br/>";
    } //상신X 구신X
    else if(roleSky[0] === 0 && roleLand[0] === 0 && roleStage[0] === 0 && roleSky[3] === 0 && roleLand[3] === 0 && roleStage[3] === 0){
        if(isTalent === undefined){
            htmlMsg += `(상신X 구신X) 누구도 자신의 ${(follower === false) ? `사회적 자격과 그에 맞는 세력을 ` : `주어진 역할과 그에 따른 성과를 `} 기대하는 사람 없습니다. 하고 싶은 일을 하며 살아 갑니다. 이번 생은 휴가 오셨습니다. ` + "<br/>";
        }
        else{
            htmlMsg += `(상신X 구신X) 누구도 자신의 ${(follower === false) ? `사회적 자격과 그에 맞는 세력을 ` : `주어진 역할과 그에 따른 성과를 `} 기대하는 사람 없습니다. 자신의 재능과 적성을 삼아 능력 위주로 살아 갑니다. 이번 생은 휴가 오셨습니다. ` + "<br/>";
        }
        
    } 
    

    // 구신 vs. 격기신, 구신기신
    //구신O 구신기신O
    if((roleSky[3] === 1 || roleLand[3] === 1 || roleStage[3] === 1) && (roleSky[1] === 1 || roleLand[1] === 1 || roleStage[1] === 1)){
        htmlMsg += `(구신O ${(follower === false) ? `구신기신O) 사회적 지위 능력으로 경쟁자를 누르는 정복자 및 최종 승리자입니다. ` : `격기신O) 객관적 검증을 잘 받아서 자신의 역할 수행에 따른 성과를 유지합니다. `}` + "<br/>";
    }// 구신O 구신기신X
    else if((roleSky[3] === 1 || roleLand[3] === 1) && (roleSky[1] === 0 && roleLand[1] === 0 && roleStage[1] === 1)){
        htmlMsg += `(구신O ${(follower === false) ? `구신기신X) 사회적 지위로 세력을 모으는데 방어적이고 소극적으로 움직입니다. ` : `격기신X) 역할수행에 대한 성과를 검증받는데 방어적이고 소극적으로 움직입니다. `}`  + "<br/>";
    } //구신X 구신기신O 
    else if((roleSky[3] === 0 && roleLand[3] === 0 && roleStage[3] === 0) && (roleSky[1] === 1 || roleLand[1] === 1 || roleStage[1] === 1)){
        htmlMsg += `(구신X ${(follower === false) ? `구신기신O) 지위 능력을 갖추기 보다 섣불리 경쟁자를 점유하려는 마음이 더 큽니다. ` : `격기신O) 역할수행에 대한 성과에 대해 주변에서 시기 질투가 나타납니다. `}` + "<br/>";
    }else if((roleSky[3] === 0 && roleLand[3] === 0 && roleStage[3] === 0) && (roleSky[1] === 0 && roleLand[1] === 0 && roleStage[1] === 0)){
        htmlMsg += `(구신X ${(follower === false) ? `구신기신X) 세력과 지위를 갖출 일이 없고, 경쟁자를 점유하고 정복할 일이 없습니다. ` : `격기신X) 자신의 성과에 기대하는 사람 별로 없고, 지속적인 성과 검증을 해야 하는 일은 아닙니다. `}` + "<br/>";
    }
    
    

    // 구신, 구신기신
    if((roleSky[3] === 1 && roleSky[1] === 1) || (roleStage[3] === 1 && roleStage[1] === 1)){
        htmlMsg += `(천간 구신 + 천간 ${(follower === false) ? `격기신) 폼생폼사형으로, 지위 능력으로 얻은 점유율에 과시하는 면이 있습니다. ` : `격기신) 폼생폼사형으로, 자신의 성과를 과시하는 면이 있습니다. `}` + "<br/>";
    }// 구신, 지장간 구신기신
    else if((roleSky[3] === 1 || roleStage[3] === 1) && roleLand[1] === 1){
        htmlMsg += `(천간 구신 + 지장간 ${(follower === false) ? `구신기신) 지위 능력을 발휘해 더 큰 점유을 높여 경쟁자를 압도할 수 있습니다. `: `격기신) 자신의 성과를 인정 받아 더 큰 지위로 나아갈 수 있습니다. `}` + "<br/>";
    } //구신 지장간, 구신기신
    else if((roleSky[1] === 1 || roleStage[1] === 1) && roleLand[3] === 1){
        htmlMsg += `(지장간 구신 + 천간 ${(follower === false) ? `구신기신) 일하면서 생기는 지위 능력 문제와 잘못이 자꾸 드러납니다. ` : `격기신) 일하면서 생기는 성과 문제와 잘못이 자꾸 드러납니다. `}` + "<br/>";
    } //지장간 구신O 지장간 구신기신O
    else if(roleLand[3] === 1 && roleLand[1] === 1){
        htmlMsg += `(지장간 구신 + 지장간 ${(follower === false) ? `구신기신) 검증과 시련을 통해 자신의 사회적 가치를 증명합니다. ` : `격기신) 검증과 시련을 통해 자신의 사회적 가치를 증명합니다. `}` + "<br/>";
    }
    



    document.getElementById("debug5").innerHTML =  htmlMsg;


    document.getElementById('useGod').innerText = orderID;
    document.getElementById('useGod').style.color = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('god_state').innerText = godAwake;
    document.getElementById('god_state').style.color = `rgba(${0}, ${0}, ${0}, ${0})`;

    // 용신과, 희신 상태 (2:있음, 1:상태, 0: 없음)
    // console.log("orderID", orderID, "godAwake", godAwake);


    document.getElementById("debug6").innerHTML = "※ 사회 관계력 (생화극제) ※"+"<br/>"+ 
    " (" + frameMsg + frameSet[2]+" " + ((self===false) ? "근약 " : "근왕 ") + `${skyTag[myID-1].name}${skyTag[myID-1].type} 일간` + ")" + "<br/>";
    document.getElementById("debug7").innerHTML = rp;


    let roleAwake = ((roleSky[0]===1 || roleLand[0] ===1 || roleStage[0] ===1) ? "1":"0");
    roleAwake += ((roleSky[1]===1 || roleLand[1] ===1 || roleStage[1] ===1) ? "1":"0");
    roleAwake += ((roleSky[2]===1 || roleLand[2] ===1 || roleStage[2] ===1) ? "1":"0");
    roleAwake += ((roleSky[3]===1 || roleLand[3] ===1 || roleStage[3] ===1) ? "1":"0");
    
    document.getElementById('god_state').innerText += roleAwake;


    TextRole();
    TextUse();
    TextYears();
    console.log("=======================================Divination======================================="); 
}

function out(id_tag){
    var print = document.getElementById(id_tag).children[0];
    var srcName = print.getAttribute('src');
    let imgFileName = srcName.split('.')[0].split('/')[2]; // ex) img/modern/p01.png에서 imgFileName == p01
    let stem_branch = imgFileName.split('')[0]; // i == 천간, p == 지지
    var result =[stem_branch, imgFileName.substring(1,3)]       
    return result;                                               
}


function ShowLucks(){
    
    const lucksTitle = document.getElementById("Lucks_main");
    const lucks = document.getElementById("year_lucks");

    if(lucksTitle.innerHTML === '' && lucks.innerHTML === ''){
       
    }
    else{
        
        lucksTitle.innerHTML = '';
        lucks.innerHTML = '';
    }
}


function ClickRole(num){
    document.getElementById('GLucks').innerHTML = ""
    var test = document.getElementById("debug4")
    var text = test.textContent.split("※ 사회적 역할 (구응성패) ※")[1].split(' ');
    var name = text[1];
    var myIds = document.getElementById("SKY1").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;

    var code = document.getElementById('god_state').innerText.split('');
    code.shift()

    let roleAwake = [];
    roleAwake.push((code[3] ==="1") ? 1:0) //격 (구신유무)
    roleAwake.push((code[0] ==="1") ? 1:0) //상신 (상신유무)
    roleAwake.push((code[3] ==="1") ? 1:0) //구신기신 (구신유무)
    roleAwake.push((code[0] ==="1") ? 1:0) //상신기신 (상신유무)
    roleAwake.push((code[3] ==="1") ? 1:0) //구신 (구신유무)

    var frm = frame.find(e => e.fr === name)
    var info = [frm.fr, frm.A, frm.B, frm.C, frm.D]
    let fTypes = [frame.find(e => e.fr === info[0]).type, frame.find(e => e.tag === info[1]).type, frame.find(e => e.tag === info[2]).type, frame.find(e => e.tag === info[3]).type, frame.find(e => e.tag === info[4]).type];

    var ids = String(num).padStart(3, '0') + "i";
    var idl = String(num).padStart(3, '0') + "p";

    var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;
    var landNum= document.getElementById(idl).src.split('img')[1].split("/")[2].split(".")[0].split('p')[1]*1;
    var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
    var srtype = frame.find(e => e.tag === skyR).type

    var ikey = fTypes.indexOf(fTypes.find(e=> e === srtype));
    var title = skyTag[skyNum-1].name + landTag[landNum-1].name;
    var result = `${title} (${luck2[ikey].name}) ${luck2[ikey].key[roleAwake[ikey]]}`
    document.getElementById('GLucks').innerHTML = result;
}

function TextRole(){
    
    var test = document.getElementById("debug4")
    var text = test.textContent.split("※ 사회적 역할 (구응성패) ※")[1].split(' ');
    var name = text[1];
    var myIds = document.getElementById("SKY1").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;

    let mon_img = document.getElementById("SKY2").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    let first_img = document.getElementById("001i").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    let goLuck = false;

    if((mon_img > first_img) || (mon_img === 1 && first_img === 10)){
        goLuck = false;
    }else{
        goLuck = true;
    }

    var code = document.getElementById('god_state').innerText.split('');
    code.shift()

    let roleAwake = [];
    roleAwake.push((code[3] ==="1") ? 1:0) //격 (구신유무)
    roleAwake.push((code[0] ==="1") ? 1:0) //상신 (상신유무)
    roleAwake.push((code[3] ==="1") ? 1:0) //구신기신 (구신유무)
    roleAwake.push((code[0] ==="1") ? 1:0) //상신기신 (상신유무)
    roleAwake.push((code[3] ==="1") ? 1:0) //구신 (구신유무)

    var frm = frame.find(e => e.fr === name)
    var info = [frm.fr, frm.A, frm.B, frm.C, frm.D]
    let fTypes = [frame.find(e => e.fr === info[0]).type, frame.find(e => e.tag === info[1]).type, frame.find(e => e.tag === info[2]).type, frame.find(e => e.tag === info[3]).type, frame.find(e => e.tag === info[4]).type];
    
    var result = [];
    if(goLuck === true){
        for(var num = 1; num<=12; num++){

            var i = num;
            if(i>10) i-10;
            var ids = String(i).padStart(3, '0') + "i";
            var idl = String(i).padStart(3, '0') + "p";

            var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;
            var landNum= document.getElementById(idl).src.split('img')[1].split("/")[2].split(".")[0].split('p')[1]*1;

            var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
            var srtype = frame.find(e => e.tag === skyR).type
        
            var ikey = fTypes.indexOf(fTypes.find(e=> e === srtype));
            var title = skyTag[skyNum-1].name + landTag[landNum-1].name;
            var key = `${title} (${luck2[ikey].name}): ${luck2[ikey].key[roleAwake[ikey]]}`

            result.push(key);
            
        }
        
    }
    else{
        for(var num = 1; num<=12; num++){

            var i = num;
            if(i<=0) i+10;
            var ids = String(i).padStart(3, '0') + "i";
            var idl = String(i).padStart(3, '0') + "p";

            var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;
            var landNum= document.getElementById(idl).src.split('img')[1].split("/")[2].split(".")[0].split('p')[1]*1;

            var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
            var srtype = frame.find(e => e.tag === skyR).type
        
            var ikey = fTypes.indexOf(fTypes.find(e=> e === srtype));
            var title = skyTag[skyNum-1].name + landTag[landNum-1].name;
            var key = `${title} (${luck2[ikey].name}): ${luck2[ikey].key[roleAwake[ikey]]}`

            result.push(key);
        }
    }


    return result;
}

function ClickUse(num){
    document.getElementById("Lucks_main").innerText = "";
    
    let _useGod = document.getElementById('useGod').innerText*1;
    let _state = document.getElementById('god_state').innerText.split('');
    _state = _state.shift()*1;

    //용신과 희신 상태 (2, 1, 0)
    // console.log("_useGod, _state ",_useGod, _state)
    var start = "j"+String(num).padStart(2, '0');
    var year= document.getElementById(start).innerText*1;

    let call = luck1.find(e => e.name === skyTag[_useGod-1].name);
    let godSet = Object.keys(call).filter(e => e !== 'name');
    
    var ids = String(num).padStart(3, '0') + "ji";
    var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;
    var t = godSet.indexOf(godSet.find(e => skyTag[(e*1)-1].type === skyTag[skyNum-1].type))
    
    let gap = 0;
    if(_useGod === 10 || _useGod === 1) gap = 4;
    if(_useGod === 2 || _useGod === 3) gap = 2;
    if(_useGod === 4 || _useGod === 7) gap = 2;
    if(_useGod === 8 || _useGod === 9) gap = 2;

    let divin = [];
    if(_useGod === 10) divin = [["생화", "생화"], ["기제", "미제"], ["돈후", "윤택"], ["수원", "수원"], ["생화", "생화"]];
    if(_useGod === 1) divin = [["생화", "생화"], ["발생", "인화"], ["소토", "소토"], ["간벌", "벽조"], ["전수", "생화"]];
    if(_useGod === 2) divin = [["발생", "발생"], ["발생", "인정"], ["소토", "소토"], ["전정", "절지"], ["전수", "생화"]];
    if(_useGod === 3) divin = [["발생", "발생"], ["발생", "발생"], ["간새", "차양"], ["단련", "단련"], ["미제", "기제"]];
    if(_useGod === 4) divin = [["인화", "인정"], ["제련", "제련"], ["매광", "홍로"], ["제련", "제련"], ["기제", "미제"]];
    if(_useGod === 7) divin = [["벽갑", "전정"], ["단련", "제련"], ["심원", "심원"], ["제련", "제련"], ["도세", "수원"]];
    if(_useGod === 8) divin = [["벽조", "절지"], ["단련", "제련"], ["매금", "유원"], ["도세", "도세"], ["도세", "수원"]];
    if(_useGod === 9) divin = [["전수", "전수"], ["미제", "기제"], ["제방", "탁수"], ["도세", "도세"], ["도세", "도세"]];

    let text = call[godSet[t]][_state];
    let str = [...text];

    if(text.indexOf("(확장운)") >= 0){
        var lastYear = (year%2===0) ? year-gap : year-gap-1;
        str.splice(text.indexOf("(확장운)"), 5, `${lastYear}년 ~ ${lastYear+1}년`);
        
    }
    let s = year+57
    let iY = (s%10 === 0) ? 10 : s%10;
    let pY = (s%12 === 0) ? 12 : s%12;
    var result = `${year}년 ${skyTag[iY-1].name}${landTag[pY-1].name} (${divin[t][year%2]}): ${str.join('')}`;
    document.getElementById('Lucks_main').innerHTML = result;
}

function TextUse(){
    let _useGod = document.getElementById('useGod').innerText*1;
    let _state = document.getElementById('god_state').innerText.split('');
    _state = _state.shift()*1;
    let firstYear = document.getElementById('j01').innerText*1;
    //용신과 희신 상태 (2, 1, 0)
    // console.log("_useGod, _state ",_useGod, _state)

    // 1,2  3,4  5,6  7,8  9,10
    let skyNum = (firstYear+57)%10;
    if(skyNum === 0) skyNum = 10;
    

    let callSet = luck1.find(e => e.name === skyTag[_useGod-1].name);
    var skyE = skyTag[skyNum-1].type;

    // 천간 숫자(skyNum)만 알면, 월령용신의 용희신 운세 객체 (callSet)중, 어떤 운세 객체들인지 갖고 올수 있는 변수.
    var inx = Object.keys(callSet).find(e=> skyTag[e-1].type === skyE);
    // 천간 숫자 skyNum 경우, 월령용신의 용희신 운세
    var keySet = callSet[inx][_state];

    // 확장운, 지속운, 용신운, 희신운, 중화운 오행 순서로 됨(목:0~수:4)
    //Object.keys(callSet).indexOf(inx)


    // 이 리스트를 가지고 전체 10년동안 각각 운세객체에 어떤 천간으로 넣어야 할지 만들어줌
    var listKeys = [];
    for(var i=0; i<10; i++){
        let add = (skyNum+i>10) ? skyNum+i-10 : skyNum+i;
        var p = skyTag[add-1].type;
        // x는 최종적으로 각 년간이 운세객체에 적용될 다른 천간으로 대체됨.
        let x = Object.keys(callSet).find(e=> skyTag[e-1].type === p)
        // 10년 짜리 운세 객체에 적용할 천간 숫자 리스트 
        

        listKeys.push(x)
    }

    var result = []
    // 본격적인 운세 문구들 모음
    for(var i=0; i<10; i++){

        let inx = listKeys[i]
        let newYear = firstYear+i;
        let keyStr = callSet[inx][_state];
        let str = [...keyStr];

        let gap = 0;
        if(_useGod === 10 || _useGod === 1) gap = 4;
        if(_useGod === 2 || _useGod === 3) gap = 2;
        if(_useGod === 4 || _useGod === 7) gap = 2;
        if(_useGod === 8 || _useGod === 9) gap = 2;

        if(keyStr.indexOf("(확장운)") >= 0){
            var lastYear = (newYear%2===0) ? newYear-gap : newYear-gap-1;
            str.splice(keyStr.indexOf("(확장운)"), 5, `${lastYear}년 ~ ${lastYear+1}년`)
        }

        let divN = Object.keys(callSet).indexOf(inx);
        let divin = [];
        if(_useGod === 10) divin = [["생화", "생화"], ["기제", "미제"], ["돈후", "윤택"], ["수원", "수원"], ["생화", "생화"]];
        if(_useGod === 1) divin = [["생화", "생화"], ["발생", "인화"], ["소토", "소토"], ["간벌", "벽조"], ["전수", "생화"]];
        if(_useGod === 2) divin = [["발생", "발생"], ["발생", "인정"], ["소토", "소토"], ["전정", "절지"], ["전수", "생화"]];
        if(_useGod === 3) divin = [["발생", "발생"], ["발생", "발생"], ["간새", "차양"], ["단련", "단련"], ["미제", "기제"]];
        if(_useGod === 4) divin = [["인화", "인정"], ["제련", "제련"], ["매광", "홍로"], ["제련", "제련"], ["기제", "미제"]];
        if(_useGod === 7) divin = [["벽갑", "전정"], ["단련", "제련"], ["심원", "심원"], ["제련", "제련"], ["도세", "수원"]];
        if(_useGod === 8) divin = [["벽조", "절지"], ["단련", "제련"], ["매금", "유원"], ["도세", "도세"], ["도세", "수원"]];
        if(_useGod === 9) divin = [["전수", "전수"], ["미제", "기제"], ["제방", "탁수"], ["도세", "도세"], ["도세", "도세"]];

        let s = newYear+57
        let iY = (s%10 === 0) ? 10 : s%10;
        let pY = (s%12 === 0) ? 12 : s%12;
        result.push(`${newYear}년 ${skyTag[iY-1].name}${landTag[pY-1].name} (${divin[divN][newYear%2]}): ${str.join('')}`);
    }

    return result;
}

function ClickYears(num){
    document.getElementById("year_lucks").innerText = "";
    var test = document.getElementById("debug4")
    var text = test.textContent.split("※ 사회적 역할 (구응성패) ※")[1].split(' ');
    var myIds = document.getElementById("SKY1").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    //=================================================================================================================

    var sky0 = document.getElementById("SKY0").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var sky2 = document.getElementById("SKY2").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var sky3 = document.getElementById("SKY3").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var land0 = document.getElementById("LAND0").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;
    var land1 = document.getElementById("LAND1").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;
    var land3 = document.getElementById("LAND3").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;

    var up = [sky0, sky2, sky3]
    var dn = [land0, land1, land3]
    var base1 = (up.filter(e=> skyTag[e-1].type === skyTag[myIds-1].type) > 0 ) ? true : false;
    var base2 = (dn.filter(e=> landTag[e-1].type === skyTag[myIds-1].type) > 0 ) ? true : false;
    //양인 건록격 용 비겁향 근왕 체크
    // console.log("비겁향 ", up, "근왕", dn)
    // console.log("비겁향 ", base1, "근왕", base2)
    //=================================================================================================================
    var ids = String(num).padStart(3, '0') + "ji";
    var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;

    var firstYear = document.getElementById("j01").innerText*1;
    var clickID = "j"+ String(num).padStart(2, '0');
    var nowYear = document.getElementById(clickID).innerText*1;

    var code = document.getElementById('god_state').innerText.split('');
    code.shift()
    code = code.map(Number);

    // 구응성패 코드: 상신, 구신기신, 상신기신, 구신
    // console.log(code)

    text.shift()
    text.pop()
    var name = text.splice(0,1).toString()
    // 일간 숫자, 격이름, 선택한 칸의 천간 숫자
    //console.log(myIds, name, skyNum)
    
    // skyR = 육신 srtype 육친성
    var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
    var srtype = frame.find(e => e.tag === skyR).type

    // callSet 격별 운세 객체(꾸러미)
    var callSet = frame.find(e=> e.fr === name).lucks;
    // 클릭한(srtype) 부분에 따른 운세 객체(꾸러미)
    var keySet = callSet.find(e=> e.tag === srtype)
    // 클릭한(srtype) 운세 객체 중 말구(key) 가져오기
    var key = keySet.key

    // 클릭한(srtype) 육신이 운세 객체 순서에 몇번째 해당하는지 숫자
    var inx = callSet.indexOf(keySet);
    
    //대운 첫년도 inx
    let firstNum = (firstYear+57)%10;
    if(firstNum === 0) firstNum = 10;


    let keyStr = "";
    let divin = "";
    if(name === "羊刃格" || name === "建祿格"){
        divin = srtype;
        if(inx === 0 || inx === 2){
            keyStr = (base1 === true) ?  key[1] : key[0]
        }
        else if(inx === 1){
            keyStr = (base2 === true) ? key[1] : key[0]
        }
        else{
            keyStr=key[0]
        }
    }
    else if(name === "傷官格"){
        divin = srtype;
        if(inx<3){
            keyStr=key[code[0]]
        }
        else{
            keyStr=key[0]
        }
    }
    else if(name === "偏官格"){
        divin = srtype;
        if(inx>=2){
            keyStr=key[code[0]]
        }
        else{
            keyStr=key[0]
        }
    }
    else{
        let divMsg = ["泄化制化", "生化", "格", "泄化", "生化制化"];
        divin = divMsg[inx]
        if(inx===1 || inx ===2 || inx === 4){
            keyStr=key[code[0]];
        }
        else{
            keyStr=key[code[3]];
        }
       
    }

    let str = [...keyStr];
        
    if(keyStr.indexOf("(0)") >= 0){
        let iy = nowYear -(nowYear%2) - 2
        
        str.splice(keyStr.indexOf("(0)"), 3, `${iy}년 ~ ${iy+1}년`)
    }
    else if(keyStr.indexOf("(1)") >= 0){
        let iy = nowYear -(nowYear%2) - 6
        
        str.splice(keyStr.indexOf("(1)"), 3, `${iy}년 ~ ${iy+3}년`)
    }
    else if(keyStr.indexOf("(3)") >= 0){
        let iy = nowYear -(nowYear%2) - 4
        
        str.splice(keyStr.indexOf("(3)"), 3, `${iy}년 ~ ${iy+1}년`)
    }
    else if(keyStr.indexOf("(5)") >= 0){
        let iy = nowYear -(nowYear%2) + 4
        
        str.splice(keyStr.indexOf("(5)"), 3, `${iy}년 ~ ${iy+1}년`)
    }

    var result = `(${divin}運): ${str.join('')}`;

    document.getElementById("year_lucks").innerHTML = result;
}


function TextYears(){
    var test = document.getElementById("debug4")
    var text = test.textContent.split("※ 사회적 역할 (구응성패) ※")[1].split(' ');
    text.shift()
    text.pop()
    
    // myIds 일간 숫자
    var myIds = document.getElementById("SKY1").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;

    // firstYear 현재 대운 첫 년도
    let firstYear = document.getElementById('j01').innerText*1;

    // code 구응성패 코드
    var code = document.getElementById('god_state').innerText.split('');
    code.shift()
    code = code.map(Number);

    // name 격이름
    var name = text.splice(0,1).toString()
    //=================================================================================================================
    //양인 건록격 용 비겁향 근왕 체크
    var sky0 = document.getElementById("SKY0").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var sky2 = document.getElementById("SKY2").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var sky3 = document.getElementById("SKY3").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var land0 = document.getElementById("LAND0").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;
    var land1 = document.getElementById("LAND1").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;
    var land3 = document.getElementById("LAND3").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;

    var up = [sky0, sky2, sky3]
    var dn = [land0, land1, land3]
    var base1 = (up.filter(e=> skyTag[e-1].type === skyTag[myIds-1].type) > 0 ) ? true : false;
    var base2 = (dn.filter(e=> landTag[e-1].type === skyTag[myIds-1].type) > 0 ) ? true : false;
    
    // console.log("비겁향 ", up, "근왕", dn)
    // console.log("비겁향 ", base1, "근왕", base2)
    //=================================================================================================================

    // callSet 격별 운세 객체(꾸러미)
    var callSet = frame.find(e=> e.fr === name).lucks;

    // 1,2  3,4  5,6  7,8  9,10
    // skyNum 현재 대운 첫년도의 천간 숫자
    let skyNum = (firstYear+57)%10;
    if(skyNum === 0) skyNum = 10;
    
    // skyR = 육신 (ex 正財) srtype 육친성 (ex 財星)
    var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
    var srtype = frame.find(e => e.tag === skyR).type

    // 대운첫년도 천간 육신(srtype) 부분에 따른 운세 객체(꾸러미)
    var keySet = callSet.find(e=> e.tag === srtype)
    // 대운첫년도 천간 육신(srtype) 운세 객체 중 말구(key) 가져오기
    var key = keySet.key

    // 대운첫년도 천간 육신(srtype) 육신이 운세 객체 순서에 몇번째 해당하는지 숫자
    var inx = callSet.indexOf(keySet);

    var listKeys = [];
    for(var i=0; i<5; i++){
        let add = (i+inx>4) ? i-5 : i;
        if(skyNum%2===0 && i===0){
            listKeys.push(add+inx)
        }
        else if(skyNum%2===0 && i===4){
            listKeys.push(add+inx)
            listKeys.push(add+inx)
            listKeys.push(inx)
        }
        else{
            listKeys.push(add+inx)
            listKeys.push(add+inx)
        }
    }

    
    var result = [];

    var keyStr = "";
    
    for(var i=0; i<10; i++){
       var callkey = callSet[listKeys[i]].key;

       var divin = "";
        if(name === "羊刃格" || name === "建祿格"){
            divin = callSet[listKeys[i]].tag;
            if(listKeys[i] === 0 || listKeys[i] === 2){
                keyStr = (base1 === true) ?  callkey[1] : callkey[0]
            }
            else if(listKeys[i] === 1){
                keyStr = (base2 === true) ? callkey[1] : callkey[0]
            }
            else{
                keyStr=callkey[0]
            }
        }
        else if(name === "傷官格"){
            divin = callSet[listKeys[i]].tag;
            if(listKeys[i]<3){
                keyStr=callkey[code[0]]
            }
            else{
                keyStr=callkey[0]
            }
        }
        else if(name === "偏官格"){
            divin = callSet[listKeys[i]].tag;
            if(listKeys[i]>=2){
                keyStr=callkey[code[0]]
            }
            else{
                keyStr=callkey[0]
            }
        }
        else{
            let divMsg = ["泄化制化", "生化", "格", "泄化", "生化制化"];
            divin = divMsg[listKeys[i]];
            if(listKeys[i]===1 || listKeys[i] ===2 || listKeys[i] === 4){
                keyStr=callkey[code[0]]
            }
            else{
                keyStr=callkey[code[3]]
            }
        
        }

        let str = [...keyStr];
        let nowYear = firstYear+i;
        if(keyStr.indexOf("(0)") >= 0){
            let iy = nowYear -(nowYear%2) - 2
            str.splice(keyStr.indexOf("(0)"), 3, `${iy}년 ~ ${iy+1}년`)
        }
        else if(keyStr.indexOf("(1)") >= 0){
            let iy = nowYear -(nowYear%2) - 6
            str.splice(keyStr.indexOf("(1)"), 3, `${iy}년 ~ ${iy+3}년`)
        }
        else if(keyStr.indexOf("(3)") >= 0){
            let iy = nowYear -(nowYear%2) - 4
            str.splice(keyStr.indexOf("(3)"), 3, `${iy}년 ~ ${iy+1}년`)
        }
        else if(keyStr.indexOf("(5)") >= 0){
            let iy = nowYear -(nowYear%2) + 4
            str.splice(keyStr.indexOf("(5)"), 3, `${iy}년 ~ ${iy+1}년`)
        }

        let s = nowYear+57
        let iY = (s%10 === 0) ? 10 : s%10;
        let pY = (s%12 === 0) ? 12 : s%12;
        //result.push(`${(nowYear)}년 ${skyTag[iY-1].name}${landTag[pY-1].name} (${divin}運): ${str.join('')}`);
        result.push(`(${divin}運): ${str.join('')}`);

    }
    
    return result;
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


function RolePlay(_myID, _frameSet2, _typeRole, _wtypeRole, _untypeRole, _stypeRole, _skys, _mens, _self, _isTalent){
    // myID, frameSet[2], typeRole, wtypeRole, untypeRole, skys, mens, self
    let role_playMsg = "";
    let a = roles[_myID-1].mr.find(e => (e.tag === "食神")).id +1
    let b = roles[_myID-1].mr.find(e => (e.tag === "傷官")).id +1
    let c = roles[_myID-1].mr.find(e => (e.tag === "偏財")).id +1
    let d = roles[_myID-1].mr.find(e => (e.tag === "正財")).id +1
    let man1 = roles[_myID-1].mr.find(e => (e.tag === "偏官")).id +1
    let man2 = roles[_myID-1].mr.find(e => (e.tag === "正官")).id +1
    let woman1 = roles[_myID-1].mr.find(e => (e.tag === "偏印")).id +1
    let woman2 = roles[_myID-1].mr.find(e => (e.tag === "正印")).id +1
    let one = roles[_myID-1].mr.find(e => (e.tag === "比肩")).id +1
    let two = roles[_myID-1].mr.find(e => (e.tag === "劫財")).id +1


    if(_frameSet2 === "偏官格"){
        let role = true;
        let another = false;
        if(_self === true){
            if(_typeRole.find(e => e === 'A') || _stypeRole.find(e => e === 'A')){
                role_playMsg += "(根旺 偏官格 食神制殺) 모두가 인정하는 자격증/학위/공식적 경력이 필수 입니다. 실적으로 남들이 못하는 특별한 일을 수행합니다."+"</br>"
                if(_typeRole.find(e => e === 'B') || _stypeRole.find(e => e === 'B')){
                    role_playMsg += "(根旺 偏官格 財生殺) 조직에서 리더로 성장합니다. 아마추어를 이끄는 리더로 활동합니다."+"</br>";
                }
                 
                if(_typeRole.find(e => e === 'D') || _stypeRole.find(e => e === 'D')){
                    role_playMsg += "(根旺 偏官格 比食) 비상한 두뇌와 독창적인 전략으로 자신이 속한 조직을 더 큰 세상으로 진출합니다."+"</br>";
                }
            }
            else{
                role_playMsg += "(根旺 偏官格 無食) 파벌로부터 인허가 받지 못해 월권으로 기득권 마찰이 생깁니다."+"</br>";
            }
            
        }
        else{
            if(_typeRole.find(e => e === 'C') || _stypeRole.find(e => e === 'C')){
                another = true;
                role_playMsg += "(根弱 偏官格 殺印相生) 조직을 리드하기 보다 뒤에서 보좌하며 기발한 아이디어로 자신의 업적을 만듦니다."+"</br>"; 

            }
            else if(_typeRole.find(e => e === 'A') || _stypeRole.find(e => e === 'A')){
                role_playMsg += "(根弱 偏官格 食神) 불안 대비책으로 많은 시간 낭비해 스스로 극복이 아니라 조직의 보호를 받아야 합니다."+"</br>";
            }
        }

        if(role === true){
            if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) && _skys.find(e => skyTag[e-1].id !== skyTag[man1-1].id) && another === false){
                role_playMsg += "(偏官格 財官俱沒) 한순간으로 직장을 잃거나 가정 식구가 흩어지며, 경력 단절 등 사회로부터 자신의 신분이 잊혀지게 됩니다."+"</br>";
            }
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(偏官格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성과 거리가 멀 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(偏官格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }


    }
    else if(_frameSet2 === "傷官格"){
        let role = false;
        if(_self !== true){
            if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                role = true;
                if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) !== undefined || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type) !== undefined){
                    if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman1-1].id)){
                        role_playMsg += (_typeRole.find(e => e === 'B') !== undefined || _stypeRole.find(e => e === 'B') !== undefined || _wtypeRole.find(e => e === 'B') !== undefined) ? `(根弱 傷官格 傷官合去) 조직에서 ` : `(根弱 傷官格 傷官合殺) 조직에서 `;
                        role_playMsg += (_wtypeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined) ? `실무적으로 인정받은 자신의 특기가 스카우트 되어 `: `자신의 특기가 스카우트 되어 `;
                        role_playMsg += (_typeRole.find(e => e === 'B') !== undefined || _stypeRole.find(e => e === 'B') !== undefined || _wtypeRole.find(e => e === 'B') !== undefined) ? `새로운 프로그램 및 법을 혁신하며 안정적인 생활을 유지하기 위해 살아갑니다.` : `납품, 대행, 공임, 생산권하라고 계약 성사되어 임무 수행합니다.`;
                    }
                    else if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman2-1].id)){
                        role_playMsg += (_typeRole.find(e => e === 'B') !== undefined || _stypeRole.find(e => e === 'B') !== undefined || _wtypeRole.find(e => e === 'B') !== undefined) ? `(根弱 傷官格 傷官佩印) 조직에 맞추고 주변인에게 맞추는 헌신적인 인물로 ` : `(根弱 傷官格 傷官合殺) 조직에 맞추고 주변인에게 맞추는 헌신적인 인물로 `;
                        role_playMsg += (_wtypeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined) ? `사회적 자격조건 실무적으로 허가 받아 `: `사회적 자격조건으로 허가 받아 `;
                        role_playMsg += (_typeRole.find(e => e === 'B') !== undefined || _stypeRole.find(e => e === 'B') !== undefined || _wtypeRole.find(e => e === 'B') !== undefined) ? `새로운 프로그램 및 법을 혁신하며 안정적인 생활을 유지하기 위해 살아갑니다.` : `납품, 대행, 공임, 생산권하라고 계약 성사되어 임무 수행합니다.`;
                    }
                    role_playMsg += "</br>";
                }
                else if(_mens.find(e => skyTag[e-1].type === skyTag[man1-2].type) === undefined){
                    role_playMsg += `(根弱 傷官格 傷官傷盡) 직업 경쟁력이 한정적이며 조직에 적합한 인재입니다.`;
                    if(_mens.find(e => skyTag[e-1].id === skyTag[man1-2].id) === undefined){
                        role_playMsg += `공임/납품/계약거래에 해지가 됩니다. `;
                    }
                    role_playMsg += "</br>";
                }
                

                if(_typeRole.find(e => e === 'D') || _stypeRole.find(e => e === 'D')){
                    role_playMsg += "(根弱 傷官格 劫傷) 조직의 안좋은 관행이나 유통구조를 개선해 혁신을 이끌지만 기득권의 마찰을 피할 수 없습니다."+"</br>";
                    if(_typeRole.find(e => e === 'C') && (_isTalent !== undefined)){
                        role_playMsg += "(根弱 傷官格 財剋印) 역사의 이름 남길 혁신의 주체가 되어 새로운 기득권으로 성장합니다. 만명 중 한명 인물 입니다."+"</br>";
                    }
                }  
            }
            else{
                if(_typeRole.find(e => e === 'B') || _wtypeRole.find(e => e === 'B')  || _stypeRole.find(e => e === 'B')){
                    role_playMsg += "(根弱 傷官格 傷官見官) 관행과 법규를 준하지 않고 허가 받지 않은 채, 하고 싶은 것을 하며 살아갑니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[man2-1].id)){
                    role_playMsg += "(根弱 傷官格 傷官加殺/駕殺) 현장전문가로 일장당권, 많은 일을 감당합니다."+"</br>";
                }
            }
        }
        else{
            role_playMsg += "(根旺 傷官格 異道) 조직의 규칙보다 개인 욕심 및 능력으로 독립하여 살아갑니다. 시장에 대한 이해력 높고, 자영업/유통업에 적합니다."+"</br>";
            if(((_typeRole.find(e => e === 'A') || _stypeRole.find(e => e === 'A')) || _wtypeRole.find(e => e === 'A')) && (_typeRole.find(e => e !== 'C') || _stypeRole.find(e => e === 'C'))  || _wtypeRole.find(e => e !== 'C')){
                role_playMsg += "(根旺 傷官格 佩印) 개업이 가능한 특기 가졌습니다."+"</br>";
            }
            if(((_typeRole.find(e => e === 'A') || _stypeRole.find(e => e === 'A')) || _wtypeRole.find(e => e === 'A')) && (_typeRole.find(e => e === 'C') || _stypeRole.find(e => e === 'C'))  || _wtypeRole.find(e => e === 'C')){
                role_playMsg += "(根旺 傷官格 財剋印) 개업에서 기업화까지 가능한 특기 가졌습니다."+"</br>";
            }
        }

        
        if(role === true){
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(傷官格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성 잃어 지탄 받을 수 있습니다."+"</br>";
            }

        }

        
    }
    else if(_frameSet2 === "羊刃格"){
        let role = false; 
        let another = false;
        
        if(_skys.find(e => skyTag[e-1].type === skyTag[_myID-1].type)){
            role_playMsg += "(羊刃格 比劫向) 세상의 약자를 지키는 체면과 이상을 버리고, 자신부터 챙깁니다. 점진적으로 자신의 전문성을 키우고자 합니다."+"</br>";
            
            if(_skys.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                another = true;
                role_playMsg += "(羊刃格 異道功名) 기술능력을 키워 전문가가 됩니다. (기술 기예 기능인, 도살장, 애견샵, 변호사, 의료인)"+"</br>";
            }

            if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                another = true;
                role_playMsg += "(羊刃格 異道功名) 지식능력을 키워 전문가가 됩니다. (학원, 서생, 기자, 작가, 변호사, 의료인)"+"</br>";
            }

            if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                role = true;
                role_playMsg += "(羊刃格 比劫向 用殺) 적십자와 같이 자신의 전문 능력으로 공익성 있는 일을 합니다. 개인이득과 자신을 먼저 챙긴 후, 대의를 그 다음에 지킵니다."+"</br>";
            }

            
        }
        else if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
            role = true;
            if(_skys.find(e => skyTag[e-1].id === skyTag[man1-1].id)){
                role_playMsg += "(羊刃格 露殺) 이상이 높으며 국가직 신분으로 공무원, 공공기관 나랏일 수행합니다."+"</br>";
            }
            else if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id)){
                role_playMsg += "(羊刃格 用官) 국가직 신분이 아니더라도, 학위를 갖췄거나 이상이 높으며 공익성 있는 일을 수행합니다."+"</br>";
            }
        }
        else if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
            role_playMsg += "(羊刃格 破格) 세상의 정보들이나 말과 글로 전하는 교육자, 작가, 기자 등으로 살 수 있습니다."+"</br>";
        }
        else{
            role_playMsg += "(羊刃格 破格) 주어진 일만 수행하나, 직업 찾기 어려워합니다."+"</br>";
        }

        if(role === true){
            if(_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e === 'D') !== undefined){
                role_playMsg += "(羊刃格 殺印相生) 직업 활동에 대한 준비력을 갖춰서, 중앙에서 일하거나, 조직 생활을 오래 유지 할 수 있습니다."+"</br>";
            }
            else{
                role_playMsg += "(羊刃格 制殺) 직업 활동에 대한 준비력이 소흘하여 조직 생활을 오래 유지 하기 어렵거나 직영이 아닌 대행업무로 일합니다."+"</br>";
            }
            
            if(_mens.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                role_playMsg += "(羊刃格 財生殺) 세상의 약자 보호를 수행하는 조직과 소속에서 지배력과 권한을 갖춥니다. (군인, 경찰, 사법부, 정보원, 국토  수호, 시민 보호)"+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) && _skys.find(e => skyTag[e-1].id !== skyTag[man1-1].id)){
                    role_playMsg += "(羊刃格 成格) 공공의 이익을 위해 자신을 희생하는 우두머리 급의 인물입니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) && _mens.find(e => skyTag[e-1].type !== skyTag[c-1].type) && another === false){
                role_playMsg += "(羊刃格 財官俱沒) 한순간으로 직장을 잃거나 가정 식구가 흩어지며, 경력 단절 등 사회로부터 자신의 신분이 잊혀지게 됩니다."+"</br>";
            }


            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(羊刃格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성 잃어 지탄 받을 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(羊刃格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }

        if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) && _mens.find(e => skyTag[e-1].type !== skyTag[c-1].type)){
            if(_skys.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                role_playMsg += (another === true) ? "(羊刃格 比劫食傷 爭財) 전문성을 바탕으로 시장환경 및 대외관계를 통해 " : "(羊刃格 食傷生財) "
                role_playMsg += "무역, 통상, 도매 등의 중간역할 담당하는 플랫폼효과로 수익을 높여갑니다."+"</br>";
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                role_playMsg += (another === true) ? "(羊刃格 印比劫 爭財) 지적능력을 함양하여 자신의 문하를 만들어가는 일을 하며 살아갑니다." +"</br>" : "";
            }
        }


        
    }
    else if(_frameSet2 === "建祿格"){
        let role = false;
        let another = false;

        if(_skys.find(e => skyTag[e-1].type === skyTag[_myID-1].type)){
            role_playMsg += "(建祿格 比劫向) 세상의 약자를 지키는 체면과 이상을 버리고, 자신부터 챙깁니다. 점진적으로 자신의 전문성을 키우고자 합니다."+"</br>";

            if(_skys.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                another = true;
                role_playMsg += "(建祿格 異道功名) 기술능력을 키워 전문가가 됩니다. (기술 기예 기능인, 직업훈련, 정신수양, 상담사)"+"</br>";
            }

            if(_skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
                another = true;
                role_playMsg += "(建祿格 異道功名) 지식능력을 키워 전문가가 됩니다. (학원, 서생, 기자, 작가, 변호사, 의료인)"+"</br>";
            }

            if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role = true;
                role_playMsg += "(建祿格 比劫向 用殺) 적십자와 같이 자신의 전문 능력으로 공익성 있는 일을 합니다. 개인이득과 자신을 먼저 챙긴 후, 대의를 그 다음에 지킵니다."+"</br>";
            }

            
        }
        else if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
            role = true;
            if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) || (_skys.find(e => skyTag[e-1].id === skyTag[man1-1].id) && _skys.find(e => skyTag[e-1].type === skyTag[a-1].type))){
                role_playMsg += "(建祿格 用官) 이상이 높으며 국가직 신분이나 학위를 갖췄고, 공무원, 공공기관 나랏일 수행합니다."+"</br>";
            }
            else{
                role_playMsg += "(建祿格 用殺) 국가직 신분이 아니더라도, 이상이 높으며 공익성 있는 일을 수행합니다."+"</br>";
            }
            
            
        }
        else if(_skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
            role_playMsg += "(建祿格 破格) 세상의 정보들이나 말과 글을 전하는 교육자, 작가, 기자 등으로 살아갑니다."+"</br>";
        }
        else{
            role_playMsg += "(建祿格 破格) 주어진 일을 수행하나, 직업을 찾기 어려워합니다."+"</br>";
        }

        if(role===true){
            if(_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e === 'D') !== undefined){
                role_playMsg += "(建祿格 官印相生) 직업 활동에 대한 준비력을 갖춰서, 중앙에서 일하거나, 조직 생활을 오래 유지 할 수 있습니다."+"</br>";
            }
            else{
                role_playMsg += "(建祿格 見官) 직업 활동에 대한 준비력이 소흘하여 조직 생활을 오래 유지 하기 어렵거나 직영이 아닌 대행업무로 일합니다."+"</br>";
            }

            if(_mens.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                role_playMsg += "(建祿格 財生官) 세상의 가치를 보호하는 조직과 소속에서 지배력과 권한을 갖춥니다. (교사, 관공서 서비스, 금감원, 헌법 수호, 교육업)"+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) && _skys.find(e => skyTag[e-1].id !== skyTag[man2-1].id)){
                    role_playMsg += "(建祿格 成格) 공공의 이익을 위해 자신을 희생하는 우두머리 급의 인물입니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[d-1].type) && _mens.find(e => skyTag[e-1].type !== skyTag[d-1].type) && another === false){
                role_playMsg += "(建祿格 財官俱沒) 한순간으로 직장을 잃거나 가정 식구가 흩어지며, 경력 단절 등 사회로부터 자신의 신분이 잊혀지게 됩니다."+"</br>";
                
            }

            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(建祿格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성 잃어 지탄 받을 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(建祿格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }
        
        if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) && _mens.find(e => skyTag[e-1].type !== skyTag[c-1].type)){
            if(_skys.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                role_playMsg += (another === true) ? "(建祿格 比劫食傷 爭財) 전문성을 바탕으로 시장환경 및 대외관계를 통해 " : "(建祿格 食傷生財) "
                role_playMsg += "무역, 통상, 도매 등의 중간역할 담당하는 플랫폼효과로 수익을 높여갑니다."+"</br>";
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                role_playMsg += (another === true) ? "(建祿格 印比劫 爭財) 지적능력을 함양하여 자신의 문하를 만들어가는 일을 하며 살아갑니다." +"</br>" : "";
            }
        }
        
    }
    else if(_frameSet2 === "正官格"){
        let role = false;
        role_playMsg += "(正官格) 원리원칙에 어긋나거나 비도덕적인 행동에 대해 스트레스 받습니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 正官格) 조직에서 자신의 입지를 조금씩 다져나갑니다."+"</br>";
            if(_mens.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                role = true;
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根弱 正官格 財生官) 조직내 사람 관계에 적응해야 하며 " : "(根弱 正官格 化財生官) 조직, 소속, 직무는 유지하며 직종 및 적성을 바꾸거나 다른 방식의 활동실적으로 수익을 높여 ";
                role_playMsg += "조직의 생리에 대한 이해도가 높습니다."+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                    role_playMsg += "(根弱 正官格 制劫) 경쟁력 있는 자신의 영역으로 지점, 본부장의 직위 혹은, 독립하여 자신의 사업을 할 수 있습니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 正官格 正官比肩合) 연대 참여로 용병술이며. 독립은 가능하나 동업의 형태입니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].id === skyTag[c-1].id) || _skys.find(e => skyTag[e-1].id === skyTag[d-1].id)){
                role_playMsg += "(根弱 正官格 財剋印) 아랫사람부터 중시하고, 조직에 자기 사익을 챙기니 도리어 하극상 마주합니다."+"</br>";
            }
        }
        else{
            role_playMsg += "(根旺 正官格) 보통의 삶입니다."+"</br>";
            if(_mens.find(e => skyTag[e-1].type === skyTag[woman2-1].type) || _skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
                role = true;
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根旺 正官格 官印相生) 자신의 전문성을 공식적으로 허가받아 " : "(根旺 正官格 化官印相生) 타영역에서 쌓은 자신의 전문성을 도입하거나 직종 및 적성을 바꿔서 ";
                role_playMsg += "안정적인 생활을 선호하며, 공공기관이나 평생직장에서 근무하려 합니다."+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[b-1].id)){
                    role_playMsg += "(根旺 正官格 傷官佩印) 경쟁력 있는 전문 능력을 가졌지만, 시설관리 및 유지보수 등 전문능력으로 쉽게 처리 할 수 있는 안정적인 업무를 선호합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[a-1].id)){
                    role_playMsg += "(根旺 正官格 食正官合) 연대 참여로 재능 있는 사람을 아웃소싱하고 전문성있는 사람을 다루는 일을 합니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].id === skyTag[c-1].id) || _skys.find(e => skyTag[e-1].id === skyTag[d-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[c-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[d-1].id)){
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根旺 正官格 財生官) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다." : "(根旺 正官格 化財生官) 혼자서도 할수 있을 것 같아 독립합니다. 직종 및 적성을 바꾸거나 다른 방식의 활동실적으로 수익을 높여 자영업에 뛰어 듭니다.";
                role_playMsg += "</br>";
            }

        }

        if(role===true){
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(正官格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성과 거리가 멀 수 있습니다."+"</br>";
            }

            if(_skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)){
                if(_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5)){
                    role_playMsg += "(正官格 合殺留官) 협상을 통해 권력, 의무, 지위, 승패경쟁에 유리함을 얻습니다."+"</br>";
                }

                if(_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5)){
                    role_playMsg += "(正官格 貪合忘官) 여가 및 재물 사적욕심으로 신분과 체통을 잃을 수 있습니다."+"</br>";
                }

                if(_skys.find(e=> skyTag[e-1].id === skyTag[a-1].id)){
                    role_playMsg += "(正官格 去殺留官) 위험, 불필요, 각종 리스크 관리를 통해 조직과 가정의 안위를 지켜냅니다."+"</br>";
                }

            }
            
        }


    }
    else if(_frameSet2 === "偏財格"){
        role_playMsg += "(偏財格) 이익 추구형으로, 새로운 분야를 개척하기를 원합니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 偏財格) 조직에서 자신의 입지를 조금씩 다져나갑니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type))){
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根弱 偏財格 財生殺) 조직에 들어가 매뉴얼대로 행하며 배움을 가지고 " : "(根弱 偏財格 化財生官) 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 신분을 높여가며 ";
                role_playMsg += "자신의 꿈을 위한 과정을 거칩니다."+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 偏財格 制比) 경쟁을 통해 영역을 확보해 함께할 뜻이 맞는 사람을 모아 더 큰 세상으로 뻗고자 합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                    role_playMsg += "(根弱 偏財格 劫財合殺) 연대를 통해 영역확보입니다. 공동 설립, 기존의 업체 또는 유통망에 관여합니다."+"</br>";
                }
            }
            else{
                if((_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[a-1].id))){
                    role_playMsg += "(根弱 偏財格 食神生財) 조직에서 자신의 꿈을 키워야 하지만, 자신의 재능에 밑천을 보여서 영역 확보와 성과에 어려움을 겪습니다."+"</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[man1-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[c-1].type) !== undefined && _skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type) !== undefined){
                role_playMsg += "(偏財格 貪財壞印) 실력대비 욕심이 지나칩니다. 규칙을 어긴 행위나 무리하게 영역확장하기를 원해서 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
        else{
            role_playMsg += "(根旺 偏財格) 자신의 실력으로 자유로운 활동합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[a-1].type || _mens.find(e => skyTag[e-1].type === skyTag[a-1].type))){
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根旺 偏財格 食神生財) 자신의 고유 실력을 키워 타고난 사업가적 재능을 발휘합니다." : "(根旺 偏財格 化傷官生財) 시대 변화에 맞춘 자신의 개인기를 바꿔가며 사업가적 재능을 발휘합니다.";
                role_playMsg += "</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman1-1].id)){
                    role_playMsg += "(根旺 偏財格 財剋印) 사업 영역을 확보하기 위해 공격적 투자, 모 아니면 도 방식으로 일확천금 성향입니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman2-1].id)){
                    role_playMsg += "(根旺 偏財格 財印交雜) 연대를 통한 지분, 혹은 자금을 통한 투자 합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                    role_playMsg += "(根旺 偏財格 財生殺) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다."+"</br>";
                    role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D' || _wtypeRole.find(e => e=== 'D') !== undefined) !== undefined) ? "(根旺 偏財格 財生殺) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다." : "(根旺 偏財格 化財生官) 혼자서도 할 수 있을 것 같아 독립합니다. 조직, 부서, 직급을 바꿔가며 수익을 높여갑니다.";
                    role_playMsg += "</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[c-1].type) !== undefined && _skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type) !== undefined){
                role_playMsg += "(偏財格 貪財壞印) 실력대비 욕심이 지나칩니다. 규칙을 어긴 행위나 무리하게 영역확장하기를 원해서 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
    }
    else if(_frameSet2 === "正財格"){
        role_playMsg += "(正財格) 안정적 삶과 경제성과 실용성을 추구하고 안정을 깨는 낭비를 경계합니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 正財格) 조직에서 안정적인 활동을 중시합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根弱 正財格 財生官) 조직에 들어가 매뉴얼대로 행하며 배움을 가지고 " : "(根弱 正財格 化財生殺) 조직생활에서 점점 경쟁이 치열한 환경에 진입함으로써 수익과 신분을 높여서 ";
                role_playMsg += "자신의 꿈을 위한 과정을 거칩니다."+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                    role_playMsg += "(根弱 正財格 制劫) 경쟁을 통해 영역을 확보해 함께할 뜻이 맞는 사람을 모아 더 큰 세상으로 뻗고자 합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 正財格 正官比肩合) 연대를 통해 영역확보입니다. 공동 설립, 기존의 업체 또는 유통망에 관여합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[b-1].id)){
                    role_playMsg += "(根弱 正財格 傷官生財) 조직에서 안정적으로 있길 원하지만, 시대 변화에 맞춰 자신의 재능 개발을 키워가는데 부진하고 어려움을 겪습니다."+"</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[d-1].type) !== undefined && _skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type) !== undefined){
                role_playMsg += "(正財格 貪財壞印) 실력대비 욕심이 지나칩니다. 규칙을 어긴 행위나 무리하게 영역확장하기를 원해서 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
        else{
            role_playMsg += "(根旺 正財格) 자신의 실력으로 변화하는 시대를 리드 합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[b-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根旺 正財格 傷官生財) 시대 변화에 맞춰 자신의 재능으로 미래를 위해 나아가 새로운 것을 개발 합니다." : "(根旺 正財格 化食神生財) 자신의 전문성과 적성 및 직종을 바꿔가며 사업가적 재능을 발휘합니다.";
                role_playMsg += "</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman2-1].id)){
                    role_playMsg += "(根旺 正財格 傷官佩印) 경쟁력 있는 안전 자산 확보해 회사 지분 및 신제품 이익을 통한 안정적 수입 구축합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman1-1].id)){
                    role_playMsg += "(根旺 正財格 傷官合去) 연대를 통한 지분, 혹은 자금을 통한 투자 합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                    role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根旺 正財格 財生官) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다." : "(根旺 正財格 化財生殺) 혼자서도 할 수 있을 것 같아 독립합니다. 점점 경쟁이 치열한 환경에 진입함으로써 수익을 높여갑니다.";
                    role_playMsg += "</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[d-1].type) !== undefined && _skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type) !== undefined){
                role_playMsg += "(正財格 貪財壞印) 실력대비 욕심이 지나칩니다. 규칙을 어긴 행위나 무리하게 소유하기만을 원해서 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
    }
    else if(_frameSet2 === "偏印格"){
        let role = false;
        role_playMsg += "(偏印格) 전략 전술 기획 능력이 있으며, 모든 일에 공감하고 지나치게 신념, 사상에 빠져들기 쉽습니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 偏印格) 세상 논리에 동조하며 자신을 감추고 조직생활을 합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                role = true;
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根弱 偏印格 殺印相生) 남들이 못하는 특수 임무를 수행하며 소수만이 할 수 있는 특수직입니다."+"</br>" : "";
                role_playMsg += (_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)) ? "(根弱 偏印格 化官印相生) 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 수행하며 소수만이 할 수 있는 특수직입니다."+"</br>" : "";
                if(_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[a-1].id)){
                    role_playMsg += "(根弱 偏印格 奪食) 직업재교육, 재수학원 등 실력부족으로 낙오된 사람을 이끌어 줘야합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[b-1].id)){
                    role_playMsg += "(根弱 偏印格 傷官合去) 실력있는 사람을 섭외하고, 자신은 전문가 용역 관리에만 집중합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 偏印格 印比) 자신의 마음에 사로 잡혀 자기가 하고싶은 것만 하는 매니아가 됩니다."+"</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[c-1].type) !== undefined){
                role_playMsg += "(偏印格 貪財壞印) 준비대비 욕심이 지나칩니다. 허술하게 세상의 변화를 읽고 틈새시장을 공략하는 각종 투자 및 재테크로 인해 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
        else{
            role_playMsg += "(根旺 偏印格) 매니아적인 성향으로 자신이 하고 싶은 것에 집중합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                role_playMsg += "(根旺 偏印格 印比) 자신이 좋아하는 일을 직업으로 만들 수 있습니다. "+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[c-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[c-1].id)){
                    role_playMsg += "(根旺 偏印格 財剋印) 경쟁력 있는 창작물로 재산을 확보와 사회의 모순을 포착해 기회를 만듭니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[d-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[d-1].id)){
                    role_playMsg += "(根旺 偏印格 財印交雜) 주변에 전문가가 많아 연대 참여로 타인의 타이틀이나 일궈 놓은 결과에 편승합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                    role = true;
                    role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根旺 偏印格 殺印相生) 부여받은 특수 임무 수행에 불만이 있습니다."+"</br>" : "";
                    role_playMsg += (_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)) ? "(根旺 偏印格 化官印相生) 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 임무 수행에 불만이 있습니다."+"</br>" : "";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[c-1].type) !== undefined){
                role_playMsg += "(偏印格 貪財壞印) 준비대비 욕심이 지나칩니다. 허술하게 세상의 변화를 읽고 틈새시장을 공략하는 각종 투자 및 재테크로 인해 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }

        if(role===true){
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(偏印格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성과 거리가 멀 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(偏印格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }


    }
    else if(_frameSet2 === "正印格"){
        let role = true;
        role_playMsg += "(正印格) 객관적 지식습득을 좋아하며 주변환경에 잘 적응하고 정해진 임무를 잘 완수합니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 正印格) 조직에 잘 적응합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role = true;
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根弱 正印格 官印相生) 자신에게 주어진 일을 수행하고 안정적인 생활을 중시합니다."+"</br>" : "";
                role_playMsg += (_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)) ? "(根弱 正印格 化殺印相生) 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 자신에게 주어진 일을 수행합니다."+"</br>" : "";
                if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[b-1].id)){
                    role_playMsg += "(根弱 正印格 傷官佩印) 오랜시간 경력자로서 전문가가 됩니다. 자격증 등으로 자신을 입증하는 것이 좋습니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[a-1].id)){
                    role_playMsg += "(根弱 正印格 食正印合) 실력있는 사람을 섭외하고, 자신은 전문가 용역 관리에만 집중합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].type === skyTag[two-1].type)){
                    role_playMsg += "(根弱 正印格 印劫) 자기 재능으로 안정적 수입을 구축하는 것에 압박감을 느낍니다."+"</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[d-1].type) !== undefined){
                role_playMsg += "(正印格 貪財壞印) 준비대비 욕심이 지나칩니다. 허술하게 세상의 변화를 읽고 틈새시장을 공략하는 각종 투자 및 재테크로 인해 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
        else{
            role_playMsg += "(根旺 正印格) 조직에 부적응합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                role_playMsg += "(根旺 正印格 印劫) 재능을 공식적으로 인정받아 명성, 논문 및 성과 등으로 인지도를 올립니다. "+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[d-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[d-1].id)){
                    role_playMsg += "(根旺 正印格 財剋印) 저작권을 통한 저작료, 판권에 대한 인세 등 불로소득 중 하나를 구축합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[c-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[c-1].id)){
                    role_playMsg += "(根旺 正印格 財印交雜) 주변에 전문가가 많아 연대 참여로 타인의 타이틀이나 일궈 놓은 결과에 편승합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].id === skyTag[man2-1].type)){
                    role = true;
                    role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根旺 正印格 官印相生) 불로소득을 원하는데 규칙적인 업무와 경력 스트레스가 있습니다."+"</br>" : "";
                    role_playMsg += (_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)) ? "(根旺 正印格 化殺印相生) 불로소득을 원하는데 잦은 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 업무와 경력 스트레스가 있습니다."+"</br>" : "";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[d-1].type) !== undefined){
                role_playMsg += "(正印格 貪財壞印) 준비대비 욕심이 지나칩니다. 허술하게 세상의 변화를 읽고 틈새시장을 공략하는 각종 투자 및 재테크로 인해 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }

        if(role===true){
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(正印格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성과 거리가 멀 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(正印格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }
        
    }
    else if(_frameSet2 === "食神格"){
        role_playMsg += "(食神格) 자신의 능력을 중시하고 한 분야에 연구 매진하기 좋아합니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 食神格) 전문성 유통기한이 빠르므로 주변 사람들을 통해 성장해야 합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 食神格 比食) 믿을 수 있는 것은, 주변능력자 뿐이라는 것을 압니다. 조직 및 타인에게 의탁합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                    role_playMsg += "(根弱 食神格 劫食) 용역 및 주변사람들의 능력을 활용하므로써 전문성을 유지합니다."+"</br>";
                }
                
                if(_skys.find(e => skyTag[e-1].id === skyTag[man1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[man1-1].id)){
                    role_playMsg += "(根弱 食神格 食神制殺) 조직으로부터 의탁한 노력에 대해 인정 받아 일거리를 부여 받아 능력을 발휘합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[man2-1].id)){
                    role_playMsg += "(根弱 食神格 食正官合) 자신의 능력을 연대할 상급 기관을 찾거나 자신의 능력을 납품해야 합니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                role_playMsg += "(根弱 食神格 食神生財) 능력 대비 할일 많아져 불안함을 느낍니다."+"</br>";
            }
        }
        else{
            role_playMsg += "(根旺 食神格) 자신을 믿고, 생존력이 있는 실력을 꾸준히 쌓아 재능을 직접 판매할 수 있습니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根旺 食神格 食神生財) 활용도 많은 인재로, 사업과 직장생활 가리지 않고 요구 사항 해결해줍니다." : "(根旺 食神格 化食神生財) 정해진 규정이 많거나 한정적인 영역에서 자신의 재능을 발휘합니다.";
                role_playMsg += "</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman1-1].id)){
                    role_playMsg += "(根旺 食神格 偏印到食) 편의성을 수익으로 만들어, 지적재산권을 확보하고, 건물주, 플랫폼 개발자 등 됩니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman2-1].id)){
                    role_playMsg += "(根旺 食神格 食正印合) 자신 능력을 키워주고 콘텐츠를 만들어줄 연대할 사람들을 두어 매니저가 됩니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                role_playMsg += "(根旺 食神格 比劫食) 남들의 재능도 활용하며 자신의 실력을 쌓아 발휘 할 수 있습니다."+"</br>";
            }
        }
    }

    return role_playMsg;
}
=======
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
const luck2 = [];


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

fetch('./js/framelucks.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            luck2.push(post);
        });
    });


function Divination(){

    console.log("=======================================Divination=======================================");
    document.getElementById("debug2").innerHTML = "";
    document.getElementById("debug3").innerHTML = "";
    document.getElementById("debug4").innerHTML = "";
    document.getElementById("debug5").innerHTML = "";
    document.getElementById("debug7").innerHTML = "";
  
    document.getElementById("GLucks").innerHTML = "";
    document.getElementById("Lucks_main").innerHTML = "";
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

    let yObj = landTag[yearb-1];
    let mObj = landTag[monthb-1];
    let dObj = landTag[dayb-1];
    let tObj = landTag[timeb-1];
    
    
    var yyyy = document.getElementById("year_msg").value;
    var md = document.getElementById("monthday_msg").value;
    var mm = md.substring(0,2).toString().padStart(2, '0');
    var dd = md.substring(2,4).toString().padStart(2, '0');
    
    
    var ordId = zm(yyyy, mm, dd)[2]; // 당령용신 번호 찾기 ex) 午 = 0:丙, 1:丁 ==> 0 혹은 1 / 辰 = 0:乙 1:癸 ==>무조건 0 / 寅 = 0:丙, 1:甲 ==>무조건 1
    var dty = zm(yyyy, mm, dd)[3]// 사령용신 번호 찾기 
    var use = landTag[monthb-1]['use'][ordId]; // 당령용신 string ex) 癸, 丙 ...

    for(var i=0; i<10; i++){ //용신과 희기신의 key들 불러오기 == 甲~癸까지 천간 순서로 useSet에 Array
        var obj = skyTag[i].use;
        useSet.push(obj.find(e => e.tag === use.tag));
    }

    /****************************************************debugging***************************************************************/

    console.log("----용신과 희기신의 key 객체 세트", useSet); //useSet에 용신과 희기신의 key 세트. 여기에서 모든 용희기신 가려낸다.
    
    /****************************************************debugging***************************************************************/
    // 천간숫자 = n, 지지숫자 = i, 지지 객체 = landTag[i-1] = obj
    // 천간 숫자=> 한자 = skyTag[n-1].name
    // 지지 숫자=> 한자 = landTag[i-1].name
    // 천간 숫자=> 오행 = skyTag[n-1].type
    // 지지 숫자=> 오행 = landTag[i-1].type
    // 지지 객체 => 숫자 = obj.id
    // 지지 객체 => 한자 = obj.name
    // 지지 객체 => 오행 = obj.type
    // 지지(생지) 객체 => 당령(한자): obj.use[1].tag
    // 지지(왕지) 객체 => 당령1(한자): obj.use[0].tag
    // 지지(왕지) 객체 => 당령2(한자): obj.use[1].tag
    // 지지(생지) 객체 => 당령(한자): obj.use[0].tag

    // 지지 객체 => 여기 사령(객체), 중기 사령(객체), 정기 사령(객체) = obj.duty[0], obj.duty[1], obj.duty[2]
    // 지지 객체 => 여기 사령천간(숫자), 중기 사령천간(숫자), 정기 사령천간(숫자) = obj.duty[0].idN, obj.duty[1].idN, obj.duty[2].idN
    // 지지 객체 => 여기 사령천간(한자), 중기 사령천간(한자), 정기 사령천간(한자) = obj.duty[0].name, obj.duty[1].name, obj.duty[2].name

    // 일간 숫자(a)가 보는 육친 세트 = roles[a-1].mr
    // 일간 숫자(a)가 보는 b의 육친 = roles[a-1].mr[b-1].tag
    
    // 월령용신 숫자 = m, 다른 천간 숫자 = x
    // 월령용신 숫자 => 월령용신의 천간key 객체 세트(A) = let A = []; for(var i=0; i<10; i++) A.push(skyTag[i].use.find(e=> e.tag === skyTag[m-1].name));
    // 월령용신 숫자가 보는 천간숫자의 희기신(객체) = skyTag[x-1].use.find(e=> e.tag === skyTag[m-1].name)
    
    //console.log("------Debug ")

    /****************************************************debugging***************************************************************/
    //1.오행용 세트
    //1-1.천간 배열
    let idea = [times, days, months, years];
    let ideaRole = [times, months, years];

    // soul 천간 오행 배열, skys 천간 육신 배열 (일간 제외)
    let soul = [...idea.filter((i,v)=>idea.indexOf(i)===v)]
    let skys = [...ideaRole.filter((i,v)=>ideaRole.indexOf(i)===v)]

    // 지장간 배열 (왕지 중기는 0으로 표시됨, 1~10 = 甲~癸)
    let pObj = [
        tObj,
        dObj,
        mObj,
        yObj
    ]

    // 모든 지장간 풀어쓰기 0: 시지 여기 ~ 11: 년지 정기 
    // (오행용)
    let eidos =[
        pObj[0].duty[0].idN,pObj[0].duty[1].idN,pObj[0].duty[2].idN,
        pObj[1].duty[0].idN,pObj[1].duty[1].idN,pObj[1].duty[2].idN,
        pObj[2].duty[0].idN,pObj[2].duty[1].idN,pObj[2].duty[2].idN,
        pObj[3].duty[0].idN,pObj[3].duty[1].idN,pObj[3].duty[2].idN,
    ]

    let eidosRole = [...eidos] // (육신용)

    //오중기토 제거 (오행, 육신 모두 다)
    for(var i=0; i<4; i++){
        if(pObj[i].id === 7){
            eidos[(3*i)+1] = 0;
            eidosRole[(3*i)+1] = 0;
        }
    }

    //왕지생 월지의 여기 혹은 정기 둘중 하나만 들어감 (오행용)
    if(dty === 2){
        eidos[6] = 0;
    }
    else{
        eidos[8] = 0;
    }

    //생지 여기 무토 제거 (육신용)
    for(var i=0; i<4; i++){
        if(eidosRole[(3*i)] === 5){
            eidosRole[(3*i)] = 0;
        }
    }
    

    //1-2.사용가능 지장간 배열
    // 월지안에 있는 것은 생지 여기, 생지 중기, 고지 중기 빼고 다 사용 가능
    //월지, 타지 왕지) 삼합 방합 여부 상관없이 다 가능

    // 월지 지장간 
    let stage = [];

    // subSet 정기 지장간 배열 세트
    let subSet = []; // 오행
    let subSetRole = []; // 육신
    for(var i=0; i<4; i++){
        let f = []; // 오행
        let r = []; // 육신
        if(pObj[i].id%3 === 0){
            f.push(pObj[i].duty[2].idN);
            r.push(pObj[i].duty[2].idN);
            if(i===2){
                stage.push(pObj[i].duty[2].idN);
            }
            
        }
        else if(pObj[i].id%3 === 1){
            
            if(i === 2){
                f.push(pObj[i].duty[dty].idN);
                r.push(pObj[i].duty[dty].idN);
                stage.push(pObj[i].duty[dty].idN);
            }
            else{
                f.push(pObj[i].duty[0].idN);
                f.push(pObj[i].duty[2].idN);
                r.push(pObj[i].duty[0].idN);
                r.push(pObj[i].duty[2].idN);
            }
            

        }
        else if(pObj[i].id%3 === 2){
            if(i===2){
                f.push(pObj[i].duty[0].idN);
                r.push(pObj[i].duty[0].idN);
                f.push(pObj[i].duty[2].idN);
                r.push(pObj[i].duty[2].idN);
                stage.push(pObj[i].duty[0].idN);
                stage.push(pObj[i].duty[2].idN);
            }
            
        }
        subSet.push(f);
        subSetRole.push(r);
        
    }



    // subs 정기 지장간 배열
    let subs = [...subSet[0], ...subSet[1], ...subSet[2], ...subSet[3]];
    let subr = [...subSetRole[0], ...subSetRole[1], ...subSetRole[2], ...subSetRole[3]];
    subs = [...subs.filter((i,v)=>subs.indexOf(i) === v)];
    subr = [...subr.filter((i,v)=>subr.indexOf(i) === v)];
    
    // 타지 중, 고지) 
    //월지 방합 고지): 여기 가능, 중기 대기, 정기 가능
    //타지 방합 고지): 여기 가능, 중기 대기, 정기 대기
    //월지 방합 생지): 여기 무토 대기, 중기 대기, 정기 가능
    //타지 방합 생지): 여기 무토 대기, 중기 대기, 정기 가능

    // sqrSet 방합 지장간 배열 세트
    let sqrSet = [];
    for(var i=0; i<4; i++){
        var x = [pObj[0], pObj[1], pObj[2], pObj[3]];
        x.splice(i, 1)
        var ins = [...x.filter(e => Math.floor((e.id%12)/3) === Math.floor((pObj[i].id%12)/3))]
        let p = [];
        if(ins.length !==0){
            if(pObj[i].id%3===2){
                if(Math.floor((pObj[i].id%12)/3) === Math.floor((pObj[2].id%12)/3)){
                    p.push(pObj[i].duty[2].idN)
                }
                p.push(pObj[i].duty[0].idN)
                sqrSet.push(p)
            }
            else if((pObj[i].id%3===1)){
                p.push(pObj[i].duty[0].idN)
                sqrSet.push(p)
            }
            else{
                sqrSet.push(p)
            }
        }
        else{
            sqrSet.push(p)
        }
    }
   
    // sqrs 방합 지장간 배열, 방합 확인 용도
    let sqrs = [...sqrSet[0], ...sqrSet[1], ...sqrSet[2], ...sqrSet[3]];
    sqrs = [...sqrs.filter((i,v)=>sqrs.indexOf(i) === v)];

    //월지 삼합 고지): 여기 대기, 중기 가능, 정기 대기
    //타지 삼합 고지): 여기 대기, 중기 가능, 정기 대기
    //월지 삼합 생지): 여기 무토 대기, 중기 가능, 정기 가능
    //타지 삼합 생지): 여기 무토 대기, 중기 대기, 정기 가능   

    // triSet 삼합 지장간 배열 세트
    let triSet = [];
    // triUse 월지 삼합 지장간 배열 세트
    let triUse = [];
    for(var i=0; i<4; i++){
        let p = [];
        let u = [];

        if(i !== 2){
            if(pObj[i].id !== pObj[2].id && pObj[i].id%4 === pObj[2].id%4){
                if(pObj[i].id%3 === 1){
                    console.log("타 왕지")
                    u.push(pObj[2].duty[1].idN);
                    
                }
                else{
                    console.log("타 생지, 고지")
                    u.push(pObj[i].duty[1].idN);
    
                }
                
                
            }
            triUse.push(u);
            
        }
        else{
            if(pObj[i].id%3 !== 1 && ((pObj[i].id%4 === pObj[0].id%4 && pObj[i].id !== pObj[0].id) || (pObj[i].id%4 === pObj[1].id%4 && pObj[i].id !== pObj[1].id) || (pObj[i].id%4 === pObj[3].id%4 && pObj[i].id !== pObj[3].id)) && landTag[pObj[i].id-1].type !== skyTag[days-1].type){
                console.log("월지 중기")
                stage.push(pObj[i].duty[1].idN);
                u.push(pObj[i].duty[1].idN);
            }
            
            
            triUse.push(u);
        }
        
       


        var x = [pObj[0], pObj[1], pObj[2], pObj[3]];
        x.splice(i, 1)
        
        

        for(var j=0; j<3; j++){
            if(pObj[i].id !== pObj[2].id && pObj[i].id%4 === x[j].id%4 && pObj[i].id%3 !== 1 && Math.floor((pObj[i].id%12)/3) === Math.floor((pObj[2].id%12)/3)){

                p.push(pObj[i].duty[1].idN);

                
            }
            
        }
        triSet.push(p);

    }

    // tris 삼합 지장간 배열, 삼합 확인 용도
    let tris = [...triSet[0], ...triSet[1], ...triSet[2], ...triSet[3]];
    let triu = [...triUse[0], ...triUse[1], ...triUse[2], ...triUse[3]]
    tris = [...tris.filter((i,v)=>tris.indexOf(i) === v)];
    triu = [...triu.filter((i,v)=>triu.indexOf(i) === v)];


    // oppSet 충 지지 배열 세트
    let oppSet = [];
    for(var i=0; i<4; i++){
        var x = [pObj[0], pObj[1], pObj[2], pObj[3]];
        x.splice(i, 1)
        var ins = [...x.filter(e => Math.abs(e.id-pObj[i].id) === 6)]
        let p = [];
        if(ins.length !==0){
            p.push(pObj[i].id)
            oppSet.push(p)
        }
        else{
            oppSet.push(p)
        }
    }

    // opps 지지 충 배열, 충 확인 용도
    let opps = [...oppSet[0], ...oppSet[1], ...oppSet[2], ...oppSet[3]]
    opps = [...opps.filter((i,v)=>opps.indexOf(i) === v)];

    // jupSet 육합 지지 배열 세트
    let jupSet = [];
    for(var i=0; i<4; i++){
        var x = [pObj[0].id, pObj[1].id, pObj[2].id, pObj[3].id];
        x.splice(i, 1)
        var temp = pObj[i].id
        let r = [];
        if(temp ===1){
           temp +=13 
        }
        var ins = [...x.filter(e => e+temp === 15)]
        if(ins.length !==0){
            r.push(pObj[i].id);
            jupSet.push(r);
        }
        else{
            jupSet.push(r);
        }
    }

    // jups 육합 지지 배열, 육합 확인 용도
    let jups = [...jupSet[0], ...jupSet[1], ...jupSet[2], ...jupSet[3]]
    jups = [...jups.filter((i,v)=>jups.indexOf(i) === v)];

    // pairSet 배열 지지 배열 세트
    let pairSet = [];
    for(var i=0; i<4; i++){
        var x = [pObj[0].id, pObj[1].id, pObj[2].id, pObj[3].id];
        x.splice(i, 1)
        var temp = pObj[i].id
        let r = [];
        
        var pr = [2, 1, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11]
        var ins = [...x.filter(e=> pr[e-1] === temp)]
        if(ins.length !== 0){
            r.push(pObj[i].id);
            pairSet.push(r);
        }
        else{
            pairSet.push(r);
        }
    }

    // pair 배열 지지 배열, 배열 확인 용도
    let pair = [...pairSet[0], ...pairSet[1], ...pairSet[2], ...pairSet[3]]
    pair = [...pair.filter((i,v)=>pair.indexOf(i) === v)];

    // spirit 사용 가능 지장간 오행 배열, mens 사용 가능 지장간 육신 배열
    let spirit = [];
    let mens = [];
    for(var i=0; i<4; i++){
        mens = mens.concat([...subSetRole[i]]);
        mens = mens.concat([...sqrSet[i]]);
        mens = mens.concat([...triSet[i]]);
        mens = mens.concat([...triUse[i]]);
        mens = [...mens.filter((i,v) => mens.indexOf(i) === v)];

        spirit = spirit.concat([...subSet[i]]);
        spirit = spirit.concat([...sqrSet[i]]);
        spirit = spirit.concat([...triSet[i]]);
        spirit = spirit.concat([...triUse[i]]);
        spirit = [...spirit.filter((i,v) => spirit.indexOf(i) === v)];
        
    }
    spirit = spirit.filter(e=>!soul.includes(e));
    //  mens 사용 가능 지장간 육신 배열 (근 제외)
    mens = mens.filter(e=>skyTag[e-1].type !==skyTag[days-1].type);
    


    /****************************************************debugging***************************************************************/

    //1-3.사용대기 지장간 Array
    //body 사용대기 오행 Array, lands 사용대기 육신 Array (근 제외)
    let body = eidos.filter(e=>!soul.includes(e))
    let lands = eidosRole.filter(e=>!skys.includes(e))
    body = body.filter(e=>!spirit.includes(e))
    lands = lands.filter(e=>!mens.includes(e))
    //  lands 사용 대기 지장간 육신 Array (근 제외)
    body = [...body.filter(e=> e !== 0)]
    lands = [...lands.filter(e=> e !== 0)]
    lands = lands.filter(e=>skyTag[e-1].type !== skyTag[days-1].type)

    body = [...body.filter((i,v)=>body.indexOf(i) === v)]
    lands = [...lands.filter((i,v)=>lands.indexOf(i) === v)]
    

    // 월지 지장간 중 비견 겁재는 mens으로 붙여넣게 따로 빼놓기
    for(var i=0; i<3; i++){
        if(eidosRole[(i+6)] !== 0  && skyTag[eidosRole[(i+6)]-1].type === skyTag[days-1].type){
            lands.push(eidosRole[(i+6)]);
        }
    }


    //1-1.천간 Array
    console.log("----천간 (오행용)", soul)
    //1-2.사용가능 지장간 Array
    console.log("----지장간 (오행용) ", spirit)
    //1-3.사용대기 지장간 Array
    console.log("----사용대기 지장간 (오행용) ", body)

    //2. 육신용 세트
    //2-1. 일간 제외 천간 Array
    console.log("----일간 제외 천간 (육신용)", skys)
    //2-2. 근 제외 사용가능 지장간 Array
    console.log("----근 제외 지장간 (육신용) ", mens)
    //2-3. 근 제외 사용대기 지장간 Array
    console.log("----근 제외 사용대기 지장간 (육신용) ", lands)
    console.log("----월지 지장간 (육신용) ", stage);

    
    console.log("----(확인용) 지지 방합",sqrSet, sqrs)
    console.log("----(확인용) 지지 삼합", triSet, tris, triu)
    console.log("----(확인용) 지지 충", opps)
    console.log("----(확인용) 지지 육합", jups)
    console.log("----(확인용) 지지 배열",pair)





    /****************************************************debugging***************************************************************/
    //console.log("================orderID 등등", orderID, nowGod, isTalent, myID) === [9, 8, undefined, 10]
    let orderID = mObj.use[ordId].id
    let nowGod = mObj.use[ordId].pw
    let isTalent = [...soul, ...spirit].find(e => e === nowGod);
    let myID = days
    console.log(`----변수 확인 orderID (용신번호): ${orderID} nowGod (희신번호): ${nowGod} isTalent (희신유무): ${isTalent} myID (일간번호): ${myID}`)
    console.log(`${skyTag[orderID-1].name}${skyTag[orderID-1].type} 用神, ${skyTag[nowGod-1].name}${skyTag[nowGod-1].type} 喜神 갖고 있음? : ${(isTalent > 0) ? "네" : "아니오"}`); 
    console.log(`${skyTag[myID-1].name}${skyTag[myID-1].type} 일간`); 

    
    // 희신, 지속, 중화, 확장, 기신, 한신 나열하기

    let skySetKey = [...soul];
    let landSetKey = [...spirit];
    let potKey = [...body];
    let godAwake = 0; //희신 상태 2: 있음, 1: 대기, 0: 없음
    console.log("----(확인용) 천간 (오행용) ", skySetKey);
    console.log("----(확인용) 지장간 (오행용) ", landSetKey);
    console.log("----(확인용) 사용대기 지장간 (오행용) ", potKey);

    /****************************************************debugging***************************************************************/
    
    if(soul.find(e => useSet[e-1].god === "용신") !== undefined){
        mainGod = soul.find(e => useSet[e-1].god === "용신");
        skySetKey.splice(skySetKey.indexOf(mainGod), 1);
    }
    else if(spirit.find(e => useSet[e-1].god === "용신") !== undefined){
        mainGod = spirit.find(e => useSet[e-1].god === "용신");
        landSetKey.splice(landSetKey.indexOf(mainGod), 1);
    }
    else{
        console.log("ERROR");
    }

    let msg1 = "";
    
    if(soul.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = soul.find(e => useSet[e-1].god === "희신");
        skySetKey.splice(skySetKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[nowGod-1].key}`;
        mainMsg.push(msg1);
        godAwake = 2;
    }
    else if(spirit.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = spirit.find(e => useSet[e-1].god === "희신");
        landSetKey.splice(landSetKey.indexOf(nowGod), 1);
        msg1 = `(${skyTag[orderID-1].name}${skyTag[nowGod-1].name}) ${useSet[nowGod-1].key}`;
        subMsg.push(msg1);
        godAwake = 2;
    }
    else if(body.find(e => useSet[e-1].god === "희신") !== undefined){
        nowGod = body.find(e => useSet[e-1].god === "희신");
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

    if(soul.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = soul.find(e => useSet[e-1].god === "지속");
        skySetKey.splice(skySetKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}) ${useSet[befGod-1].key}`;
        mainMsg.push(msg2);
    }
    else if(spirit.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = spirit.find(e => useSet[e-1].god === "지속");
        landSetKey.splice(landSetKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}) ${useSet[befGod-1].key}`;
        subMsg.push(msg2);
    }
    else if(body.find(e => useSet[e-1].god === "지속") !== undefined){
        befGod = body.find(e => useSet[e-1].god === "지속");
        potKey.splice(potKey.indexOf(befGod), 1);
        msg2 = `(${skyTag[befGod-1].name}${skyTag[orderID-1].name}△) ${useSet[befGod-1].key}`;
        potenMsg.push(msg2);
    }
    else{
        console.log("지속 없음");
        msg2 = "";
    }

    let msg3 = "";

    if(soul.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = soul.find(e => useSet[e-1].god === "중화1");
        skySetKey.splice(skySetKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}) ${useSet[knowGod-1].key}`;
        mainMsg.push(msg3);
    }
    else if(spirit.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = spirit.find(e => useSet[e-1].god === "중화1");
        landSetKey.splice(landSetKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}) ${useSet[knowGod-1].key}`;
        subMsg.push(msg3);
    }
    else if(body.find(e => useSet[e-1].god === "중화1") !== undefined){
        knowGod = body.find(e => useSet[e-1].god === "중화1");
        potKey.splice(potKey.indexOf(knowGod), 1);
        msg3 = `(${skyTag[knowGod-1].name}${skyTag[orderID-1].name}△) ${useSet[knowGod-1].key}`;
        potenMsg.push(msg3);
    }
    else{
        console.log("중화 없음");
        msg3 = "";
    }

    let msg4 = "";

    if(soul.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = soul.find(e => useSet[e-1].god === "확장");
        skySetKey.splice(skySetKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}) ${useSet[nextGod-1].key}`;
        mainMsg.push(msg4);
    }
    else if(spirit.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = spirit.find(e => useSet[e-1].god === "확장");
        landSetKey.splice(landSetKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}) ${useSet[nextGod-1].key}`;
        subMsg.push(msg4);
    }
    else if(body.find(e => useSet[e-1].god === "확장") !== undefined){
        nextGod = body.find(e => useSet[e-1].god === "확장");
        potKey.splice(potKey.indexOf(nextGod), 1);
        msg4 = `(${skyTag[orderID-1].name}${skyTag[nextGod-1].name}△) ${useSet[nextGod-1].key}`;
        potenMsg.push(msg4);
    }
    else{
        console.log("확장 없음");
        msg4 = "";
    }


    if(soul.find(e => useSet[e-1].god === "기신1") !== undefined){
        console.log("용신의 음양기신 있음");
        let x = soul.find(e => useSet[e-1].god === "기신1");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg1);
    }
    else if(spirit.find(e => useSet[e-1].god === "기신1") !== undefined){
        console.log("용신의 음양기신 있음");
        let x = spirit.find(e => useSet[e-1].god === "기신1");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg1);
    }
    else if(body.find(e => useSet[e-1].god === "기신1") !== undefined){
        console.log("용신의 음양기신 있음");
        let x = body.find(e => useSet[e-1].god === "기신1");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg1);
    }
    else{
        console.log("용신의 음양기신 없음");
        xmsg1 = "";
    }
    
    if(soul.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = soul.find(e => useSet[e-1].god === "기신2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg2);
    }
    else if(spirit.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = spirit.find(e => useSet[e-1].god === "기신2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg2);
    }
    else if(body.find(e => useSet[e-1].god === "기신2") !== undefined){
        let x = body.find(e => useSet[e-1].god === "기신2");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg2);
    }
    else{
        console.log("희신의 음양기신 없음");
        xmsg2 = "";
    }

    if(soul.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = soul.find(e => useSet[e-1].god === "중화2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(xmsg3);
    }
    else if(spirit.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = spirit.find(e => useSet[e-1].god === "중화2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}) ${useSet[x-1].key}`;
        subMsg.push(xmsg3);
    }
    else if(body.find(e => useSet[e-1].god === "중화2") !== undefined){
        let x = body.find(e => useSet[e-1].god === "중화2");
        potKey.splice(potKey.indexOf(x), 1);
        xmsg3 = `(${skyTag[x-1].name}${skyTag[orderID-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(xmsg3);
    }
    else{
        console.log("중화 기신 없음");
        xmsg3 = "";
    }

    if(soul.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = soul.find(e => useSet[e-1].god === "한신1");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        umsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(umsg1);
    }
    else if(spirit.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = spirit.find(e => useSet[e-1].god === "한신1");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        umsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}) ${useSet[x-1].key}`;
        subMsg.push(umsg1);
    }
    else if(body.find(e => useSet[e-1].god === "한신1") !== undefined){
        let x = body.find(e => useSet[e-1].god === "한신1");
        potKey.splice(potKey.indexOf(x), 1);
        umsg1 = (isTalent === undefined) ? `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}` : `(${skyTag[x-1].name}${skyTag[nowGod-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(umsg1);
    }
    else{
        console.log("용신의 상극기신 없음");
        umsg1 = "";
    }
    
    if(soul.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = soul.find(e => useSet[e-1].god === "한신2");
        skySetKey.splice(skySetKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        mainMsg.push(umsg2);
    }
    else if(spirit.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = spirit.find(e => useSet[e-1].god === "한신2");
        landSetKey.splice(landSetKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}) ${useSet[x-1].key}`;
        subMsg.push(umsg2);
    }
    else if(body.find(e => useSet[e-1].god === "한신2") !== undefined){
        let x = body.find(e => useSet[e-1].god === "한신2");
        potKey.splice(potKey.indexOf(x), 1);
        umsg2 = `(${skyTag[orderID-1].name}${skyTag[x-1].name}△) ${useSet[x-1].key}`;
        potenMsg.push(umsg2);
    }
    else{
        console.log("희신의 상극기신 없음");
        umsg2 = "";
    }


    /****************************************************debugging***************************************************************/
    //격국 통변
    //일간, 격용신, 격상신, 격기신, 상신기신, 격구신
    let frameSet =[]; 
    let frameMsg = ""
    frameSet.push(myID);

    let posSky = ["時干 투간", "月干 투간", "年干 투간"];

    if(mObj.id%3 === 0){
        
        let fix = landTag[mObj.id-1].duty[2].idN;
        console.log("生支月", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령 `);
        let checkOriginSky = ideaRole.find(e => e === fix);
        if(checkOriginSky !== undefined){
            console.log(`生支月 용사 ${skyTag[fix-1].name}${skyTag[fix-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === fix))]} `);
            frameSet.push(fix);
            frameMsg = `生支月 용사 ${skyTag[fix-1].name}${skyTag[fix-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === fix))]} `;
        }
        else{
            console.log(`生支月 용사 ${skyTag[fix-1].name}${skyTag[fix-1].type} `);
            frameSet.push(fix);
            frameMsg = `生支月 용사 ${skyTag[fix-1].name}${skyTag[fix-1].type} `;
        }

    }

    if(mObj.id%3 === 1){
        
        let v = landTag[mObj.id-1].duty[dty].idN;
        console.log("旺支月 ", `${landTag[mObj.id-1].duty[dty].name}${skyTag[v-1].type} 사령 `);
        if(dty===0 && ideaRole.find(e => e === v) !== undefined && skyTag[myID-1].type !== skyTag[v-1].type){
            console.log(`旺支月 용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === v))]} `);
            frameSet.push(v);
            frameMsg = `旺支月 용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === v))]} `;
        }
        else{
            let k = landTag[mObj.id-1].duty[2].idN;
            console.log(`旺支月 용사 ${skyTag[k-1].name}${skyTag[k-1].type} `);
            frameSet.push(k);
            frameMsg = `旺支月 용사 ${skyTag[k-1].name}${skyTag[k-1].type} `;
        }
    }

    
    if(mObj.id%3 === 2){
        
        console.log("庫支月", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령 `);
        if(triu.length !== 0 && skyTag[myID-1].type !== skyTag[landTag[mObj.id-1].duty[1].idN-1].type){
            //중기 용사 (숫자)
            let cnt = landTag[mObj.id-1].duty[1].idN;
            let hcnt = cnt-1;
            //투간여부
            let checkOriginSky = ideaRole.find(e => e === cnt);
            let checkOtherSky = ideaRole.find(e => e === hcnt);
            //투간여부에 따른 용사 (숫자)
            if(checkOriginSky !== undefined){
                console.log(`庫支月 中氣 용사 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === cnt))]} `);
                frameSet.push(cnt);
                frameMsg = `庫支月 中氣 용사 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === cnt))]} `;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`庫支月 中氣 용사 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === hcnt))]} `);
                frameSet.push(hcnt);
                frameMsg = `庫支月 中氣 용사 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === hcnt))]} `;
            }
            else{
                console.log(`庫支月 中氣 용사 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} `);
                frameSet.push(cnt);
                frameMsg =`庫支月 中氣 용사 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} `;
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
            let checkOriginSky = ideaRole.find(e => e === v);
            let checkOtherSky = ideaRole.find(e => e === h);
            if(checkOriginSky !== undefined){
                console.log(`庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === v))]} `);
                frameSet.push(v);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === v))]} `;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === h))]} `);
                frameSet.push(h);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[ideaRole.indexOf(ideaRole.find(e => e === h))]} `;
            }
            else{
                console.log(`庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[v-1].name}${skyTag[v-1].type} `);
                frameSet.push(v);
                frameMsg = `庫支月${(mod_dty===0) ? " ":" 주왕 "} ${skyTag[v-1].name}${skyTag[v-1].type} `;
            }
        }
    }

    /****************************************************debugging***************************************************************/
    // 
    // 구응성패
    let s = roles[frameSet[0]]
    let rs = roles[frameSet[0]-1].mr.find(e => e.id == frameSet[1]-1).tag
    console.log("----격: ", frame.find(e => e.tag === rs).fr);
    frameSet.push(frame.find(e => e.tag === rs).fr);
    frameSet.push(frame.find(e => e.tag === rs).A);
    frameSet.push(frame.find(e => e.tag === rs).B);
    frameSet.push(frame.find(e => e.tag === rs).C);
    frameSet.push(frame.find(e => e.tag === rs).D);
    
    // frameSet = 일간id, 격용신id, 격국, 상신, 구신기신, 상신기신, 구신
    console.log("---- 격국 구응성패 세트: ", frameSet);
    


    /*****************************************다시 정의***********************************************/
    console.log("----일간 제외 천간 (육신용)", skys)
    console.log("----근 제외 지장간 (육신용) ", mens)
    console.log("----근 제외 사용대기 지장간 (육신용) ", lands)
    console.log("----근 제외 월지 지장간 (육신용) ", stage)



    /*****************************************다시 정의***********************************************/
    

    let typeRole = [];
    let wtypeRole = [];
    let untypeRole = [];
    let stypeRole = [];
    
    // 상신
    for(var i=0; i<skys.length; i++){
        let x = skyTag[skys[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            typeRole.push('A');
        }
        
    }
    for(var i=0; i<mens.length; i++){
        let x = skyTag[mens[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            wtypeRole.push('A');
        }
        
    }
    for(var i=0; i<lands.length; i++){
        let x = skyTag[lands[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            untypeRole.push('A');
        }
        
    }
    for(var i=0; i<stage.length; i++){
        let x = skyTag[stage[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[3]){
            stypeRole.push('A');
        }
        
    }
    //구신
    for(var i=0; i<skys.length; i++){
        let x = skyTag[skys[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            typeRole.push('D');
        }
        
    }
    for(var i=0; i<mens.length; i++){
        let x = skyTag[mens[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            wtypeRole.push('D');
        }
        
    }
    for(var i=0; i<lands.length; i++){
        let x = skyTag[lands[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            untypeRole.push('D');
        }
        
    }
    for(var i=0; i<stage.length; i++){
        let x = skyTag[stage[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[6]){
            stypeRole.push('D');
        }
        
    }
    //상신기신
    for(var i=0; i<skys.length; i++){
        let x = skyTag[skys[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            typeRole.push('C');
        }
        
    }
    for(var i=0; i<mens.length; i++){
        let x = skyTag[mens[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            wtypeRole.push('C');
        }
        
    }
    for(var i=0; i<lands.length; i++){
        let x = skyTag[lands[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            untypeRole.push('C');
        }
        
    }
    for(var i=0; i<stage.length; i++){
        let x = skyTag[stage[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[5]){
            stypeRole.push('C');
        }
        
    }
    //구신기신
    for(var i=0; i<skys.length; i++){
        let x = skyTag[skys[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            typeRole.push('B');
        }
        
    }
    for(var i=0; i<mens.length; i++){
        let x = skyTag[mens[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            wtypeRole.push('B');
        }
        
    }
    for(var i=0; i<lands.length; i++){
        let x = skyTag[lands[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            untypeRole.push('B');
        }
        
    }
    for(var i=0; i<stage.length; i++){
        let x = skyTag[stage[i]-1].id;
        let y = roles[myID-1].mr.find(e => e.id === x-1);
        if(y.tag === frameSet[4]){
            stypeRole.push('B');
        }
        
    }
    
    // 활용가능 천간의 구응성패
    console.log("----활용가능 천간의 구응성패", typeRole);
    // 활용가능 지지의 구응성패
    console.log("----활용가능 지지의 구응성패", wtypeRole);
    // 상태 대기 천간의 구응성패
    console.log("----상태 대기 천간의 구응성패", untypeRole);
    // 상태 대기 천간의 구응성패
    console.log("----활용가능 월지의 구응성패", stypeRole);

    let roleMsg = "";
    let uroleMsg ="";
    let htmlMsg = "";

    // 상신과 구신 유무에 대한 통변 방법
    let roleSky = [];
    let roleLand = [];
    let roleStage = [];

    // 길신격, 흉신격
    let follower = (frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格") ? false : true;

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        roleMsg += (typeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]} ` : ``)
        + (typeRole.find(e => e === 'D') ? ` 구신 ${frameSet[6]} ` : ``)
        + (typeRole.find(e => e === 'C') ? ` 상신기신 ${frameSet[5]} ` : ``)
        + (typeRole.find(e => e === 'B') ? ` 구신기신 ${frameSet[4]} ` : ``)
        
        let a = (typeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (typeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (typeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (typeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleSky = [a, b, c, d];


    }
    else{
        roleMsg += (typeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]} ` : ``)
        + (typeRole.find(e => e === 'D') ? ` 구신 ${frameSet[6]} ` : ``)
        + (typeRole.find(e => e === 'C') ? ` 상신기신 ${frameSet[5]} ` : ``)
        + (typeRole.find(e => e === 'B') ? ` 격기신 ${frameSet[4]} ` : ``)

        let a = (typeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (typeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (typeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (typeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleSky = [a, b, c, d];


    }

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        roleMsg += ((wtypeRole.find(e => e === 'A') !== undefined && stypeRole.find(e => e === 'A') === undefined) ? ` 상신(지지) ${frameSet[3]} ` : ``)
        + ((wtypeRole.find(e => e === 'D') !== undefined && stypeRole.find(e => e === 'D') === undefined) ? ` 구신(지지) ${frameSet[6]} ` : ``)
        + ((wtypeRole.find(e => e === 'C') !== undefined && stypeRole.find(e => e === 'C') === undefined) ? ` 상신기신(지지) ${frameSet[5]} ` : ``)
        + ((wtypeRole.find(e => e === 'B') !== undefined && stypeRole.find(e => e === 'B') === undefined) ? ` 구신기신(지지) ${frameSet[4]} ` : ``)

        let a = (wtypeRole.find(e => e === 'A') !== undefined && stypeRole.find(e => e === 'A') === undefined) ? 1: 0; 
        let b = (wtypeRole.find(e => e === 'B') !== undefined && stypeRole.find(e => e === 'B') === undefined) ? 1: 0; 
        let c = (wtypeRole.find(e => e === 'C') !== undefined && stypeRole.find(e => e === 'C') === undefined) ? 1: 0; 
        let d = (wtypeRole.find(e => e === 'D') !== undefined && stypeRole.find(e => e === 'D') === undefined) ? 1: 0; 
        roleLand = [a, b, c, d];

        
    }
    else{
        roleMsg += ((wtypeRole.find(e => e === 'A') && stypeRole.find(e => e === 'A') === undefined) ? ` 상신(지지) ${frameSet[3]} ` : ``)
        + ((wtypeRole.find(e => e === 'D') !== undefined && stypeRole.find(e => e === 'D') === undefined) ? ` 구신(지지) ${frameSet[6]} ` : ``)
        + ((wtypeRole.find(e => e === 'C') !== undefined && stypeRole.find(e => e === 'C') === undefined) ? ` 상신기신(지지) ${frameSet[5]} ` : ``)
        + ((wtypeRole.find(e => e === 'B') !== undefined && stypeRole.find(e => e === 'B') === undefined) ? ` 격기신(지지) ${frameSet[4]} ` : ``)

        let a = (wtypeRole.find(e => e === 'A') !== undefined && stypeRole.find(e => e === 'A') === undefined) ? 1: 0; 
        let b = (wtypeRole.find(e => e === 'B') !== undefined && stypeRole.find(e => e === 'B') === undefined) ? 1: 0; 
        let c = (wtypeRole.find(e => e === 'C') !== undefined && stypeRole.find(e => e === 'C') === undefined) ? 1: 0; 
        let d = (wtypeRole.find(e => e === 'D') !== undefined && stypeRole.find(e => e === 'D') === undefined) ? 1: 0; 
        roleLand = [a, b, c, d];


    }

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        roleMsg += (stypeRole.find(e => e === 'A') ? ` 상신(월지) ${frameSet[3]} ` : ``)
        + (stypeRole.find(e => e === 'D') ? ` 구신(월지) ${frameSet[6]} ` : ``)
        + (stypeRole.find(e => e === 'C') ? ` 상신기신(월지) ${frameSet[5]} ` : ``)
        + (stypeRole.find(e => e === 'B') ? ` 구신기신(월지) ${frameSet[4]} ` : ``)
        
        let a = (stypeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (stypeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (stypeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (stypeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleStage = [a, b, c, d];


    }
    else{
        roleMsg += (stypeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]} ` : ``)
        + (stypeRole.find(e => e === 'D') ? ` 구신(월지) ${frameSet[6]} ` : ``)
        + (stypeRole.find(e => e === 'C') ? ` 상신기신(월지) ${frameSet[5]} ` : ``)
        + (stypeRole.find(e => e === 'B') ? ` 격기신(월지) ${frameSet[4]} ` : ``)

        let a = (stypeRole.find(e => e === 'A') !== undefined) ? 1: 0; 
        let b = (stypeRole.find(e => e === 'B') !== undefined) ? 1: 0; 
        let c = (stypeRole.find(e => e === 'C') !== undefined) ? 1: 0; 
        let d = (stypeRole.find(e => e === 'D') !== undefined) ? 1: 0; 
        roleStage = [a, b, c, d];


    }

    if(frameSet[2] === "偏官格" || frameSet[2] === "傷官格" || frameSet[2] === "羊刃格" || frameSet[2] === "建祿格"){
        uroleMsg += (untypeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]}△ ` : ``)
        + (untypeRole.find(e => e === 'D') ? ` 구신 ${frameSet[6]}△ ` : ``)
        + (untypeRole.find(e => e === 'C') ? ` 상신기신 ${frameSet[5]}△ ` : ``)
        + (untypeRole.find(e => e === 'B') ? ` 구신기신 ${frameSet[4]}△ ` : ``)
        
        

    }
    else{
        uroleMsg += (untypeRole.find(e => e === 'A') ? ` 상신 ${frameSet[3]}△ ` : ``)
        + (untypeRole.find(e => e === 'D') ? ` 구신 ${frameSet[6]}△ ` : ``)
        + (untypeRole.find(e => e === 'C') ? ` 상신기신 ${frameSet[5]}△ ` : ``)
        + (untypeRole.find(e => e === 'B') ? ` 격기신 ${frameSet[4]}△ ` : ``)



    }


    console.log("----천간 구응성패", roleSky)
    console.log("----지장간 구응성패", roleLand);
    console.log("----월지 구응성패", roleLand);
    console.log("----구응성패 종합메세지: ", roleMsg);


     /****************************************************debugging***************************************************************/
    //근왕 판단

    let self = (skyTag[myID-1].type === pObj[0].type)|| (skyTag[myID-1].type === pObj[1].type) || (skyTag[myID-1].type === pObj[3].type)
    console.log("근왕 판단", self);


    rp = RolePlay(myID, frameSet[2], typeRole, wtypeRole, untypeRole, stypeRole, skys, mens, self, isTalent);

    

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
    frontMsg += `${skyTag[nowGod-1].name}${skyTag[nowGod-1].type}`;
    if(godAwake == 2){
        frontMsg += ` 喜神 O `;
    }
    else if(godAwake == 1){
        frontMsg += ` 喜神 △ `;
    }
    else{
        frontMsg += ` 喜神 X `;
    }
    

    document.getElementById("debug2").innerHTML = "※ 타고난 재능 (오행) ※" +"<br/>"+ 
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
        
        document.getElementById("debug3").innerHTML += subMsg[i] + " 늘 발휘 합니다." + "<br/>";
    }

    if(potenMsg.length !== 0){
        document.getElementById("debug3").innerHTML +=  "때가 된다면, ";
    }

    for(var i=0; i<potenMsg.length; i++){
        
        document.getElementById("debug3").innerHTML += potenMsg[i] + "도 발휘 할 수 있습니다." + "<br/>";
    }

    
    // 삼합 방합 충 풀이
    if(triu.length !==0 && opps.length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 실력이 점진적으로 더 업데이트 되어 전문 기술력을 갖춥니다. " + "<br/>" 
    }
    else if(triu.length !==0 && opps.length ===0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "꾸준히 능력 개발해 중년 이후 실력을 갖춥니다. " + "<br/>";
    }

    if(sqrs.length !==0 && opps.length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 인맥 및 세력이 우호적으로 더 업데이트 되어 넓은 인맥과 세력으로 발전됩니다. " + "<br/>";
    }
    else if(sqrs.length !==0 && opps.length ===0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 우호세력이 있어서 중년 이후 지위를 갖춥니다. " + "<br/>";
    }
    
    if(triu.length ===0 && sqrs.length ===0 && opps.length !==0) {
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "자신의 능력과 주변 환경을 늘 새롭게 바꿔갑니다. " + "<br/>";
    }

    if(jups.length !==0){
        document.getElementById("debug3").innerHTML += 
        addArray[Math.floor(Math.random() * addArray.length)] + "주변 사람과 모의해 사적 관계에서 공적 관계로 만들어가지만, 관계 스트레스에 유념해야 합니다. " + "<br/>";
    }

    document.getElementById("debug4").innerHTML = "※ 사회적 역할 (구응성패) ※"+"<br/>"+  
    "( " + frameSet[2] + roleMsg + uroleMsg  + " )" +"<br/>";



    
    // 구응성패 천간과 지지 위치별 특성
    if(ideaRole.find(e => e === frameSet[1]) !== undefined){
        if(follower === false && (roleSky[0] === 1 || roleStage[0] === 1)){
            htmlMsg += `(격투간 상신O) 자신의 사회적 자격 타이틀을 의식하는 직업적 사명감과 그에 맞는 실질적인 역할 수행도 잘 하려고 합니다.` + "<br/>";
        }
        else if(follower === true && (roleLand[0] === 1 || roleStage[0] === 1)){
            htmlMsg += `(격투간 상신O) 자신의 사회적 역할 타이틀을 의식하는 직업적 사명감과 그에 맞는 실질적인 역할 수행도 잘 하려고 합니다.` + "<br/>";
        }
        else{
            if(roleSky[0] === 0 && roleLand[0] === 0 && roleStage[0] === 0){

                if(godAwake === 2){
                    htmlMsg += `(격투간 상신X) ${ (follower === false) ? `사회적 자격 보다` : `사회적 역할 수행 보다` } 오로지 자신의 적성과 능력으로 직업으로 정하여 살아갑니다. 직업적 사명감 보다, 재능에 대한 사명감이 강합니다. ` + "<br/>";
                }
                else if(godAwake === 1){
                    htmlMsg += `(격투간 상신X) ${ (follower === false) ? `사회적 자격 보다` : `사회적 역할 수행 보다` } 점점 재능에 대한 사명감을 찾아가며 살아 갑니다. ` + "<br/>";
                }
                else if(godAwake === 0){
                    
                    htmlMsg += `(격투간 상신X) ${ (follower === false) ? `사회적 자격 보다` : `사회적 역할 수행 보다` } 오로지 자신이 하고 싶어 하는 것을 직업으로 삼아 더 존중받으려는 마음이 강합니다. ` + "<br/>";
                }
            }
            
        }

        
    }


    if((roleSky[0] === 1 && roleLand[0] === 1) || roleStage[0] === 1){
        htmlMsg += `(상신 건왕) ${(follower === false) ? `자격에 맞는 역할을` : `주어진 사회적 역할을`} 확실하게 잘하며 살아가는데 문제 없고 매우 바쁜 삶을 살아갑니다. ` + "<br/>";
    }
    else if(roleSky[0] === 1 && roleLand[0] === 0){
        htmlMsg += `(천간 상신) ${(follower === false) ? `사회적 자격을 의식적으로 염두해 능동적으로 살아갑니다. ` : `사회적 역할의 후광과 노력 대비 사명감에 살아갈 수 있습니다. `}` + "<br/>";
    }
    else if(roleSky[0] === 0 && roleLand[0] === 1){
        htmlMsg += `(지지 상신) ${(follower === false) ? `자신의 사회적 자격과 사명감을 실무를 통해 쌓아갑니다. ` : `자신에게 주어진 사회적 역할을 묵묵히 수행하며 살아갑니다. `}` + "<br/>";
    }
    
    if(isTalent !== undefined && (roleSky[0] === 1 ||  roleLand[0] === 1 || roleStage[0] === 1)){
        htmlMsg += `(희신O 상신O) 자신의 재능을 살린 일에 직업적 사명감으로 일치되어 살아갑니다.` + "<br/>";
    }
    else if(isTalent === undefined && (roleSky[0] === 1 ||  roleLand[0] === 1 || roleStage[0] === 1)){
        htmlMsg += `(희신X 상신O) 자신이 하고 싶은 일을 삼아 직업적 사명감을 갖습니다.` + "<br/>";
    }

    // 상신 vs. 상신기신
    //상신O 상신기신O
    if((roleSky[0] === 1 || roleLand[0] === 1 || roleStage[0] === 1) && (roleSky[2] === 1 || roleLand[2] === 1  || roleStage[2] === 1)){
        htmlMsg += `(상신O 상신기신O) ${(follower === false) ? `사회적 자격을 갖췄을 뿐만 아니라, 자격 능력 검증받아 지위를 갖추려고 합니다. ` : `사회적 역할 충실히 하면서, 역할에 대한 실력이 있어 유리한 환경 혜택으로 이득을 취하려고 합니다. `}` + "<br/>";
    }// 상신O 상신기신X
    else if((roleSky[0] === 1 || roleLand[0] === 1 || roleStage[0] === 1) && (roleSky[2] === 0 && roleLand[2] === 0 || roleStage[2] === 0)){
        htmlMsg += `(상신O 상신기신X) ${(follower === false) ? `자격 능력에 경쟁과 검증 지속적이지 않으므로, 보수적이고 안일함에 빠질 수 있습니다. ` : `역할 능력에 경쟁과 검증이 지속적이지 않으므로, 보수적이고 안일함에 빠질 수 있습니다. `}` + "<br/>";
    } //상신X 상신기신O
    else if((roleSky[0] === 0 && roleLand[0] === 0 && roleStage[0] === 0) && (roleSky[2] === 1 || roleLand[2] === 1 || roleStage[2] === 1)){
        htmlMsg += `(상신X 상신기신O) ${(follower === false) ? `사회적 자격 능력 대비 부족한 평가를 받아 지위를 갖추기 어렵습니다. ` : `사회적 역할 대비 검증이 많아 지속적인 경쟁력을 갖추기 어려워 합니다. `}` + "<br/>";
    }else if((roleSky[0] === 0 && roleLand[0] === 0 && roleStage[0] === 0) && (roleSky[2] === 0 && roleLand[2] === 0 || roleStage[2] === 0)){
        htmlMsg += `(상신X 상신기신X) ${(follower === false) ? `사회가 기대할 만한 자격이 주어지지 않았고 능력에 대한 경쟁력을 갖추지 않아도 됩니다. ` : `자신의 사회적 역할에 누가 기대하지 않았고 역할 능력에 경쟁력이 일정 부분 이상 의미 없습니다. `}` + "<br/>";
    }

    
    // 상신, 상신기신
    if((roleSky[0] === 1 || roleStage[0] === 1) && (roleSky[2] === 1 || roleStage[2] === 1)){
        htmlMsg += `(천간 상신 + 천간 상신기신) ${(follower === false) ? `사회적 자격에 경쟁력있는 능력을 갖추는데` : `실력있는 사회적 역할 수행에 환경적`} 혜택이 타고났지만 오만에 빠지지 않도록 주의해야 합니다. ` + "<br/>";
    }// 상신, 지장간 상신기신
    else if((roleSky[0] === 1 || roleStage[0] === 1) && roleLand[2] === 1){
        htmlMsg += `(천간 상신 + 지장간 상신기신) ${(follower === false) ? `자격에 맞는 역할 대비 검증된 능력이 부족하여` : `역할에 대한 의욕 대비 성과가 부족하여`} 하극상이나 아랫사람의 무시가 있을 수 있습니다. ` + "<br/>";
    } //상신 지장간, 상신기신
    else if((roleSky[2] === 1 || roleStage[2] === 1) && roleLand[0] === 1){
        htmlMsg += `(지장간 상신 + 천간 상신기신) ${(follower === false) ? `자격 능력에 대한 지속적인 검증으로 경쟁력을 갖추게 됩니다.` : `주어진 역할에 대한 실력을 쌓아 좋은 성과를 만들어 냅니다.`} ` + "<br/>";
    } //지장간 상신O 지장간 상신기신O
    else if(roleLand[0] === 1 && roleLand[2] === 1){
        htmlMsg += `(지장간 상신 + 지장간 상신기신) ${(follower === false) ? `사회적 자격 능력에 검증하는 환경에 스스로 놓이게 해야` : `사회적 역할에 대한 실무능력이 우수해`} 자신의 몸 값이 높아집니다. ` + "<br/>";
    }


    
    if(roleSky[3] === 1 && roleLand[3] === 1 || roleStage[3] === 1){
        htmlMsg += `(구신 통근) ${(follower === false) ? `자격 능력으로 부터 얻은 지위에` : `주어진 역할 수행에`} 쉽게 지쳐 사람과 경쟁을 기피할 수 있습니다. ` + "<br/>";
    }
    else if(roleSky[3] === 1 && roleLand[3] === 0){
        htmlMsg += `(천간 구신) ${(follower === false) ? `자격 능력으로 부터 얻은 지위에` : `자신의 역할 수행과 성과에`}  스스로 고평가해서 다른 사람과 자신을 비교하려고 합니다. ` + "<br/>";
    }
    
    // 상신 vs. 구신
    //상신O 구신O
    if((roleSky[0] === 1 || roleLand[0] === 1  || roleStage[0] === 1) && (roleSky[3] === 1 || roleLand[3] === 1 || roleStage[3] === 1)){
        htmlMsg += `(상신O 구신O) ${(follower === false) ? `능동적으로 자신의 사회적 자격과 세력를 얻고자 합니다. ` : `능동적으로 자신의 주어진 역할 수행과 그에 맞는 성과를 냅니다. `}` + "<br/>";
    }// 상신O 구신X
    else if((roleSky[0] === 1 || roleLand[0] === 1  || roleStage[0] === 1) && (roleSky[3] === 0 && roleLand[3] === 0 && roleStage[3] === 0)){
        htmlMsg += `(상신O 구신X) ${(follower === false) ? `자신의 사회적 자격 능력으로 세력을 얻는데 부족합니다. ` : `자신의 역할 수행 노력에 대한 댓가와 성과는 부족합니다. `}` + "<br/>";
    } //상신X 구신X
    else if(roleSky[0] === 0 && roleLand[0] === 0 && roleStage[0] === 0 && roleSky[3] === 0 && roleLand[3] === 0 && roleStage[3] === 0){
        if(isTalent === undefined){
            htmlMsg += `(상신X 구신X) 누구도 자신의 ${(follower === false) ? `사회적 자격과 그에 맞는 세력을 ` : `주어진 역할과 그에 따른 성과를 `} 기대하는 사람 없습니다. 하고 싶은 일을 하며 살아 갑니다. 이번 생은 휴가 오셨습니다. ` + "<br/>";
        }
        else{
            htmlMsg += `(상신X 구신X) 누구도 자신의 ${(follower === false) ? `사회적 자격과 그에 맞는 세력을 ` : `주어진 역할과 그에 따른 성과를 `} 기대하는 사람 없습니다. 자신의 재능과 적성을 삼아 능력 위주로 살아 갑니다. 이번 생은 휴가 오셨습니다. ` + "<br/>";
        }
        
    } 
    

    // 구신 vs. 격기신, 구신기신
    //구신O 구신기신O
    if((roleSky[3] === 1 || roleLand[3] === 1 || roleStage[3] === 1) && (roleSky[1] === 1 || roleLand[1] === 1 || roleStage[1] === 1)){
        htmlMsg += `(구신O ${(follower === false) ? `구신기신O) 사회적 지위 능력으로 경쟁자를 누르는 정복자 및 최종 승리자입니다. ` : `격기신O) 객관적 검증을 잘 받아서 자신의 역할 수행에 따른 성과를 유지합니다. `}` + "<br/>";
    }// 구신O 구신기신X
    else if((roleSky[3] === 1 || roleLand[3] === 1) && (roleSky[1] === 0 && roleLand[1] === 0 && roleStage[1] === 1)){
        htmlMsg += `(구신O ${(follower === false) ? `구신기신X) 사회적 지위로 세력을 모으는데 방어적이고 소극적으로 움직입니다. ` : `격기신X) 역할수행에 대한 성과를 검증받는데 방어적이고 소극적으로 움직입니다. `}`  + "<br/>";
    } //구신X 구신기신O 
    else if((roleSky[3] === 0 && roleLand[3] === 0 && roleStage[3] === 0) && (roleSky[1] === 1 || roleLand[1] === 1 || roleStage[1] === 1)){
        htmlMsg += `(구신X ${(follower === false) ? `구신기신O) 지위 능력을 갖추기 보다 섣불리 경쟁자를 점유하려는 마음이 더 큽니다. ` : `격기신O) 역할수행에 대한 성과에 대해 주변에서 시기 질투가 나타납니다. `}` + "<br/>";
    }else if((roleSky[3] === 0 && roleLand[3] === 0 && roleStage[3] === 0) && (roleSky[1] === 0 && roleLand[1] === 0 && roleStage[1] === 0)){
        htmlMsg += `(구신X ${(follower === false) ? `구신기신X) 세력과 지위를 갖출 일이 없고, 경쟁자를 점유하고 정복할 일이 없습니다. ` : `격기신X) 자신의 성과에 기대하는 사람 별로 없고, 지속적인 성과 검증을 해야 하는 일은 아닙니다. `}` + "<br/>";
    }
    
    

    // 구신, 구신기신
    if((roleSky[3] === 1 && roleSky[1] === 1) || (roleStage[3] === 1 && roleStage[1] === 1)){
        htmlMsg += `(천간 구신 + 천간 ${(follower === false) ? `격기신) 폼생폼사형으로, 지위 능력으로 얻은 점유율에 과시하는 면이 있습니다. ` : `격기신) 폼생폼사형으로, 자신의 성과를 과시하는 면이 있습니다. `}` + "<br/>";
    }// 구신, 지장간 구신기신
    else if((roleSky[3] === 1 || roleStage[3] === 1) && roleLand[1] === 1){
        htmlMsg += `(천간 구신 + 지장간 ${(follower === false) ? `구신기신) 지위 능력을 발휘해 더 큰 점유을 높여 경쟁자를 압도할 수 있습니다. `: `격기신) 자신의 성과를 인정 받아 더 큰 지위로 나아갈 수 있습니다. `}` + "<br/>";
    } //구신 지장간, 구신기신
    else if((roleSky[1] === 1 || roleStage[1] === 1) && roleLand[3] === 1){
        htmlMsg += `(지장간 구신 + 천간 ${(follower === false) ? `구신기신) 일하면서 생기는 지위 능력 문제와 잘못이 자꾸 드러납니다. ` : `격기신) 일하면서 생기는 성과 문제와 잘못이 자꾸 드러납니다. `}` + "<br/>";
    } //지장간 구신O 지장간 구신기신O
    else if(roleLand[3] === 1 && roleLand[1] === 1){
        htmlMsg += `(지장간 구신 + 지장간 ${(follower === false) ? `구신기신) 검증과 시련을 통해 자신의 사회적 가치를 증명합니다. ` : `격기신) 검증과 시련을 통해 자신의 사회적 가치를 증명합니다. `}` + "<br/>";
    }
    



    document.getElementById("debug5").innerHTML =  htmlMsg;


    document.getElementById('useGod').innerText = orderID;
    document.getElementById('useGod').style.color = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('god_state').innerText = godAwake;
    document.getElementById('god_state').style.color = `rgba(${0}, ${0}, ${0}, ${0})`;

    // 용신과, 희신 상태 (2:있음, 1:상태, 0: 없음)
    // console.log("orderID", orderID, "godAwake", godAwake);


    document.getElementById("debug6").innerHTML = "※ 사회 관계력 (생화극제) ※"+"<br/>"+ 
    " (" + frameMsg + frameSet[2]+" " + ((self===false) ? "근약 " : "근왕 ") + `${skyTag[myID-1].name}${skyTag[myID-1].type} 일간` + ")" + "<br/>";
    document.getElementById("debug7").innerHTML = rp;


    let roleAwake = ((roleSky[0]===1 || roleLand[0] ===1 || roleStage[0] ===1) ? "1":"0");
    roleAwake += ((roleSky[1]===1 || roleLand[1] ===1 || roleStage[1] ===1) ? "1":"0");
    roleAwake += ((roleSky[2]===1 || roleLand[2] ===1 || roleStage[2] ===1) ? "1":"0");
    roleAwake += ((roleSky[3]===1 || roleLand[3] ===1 || roleStage[3] ===1) ? "1":"0");
    
    document.getElementById('god_state').innerText += roleAwake;


    TextRole();
    TextUse();
    TextYears();
    console.log("=======================================Divination======================================="); 
}

function out(id_tag){
    var print = document.getElementById(id_tag).children[0];
    var srcName = print.getAttribute('src');
    let imgFileName = srcName.split('.')[0].split('/')[2]; // ex) img/modern/p01.png에서 imgFileName == p01
    let stem_branch = imgFileName.split('')[0]; // i == 천간, p == 지지
    var result =[stem_branch, imgFileName.substring(1,3)]       
    return result;                                               
}


function ShowLucks(){
    
    const lucksTitle = document.getElementById("Lucks_main");
    const lucks = document.getElementById("year_lucks");

    if(lucksTitle.innerHTML === '' && lucks.innerHTML === ''){
       
    }
    else{
        
        lucksTitle.innerHTML = '';
        lucks.innerHTML = '';
    }
}


function ClickRole(num){
    document.getElementById('GLucks').innerHTML = ""
    var test = document.getElementById("debug4")
    var text = test.textContent.split("※ 사회적 역할 (구응성패) ※")[1].split(' ');
    var name = text[1];
    var myIds = document.getElementById("SKY1").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;

    var code = document.getElementById('god_state').innerText.split('');
    code.shift()

    let roleAwake = [];
    roleAwake.push((code[3] ==="1") ? 1:0) //격 (구신유무)
    roleAwake.push((code[0] ==="1") ? 1:0) //상신 (상신유무)
    roleAwake.push((code[3] ==="1") ? 1:0) //구신기신 (구신유무)
    roleAwake.push((code[0] ==="1") ? 1:0) //상신기신 (상신유무)
    roleAwake.push((code[3] ==="1") ? 1:0) //구신 (구신유무)

    var frm = frame.find(e => e.fr === name)
    var info = [frm.fr, frm.A, frm.B, frm.C, frm.D]
    let fTypes = [frame.find(e => e.fr === info[0]).type, frame.find(e => e.tag === info[1]).type, frame.find(e => e.tag === info[2]).type, frame.find(e => e.tag === info[3]).type, frame.find(e => e.tag === info[4]).type];

    var ids = String(num).padStart(3, '0') + "i";
    var idl = String(num).padStart(3, '0') + "p";

    var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;
    var landNum= document.getElementById(idl).src.split('img')[1].split("/")[2].split(".")[0].split('p')[1]*1;
    var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
    var srtype = frame.find(e => e.tag === skyR).type

    var ikey = fTypes.indexOf(fTypes.find(e=> e === srtype));
    var title = skyTag[skyNum-1].name + landTag[landNum-1].name;
    var result = `${title} (${luck2[ikey].name}) ${luck2[ikey].key[roleAwake[ikey]]}`
    document.getElementById('GLucks').innerHTML = result;
}

function TextRole(){
    
    var test = document.getElementById("debug4")
    var text = test.textContent.split("※ 사회적 역할 (구응성패) ※")[1].split(' ');
    var name = text[1];
    var myIds = document.getElementById("SKY1").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;

    let mon_img = document.getElementById("SKY2").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    let first_img = document.getElementById("001i").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    let goLuck = false;

    if((mon_img > first_img) || (mon_img === 1 && first_img === 10)){
        goLuck = false;
    }else{
        goLuck = true;
    }

    var code = document.getElementById('god_state').innerText.split('');
    code.shift()

    let roleAwake = [];
    roleAwake.push((code[3] ==="1") ? 1:0) //격 (구신유무)
    roleAwake.push((code[0] ==="1") ? 1:0) //상신 (상신유무)
    roleAwake.push((code[3] ==="1") ? 1:0) //구신기신 (구신유무)
    roleAwake.push((code[0] ==="1") ? 1:0) //상신기신 (상신유무)
    roleAwake.push((code[3] ==="1") ? 1:0) //구신 (구신유무)

    var frm = frame.find(e => e.fr === name)
    var info = [frm.fr, frm.A, frm.B, frm.C, frm.D]
    let fTypes = [frame.find(e => e.fr === info[0]).type, frame.find(e => e.tag === info[1]).type, frame.find(e => e.tag === info[2]).type, frame.find(e => e.tag === info[3]).type, frame.find(e => e.tag === info[4]).type];
    
    var result = [];
    if(goLuck === true){
        for(var num = 1; num<=12; num++){

            var i = num;
            if(i>10) i-10;
            var ids = String(i).padStart(3, '0') + "i";
            var idl = String(i).padStart(3, '0') + "p";

            var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;
            var landNum= document.getElementById(idl).src.split('img')[1].split("/")[2].split(".")[0].split('p')[1]*1;

            var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
            var srtype = frame.find(e => e.tag === skyR).type
        
            var ikey = fTypes.indexOf(fTypes.find(e=> e === srtype));
            var title = skyTag[skyNum-1].name + landTag[landNum-1].name;
            var key = `${title} (${luck2[ikey].name}): ${luck2[ikey].key[roleAwake[ikey]]}`

            result.push(key);
            
        }
        
    }
    else{
        for(var num = 1; num<=12; num++){

            var i = num;
            if(i<=0) i+10;
            var ids = String(i).padStart(3, '0') + "i";
            var idl = String(i).padStart(3, '0') + "p";

            var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;
            var landNum= document.getElementById(idl).src.split('img')[1].split("/")[2].split(".")[0].split('p')[1]*1;

            var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
            var srtype = frame.find(e => e.tag === skyR).type
        
            var ikey = fTypes.indexOf(fTypes.find(e=> e === srtype));
            var title = skyTag[skyNum-1].name + landTag[landNum-1].name;
            var key = `${title} (${luck2[ikey].name}): ${luck2[ikey].key[roleAwake[ikey]]}`

            result.push(key);
        }
    }


    return result;
}

function ClickUse(num){
    document.getElementById("Lucks_main").innerText = "";
    
    let _useGod = document.getElementById('useGod').innerText*1;
    let _state = document.getElementById('god_state').innerText.split('');
    _state = _state.shift()*1;

    //용신과 희신 상태 (2, 1, 0)
    // console.log("_useGod, _state ",_useGod, _state)
    var start = "j"+String(num).padStart(2, '0');
    var year= document.getElementById(start).innerText*1;

    let call = luck1.find(e => e.name === skyTag[_useGod-1].name);
    let godSet = Object.keys(call).filter(e => e !== 'name');
    
    var ids = String(num).padStart(3, '0') + "ji";
    var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;
    var t = godSet.indexOf(godSet.find(e => skyTag[(e*1)-1].type === skyTag[skyNum-1].type))
    
    let gap = 0;
    if(_useGod === 10 || _useGod === 1) gap = 4;
    if(_useGod === 2 || _useGod === 3) gap = 2;
    if(_useGod === 4 || _useGod === 7) gap = 2;
    if(_useGod === 8 || _useGod === 9) gap = 2;

    let divin = [];
    if(_useGod === 10) divin = [["생화", "생화"], ["기제", "미제"], ["돈후", "윤택"], ["수원", "수원"], ["생화", "생화"]];
    if(_useGod === 1) divin = [["생화", "생화"], ["발생", "인화"], ["소토", "소토"], ["간벌", "벽조"], ["전수", "생화"]];
    if(_useGod === 2) divin = [["발생", "발생"], ["발생", "인정"], ["소토", "소토"], ["전정", "절지"], ["전수", "생화"]];
    if(_useGod === 3) divin = [["발생", "발생"], ["발생", "발생"], ["간새", "차양"], ["단련", "단련"], ["미제", "기제"]];
    if(_useGod === 4) divin = [["인화", "인정"], ["제련", "제련"], ["매광", "홍로"], ["제련", "제련"], ["기제", "미제"]];
    if(_useGod === 7) divin = [["벽갑", "전정"], ["단련", "제련"], ["심원", "심원"], ["제련", "제련"], ["도세", "수원"]];
    if(_useGod === 8) divin = [["벽조", "절지"], ["단련", "제련"], ["매금", "유원"], ["도세", "도세"], ["도세", "수원"]];
    if(_useGod === 9) divin = [["전수", "전수"], ["미제", "기제"], ["제방", "탁수"], ["도세", "도세"], ["도세", "도세"]];

    let text = call[godSet[t]][_state];
    let str = [...text];

    if(text.indexOf("(확장운)") >= 0){
        var lastYear = (year%2===0) ? year-gap : year-gap-1;
        str.splice(text.indexOf("(확장운)"), 5, `${lastYear}년 ~ ${lastYear+1}년`);
        
    }
    let s = year+57
    let iY = (s%10 === 0) ? 10 : s%10;
    let pY = (s%12 === 0) ? 12 : s%12;
    var result = `${year}년 ${skyTag[iY-1].name}${landTag[pY-1].name} (${divin[t][year%2]}): ${str.join('')}`;
    document.getElementById('Lucks_main').innerHTML = result;
}

function TextUse(){
    let _useGod = document.getElementById('useGod').innerText*1;
    let _state = document.getElementById('god_state').innerText.split('');
    _state = _state.shift()*1;
    let firstYear = document.getElementById('j01').innerText*1;
    //용신과 희신 상태 (2, 1, 0)
    // console.log("_useGod, _state ",_useGod, _state)

    // 1,2  3,4  5,6  7,8  9,10
    let skyNum = (firstYear+57)%10;
    if(skyNum === 0) skyNum = 10;
    

    let callSet = luck1.find(e => e.name === skyTag[_useGod-1].name);
    var skyE = skyTag[skyNum-1].type;

    // 천간 숫자(skyNum)만 알면, 월령용신의 용희신 운세 객체 (callSet)중, 어떤 운세 객체들인지 갖고 올수 있는 변수.
    var inx = Object.keys(callSet).find(e=> skyTag[e-1].type === skyE);
    // 천간 숫자 skyNum 경우, 월령용신의 용희신 운세
    var keySet = callSet[inx][_state];

    // 확장운, 지속운, 용신운, 희신운, 중화운 오행 순서로 됨(목:0~수:4)
    //Object.keys(callSet).indexOf(inx)


    // 이 리스트를 가지고 전체 10년동안 각각 운세객체에 어떤 천간으로 넣어야 할지 만들어줌
    var listKeys = [];
    for(var i=0; i<10; i++){
        let add = (skyNum+i>10) ? skyNum+i-10 : skyNum+i;
        var p = skyTag[add-1].type;
        // x는 최종적으로 각 년간이 운세객체에 적용될 다른 천간으로 대체됨.
        let x = Object.keys(callSet).find(e=> skyTag[e-1].type === p)
        // 10년 짜리 운세 객체에 적용할 천간 숫자 리스트 
        

        listKeys.push(x)
    }

    var result = []
    // 본격적인 운세 문구들 모음
    for(var i=0; i<10; i++){

        let inx = listKeys[i]
        let newYear = firstYear+i;
        let keyStr = callSet[inx][_state];
        let str = [...keyStr];

        let gap = 0;
        if(_useGod === 10 || _useGod === 1) gap = 4;
        if(_useGod === 2 || _useGod === 3) gap = 2;
        if(_useGod === 4 || _useGod === 7) gap = 2;
        if(_useGod === 8 || _useGod === 9) gap = 2;

        if(keyStr.indexOf("(확장운)") >= 0){
            var lastYear = (newYear%2===0) ? newYear-gap : newYear-gap-1;
            str.splice(keyStr.indexOf("(확장운)"), 5, `${lastYear}년 ~ ${lastYear+1}년`)
        }

        let divN = Object.keys(callSet).indexOf(inx);
        let divin = [];
        if(_useGod === 10) divin = [["생화", "생화"], ["기제", "미제"], ["돈후", "윤택"], ["수원", "수원"], ["생화", "생화"]];
        if(_useGod === 1) divin = [["생화", "생화"], ["발생", "인화"], ["소토", "소토"], ["간벌", "벽조"], ["전수", "생화"]];
        if(_useGod === 2) divin = [["발생", "발생"], ["발생", "인정"], ["소토", "소토"], ["전정", "절지"], ["전수", "생화"]];
        if(_useGod === 3) divin = [["발생", "발생"], ["발생", "발생"], ["간새", "차양"], ["단련", "단련"], ["미제", "기제"]];
        if(_useGod === 4) divin = [["인화", "인정"], ["제련", "제련"], ["매광", "홍로"], ["제련", "제련"], ["기제", "미제"]];
        if(_useGod === 7) divin = [["벽갑", "전정"], ["단련", "제련"], ["심원", "심원"], ["제련", "제련"], ["도세", "수원"]];
        if(_useGod === 8) divin = [["벽조", "절지"], ["단련", "제련"], ["매금", "유원"], ["도세", "도세"], ["도세", "수원"]];
        if(_useGod === 9) divin = [["전수", "전수"], ["미제", "기제"], ["제방", "탁수"], ["도세", "도세"], ["도세", "도세"]];

        let s = newYear+57
        let iY = (s%10 === 0) ? 10 : s%10;
        let pY = (s%12 === 0) ? 12 : s%12;
        result.push(`${newYear}년 ${skyTag[iY-1].name}${landTag[pY-1].name} (${divin[divN][newYear%2]}): ${str.join('')}`);
    }

    return result;
}

function ClickYears(num){
    document.getElementById("year_lucks").innerText = "";
    var test = document.getElementById("debug4")
    var text = test.textContent.split("※ 사회적 역할 (구응성패) ※")[1].split(' ');
    var myIds = document.getElementById("SKY1").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    //=================================================================================================================

    var sky0 = document.getElementById("SKY0").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var sky2 = document.getElementById("SKY2").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var sky3 = document.getElementById("SKY3").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var land0 = document.getElementById("LAND0").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;
    var land1 = document.getElementById("LAND1").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;
    var land3 = document.getElementById("LAND3").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;

    var up = [sky0, sky2, sky3]
    var dn = [land0, land1, land3]
    var base1 = (up.filter(e=> skyTag[e-1].type === skyTag[myIds-1].type) > 0 ) ? true : false;
    var base2 = (dn.filter(e=> landTag[e-1].type === skyTag[myIds-1].type) > 0 ) ? true : false;
    //양인 건록격 용 비겁향 근왕 체크
    // console.log("비겁향 ", up, "근왕", dn)
    // console.log("비겁향 ", base1, "근왕", base2)
    //=================================================================================================================
    var ids = String(num).padStart(3, '0') + "ji";
    var skyNum= document.getElementById(ids).src.split('img')[1].split("/")[2].split(".")[0].split('i')[1]*1;

    var firstYear = document.getElementById("j01").innerText*1;
    var clickID = "j"+ String(num).padStart(2, '0');
    var nowYear = document.getElementById(clickID).innerText*1;

    var code = document.getElementById('god_state').innerText.split('');
    code.shift()
    code = code.map(Number);

    // 구응성패 코드: 상신, 구신기신, 상신기신, 구신
    // console.log(code)

    text.shift()
    text.pop()
    var name = text.splice(0,1).toString()
    // 일간 숫자, 격이름, 선택한 칸의 천간 숫자
    //console.log(myIds, name, skyNum)
    
    // skyR = 육신 srtype 육친성
    var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
    var srtype = frame.find(e => e.tag === skyR).type

    // callSet 격별 운세 객체(꾸러미)
    var callSet = frame.find(e=> e.fr === name).lucks;
    // 클릭한(srtype) 부분에 따른 운세 객체(꾸러미)
    var keySet = callSet.find(e=> e.tag === srtype)
    // 클릭한(srtype) 운세 객체 중 말구(key) 가져오기
    var key = keySet.key

    // 클릭한(srtype) 육신이 운세 객체 순서에 몇번째 해당하는지 숫자
    var inx = callSet.indexOf(keySet);
    
    //대운 첫년도 inx
    let firstNum = (firstYear+57)%10;
    if(firstNum === 0) firstNum = 10;


    let keyStr = "";
    let divin = "";
    if(name === "羊刃格" || name === "建祿格"){
        divin = srtype;
        if(inx === 0 || inx === 2){
            keyStr = (base1 === true) ?  key[1] : key[0]
        }
        else if(inx === 1){
            keyStr = (base2 === true) ? key[1] : key[0]
        }
        else{
            keyStr=key[0]
        }
    }
    else if(name === "傷官格"){
        divin = srtype;
        if(inx<3){
            keyStr=key[code[0]]
        }
        else{
            keyStr=key[0]
        }
    }
    else if(name === "偏官格"){
        divin = srtype;
        if(inx>=2){
            keyStr=key[code[0]]
        }
        else{
            keyStr=key[0]
        }
    }
    else{
        let divMsg = ["泄化制化", "生化", "格", "泄化", "生化制化"];
        divin = divMsg[inx]
        if(inx===1 || inx ===2 || inx === 4){
            keyStr=key[code[0]];
        }
        else{
            keyStr=key[code[3]];
        }
       
    }

    let str = [...keyStr];
        
    if(keyStr.indexOf("(0)") >= 0){
        let iy = nowYear -(nowYear%2) - 2
        
        str.splice(keyStr.indexOf("(0)"), 3, `${iy}년 ~ ${iy+1}년`)
    }
    else if(keyStr.indexOf("(1)") >= 0){
        let iy = nowYear -(nowYear%2) - 6
        
        str.splice(keyStr.indexOf("(1)"), 3, `${iy}년 ~ ${iy+3}년`)
    }
    else if(keyStr.indexOf("(3)") >= 0){
        let iy = nowYear -(nowYear%2) - 4
        
        str.splice(keyStr.indexOf("(3)"), 3, `${iy}년 ~ ${iy+1}년`)
    }
    else if(keyStr.indexOf("(5)") >= 0){
        let iy = nowYear -(nowYear%2) + 4
        
        str.splice(keyStr.indexOf("(5)"), 3, `${iy}년 ~ ${iy+1}년`)
    }

    var result = `(${divin}運): ${str.join('')}`;

    document.getElementById("year_lucks").innerHTML = result;
}


function TextYears(){
    var test = document.getElementById("debug4")
    var text = test.textContent.split("※ 사회적 역할 (구응성패) ※")[1].split(' ');
    text.shift()
    text.pop()
    
    // myIds 일간 숫자
    var myIds = document.getElementById("SKY1").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;

    // firstYear 현재 대운 첫 년도
    let firstYear = document.getElementById('j01').innerText*1;

    // code 구응성패 코드
    var code = document.getElementById('god_state').innerText.split('');
    code.shift()
    code = code.map(Number);

    // name 격이름
    var name = text.splice(0,1).toString()
    //=================================================================================================================
    //양인 건록격 용 비겁향 근왕 체크
    var sky0 = document.getElementById("SKY0").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var sky2 = document.getElementById("SKY2").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var sky3 = document.getElementById("SKY3").src.split('img')[1].split('/')[2].split('.')[0].split('i')[1]*1;
    var land0 = document.getElementById("LAND0").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;
    var land1 = document.getElementById("LAND1").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;
    var land3 = document.getElementById("LAND3").src.split('img')[1].split('/')[2].split('.')[0].split('p')[1]*1;

    var up = [sky0, sky2, sky3]
    var dn = [land0, land1, land3]
    var base1 = (up.filter(e=> skyTag[e-1].type === skyTag[myIds-1].type) > 0 ) ? true : false;
    var base2 = (dn.filter(e=> landTag[e-1].type === skyTag[myIds-1].type) > 0 ) ? true : false;
    
    // console.log("비겁향 ", up, "근왕", dn)
    // console.log("비겁향 ", base1, "근왕", base2)
    //=================================================================================================================

    // callSet 격별 운세 객체(꾸러미)
    var callSet = frame.find(e=> e.fr === name).lucks;

    // 1,2  3,4  5,6  7,8  9,10
    // skyNum 현재 대운 첫년도의 천간 숫자
    let skyNum = (firstYear+57)%10;
    if(skyNum === 0) skyNum = 10;
    
    // skyR = 육신 (ex 正財) srtype 육친성 (ex 財星)
    var skyR = roles[myIds-1].mr.find(e => e.id === (skyNum-1)).tag;
    var srtype = frame.find(e => e.tag === skyR).type

    // 대운첫년도 천간 육신(srtype) 부분에 따른 운세 객체(꾸러미)
    var keySet = callSet.find(e=> e.tag === srtype)
    // 대운첫년도 천간 육신(srtype) 운세 객체 중 말구(key) 가져오기
    var key = keySet.key

    // 대운첫년도 천간 육신(srtype) 육신이 운세 객체 순서에 몇번째 해당하는지 숫자
    var inx = callSet.indexOf(keySet);

    var listKeys = [];
    for(var i=0; i<5; i++){
        let add = (i+inx>4) ? i-5 : i;
        if(skyNum%2===0 && i===0){
            listKeys.push(add+inx)
        }
        else if(skyNum%2===0 && i===4){
            listKeys.push(add+inx)
            listKeys.push(add+inx)
            listKeys.push(inx)
        }
        else{
            listKeys.push(add+inx)
            listKeys.push(add+inx)
        }
    }

    
    var result = [];

    var keyStr = "";
    
    for(var i=0; i<10; i++){
       var callkey = callSet[listKeys[i]].key;

       var divin = "";
        if(name === "羊刃格" || name === "建祿格"){
            divin = callSet[listKeys[i]].tag;
            if(listKeys[i] === 0 || listKeys[i] === 2){
                keyStr = (base1 === true) ?  callkey[1] : callkey[0]
            }
            else if(listKeys[i] === 1){
                keyStr = (base2 === true) ? callkey[1] : callkey[0]
            }
            else{
                keyStr=callkey[0]
            }
        }
        else if(name === "傷官格"){
            divin = callSet[listKeys[i]].tag;
            if(listKeys[i]<3){
                keyStr=callkey[code[0]]
            }
            else{
                keyStr=callkey[0]
            }
        }
        else if(name === "偏官格"){
            divin = callSet[listKeys[i]].tag;
            if(listKeys[i]>=2){
                keyStr=callkey[code[0]]
            }
            else{
                keyStr=callkey[0]
            }
        }
        else{
            let divMsg = ["泄化制化", "生化", "格", "泄化", "生化制化"];
            divin = divMsg[listKeys[i]];
            if(listKeys[i]===1 || listKeys[i] ===2 || listKeys[i] === 4){
                keyStr=callkey[code[0]]
            }
            else{
                keyStr=callkey[code[3]]
            }
        
        }

        let str = [...keyStr];
        let nowYear = firstYear+i;
        if(keyStr.indexOf("(0)") >= 0){
            let iy = nowYear -(nowYear%2) - 2
            str.splice(keyStr.indexOf("(0)"), 3, `${iy}년 ~ ${iy+1}년`)
        }
        else if(keyStr.indexOf("(1)") >= 0){
            let iy = nowYear -(nowYear%2) - 6
            str.splice(keyStr.indexOf("(1)"), 3, `${iy}년 ~ ${iy+3}년`)
        }
        else if(keyStr.indexOf("(3)") >= 0){
            let iy = nowYear -(nowYear%2) - 4
            str.splice(keyStr.indexOf("(3)"), 3, `${iy}년 ~ ${iy+1}년`)
        }
        else if(keyStr.indexOf("(5)") >= 0){
            let iy = nowYear -(nowYear%2) + 4
            str.splice(keyStr.indexOf("(5)"), 3, `${iy}년 ~ ${iy+1}년`)
        }

        let s = nowYear+57
        let iY = (s%10 === 0) ? 10 : s%10;
        let pY = (s%12 === 0) ? 12 : s%12;
        //result.push(`${(nowYear)}년 ${skyTag[iY-1].name}${landTag[pY-1].name} (${divin}運): ${str.join('')}`);
        result.push(`(${divin}運): ${str.join('')}`);

    }
    
    return result;
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


function RolePlay(_myID, _frameSet2, _typeRole, _wtypeRole, _untypeRole, _stypeRole, _skys, _mens, _self, _isTalent){
    // myID, frameSet[2], typeRole, wtypeRole, untypeRole, skys, mens, self
    let role_playMsg = "";
    let a = roles[_myID-1].mr.find(e => (e.tag === "食神")).id +1
    let b = roles[_myID-1].mr.find(e => (e.tag === "傷官")).id +1
    let c = roles[_myID-1].mr.find(e => (e.tag === "偏財")).id +1
    let d = roles[_myID-1].mr.find(e => (e.tag === "正財")).id +1
    let man1 = roles[_myID-1].mr.find(e => (e.tag === "偏官")).id +1
    let man2 = roles[_myID-1].mr.find(e => (e.tag === "正官")).id +1
    let woman1 = roles[_myID-1].mr.find(e => (e.tag === "偏印")).id +1
    let woman2 = roles[_myID-1].mr.find(e => (e.tag === "正印")).id +1
    let one = roles[_myID-1].mr.find(e => (e.tag === "比肩")).id +1
    let two = roles[_myID-1].mr.find(e => (e.tag === "劫財")).id +1


    if(_frameSet2 === "偏官格"){
        let role = true;
        let another = false;
        if(_self === true){
            if(_typeRole.find(e => e === 'A') || _stypeRole.find(e => e === 'A')){
                role_playMsg += "(根旺 偏官格 食神制殺) 모두가 인정하는 자격증/학위/공식적 경력이 필수 입니다. 실적으로 남들이 못하는 특별한 일을 수행합니다."+"</br>"
                if(_typeRole.find(e => e === 'B') || _stypeRole.find(e => e === 'B')){
                    role_playMsg += "(根旺 偏官格 財生殺) 조직에서 리더로 성장합니다. 아마추어를 이끄는 리더로 활동합니다."+"</br>";
                }
                 
                if(_typeRole.find(e => e === 'D') || _stypeRole.find(e => e === 'D')){
                    role_playMsg += "(根旺 偏官格 比食) 비상한 두뇌와 독창적인 전략으로 자신이 속한 조직을 더 큰 세상으로 진출합니다."+"</br>";
                }
            }
            else{
                role_playMsg += "(根旺 偏官格 無食) 파벌로부터 인허가 받지 못해 월권으로 기득권 마찰이 생깁니다."+"</br>";
            }
            
        }
        else{
            if(_typeRole.find(e => e === 'C') || _stypeRole.find(e => e === 'C')){
                another = true;
                role_playMsg += "(根弱 偏官格 殺印相生) 조직을 리드하기 보다 뒤에서 보좌하며 기발한 아이디어로 자신의 업적을 만듦니다."+"</br>"; 

            }
            else if(_typeRole.find(e => e === 'A') || _stypeRole.find(e => e === 'A')){
                role_playMsg += "(根弱 偏官格 食神) 불안 대비책으로 많은 시간 낭비해 스스로 극복이 아니라 조직의 보호를 받아야 합니다."+"</br>";
            }
        }

        if(role === true){
            if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) && _skys.find(e => skyTag[e-1].id !== skyTag[man1-1].id) && another === false){
                role_playMsg += "(偏官格 財官俱沒) 한순간으로 직장을 잃거나 가정 식구가 흩어지며, 경력 단절 등 사회로부터 자신의 신분이 잊혀지게 됩니다."+"</br>";
            }
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(偏官格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성과 거리가 멀 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(偏官格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }


    }
    else if(_frameSet2 === "傷官格"){
        let role = false;
        if(_self !== true){
            if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                role = true;
                if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) !== undefined || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type) !== undefined){
                    if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman1-1].id)){
                        role_playMsg += (_typeRole.find(e => e === 'B') !== undefined || _stypeRole.find(e => e === 'B') !== undefined || _wtypeRole.find(e => e === 'B') !== undefined) ? `(根弱 傷官格 傷官合去) 조직에서 ` : `(根弱 傷官格 傷官合殺) 조직에서 `;
                        role_playMsg += (_wtypeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined) ? `실무적으로 인정받은 자신의 특기가 스카우트 되어 `: `자신의 특기가 스카우트 되어 `;
                        role_playMsg += (_typeRole.find(e => e === 'B') !== undefined || _stypeRole.find(e => e === 'B') !== undefined || _wtypeRole.find(e => e === 'B') !== undefined) ? `새로운 프로그램 및 법을 혁신하며 안정적인 생활을 유지하기 위해 살아갑니다.` : `납품, 대행, 공임, 생산권하라고 계약 성사되어 임무 수행합니다.`;
                    }
                    else if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman2-1].id)){
                        role_playMsg += (_typeRole.find(e => e === 'B') !== undefined || _stypeRole.find(e => e === 'B') !== undefined || _wtypeRole.find(e => e === 'B') !== undefined) ? `(根弱 傷官格 傷官佩印) 조직에 맞추고 주변인에게 맞추는 헌신적인 인물로 ` : `(根弱 傷官格 傷官合殺) 조직에 맞추고 주변인에게 맞추는 헌신적인 인물로 `;
                        role_playMsg += (_wtypeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined) ? `사회적 자격조건 실무적으로 허가 받아 `: `사회적 자격조건으로 허가 받아 `;
                        role_playMsg += (_typeRole.find(e => e === 'B') !== undefined || _stypeRole.find(e => e === 'B') !== undefined || _wtypeRole.find(e => e === 'B') !== undefined) ? `새로운 프로그램 및 법을 혁신하며 안정적인 생활을 유지하기 위해 살아갑니다.` : `납품, 대행, 공임, 생산권하라고 계약 성사되어 임무 수행합니다.`;
                    }
                    role_playMsg += "</br>";
                }
                else if(_mens.find(e => skyTag[e-1].type === skyTag[man1-2].type) === undefined){
                    role_playMsg += `(根弱 傷官格 傷官傷盡) 직업 경쟁력이 한정적이며 조직에 적합한 인재입니다.`;
                    if(_mens.find(e => skyTag[e-1].id === skyTag[man1-2].id) === undefined){
                        role_playMsg += `공임/납품/계약거래에 해지가 됩니다. `;
                    }
                    role_playMsg += "</br>";
                }
                

                if(_typeRole.find(e => e === 'D') || _stypeRole.find(e => e === 'D')){
                    role_playMsg += "(根弱 傷官格 劫傷) 조직의 안좋은 관행이나 유통구조를 개선해 혁신을 이끌지만 기득권의 마찰을 피할 수 없습니다."+"</br>";
                    if(_typeRole.find(e => e === 'C') && (_isTalent !== undefined)){
                        role_playMsg += "(根弱 傷官格 財剋印) 역사의 이름 남길 혁신의 주체가 되어 새로운 기득권으로 성장합니다. 만명 중 한명 인물 입니다."+"</br>";
                    }
                }  
            }
            else{
                if(_typeRole.find(e => e === 'B') || _wtypeRole.find(e => e === 'B')  || _stypeRole.find(e => e === 'B')){
                    role_playMsg += "(根弱 傷官格 傷官見官) 관행과 법규를 준하지 않고 허가 받지 않은 채, 하고 싶은 것을 하며 살아갑니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[man2-1].id)){
                    role_playMsg += "(根弱 傷官格 傷官加殺/駕殺) 현장전문가로 일장당권, 많은 일을 감당합니다."+"</br>";
                }
            }
        }
        else{
            role_playMsg += "(根旺 傷官格 異道) 조직의 규칙보다 개인 욕심 및 능력으로 독립하여 살아갑니다. 시장에 대한 이해력 높고, 자영업/유통업에 적합니다."+"</br>";
            if(((_typeRole.find(e => e === 'A') || _stypeRole.find(e => e === 'A')) || _wtypeRole.find(e => e === 'A')) && (_typeRole.find(e => e !== 'C') || _stypeRole.find(e => e === 'C'))  || _wtypeRole.find(e => e !== 'C')){
                role_playMsg += "(根旺 傷官格 佩印) 개업이 가능한 특기 가졌습니다."+"</br>";
            }
            if(((_typeRole.find(e => e === 'A') || _stypeRole.find(e => e === 'A')) || _wtypeRole.find(e => e === 'A')) && (_typeRole.find(e => e === 'C') || _stypeRole.find(e => e === 'C'))  || _wtypeRole.find(e => e === 'C')){
                role_playMsg += "(根旺 傷官格 財剋印) 개업에서 기업화까지 가능한 특기 가졌습니다."+"</br>";
            }
        }

        
        if(role === true){
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(傷官格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성 잃어 지탄 받을 수 있습니다."+"</br>";
            }

        }

        
    }
    else if(_frameSet2 === "羊刃格"){
        let role = false; 
        let another = false;
        
        if(_skys.find(e => skyTag[e-1].type === skyTag[_myID-1].type)){
            role_playMsg += "(羊刃格 比劫向) 세상의 약자를 지키는 체면과 이상을 버리고, 자신부터 챙깁니다. 점진적으로 자신의 전문성을 키우고자 합니다."+"</br>";
            
            if(_skys.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                another = true;
                role_playMsg += "(羊刃格 異道功名) 기술능력을 키워 전문가가 됩니다. (기술 기예 기능인, 도살장, 애견샵, 변호사, 의료인)"+"</br>";
            }

            if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                another = true;
                role_playMsg += "(羊刃格 異道功名) 지식능력을 키워 전문가가 됩니다. (학원, 서생, 기자, 작가, 변호사, 의료인)"+"</br>";
            }

            if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                role = true;
                role_playMsg += "(羊刃格 比劫向 用殺) 적십자와 같이 자신의 전문 능력으로 공익성 있는 일을 합니다. 개인이득과 자신을 먼저 챙긴 후, 대의를 그 다음에 지킵니다."+"</br>";
            }

            
        }
        else if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
            role = true;
            if(_skys.find(e => skyTag[e-1].id === skyTag[man1-1].id)){
                role_playMsg += "(羊刃格 露殺) 이상이 높으며 국가직 신분으로 공무원, 공공기관 나랏일 수행합니다."+"</br>";
            }
            else if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id)){
                role_playMsg += "(羊刃格 用官) 국가직 신분이 아니더라도, 학위를 갖췄거나 이상이 높으며 공익성 있는 일을 수행합니다."+"</br>";
            }
        }
        else if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
            role_playMsg += "(羊刃格 破格) 세상의 정보들이나 말과 글로 전하는 교육자, 작가, 기자 등으로 살 수 있습니다."+"</br>";
        }
        else{
            role_playMsg += "(羊刃格 破格) 주어진 일만 수행하나, 직업 찾기 어려워합니다."+"</br>";
        }

        if(role === true){
            if(_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e === 'D') !== undefined){
                role_playMsg += "(羊刃格 殺印相生) 직업 활동에 대한 준비력을 갖춰서, 중앙에서 일하거나, 조직 생활을 오래 유지 할 수 있습니다."+"</br>";
            }
            else{
                role_playMsg += "(羊刃格 制殺) 직업 활동에 대한 준비력이 소흘하여 조직 생활을 오래 유지 하기 어렵거나 직영이 아닌 대행업무로 일합니다."+"</br>";
            }
            
            if(_mens.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                role_playMsg += "(羊刃格 財生殺) 세상의 약자 보호를 수행하는 조직과 소속에서 지배력과 권한을 갖춥니다. (군인, 경찰, 사법부, 정보원, 국토  수호, 시민 보호)"+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) && _skys.find(e => skyTag[e-1].id !== skyTag[man1-1].id)){
                    role_playMsg += "(羊刃格 成格) 공공의 이익을 위해 자신을 희생하는 우두머리 급의 인물입니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) && _mens.find(e => skyTag[e-1].type !== skyTag[c-1].type) && another === false){
                role_playMsg += "(羊刃格 財官俱沒) 한순간으로 직장을 잃거나 가정 식구가 흩어지며, 경력 단절 등 사회로부터 자신의 신분이 잊혀지게 됩니다."+"</br>";
            }


            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(羊刃格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성 잃어 지탄 받을 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(羊刃格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }

        if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) && _mens.find(e => skyTag[e-1].type !== skyTag[c-1].type)){
            if(_skys.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                role_playMsg += (another === true) ? "(羊刃格 比劫食傷 爭財) 전문성을 바탕으로 시장환경 및 대외관계를 통해 " : "(羊刃格 食傷生財) "
                role_playMsg += "무역, 통상, 도매 등의 중간역할 담당하는 플랫폼효과로 수익을 높여갑니다."+"</br>";
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                role_playMsg += (another === true) ? "(羊刃格 印比劫 爭財) 지적능력을 함양하여 자신의 문하를 만들어가는 일을 하며 살아갑니다." +"</br>" : "";
            }
        }


        
    }
    else if(_frameSet2 === "建祿格"){
        let role = false;
        let another = false;

        if(_skys.find(e => skyTag[e-1].type === skyTag[_myID-1].type)){
            role_playMsg += "(建祿格 比劫向) 세상의 약자를 지키는 체면과 이상을 버리고, 자신부터 챙깁니다. 점진적으로 자신의 전문성을 키우고자 합니다."+"</br>";

            if(_skys.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                another = true;
                role_playMsg += "(建祿格 異道功名) 기술능력을 키워 전문가가 됩니다. (기술 기예 기능인, 직업훈련, 정신수양, 상담사)"+"</br>";
            }

            if(_skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
                another = true;
                role_playMsg += "(建祿格 異道功名) 지식능력을 키워 전문가가 됩니다. (학원, 서생, 기자, 작가, 변호사, 의료인)"+"</br>";
            }

            if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role = true;
                role_playMsg += "(建祿格 比劫向 用殺) 적십자와 같이 자신의 전문 능력으로 공익성 있는 일을 합니다. 개인이득과 자신을 먼저 챙긴 후, 대의를 그 다음에 지킵니다."+"</br>";
            }

            
        }
        else if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
            role = true;
            if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) || (_skys.find(e => skyTag[e-1].id === skyTag[man1-1].id) && _skys.find(e => skyTag[e-1].type === skyTag[a-1].type))){
                role_playMsg += "(建祿格 用官) 이상이 높으며 국가직 신분이나 학위를 갖췄고, 공무원, 공공기관 나랏일 수행합니다."+"</br>";
            }
            else{
                role_playMsg += "(建祿格 用殺) 국가직 신분이 아니더라도, 이상이 높으며 공익성 있는 일을 수행합니다."+"</br>";
            }
            
            
        }
        else if(_skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
            role_playMsg += "(建祿格 破格) 세상의 정보들이나 말과 글을 전하는 교육자, 작가, 기자 등으로 살아갑니다."+"</br>";
        }
        else{
            role_playMsg += "(建祿格 破格) 주어진 일을 수행하나, 직업을 찾기 어려워합니다."+"</br>";
        }

        if(role===true){
            if(_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e === 'D') !== undefined){
                role_playMsg += "(建祿格 官印相生) 직업 활동에 대한 준비력을 갖춰서, 중앙에서 일하거나, 조직 생활을 오래 유지 할 수 있습니다."+"</br>";
            }
            else{
                role_playMsg += "(建祿格 見官) 직업 활동에 대한 준비력이 소흘하여 조직 생활을 오래 유지 하기 어렵거나 직영이 아닌 대행업무로 일합니다."+"</br>";
            }

            if(_mens.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                role_playMsg += "(建祿格 財生官) 세상의 가치를 보호하는 조직과 소속에서 지배력과 권한을 갖춥니다. (교사, 관공서 서비스, 금감원, 헌법 수호, 교육업)"+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) && _skys.find(e => skyTag[e-1].id !== skyTag[man2-1].id)){
                    role_playMsg += "(建祿格 成格) 공공의 이익을 위해 자신을 희생하는 우두머리 급의 인물입니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[d-1].type) && _mens.find(e => skyTag[e-1].type !== skyTag[d-1].type) && another === false){
                role_playMsg += "(建祿格 財官俱沒) 한순간으로 직장을 잃거나 가정 식구가 흩어지며, 경력 단절 등 사회로부터 자신의 신분이 잊혀지게 됩니다."+"</br>";
                
            }

            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(建祿格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성 잃어 지탄 받을 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(建祿格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }
        
        if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) && _mens.find(e => skyTag[e-1].type !== skyTag[c-1].type)){
            if(_skys.find(e => skyTag[e-1].type === skyTag[a-1].type)){
                role_playMsg += (another === true) ? "(建祿格 比劫食傷 爭財) 전문성을 바탕으로 시장환경 및 대외관계를 통해 " : "(建祿格 食傷生財) "
                role_playMsg += "무역, 통상, 도매 등의 중간역할 담당하는 플랫폼효과로 수익을 높여갑니다."+"</br>";
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type)){
                role_playMsg += (another === true) ? "(建祿格 印比劫 爭財) 지적능력을 함양하여 자신의 문하를 만들어가는 일을 하며 살아갑니다." +"</br>" : "";
            }
        }
        
    }
    else if(_frameSet2 === "正官格"){
        let role = false;
        role_playMsg += "(正官格) 원리원칙에 어긋나거나 비도덕적인 행동에 대해 스트레스 받습니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 正官格) 조직에서 자신의 입지를 조금씩 다져나갑니다."+"</br>";
            if(_mens.find(e => skyTag[e-1].type === skyTag[d-1].type)){
                role = true;
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根弱 正官格 財生官) 조직내 사람 관계에 적응해야 하며 " : "(根弱 正官格 化財生官) 조직, 소속, 직무는 유지하며 직종 및 적성을 바꾸거나 다른 방식의 활동실적으로 수익을 높여 ";
                role_playMsg += "조직의 생리에 대한 이해도가 높습니다."+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                    role_playMsg += "(根弱 正官格 制劫) 경쟁력 있는 자신의 영역으로 지점, 본부장의 직위 혹은, 독립하여 자신의 사업을 할 수 있습니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 正官格 正官比肩合) 연대 참여로 용병술이며. 독립은 가능하나 동업의 형태입니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].id === skyTag[c-1].id) || _skys.find(e => skyTag[e-1].id === skyTag[d-1].id)){
                role_playMsg += "(根弱 正官格 財剋印) 아랫사람부터 중시하고, 조직에 자기 사익을 챙기니 도리어 하극상 마주합니다."+"</br>";
            }
        }
        else{
            role_playMsg += "(根旺 正官格) 보통의 삶입니다."+"</br>";
            if(_mens.find(e => skyTag[e-1].type === skyTag[woman2-1].type) || _skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type)){
                role = true;
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根旺 正官格 官印相生) 자신의 전문성을 공식적으로 허가받아 " : "(根旺 正官格 化官印相生) 타영역에서 쌓은 자신의 전문성을 도입하거나 직종 및 적성을 바꿔서 ";
                role_playMsg += "안정적인 생활을 선호하며, 공공기관이나 평생직장에서 근무하려 합니다."+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[b-1].id)){
                    role_playMsg += "(根旺 正官格 傷官佩印) 경쟁력 있는 전문 능력을 가졌지만, 시설관리 및 유지보수 등 전문능력으로 쉽게 처리 할 수 있는 안정적인 업무를 선호합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[a-1].id)){
                    role_playMsg += "(根旺 正官格 食正官合) 연대 참여로 재능 있는 사람을 아웃소싱하고 전문성있는 사람을 다루는 일을 합니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].id === skyTag[c-1].id) || _skys.find(e => skyTag[e-1].id === skyTag[d-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[c-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[d-1].id)){
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根旺 正官格 財生官) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다." : "(根旺 正官格 化財生官) 혼자서도 할수 있을 것 같아 독립합니다. 직종 및 적성을 바꾸거나 다른 방식의 활동실적으로 수익을 높여 자영업에 뛰어 듭니다.";
                role_playMsg += "</br>";
            }

        }

        if(role===true){
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(正官格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성과 거리가 멀 수 있습니다."+"</br>";
            }

            if(_skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)){
                if(_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5)){
                    role_playMsg += "(正官格 合殺留官) 협상을 통해 권력, 의무, 지위, 승패경쟁에 유리함을 얻습니다."+"</br>";
                }

                if(_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5)){
                    role_playMsg += "(正官格 貪合忘官) 여가 및 재물 사적욕심으로 신분과 체통을 잃을 수 있습니다."+"</br>";
                }

                if(_skys.find(e=> skyTag[e-1].id === skyTag[a-1].id)){
                    role_playMsg += "(正官格 去殺留官) 위험, 불필요, 각종 리스크 관리를 통해 조직과 가정의 안위를 지켜냅니다."+"</br>";
                }

            }
            
        }


    }
    else if(_frameSet2 === "偏財格"){
        role_playMsg += "(偏財格) 이익 추구형으로, 새로운 분야를 개척하기를 원합니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 偏財格) 조직에서 자신의 입지를 조금씩 다져나갑니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type))){
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根弱 偏財格 財生殺) 조직에 들어가 매뉴얼대로 행하며 배움을 가지고 " : "(根弱 偏財格 化財生官) 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 신분을 높여가며 ";
                role_playMsg += "자신의 꿈을 위한 과정을 거칩니다."+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 偏財格 制比) 경쟁을 통해 영역을 확보해 함께할 뜻이 맞는 사람을 모아 더 큰 세상으로 뻗고자 합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                    role_playMsg += "(根弱 偏財格 劫財合殺) 연대를 통해 영역확보입니다. 공동 설립, 기존의 업체 또는 유통망에 관여합니다."+"</br>";
                }
            }
            else{
                if((_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[a-1].id))){
                    role_playMsg += "(根弱 偏財格 食神生財) 조직에서 자신의 꿈을 키워야 하지만, 자신의 재능에 밑천을 보여서 영역 확보와 성과에 어려움을 겪습니다."+"</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[man1-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[c-1].type) !== undefined && _skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type) !== undefined){
                role_playMsg += "(偏財格 貪財壞印) 실력대비 욕심이 지나칩니다. 규칙을 어긴 행위나 무리하게 영역확장하기를 원해서 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
        else{
            role_playMsg += "(根旺 偏財格) 자신의 실력으로 자유로운 활동합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[a-1].type || _mens.find(e => skyTag[e-1].type === skyTag[a-1].type))){
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根旺 偏財格 食神生財) 자신의 고유 실력을 키워 타고난 사업가적 재능을 발휘합니다." : "(根旺 偏財格 化傷官生財) 시대 변화에 맞춘 자신의 개인기를 바꿔가며 사업가적 재능을 발휘합니다.";
                role_playMsg += "</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman1-1].id)){
                    role_playMsg += "(根旺 偏財格 財剋印) 사업 영역을 확보하기 위해 공격적 투자, 모 아니면 도 방식으로 일확천금 성향입니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman2-1].id)){
                    role_playMsg += "(根旺 偏財格 財印交雜) 연대를 통한 지분, 혹은 자금을 통한 투자 합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                    role_playMsg += "(根旺 偏財格 財生殺) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다."+"</br>";
                    role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D' || _wtypeRole.find(e => e=== 'D') !== undefined) !== undefined) ? "(根旺 偏財格 財生殺) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다." : "(根旺 偏財格 化財生官) 혼자서도 할 수 있을 것 같아 독립합니다. 조직, 부서, 직급을 바꿔가며 수익을 높여갑니다.";
                    role_playMsg += "</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[c-1].type) !== undefined && _skys.find(e => skyTag[e-1].type === skyTag[woman1-1].type) !== undefined){
                role_playMsg += "(偏財格 貪財壞印) 실력대비 욕심이 지나칩니다. 규칙을 어긴 행위나 무리하게 영역확장하기를 원해서 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
    }
    else if(_frameSet2 === "正財格"){
        role_playMsg += "(正財格) 안정적 삶과 경제성과 실용성을 추구하고 안정을 깨는 낭비를 경계합니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 正財格) 조직에서 안정적인 활동을 중시합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根弱 正財格 財生官) 조직에 들어가 매뉴얼대로 행하며 배움을 가지고 " : "(根弱 正財格 化財生殺) 조직생활에서 점점 경쟁이 치열한 환경에 진입함으로써 수익과 신분을 높여서 ";
                role_playMsg += "자신의 꿈을 위한 과정을 거칩니다."+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                    role_playMsg += "(根弱 正財格 制劫) 경쟁을 통해 영역을 확보해 함께할 뜻이 맞는 사람을 모아 더 큰 세상으로 뻗고자 합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 正財格 正官比肩合) 연대를 통해 영역확보입니다. 공동 설립, 기존의 업체 또는 유통망에 관여합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[b-1].id)){
                    role_playMsg += "(根弱 正財格 傷官生財) 조직에서 안정적으로 있길 원하지만, 시대 변화에 맞춰 자신의 재능 개발을 키워가는데 부진하고 어려움을 겪습니다."+"</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[d-1].type) !== undefined && _skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type) !== undefined){
                role_playMsg += "(正財格 貪財壞印) 실력대비 욕심이 지나칩니다. 규칙을 어긴 행위나 무리하게 영역확장하기를 원해서 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
        else{
            role_playMsg += "(根旺 正財格) 자신의 실력으로 변화하는 시대를 리드 합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[b-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[b-1].type)){
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根旺 正財格 傷官生財) 시대 변화에 맞춰 자신의 재능으로 미래를 위해 나아가 새로운 것을 개발 합니다." : "(根旺 正財格 化食神生財) 자신의 전문성과 적성 및 직종을 바꿔가며 사업가적 재능을 발휘합니다.";
                role_playMsg += "</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman2-1].id)){
                    role_playMsg += "(根旺 正財格 傷官佩印) 경쟁력 있는 안전 자산 확보해 회사 지분 및 신제품 이익을 통한 안정적 수입 구축합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman1-1].id)){
                    role_playMsg += "(根旺 正財格 傷官合去) 연대를 통한 지분, 혹은 자금을 통한 투자 합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                    role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根旺 正財格 財生官) 혼자서도 할 수 있을 것 같아 독립합니다. 자영업에 뛰어듭니다." : "(根旺 正財格 化財生殺) 혼자서도 할 수 있을 것 같아 독립합니다. 점점 경쟁이 치열한 환경에 진입함으로써 수익을 높여갑니다.";
                    role_playMsg += "</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[d-1].type) !== undefined && _skys.find(e => skyTag[e-1].type === skyTag[woman2-1].type) !== undefined){
                role_playMsg += "(正財格 貪財壞印) 실력대비 욕심이 지나칩니다. 규칙을 어긴 행위나 무리하게 소유하기만을 원해서 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
    }
    else if(_frameSet2 === "偏印格"){
        let role = false;
        role_playMsg += "(偏印格) 전략 전술 기획 능력이 있으며, 모든 일에 공감하고 지나치게 신념, 사상에 빠져들기 쉽습니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 偏印格) 세상 논리에 동조하며 자신을 감추고 조직생활을 합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                role = true;
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根弱 偏印格 殺印相生) 남들이 못하는 특수 임무를 수행하며 소수만이 할 수 있는 특수직입니다."+"</br>" : "";
                role_playMsg += (_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)) ? "(根弱 偏印格 化官印相生) 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 수행하며 소수만이 할 수 있는 특수직입니다."+"</br>" : "";
                if(_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[a-1].id)){
                    role_playMsg += "(根弱 偏印格 奪食) 직업재교육, 재수학원 등 실력부족으로 낙오된 사람을 이끌어 줘야합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[b-1].id)){
                    role_playMsg += "(根弱 偏印格 傷官合去) 실력있는 사람을 섭외하고, 자신은 전문가 용역 관리에만 집중합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 偏印格 印比) 자신의 마음에 사로 잡혀 자기가 하고싶은 것만 하는 매니아가 됩니다."+"</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[c-1].type) !== undefined){
                role_playMsg += "(偏印格 貪財壞印) 준비대비 욕심이 지나칩니다. 허술하게 세상의 변화를 읽고 틈새시장을 공략하는 각종 투자 및 재테크로 인해 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
        else{
            role_playMsg += "(根旺 偏印格) 매니아적인 성향으로 자신이 하고 싶은 것에 집중합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                role_playMsg += "(根旺 偏印格 印比) 자신이 좋아하는 일을 직업으로 만들 수 있습니다. "+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[c-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[c-1].id)){
                    role_playMsg += "(根旺 偏印格 財剋印) 경쟁력 있는 창작물로 재산을 확보와 사회의 모순을 포착해 기회를 만듭니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[d-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[d-1].id)){
                    role_playMsg += "(根旺 偏印格 財印交雜) 주변에 전문가가 많아 연대 참여로 타인의 타이틀이나 일궈 놓은 결과에 편승합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)){
                    role = true;
                    role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根旺 偏印格 殺印相生) 부여받은 특수 임무 수행에 불만이 있습니다."+"</br>" : "";
                    role_playMsg += (_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)) ? "(根旺 偏印格 化官印相生) 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 임무 수행에 불만이 있습니다."+"</br>" : "";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[c-1].type) !== undefined){
                role_playMsg += "(偏印格 貪財壞印) 준비대비 욕심이 지나칩니다. 허술하게 세상의 변화를 읽고 틈새시장을 공략하는 각종 투자 및 재테크로 인해 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }

        if(role===true){
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(偏印格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성과 거리가 멀 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(偏印格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }


    }
    else if(_frameSet2 === "正印格"){
        let role = true;
        role_playMsg += "(正印格) 객관적 지식습득을 좋아하며 주변환경에 잘 적응하고 정해진 임무를 잘 완수합니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 正印格) 조직에 잘 적응합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man2-1].type)){
                role = true;
                role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根弱 正印格 官印相生) 자신에게 주어진 일을 수행하고 안정적인 생활을 중시합니다."+"</br>" : "";
                role_playMsg += (_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)) ? "(根弱 正印格 化殺印相生) 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 자신에게 주어진 일을 수행합니다."+"</br>" : "";
                if(_skys.find(e => skyTag[e-1].id === skyTag[b-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[b-1].id)){
                    role_playMsg += "(根弱 正印格 傷官佩印) 오랜시간 경력자로서 전문가가 됩니다. 자격증 등으로 자신을 입증하는 것이 좋습니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[a-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[a-1].id)){
                    role_playMsg += "(根弱 正印格 食正印合) 실력있는 사람을 섭외하고, 자신은 전문가 용역 관리에만 집중합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].type === skyTag[two-1].type)){
                    role_playMsg += "(根弱 正印格 印劫) 자기 재능으로 안정적 수입을 구축하는 것에 압박감을 느낍니다."+"</br>";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[d-1].type) !== undefined){
                role_playMsg += "(正印格 貪財壞印) 준비대비 욕심이 지나칩니다. 허술하게 세상의 변화를 읽고 틈새시장을 공략하는 각종 투자 및 재테크로 인해 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }
        else{
            role_playMsg += "(根旺 正印格) 조직에 부적응합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                role_playMsg += "(根旺 正印格 印劫) 재능을 공식적으로 인정받아 명성, 논문 및 성과 등으로 인지도를 올립니다. "+"</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[d-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[d-1].id)){
                    role_playMsg += "(根旺 正印格 財剋印) 저작권을 통한 저작료, 판권에 대한 인세 등 불로소득 중 하나를 구축합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[c-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[c-1].id)){
                    role_playMsg += "(根旺 正印格 財印交雜) 주변에 전문가가 많아 연대 참여로 타인의 타이틀이나 일궈 놓은 결과에 편승합니다."+"</br>";
                }
            }
            else{
                if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].type) || _mens.find(e => skyTag[e-1].id === skyTag[man2-1].type)){
                    role = true;
                    role_playMsg += (_typeRole.find(e => e === 'A') !== undefined || _stypeRole.find(e => e === 'A') !== undefined || _wtypeRole.find(e => e=== 'A') !== undefined) ? "(根旺 正印格 官印相生) 불로소득을 원하는데 규칙적인 업무와 경력 스트레스가 있습니다."+"</br>" : "";
                    role_playMsg += (_skys.find(e => skyTag[e-1].type === skyTag[man1-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[man1-1].type)) ? "(根旺 正印格 化殺印相生) 불로소득을 원하는데 잦은 조직, 소속, 직무, 담당 부서의 이동이나 순환 및 교대 근무형태로 업무와 경력 스트레스가 있습니다."+"</br>" : "";
                }
            }

            if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id) === undefined && _skys.find(e => skyTag[e-1].type === skyTag[d-1].type) !== undefined){
                role_playMsg += "(正印格 貪財壞印) 준비대비 욕심이 지나칩니다. 허술하게 세상의 변화를 읽고 틈새시장을 공략하는 각종 투자 및 재테크로 인해 주변 사람 및 가족의 재산을 악용하고 부도날 수 있음에 유의해야 합니다."
            }
        }

        if(role===true){
            
            if(_skys.find(e=> Math.abs(skyTag[_myID-1].id - skyTag[e-1].id) === 5)){
                role_playMsg += "(正印格 日干有情) 조직에서 개인 행동이나 동정심 및 사적 친분으로 인해 공정성과 거리가 멀 수 있습니다."+"</br>";
            }

            if((_skys.find(e=> Math.abs(skyTag[man2-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man2-1].id)) || (_skys.find(e=> Math.abs(skyTag[man1-1].id - skyTag[e-1].id) === 5) && _skys.find(e=> skyTag[e-1].id === skyTag[man1-1].id))){
                role_playMsg += "(正印格 官殺有情) 지위를 이용해 권력남용 및 갑질로 지탄 받을 수 있습니다."+"</br>";
            }
        }
        
    }
    else if(_frameSet2 === "食神格"){
        role_playMsg += "(食神格) 자신의 능력을 중시하고 한 분야에 연구 매진하기 좋아합니다."+"</br>";
        if(_self !== true){
            role_playMsg += "(根弱 食神格) 전문성 유통기한이 빠르므로 주변 사람들을 통해 성장해야 합니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                if(_skys.find(e => skyTag[e-1].id === skyTag[one-1].id)){
                    role_playMsg += "(根弱 食神格 比食) 믿을 수 있는 것은, 주변능력자 뿐이라는 것을 압니다. 조직 및 타인에게 의탁합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[two-1].id)){
                    role_playMsg += "(根弱 食神格 劫食) 용역 및 주변사람들의 능력을 활용하므로써 전문성을 유지합니다."+"</br>";
                }
                
                if(_skys.find(e => skyTag[e-1].id === skyTag[man1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[man1-1].id)){
                    role_playMsg += "(根弱 食神格 食神制殺) 조직으로부터 의탁한 노력에 대해 인정 받아 일거리를 부여 받아 능력을 발휘합니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[man2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[man2-1].id)){
                    role_playMsg += "(根弱 食神格 食正官合) 자신의 능력을 연대할 상급 기관을 찾거나 자신의 능력을 납품해야 합니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                role_playMsg += "(根弱 食神格 食神生財) 능력 대비 할일 많아져 불안함을 느낍니다."+"</br>";
            }
        }
        else{
            role_playMsg += "(根旺 食神格) 자신을 믿고, 생존력이 있는 실력을 꾸준히 쌓아 재능을 직접 판매할 수 있습니다."+"</br>";
            if(_skys.find(e => skyTag[e-1].type === skyTag[c-1].type) || _mens.find(e => skyTag[e-1].type === skyTag[c-1].type)){
                role_playMsg += (_typeRole.find(e => e === 'D') !== undefined || _stypeRole.find(e => e === 'D') !== undefined || _wtypeRole.find(e => e=== 'D') !== undefined) ? "(根旺 食神格 食神生財) 활용도 많은 인재로, 사업과 직장생활 가리지 않고 요구 사항 해결해줍니다." : "(根旺 食神格 化食神生財) 정해진 규정이 많거나 한정적인 영역에서 자신의 재능을 발휘합니다.";
                role_playMsg += "</br>";
                if(_skys.find(e => skyTag[e-1].id === skyTag[woman1-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman1-1].id)){
                    role_playMsg += "(根旺 食神格 偏印到食) 편의성을 수익으로 만들어, 지적재산권을 확보하고, 건물주, 플랫폼 개발자 등 됩니다."+"</br>";
                }
                else if(_skys.find(e => skyTag[e-1].id === skyTag[woman2-1].id) || _mens.find(e => skyTag[e-1].id === skyTag[woman2-1].id)){
                    role_playMsg += "(根旺 食神格 食正印合) 자신 능력을 키워주고 콘텐츠를 만들어줄 연대할 사람들을 두어 매니저가 됩니다."+"</br>";
                }
            }
            else if(_skys.find(e => skyTag[e-1].type === skyTag[one-1].type)){
                role_playMsg += "(根旺 食神格 比劫食) 남들의 재능도 활용하며 자신의 실력을 쌓아 발휘 할 수 있습니다."+"</br>";
            }
        }
    }

    return role_playMsg;
}
>>>>>>> 86cfbff (update README)
