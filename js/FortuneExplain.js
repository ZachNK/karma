let p = []
let skyUse = [];
let landDuty = [];
let landUse = [];
let skyTag = [];
let landTag = [];
fetch('./js/initialdate.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            p.push(post);
        });
    });

// fetch('./js/sky.json')
//     .then(results => results.json())
//     .then(data => {
//         data.forEach(post => {
//             skyUse.push(post.use);
//         });
//     });

// fetch('./js/land.json')
//     .then(results => results.json())
//     .then(data => {
//         data.forEach(post => {
//             landUse.push(post.use);
//         });
//     });

// fetch('./js/land.json')
//     .then(results => results.json())
//     .then(data => {
//         data.forEach(post => {
//             landDuty.push(post.duty);
//         });
//     });

// fetch('./js/sky.json')
//     .then(results => results.json())
//     .then(data => {
//         data.forEach(post => {
//             skyTag.push({"name":post.name, "type":post.type});
//         });
//     });

// fetch('./js/land.json')
//     .then(results => results.json())
//     .then(data => {
//         data.forEach(post => {
//             landTag.push({"name":post.name, "type":post.type});
//         });
//     });

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


var useSet = []; //월령용신의 甲~癸까지
var mainDuty = []; //정기 지장간 불러오기


function DecideTell(){
    useSet.length = 0; // 제거
    mainDuty.length = 0; //제거
    var times = Number(out('time_sky')[1]);
    var days = Number(out('day_sky')[1]);
    var months = Number(out('month_sky')[1]);
    var years = Number(out('year_sky')[1]);
    var timel = Number(out('time_land')[1]);
    var dayl = Number(out('day_land')[1]);
    var monthl = Number(out('month_land')[1]);
    var yearl = Number(out('year_land')[1]);
    
    var yyyy = document.getElementById("year_msg").value;
    var md = document.getElementById("monthday_msg").value;
    var mm = md.substring(0,2).toString().padStart(2, '0');
    var dd = md.substring(2,4).toString().padStart(2, '0');
    
    var ord = zm(yyyy, mm, dd)[2]
    var t = type(monthl, ord);// 당령용신 번호 찾기 ex) 午 = 0:丙, 1:丁 ==> 0 혹은 1 / 辰 = 0:乙 1:癸 ==>무조건 0 / 寅 = 0:丙, 1:甲 ==>무조건 1
    var useName = landTag[monthl-1]['use'][t].tag; // 당령용신 string ex) 癸, 丙 ...

    for(var i=0; i<10; i++){ //용신과 희기신의 key들 불러오기 == 甲~癸까지 천간 순서로 useSet에 배열
        var obj = skyTag[i].use;
        useSet.push(obj.find(e => e.tag === useName));
    }
    console.log(useSet); //useSet에 용신과 희기신의 key 세트. 여기에서 모든 용희기신 가려낸다.
    for(var i=0; i<12; i++){ //지장간 세트 불러오기 ex) mainDuty[${"지지 번호"}]에서 배열 순서  = 지장간 0:여기, 1:중기, 2:정기
        var arr = landTag[i].duty;
        mainDuty.push(arr);
    }
    
    
    // 시지(timel), 일지(dayl), 월지(useName, 아예 텍스트 값), 년지(yearl)로 찾은 통변 텍스트 메세지 (key)
    // skyTag.find(e => e.name === mainDuty[timel-1][2].name).use.find(e=> e.tag === useName).key,
    // skyTag.find(e => e.name === mainDuty[dayl-1][2].name).use.find(e=> e.tag === useName).key, 
    // skyTag.find(e => e.name === useName).use.find(e=> e.tag === useName).key,
    // skyTag.find(e => e.name === mainDuty[yearl-1][2].name).use.find(e=> e.tag === useName).key
    
    var result =[
                        useSet[times-1].key, 
                        useSet[days-1].key, 
                        useSet[months-1].key, 
                        useSet[years-1].key,
                        skyTag.find(e => e.name === useName).use.find(e=> e.tag === useName).key
                    ];
    
    //console.log(result); // 천간 4개와 월지의 월령 모조리 배열
    const myString = result[1]; // 일간에 해당되는 용희신을 myString에 할당
    const orderString = result.pop(); // result배열의 맨 마지막에 있는 월령을 빼고, orderString에 할당시킴
    const set = result.filter((item, index) => result.indexOf(item) === index); // set 배열에는, 월령을 제외하고, 천간 중에 중복된 값을 뺀 새로운 배열
    
    var my =0; //set 배열 중 일간 위치 index값
    for(var i=0; i<set.length;i++){
        if(set[i]===myString){
            my = i; // set에서 일간 위치 index값을 my에 할당
        } 
    }
    set.splice(my, 1); // set배열에서 일간에 해당되는 용희신을 제거
    set.unshift(myString); //다시 set배열에서 맨 앞칸 (index=0)에 끼워넣기 (unshift() 사용) 
    // => 이제 set배열은, 맨 앞칸이 일간의 용희신이고, 나머지 중복제거된 천간들만 배열됨.
    
    // set의 길이에 따라 각각 다르게 통변 메세지 부여
    if(set.length == 1){
        document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※";
        document.getElementById("debug3").innerHTML = orderString + "이 요구되는 사회 환경에";
        document.getElementById("debug4").innerHTML = set[0] + "을 발휘합니다.";
        document.getElementById("debug5").innerHTML = "";
        document.getElementById("debug6").innerHTML = "";
        document.getElementById("debug7").innerHTML = "";
    }
    else if(set.length == 2){
        document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※";
        document.getElementById("debug3").innerHTML = orderString + "이 요구되는 사회 환경에";
        document.getElementById("debug4").innerHTML = "주체적으로 " + set[0] + "을 통한";
        document.getElementById("debug5").innerHTML = set[1] + "을 갖추고 있습니다.";
        document.getElementById("debug6").innerHTML = "";
        document.getElementById("debug7").innerHTML = "";
        
    }
    else if(set.length == 3){
        document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※";
        document.getElementById("debug3").innerHTML = orderString + "이 요구되는 사회 환경에";
        document.getElementById("debug4").innerHTML = "주체적으로 " + set[0] + "을 통한";
        document.getElementById("debug5").innerHTML = set[1] + "을 갖추고 있으며"; 
        document.getElementById("debug6").innerHTML = set[2] + "에도 재능이 있습니다.";
        document.getElementById("debug7").innerHTML = "";
    }
    else{
        document.getElementById("debug2").innerHTML = "※ 타고난 재능 (용신과 희기신 통변) ※";
        document.getElementById("debug3").innerHTML = orderString + "이 요구되는 사회 환경에";
        document.getElementById("debug4").innerHTML = "주체적으로 " + set[0] + "을 통한";
        document.getElementById("debug5").innerHTML = set[1] + "을 갖추고 있습니다."; 
        document.getElementById("debug6").innerHTML = "또한 " + set[2] + "을 발휘하며";
        document.getElementById("debug7").innerHTML = set[3] +"에도 재능이 있습니다.";
    }

    
    
}

function out(id_tag){
    var print = document.getElementById(id_tag).children[0];
    var srcName = print.getAttribute('src');
    let imgFileName = srcName.split('.')[0].split('/')[2]; // ex) img/modern/p01.png에서 imgFileName == p01
    let stem_branch = imgFileName.split('')[0]; // i == 천간, p == 지지
    var result =[stem_branch, imgFileName.substring(1,3)]       
    return result;                                               
}

function type(zodiac_month, num_order){
    // 생지는 무조건 1, 왕지는 택, 고지는 무조건 0
    let x = 0;
    if(zodiac_month%3===0){
        x = 1;
    }
    else if(zodiac_month%3===2){
        x = 0;
    }
    else{
        if(num_order<=1){
            x = 0;
        }
        else{
            x = 1;
        }
    }
    
    var result = x
    return result; //(0 혹은 1)
}