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


const useSet = []; //월령용신의 甲~癸까지
const mainDuty = []; //정기 지장간 불러오기



function DecideTell(){
    useSet.length = 0; // 제거
    mainDuty.length = 0; //제거
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
    const myID = ideaSet[1]; // 일간에 해당되는 용희신을 myString에 할당

    const orderID = ideaSet.pop(); // result배열의 맨 마지막에 있는 월령을 빼고, orderString에 할당시킴

    const set = ideaSet.filter((item, index) => ideaSet.indexOf(item) === index); // set 배열에는, 월령을 제외하고, 천간 중에 중복된 값을 뺀 새로운 배열
    
    const idea = [...ideaSet];

    var my =0; //set 배열 중 일간 위치 index값
    for(var i=0; i<set.length;i++){
        if(set[i]===myID){
            my = i; // set에서 일간 위치 index값을 my에 할당
        } 
    }
    set.splice(my, 1); // set배열에서 일간에 해당되는 용희신을 제거
    set.unshift(myID); //다시 set배열에서 맨 앞칸 (index=0)에 끼워넣기 (unshift() 사용) 
    // => 이제 set배열은, 맨 앞칸이 일간의 용희신이고, 나머지 중복제거된 천간들만 배열됨.
    
    let setT = Tri('time_land', 'day_land', 'month_land', 'year_land');
    let setS = Sqr('time_land', 'day_land', 'month_land', 'year_land');
    let setO = Opp('time_land', 'day_land', 'month_land', 'year_land');

    let tObj = landTag[timeb-1]; //시지 객체
    let dObj = landTag[dayb-1]; //일지 객체
    let mObj = landTag[monthb-1]; //월지 객체
    let yObj = landTag[yearb-1]; //년지 객체
    //console.log(tObj.duty[0].idN, tObj.duty[1].idN, tObj.duty[2].idN);//시지 지장간의 천간 숫자
    const objSet = [tObj, dObj, mObj, yObj];

    // 지장간 풀이
    
    const subSet = [];
    for(var i=0; i< objSet.length; i++){
        if((objSet[i].id%3) === 0){ //생지 일때
            subSet.push(objSet[i].duty[2].idN);
            // console.log('생지 정기', objSet[i].duty[2].idN);
        }

        if((objSet[i].id%3) === 1){ //왕지 일때
            subSet.push(objSet[i].duty[0].idN);
            subSet.push(objSet[i].duty[2].idN);
            // console.log('왕지 여기', objSet[i].duty[0].idN);
            // console.log('왕지 정기', objSet[i].duty[2].idN);
        }
    }
    
    const addSet = subSet.concat(setT[1]);
    const addSet2 = addSet.concat(setO[1]);
    const combineSet = addSet2.filter((i, inx) => addSet2.indexOf(i) == inx);
    //월지와 천간의 용희신
    // console.log(set);
    //천간 외 삼합, 방합 및 정기 지장간으로 쓰는 용희신
    // console.log(combineSet);
    //희신 찾기 == pass
    let pass = notice.find(e => e.id === orderID).pw;
    // console.log('pass', pass); //용신에 맞는 희신 맞게 할당 되었는지 확인

    var check1 = [...set];
    var check2 = check1.concat([...combineSet]); //천간, 지장간의 사용 가능한 용희신 모두 합, (중복 있음)
    
    var isTalent = check2.find(e => e === pass);
    
    /****************************************************debugging***************************************************************/

    console.log(`${skyTag[orderID-1].name}${skyTag[orderID-1].type} 用神, ${skyTag[pass-1].name}${skyTag[pass-1].type} 喜神 갖고 있음? : ${(isTalent === undefined) ? "아니오" : "네"}`); 
    console.log(`${skyTag[myID-1].name}${skyTag[myID-1].type} 일간`); 

    /****************************************************debugging***************************************************************/



    /****************************************************debugging***************************************************************/
    //격국 통변
    //일간, 격용신, 격상신, 격기신, 상신기신, 격구신
    const frameSet =[]; 
    let frameMsg = ""
    frameSet.push(myID);
    var otherIdea = [idea[0], idea[2], idea[3]];

    let posSky = ["시간", "월간", "년간"];

    if(mObj.id%3 === 0){
        
        let v = landTag[mObj.id-1].duty[dty].idN;
        let fix = landTag[mObj.id-1].duty[2].idN;
        console.log("생지월생", `${landTag[mObj.id-1].duty[dty].name}${skyTag[v-1].type} 사령`);
        if(dty === 1 && setT[0].length !== 0){
            console.log(setT[0]) 
            let cnt = v;
            let h = cnt+1;
            //투간여부
            let checkOriginSky = otherIdea.find(e => e === cnt);
            let checkOtherSky = otherIdea.find(e => e === h);
            if(checkOriginSky !== undefined && checkOtherSky !== undefined){
                console.log(`생지월생 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === cnt))]} 위치`);
                frameSet.push(cnt);
                frameMsg = `생지월생 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === cnt))]} 위치`;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`생지월생 ${skyTag[h-1].name}${skyTag[h-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === h))]} 위치`);
                    frameSet.push(h);
                    frameMsg = `생지월생 ${skyTag[h-1].name}${skyTag[h-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === h))]} 위치`;
            
                    
            }
            else{
                if(skyTag[myID-1].type !== skyTag[v-1].type){
                    console.log(`생지월생 중기 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사`);
                    frameSet.push(cnt);
                    frameMsg =`생지월생 중기 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사`;
                }
                else{
                    console.log(`생지월생 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === fix))]} 위치`);
                    frameSet.push(fix);
                    frameMsg = `생지월생 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === fix))]} 위치`;
                }
            }
        }
        else{
            console.log(`생지월생 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사`);
            frameSet.push(fix);
            frameMsg = `생지월생 ${skyTag[fix-1].name}${skyTag[fix-1].type} 용사`;
        }

    }

    if(mObj.id%3 === 1){
        
        let v = landTag[mObj.id-1].duty[dty].idN;
        console.log("왕지월생", `${landTag[mObj.id-1].duty[dty].name}${skyTag[v-1].type} 사령`);
        if(dty===0 && otherIdea.find(e => e === v) !== undefined && otherIdea.find(e => e === v+1) === undefined){
            console.log(`왕지월생 ${skyTag[v-1].name}${skyTag[v-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]} 위치`);
            frameSet.push(v);
            frameMsg = `왕지월생 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]} 위치`;
        }
        else{
            let k = landTag[mObj.id-1].duty[2].idN;
            console.log(`왕지월생 ${skyTag[k-1].name}${skyTag[k-1].type} 용사`);
            frameSet.push(k);
            frameMsg = `왕지월생 ${skyTag[k-1].name}${skyTag[k-1].type} 용사`;
        }
         
    }

    
    if(mObj.id%3 === 2){
        
        console.log("고지월생", `${landTag[mObj.id-1].duty[dty].name}${skyTag[landTag[mObj.id-1].duty[dty].idN-1].type} 사령`);
        if(setT[0].length !== 0 && skyTag[myID-1].type !== skyTag[landTag[mObj.id-1].duty[1].idN-1].type){
            //중기 용사 (숫자)
            let cnt = landTag[mObj.id-1].duty[1].idN;
            let hcnt = cnt-1;
            //투간여부
            let checkOriginSky = otherIdea.find(e => e === cnt);
            let checkOtherSky = otherIdea.find(e => e === hcnt);
            //투간여부에 따른 용사 (숫자)
            if(checkOriginSky !== undefined){
                console.log(`고지월생 중기 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === cnt))]} 위치`);
                frameSet.push(cnt);
                frameMsg = `고지월생 중기 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === cnt))]} 위치`;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`고지월생 중기 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === hcnt))]} 위치`);
                frameSet.push(hcnt);
                frameMsg = `고지월생 중기 ${skyTag[hcnt-1].name}${skyTag[hcnt-1].type} 용사 ${posSky[otherIdea.indexOf(otherIdea.find(e => e === hcnt))]} 위치`;
            }
            else{
                console.log(`고지월생 중기 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사`);
                frameSet.push(cnt);
                frameMsg =`고지월생 중기 ${skyTag[cnt-1].name}${skyTag[cnt-1].type} 용사`;
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
                console.log(`고지월생${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]} 위치`);
                frameSet.push(v);
                frameMsg = `고지월생${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === v))]} 위치`;
            }
            else if(checkOriginSky === undefined && checkOtherSky !== undefined){
                console.log(`고지월생${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === h))]} 위치`);
                frameSet.push(h);
                frameMsg = `고지월생${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[h-1].name}${skyTag[h-1].type} ${posSky[otherIdea.indexOf(otherIdea.find(e => e === h))]} 위치`;
            }
            else{
                console.log(`고지월생${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type}`);
                frameSet.push(v);
                frameMsg = `고지월생${(mod_dty===0) ? " ":" 토왕 "}용사 ${skyTag[v-1].name}${skyTag[v-1].type}`;
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
    
    
    //set의 길이에 따라 각각 다르게 통변 메세지 부여

    var addArray = ["또한 ", "그리고 ", "게다가 ", "그 외에도 ", "그 밖에도 ", "이와 더불어 "];

    if(set.length == 1){
        document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※";
        document.getElementById("debug3").innerHTML = mainNotice + "<br/>" +
        useSet[orderID-1].key + "이 요구되는 사회 환경에" + "<br/>" + 
        useSet[set[0]-1].key + "을 삼아 재능을 발휘 하려고 합니다.";
    }
    else if(set.length == 2){
        document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※";
        document.getElementById("debug3").innerHTML = mainNotice + "<br/>" +
        useSet[orderID-1].key + "이 요구되는 사회 환경에" +"<br/>" + 
        useSet[set[0]-1].key + "을 하려고 하며" +"<br/>" + 
        useSet[set[1]-1].key + "을 삼아 재능을 발휘 하려고 합니다.";
    }
    else if(set.length == 3){
        document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※";
        document.getElementById("debug3").innerHTML = mainNotice + "<br/>" +
        useSet[orderID-1].key + "이 요구되는 사회 환경에" +"<br/>" +
        useSet[set[0]-1].key + "을 하려고 합니다."+"<br/>" +
        addArray[Math.floor(Math.random() * addArray.length)] + useSet[set[1]-1].key + "을 갖추고 있으며" +"<br/>" +
        useSet[set[2]-1].key + "을 삼아 재능을 발휘 하려고 합니다.";
    }
    else{
        document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※";
        document.getElementById("debug3").innerHTML = mainNotice + "<br/>" +
        useSet[orderID-1].key + "이 요구되는 사회 환경에" +"<br/>" +
        useSet[set[0]-1].key + "을 하려고 합니다." + "<br/>" +
        addArray[Math.floor(Math.random() * addArray.length)] + useSet[set[1]-1].key + "을 갖추고 있으며" +"<br/>" + 
        useSet[set[2]-1].key + "과 " + "<br/>" + useSet[set[3]-1].key +"을 삼아 재능을 발휘 하려고 합니다.";
    }

    if(combineSet.length !== 0){
        document.getElementById("debug3").innerHTML += "<br/>" +"습관적으로는 늘 이미 ";
    }
    
    for(var i=0; i<combineSet.length; i++){
        if(i>0){
            document.getElementById("debug3").innerHTML += addArray[Math.floor(Math.random() * addArray.length)];
        }
        document.getElementById("debug3").innerHTML += useSet[combineSet[i]-1].key + "으로도 잘 하고 있습니다." + "<br/>";
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

    let allMsg = `${skyTag[orderID-1].name}${skyTag[orderID-1].type} 用神 출생, `
    allMsg += `${skyTag[pass-1].name}${skyTag[pass-1].type} 喜神 ${(isTalent === undefined) ? "없음" : "있음"}. `;
    

    document.getElementById("debug3").innerHTML += "<br/> (" + allMsg +  frameMsg +", "+ `${skyTag[myID-1].name}${skyTag[myID-1].type} 일간  ${frameSet[2]}`+ ")";
}

function out(id_tag){
    var print = document.getElementById(id_tag).children[0];
    var srcName = print.getAttribute('src');
    let imgFileName = srcName.split('.')[0].split('/')[2]; // ex) img/modern/p01.png에서 imgFileName == p01
    let stem_branch = imgFileName.split('')[0]; // i == 천간, p == 지지
    var result =[stem_branch, imgFileName.substring(1,3)]       
    return result;                                               
}

function Tri(t_tag, d_tag, m_tag, y_tag){ //삼합
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

    const formSet = [{id:0, value: tObj}, {id:1, value: dObj}, {id:2, value: yObj}]; //월지 제외 나머지 지지의 배열 0:시지, 1:일지, 2:년지
    
    // console.log(tObj.id); //시지 지지 순번
    // console.log(tObj.name);  //시지 이름
    // console.log(tObj.duty[0].name, tObj.duty[1].name, tObj.duty[2].name);  //시지 지장간
    const result = [...formSet.filter(e => ((e['value'].id%4) === (mObj.id % 4) && e['value'].id !== mObj.id))]; //삼합이 있는 것들만 배열


    // 지장간 중 활용 가능한 set = keyWord
    const keyWord = [];
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

function Sqr(t_tag, d_tag, m_tag, y_tag){ //방합
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

    const formSet = [{id:0, value: tObj}, {id:1, value: dObj}, {id:2, value: yObj}]; //월지 제외 나머지 지지의 배열 0:시지, 1:일지, 2:년지

    const result = [...formSet.filter(e => (Math.floor((e['value'].id%12)/3) === Math.floor((mObj.id % 12)/3) && e['value'].id !== mObj.id))];

    // 지장간 중 활용 가능한 set = keyWord
    const keyWord = [];
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

function Opp(t_tag, d_tag, m_tag, y_tag){ //충
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

    const formSet = [{id:0, value: tObj}, {id:1, value: dObj}, {id:2, value: yObj}]; //월지 제외 나머지 지지의 배열 0:시지, 1:일지, 2:년지
    // 지장간 중 활용 가능한 set = keyWord
    
    const keyWord = [];
    const result = [...formSet.filter(e => Math.abs(e['value'].id - Math.abs(mObj.id)) === 6)];
    return [result, keyWord];
}
