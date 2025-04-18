var point = [];
const fixpoint = [];
const sky_tag = [];
const land_tag = [];
const sky = [];
const land =[];

document.getElementById("bgm").volume = 0.1; // Set volume to 10%
var mensis = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var mensis2 = [...mensis];
mensis2.splice(1,1,29);

// ================== 코드 업데이트 날짜 지정  ================== 
var message=document.lastModified;
// document.getElementById("update").innerHTML = `<h4>Updated: ${message.substring(11, 19)}</h4>`;
document.getElementById("update").innerHTML = `<h4>Updated: </h4>`;
// ================== 코드 업데이트 날짜 지정  ================== 


//const listEl = document.querySelector('ul');
fetch('./js/sky.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            sky_tag.push(post.id);
            sky.push(post.name);
            //listEl.insertAdjacentHTML('beforeend', `<li>${post.name}</li>`);
        });
    });

fetch('./js/land.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            land_tag.push(post.id);
            land.push(post.name);
            //listEl.insertAdjacentHTML('beforeend', `<li>${post.name}</li>`);
        });
    });

fetch('./js/initialdate.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            fixpoint.push(post.start);
        });
    });

var sall = []
fetch('./js/sky.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            sall.push(post);
        });
    });
var lall = []
fetch('./js/land.json')
    .then(results => results.json())
    .then(data => {
        data.forEach(post => {
            lall.push(post);
        });
    });

let today = new Date();
var nowYear = today.getFullYear();
var resultCopy = "";
var greatLuckCopy = "";
var result_data = [];

var nameText = "";
var fullName = "";
var pdfFileName = "";
let base64String = null;
let today_date = (today.getMonth()+1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0') + '_' + today.getHours().toString().padStart(2, '0') + today.getMinutes().toString().padStart(2, '0');
var c = null;
var image = null;
var order = 0;
var cpnt = document.getElementById("change_point");
cpnt.innerText = "";
let xBirth = false;
let pBirth = false;


function is_checked(){
    let today = new Date();
    var tYear = today.getFullYear();
    var tMonth = today.getMonth()+1;
    var tDay = today.getDate();
    var tHour = today.getHours();
    var tMin = today.getMinutes();
    const checkbox = document.getElementById('today_check');
    const is_checked = checkbox.checked;
    if(is_checked == true){
        ten_years_refresh();
        document.getElementById('year_msg').value = tYear;
        document.getElementById('monthday_msg').value = tMonth.toString().padStart(2, '0') + tDay.toString().padStart(2, '0');
        document.getElementById('hourmin_msg').value = tHour.toString().padStart(2, '0') + tMin.toString().padStart(2, '0');

    }
    else{
        ten_years_refresh();
        document.getElementById('year_msg').value = "";
        document.getElementById('monthday_msg').value = "";
        document.getElementById('hourmin_msg').value = "";
    }
}

function select_char(){
    var char_result = "img/modern/";
    //var char = document.querySelector('input[name="char"]').checked;
    var char = true;
    if(char === true){
        char_result = "img/modern/";
    }
    else{
        char_result = "img/oracle/";
    }
    return char_result;
}

function i_img(x){
    var num = String(x).padStart(2, '0');
    var src = select_char() + "i" + num + ".png";
    return src;
}

function p_img(x){
    var num = String(x).padStart(2, '0');
    var src = select_char() + "p" + num + ".png";
    return src;
}
let yrMsg = $('#year_msg');
let mdMsg = $('#monthday_msg');
let tmMSg = $('#time_msg');
let mainBtn = $('#btn');
let navBtn = $('#nav');
$(mainBtn).on('click', function(e){

    cpnt.innerText = "";
    let ycheck = false;
    let mcheck = false;
    let tcheck = false;

    let yrs = yrMsg.val()*1;
    let mth = mdMsg.val().substring(0,2)*1;
    let dys = mdMsg.val().substring(2,4)*1;
    let hrs = tmMSg.val().substring(0,2)*1;
    let min = tmMSg.val().substring(2,4)*1;


    if(yrs <= 0){
        console.log("오류");
        $(yrMsg).parents('li').addClass('warning');
        setTimeout(function() {
            $('li').removeClass('warning');
        }, 1500);
    }
    else{
        ycheck = true;
    }

    // =====================절입일 근처 출생자 확인=====================
    //          1       2       3       4       5       6       7       8       9      10      11      12
    //          0       1       2       3       4       5       6       7       8       9      10      11     
    let pnt = ["소한", "입춘", "경칩" ,"청명", "입하", "망종" ,"소서", "입추", "백로" ,"한로", "입동", "대설"];
    //          0       1       2       3
    let pcd = ["춘분", "하지", "추분", "동지"];

    point = [...fixpoint];

    let cord = [20, 21, 22, 21];
    let pn = point[mth-1];
    let pc = (mth%3 === 0) ? cord[Math.floor(mth/3)-1] : 0;
    
    if(dys >= pn-3 && dys <= pn+3){
        xBirth = true;
    }
    else{
        xBirth = false;
        
    }

    if((pc !== 0 && dys >= pc-3) && (pc !== 0 && dys <= pc+3)){
        pBirth = true;
    }
    else{
        pBirth = false;
        
    }
    
    let x = mth-1;
    let x_msg = pnt[x];
    let rlist = [...point];
    let xday = parseInt(rlist[x]);

    let p = Math.floor(mth/3)-1;
    let p_msg = pcd[p];
    let plist = [...cord];
    let pday = parseInt(plist[p]);

    if(xBirth === true){
        var aNum = xday;
        var dayReflect = false;
        let originDay = aNum;

        var justGo = confirm(` 해당 명조는 24절기 ${x_msg} 기간 출생자입니다.\n 본 프로그램은 ${x_msg}: ${mth}월 ${xday}일로 설정 했습니다.\n 변경을 원한다면 [취소]를 클릭하세요.\n [확인]: 변경하지 않음 / [취소]: 변경`);
        if(justGo === false){
            while(dayReflect === false){
                aNum = window.prompt(`${x_msg} 절입일 (${mth}월 ${xday}일) → ${x_msg} (${mth}월 ${xday-3}일 ~ ${mth}월 ${xday+3} 기간 중 절입 날짜 입력)`, ``);
                if(aNum === null){
                    aNum = xday;
                    dayReflect = true 
                    break;
                }
                else{
                    if(typeof aNum !== `number` && parseInt(aNum) >= originDay-3 && parseInt(aNum) <= originDay+3){
                        aNum = parseInt(aNum);
                        dayReflect = true 
                        break;
                    }
                }
            }
            
        }
        point.splice(x, 1, aNum);
        //console.log(xday, aNum, point, fixpoint);
        cpnt.innerText = `${x_msg} (${mth}월 ${aNum}일) 기준`;
    }
    else if(pBirth === true){
        var aNum = pday;
        var dayReflect = false;
        let originDay = aNum;

        var justGo = confirm(` 해당 명조는 24절기 ${p_msg} 기간 출생자입니다.\n 본 프로그램은 ${p_msg}: ${mth}월 ${pday}일로 설정 했습니다.\n 변경을 원한다면 [취소]를 클릭하세요.\n [확인]: 변경하지 않음 / [취소]: 변경`);
        if(justGo === false){
            while(dayReflect === false){
                aNum = window.prompt(`${p_msg} 절입일 (${mth}월 ${pday}일) → ${p_msg} (${mth}월 ${pday-3}일 ~ ${mth}월 ${pday+3} 기간 중 절입 날짜 입력)`, ``);
                if(aNum === null){
                    aNum = pday;
                    dayReflect = true 
                    break;
                }
                else{
                    if(typeof aNum !== `number` && parseInt(aNum) >= originDay-3 && parseInt(aNum) <= originDay+3){
                        aNum = parseInt(aNum);
                        dayReflect = true 
                        break;
                    }
                }
            }
            
        }
        point.splice(x, 1, parseInt(xday+(aNum-pday)));
        //console.log(xday, xday+(aNum-pday), point, fixpoint);
        cpnt.innerText = `${p_msg} (${mth}월 ${aNum}일) 기준`;
    }

    


    // =====================절입일 근처 출생자 확인=====================

    if(mdMsg.val().length !==4 || mth >12 || mth <1 || dys <1){
        
        console.log("오류");
        $(mdMsg).parents('li').addClass('warning');
        setTimeout(function() {
            $('li').removeClass('warning');
        }, 1500);
    }
    else{
        if(yrs%4 === 0 && mth === 2){
            if(dys > mensis2[mth-1]){
                console.log("오류");
                $(mdMsg).parents('li').addClass('warning');
                setTimeout(function() {
                    $('li').removeClass('warning');
                }, 1500);
            }
            else{
                mcheck = true;
            }
        }
        else if(dys > mensis[mth-1]){
            console.log("오류");
            $(mdMsg).parents('li').addClass('warning');
            setTimeout(function() {
                $('li').removeClass('warning');
            }, 1500);
        }
        else{
            mcheck = true;
        }

    }

    if(tmMSg.val().length !==4 || hrs >23 || hrs <0 || min >59 || min <0){
        console.log("오류");
        $(tmMSg).parents('li').addClass('warning');
        setTimeout(function() {
            $('li').removeClass('warning');
        }, 1500);
    }
    else{
        tcheck = true;
    }

    if(ycheck === true && mcheck === true && tcheck === true){
        Fortune_img(); 
        Divination();
        
    }
    

});

$(navBtn).on('click', function(){

    $('.container').slideToggle(35);

});

$('#switch1').on('click', function(){
    var chk = document.querySelector('input[name="char"]');
    var labl = document.querySelector('label[for="switch1"]');
    if(chk.checked === true){
        labl.innerHTML = "<h1>한문</h1>";
        char_result = "img/modern/";
    }
    else{
        labl.innerHTML = "<h1>갑골문</h1>";
        char_result = "img/oracle/";
    }

});

$('#switch2').on('click', function(){
    var chk = document.querySelector('input[name="sex"]');
    var labl = document.querySelector('label[for="switch2"]');
    if(chk.checked === true){
        labl.innerHTML = "<h4 style=\"margin: 7px\">남성</h4>";
        console.log("남성입니다.");
        document.getElementById('year_msg').focus();
    }
    else{
        labl.innerHTML = "<h4 style=\"margin: 7px\">여성</h4>";
        console.log("여성입니다.");
        document.getElementById('year_msg').focus();
    }
});

$(document).ready(function() {
    $('#name').keyup(function(e){
        if(typeof $(this).val() === "string" ){
            document.getElementById('name').style.backgroundColor = 'aliceblue';
            document.getElementById('name').style.fontWeight = 'bold';
        }
        else{
            document.getElementById('name').style.backgroundColor = null;
            document.getElementById('name').style.fontWeight = 'normal';
        }
    });

    $('#year_msg').keyup(function(e) {
        if ($(this).val().length >= $(this).attr('maxlength') && (e.which !==9 && e.which !==16)){
            document.getElementById('year_msg').style.backgroundColor = 'aliceblue';
            document.getElementById('year_msg').style.fontWeight = 'bold';
            document.getElementById('monthday_msg').focus();
        }
        else if($(this).val().length < $(this).attr('maxlength')){
            document.getElementById('year_msg').style.backgroundColor = null;
            document.getElementById('year_msg').style.fontWeight = 'normal';
        }
    });

    $('#monthday_msg').keyup(function(e) {
        if ($(this).val().length >= $(this).attr('maxlength') && (e.which !==9 && e.which !==16)){
            document.getElementById('monthday_msg').style.backgroundColor = 'aliceblue';
            document.getElementById('monthday_msg').style.fontWeight = 'bold';
            document.getElementById('time_msg').focus();
        }
        else if($(this).val().length < $(this).attr('maxlength')){
            document.getElementById('monthday_msg').style.backgroundColor = null;
            document.getElementById('monthday_msg').style.fontWeight = 'normal';
        }
    });

    $('#time_msg').keyup(function(e) {
        if ($(this).val().length >= $(this).attr('maxlength') && (e.which !==9 && e.which !==16)){
            document.getElementById('time_msg').style.backgroundColor = 'aliceblue';
            document.getElementById('time_msg').style.fontWeight = 'bold';
            document.getElementById('btn').style.backgroundColor = 'blueviolet';
            if(e.which === 13){
                $('#btn').click();
            }
            
        }
        else if($(this).val().length < $(this).attr('maxlength')){
            document.getElementById('time_msg').style.backgroundColor = null;
            document.getElementById('time_msg').style.fontWeight = 'normal';
            document.getElementById('btn').style.backgroundColor = null;
        }
    });
});

function Fortune_img(){
    console.log("=======================================Fortune_img=======================================");
    console.log("절입일 (변경된 것 포함): ", point);
    $('.container').slideToggle(35);
    great_luck_refresh(false);
    nameText = document.getElementById("name").value;
    
    var yyyy = document.getElementById("year_msg").value;
    var md = document.getElementById("monthday_msg").value;
    var mm = md.substring(0,2).toString().padStart(2, '0');
    var dd = md.substring(2,4).toString().padStart(2, '0');

    var wholeTime = document.getElementById("time_msg").value;
    
    var hh = wholeTime.substring(0,2).toString().padStart(2, '0');
    var min = wholeTime.substring(2,4).toString().padStart(2, '0');


    var sexVar = document.querySelector('input[name="sex"]').checked;
    var thisSex = "";
    if(sexVar == true){
        thisSex = "남성";
    }
    else{
        thisSex = "여성";
    }
    
    

    var a = zy(yyyy, mm, dd)[0];//년간 
    
    var b = zy(yyyy, mm, dd)[1];//년지
    var c = zm(yyyy, mm, dd)[0];//월간
    
    var d = zm(yyyy, mm, dd)[1];//월지
    var e = zd(yyyy, mm, dd, hh, min)[0];//일간
    var f = zd(yyyy, mm, dd, hh, min)[1];//일지
    var g = zt(e, hh, min)[0];//시간
    var h = zt(e, hh, min)[1];//시지
    result_data = [a, b, c, d, e, f, g, h];
    
    //대운 리스트
    var seasons = great_luck(sexVar, a, c, d);
    //대운수 (정수, 실수)
    var num = when_num(sexVar, b, yyyy, mm, dd);
    
    // 첫 대운 세운년도, 세운 번째, 대운 번째, 현재 대운 시작 년도
    var starting = Starting(a, num, yyyy, nowYear);

    //사령번호 0, 1, 2
    order = zm(yyyy, mm, dd)[3];
    
    document.getElementById("LIST0").innerText = "時";
    document.getElementById("LIST1").innerText = "日";
    document.getElementById("LIST2").innerText = "月";
    document.getElementById("LIST3").innerText = "年";

    document.getElementById("SKY0").src = i_img(sky_tag[g]);
    document.getElementById("SKY1").src = i_img(sky_tag[e]);
    document.getElementById("SKY2").src = i_img(sky_tag[c]);
    document.getElementById("SKY3").src = i_img(sky_tag[a]);

    document.getElementById("LAND0").src = p_img(land_tag[h]);
    document.getElementById("LAND1").src = p_img(land_tag[f]);
    document.getElementById("LAND2").src = p_img(land_tag[d]);
    document.getElementById("LAND3").src = p_img(land_tag[b]);

    // 중기 지장간 이미지 처리: sky_tag를 거치지 않고 처리 ==> "aa"는 blank 이미지 (왕지의 중기)
    const cenTag = [];
    for(var i =0; i<4; i++){
        var id = mens(result_data, (4-i))[1];
        let cenId = (id !== "aa") ? sky_tag[id] : 0;
        cenTag.push(cenId);
    }
    
    document.getElementById("time0").src = i_img(sky_tag[mens(result_data, 4)[0]]);
    document.getElementById("time1").src = i_img(cenTag[0]);
    document.getElementById("time2").src = i_img(sky_tag[mens(result_data, 4)[2]]);

    document.getElementById("day0").src = i_img(sky_tag[mens(result_data, 3)[0]]);
    document.getElementById("day1").src = i_img(cenTag[1]);
    document.getElementById("day2").src = i_img(sky_tag[mens(result_data, 3)[2]]);

    document.getElementById("month0").src = i_img(sky_tag[mens(result_data, 2)[0]]);
    document.getElementById("month1").src = i_img(cenTag[2]);
    document.getElementById("month2").src = i_img(sky_tag[mens(result_data, 2)[2]]);

    document.getElementById("year0").src = i_img(sky_tag[mens(result_data, 1)[0]]);
    document.getElementById("year1").src = i_img(cenTag[3]);
    document.getElementById("year2").src = i_img(sky_tag[mens(result_data, 1)[2]]);

    document.getElementById("month0").style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById("month1").style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById("month2").style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${0})`;

    let sky_order_string = "month" + order.toString();
    document.getElementById(sky_order_string).style.backgroundColor = `rgba(${5}, ${0}, ${0}, ${0.1})`;
    

    ten_years_refresh();
    great_luck_show(seasons, num, starting[1]);
    tenyears_img_show(starting[2]);
    this_year_coloring(starting[2], nowYear);

    var resultSky = sky[sky_tag[g]-1] + " " + sky[sky_tag[e]-1] + " "  + sky[sky_tag[c]-1] + " " + sky[sky_tag[a]-1];
    var resultLand = land[land_tag[h]-1] + " " + land[land_tag[f]-1] + " " + land[land_tag[d]-1] + " " + land[land_tag[b]-1];
    resultCopy = resultSky + "\n" + resultLand;

    // 현재 대운 칠하기
    for(i=0; i<12; i++){
        var t_name = "#season" + String(i+1).padStart(2, '0');
        console.log(t_name);
        $(t_name).click(function(){
            var picks = $(this)[0].id.toString().split("season")[1]*1;
            var stYear = 10*(picks-1) + starting[0];
            //console.log(picks, stYear) // 대운 숫자, 년의 순서, 년도
            ten_years_refresh();
            tenyears_img_show(stYear);
            this_year_coloring(stYear, nowYear);
        });
    }

    for(i=0; i<10; i++){
        var t_name = '#jupiter' + String(i+1).padStart(2, '0');
        $(t_name).click(function(){
            
            var x = $(this)[0].id.toString().split("jupiter")[1]*1;

            var y = nowYear-(starting[2])+1;
            var ySky_tag = 'jsky0'+x.toString().padStart(2, '0');
            var yLand_tag = 'jland0'+x.toString().padStart(2, '0');

            var fix = 'j'+y.toString().padStart(2, '0');
            var tex = document.getElementById(fix).innerText;

            document.getElementById(ySky_tag).style.backgroundColor = `rgba(${220}, ${220}, ${220}, ${1})`;
            document.getElementById(yLand_tag).style.backgroundColor = `rgba(${220}, ${220}, ${220}, ${1})`;
            
            for(var i=0; i<10; i++){
                let rSky = 'jsky0' + (i+1).toString().padStart(2, '0');
                let rLand = 'jland0' + (i+1).toString().padStart(2, '0');
                if(i !== x-1){
                    document.getElementById(rSky).style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${0})`;
                    document.getElementById(rLand).style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${0})`;
                }
            }
            if(tex*1 === nowYear){
                document.getElementById('jsky0' + y.toString().padStart(2, '0')).style.backgroundColor = `rgba(${100}, ${180}, ${230}, ${0.5})`;
                document.getElementById('jland0' + y.toString().padStart(2, '0')).style.backgroundColor = `rgba(${100}, ${180}, ${230}, ${0.5})`;
            }
                

        });
    }
    


    // 대운 클릭이벤트, 회색으로 칠하고 나머지는 rgba 0, 0, 0, 0
    for(i=0; i<12; i++){
        var t_name = '#season' + String(i+1).padStart(2, '0');
        

        var greatNum = 0;
        var clickNum = 0;
        $(t_name).click(function(){
            var picks = $(this)[0].id.toString().split("season")[1]*1;
            var stYear = 10*(picks-1) + starting[0];
            //console.log(picks, stYear) // 대운 숫자, 년의 순서, 년도
            
            var blankNum = Array.from(new Array(12), (x, i) => i+1);
            greatNum = starting[1];
            clickNum = picks;
            blankNum.splice(clickNum-1, 1);
            
            document.getElementById('sky' + clickNum.toString().padStart(3, '0')).style.backgroundColor = `rgba(${220}, ${220}, ${220}, ${1})`;
            document.getElementById('land' + clickNum.toString().padStart(3, '0')).style.backgroundColor = `rgba(${220}, ${220}, ${220}, ${1})`;

            for(var i = 0; i<11; i++){
                document.getElementById('sky' + blankNum[i].toString().padStart(3, '0')).style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${0})`;
                document.getElementById('land' + blankNum[i].toString().padStart(3, '0')).style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${0})`;
            }

            document.getElementById('sky' + greatNum.toString().padStart(3, '0')).style.backgroundColor = `rgba(${100}, ${180}, ${230}, ${0.5})`;
            document.getElementById('land' + greatNum.toString().padStart(3, '0')).style.backgroundColor = `rgba(${100}, ${180}, ${230}, ${0.5})`;
        });
        
    }
    
    

    //****************************************************debugging***************************************************************
    fullName = nameText + " " + yyyy+"년 "+mm+"월 "+dd+"일 "+hh+"시 "+min+"분생 "+starting[3]+"세 "+thisSex;
    document.getElementById("debug1").innerHTML = fullName;
    
    //****************************************************debugging***************************************************************

    pdfFileName = nameText + "_" + yyyy+"_"+mm+"_"+dd+"_"+hh+"_"+min+"_"+starting[3]+"_"+thisSex+".pdf";

    
    
    console.log("=======================================Fortune_img=======================================");
}

function ShowRow(){
    const row = document.getElementById('source_men');

    if(row.style.display == ''){
        row.style.display = 'none';
    }
    else{
        row.style.display = '';
    }
}

function check_leap(year){
    var checkLeap = false;
    if (year%4 == 0){
        if(year%100 == 0){
            if(year%400 == 0){
                checkLeap = true;
            }
            else{
                checkLeap = false;
            }
        }
        else{
            checkLeap = true;
        }
    }
    else{
        checkLeap = false;
    }
    return checkLeap;
}

function zy(year, month, day){
    
    var y = parseInt(year);
    var m = parseInt(month);
    var d = parseInt(day);
    var zodiac= (y-3)%60;
    var pointYear = 21 * parseInt(y/4)  + 55;

    if (check_leap(y)==false){
        pointYear =+ 5 * (y%4) + 1;
    }
    
    var deltaMonth = m;
    
    
    if (deltaMonth == 1 || (deltaMonth == 2 &   d < point[1])){
        zodiac -=1;
    }

    var temp = zodiac;
    
    if(temp <= 0){
        temp += 60;
    }

    result = [((temp-1) % 10), ((temp-1) % 12)];
    return result;
}

function zm(year, month, day){ 

    var y = parseInt(year);
    var m = parseInt(month);
    var d = parseInt(day);
    var deltaDate = 0; // dletaDate = 절입일~생일 변수
    var deltaMonth = parseInt(m); // deltaMonth = 십이지 순서로 보는 월령변수
    var duty = 0; // 사령 0, 1, 2
    var od = 0; // 당령 0, 1, 2
    var zodiac= (y-3)%60;
    
    deltaMonth += 1; // ex) 3월 16일 >= 3월 6일(경칩) => 묘월(4) => 3+1
    //12월 24일 >=12월 6일 => 자월(1) => 12+1 =13 (천간을 생각해야 하므로 1로 바꾸지 않고 냅둔다)

    if(d >= point[m-1]){ //생일이 생월의 절입일 이후 태어났을 때,
        deltaDate = d - point[m-1]; // 절입일 부터 생일까지 경과된 날 수
    }
    else{ //생일이 생월의 절입일 이전에 태어났을때 생일부터 절입일 까지 경과된 날 수
        deltaDate = (y%4===0) ? mensis2[deltaMonth-2]: mensis[deltaMonth-2]// ex) 3월 3일 < 3월 6일(경칩) => 인월(3) => 4, => 4-2 =>2월 절입일
        deltaDate += d - point[deltaMonth-2];
        deltaMonth -=1;
    }

    var temp = 12*((zodiac-1) % 5) + deltaMonth;
    if(temp <= 0){
        temp += 60;
    }        
    
    //월률분야 사령 구하기 deltaMonth = 월령값
    // <월령값>
    let g = deltaMonth%3;
    // 1, 4, 7, 10 (왕지생 子, 卯, 午, 酉) deltaMonth%3 == 1
    // 2, 5, 8, 11 (고지생 丑, 辰, 未, 戌) deltaMonth%3 == 2
    // 3, 6, 9, 12 (생지생 寅, 巳, 申, 亥) deltaMonth%3 == 0

    //if(m >= deltaMonth) deltaDate +=30; // dletaDate = 절입일~생일 변수 구함
    
    if(g==0){ // 3, 6, 9, 12 (생지생 寅, 巳, 申, 亥) deltaMonth%3 == 0
        if(deltaDate-7<0){
            duty = 0;
            od = 1;
        }
        else if(deltaDate-14<0){
            duty = 1;
            od = 1;
        }
        else{
            duty = 2;
            od = 1;
        }

    }
    else if(g==1){ // 1, 4, 7, 10 (왕지생 子, 卯, 午, 酉) deltaMonth%3 == 1
        if(deltaDate-15<0){
            duty = 0;
            od = 0;
        }
        else{
            duty = (deltaMonth===7 && deltaDate-20<0) ? 1 : 2;
            od = 1;
        }
    }
    else{ // 2, 5, 8, 11 (고지생 丑, 辰, 未, 戌) deltaMonth%3 == 2
        if(deltaDate-9<0){
            duty = 0;
            od = 0;
        }
        else if(deltaDate-12<0){
            duty = 1;
            od = 0;
        }
        else{
            duty = 2;
            od = 0;
        }
    }
    // console.log(temp, deltaMonth, deltaDate, od, duty);
    result = [((temp-1) % 10), ((temp-1) % 12), od, duty]; //월간, 월지, 당령번호, 사령번호

    return result;
}

function zd(y, m, d, h, s){
    var leap = false;
    var count = 0;
    var leapCount = 0;
    var year = parseInt(y);
    var month = parseInt(m);
    var day = parseInt(d);
    var hour = parseInt(h);
    var sec = parseInt(s);
    var lastYear = year-1;
    var endDays = 0;
    var end = [...mensis];
    end.pop();
    end.unshift(0);

    leap = check_leap(year);
    for(var i=1; i<year; i++){
        if(check_leap(i)==true){
            leapCount += 1;
        }
    }

    if(leap == true){
        end = [...mensis2];
        end.pop();
        end.unshift(0);
    }
    
    for (var i = 1; i <= month; i++){
        endDays += end[(i-1)];
    }
    
    t = 0;
    if(h == 23){
        if (s >= 33){
            t = 1;
        }
    }
    var cycleDay = (365*lastYear) + leapCount + endDays + day + 15 + t;
    var temp = cycleDay % 60;
    if(temp <= 0){
        temp += 60;
    }
    result = [((temp-1) % 10), ((temp-1) % 12)];
    return result;
}

function zt(cday, hour, minute){

    var h = hour; 
    if (hour%2!==0){
        if(minute < 33){ 
            h = h-1;
        }
        else{
            if (h==23){
            h = 0;
            }
        }
    }
    var temp = 12*(cday % 5)+ parseInt(h/2) + (h%2) + 1;
    if(temp <= 0){
        temp += 60;
    }
    var result = [((temp-1) % 10), ((temp-1) % 12)]
    return result;
}

function great_luck(check_sex, x, sky, land){
    //x=년간, sky = 월간, land = 월지
    var check_year = x;
    //month = 월주를 60갑자 숫자로
    var month = 12*(5-(((10+((land+1)-(sky+1)))%10)/2)) + land+1;
    month =month%60;
    var result = [];
    
    if(check_sex == check_year%2){
        //순행자
        // 1대운 부터 12대운까지
        for(i = 1; i<=12; i++){
            var newSky = (sky-i)%10;
            var newLand = (land-i)%12;
            if (newSky < 0){
                newSky = newSky + 10;
            }
            if (newLand < 0){
                newLand = newLand + 12;
            }
            var unit = [newSky, newLand];
            result.push(unit);
        }
    }
    else{
        //역행자
        // 1대운 부터 12대운까지
        for(i = 1; i<=12; i++){
            var newSky = (sky+i)%10;
            var newLand = (land+i)%12;
            if (newSky < 0){
                newSky = newSky + 10;
            }
            if (newLand < 0){
                newLand = newLand + 12;
            }
            var unit = [newSky, newLand];
            result.push(unit);
        }

        
    }
    return result;
}

// 대운수 구현 함수
function when_num(check_sex, z_year, year, month, day){
    //check_sex = 성별, z_year = 년지(子:0~亥:11), z_month = 월지(子:0~亥:11), year = 생년, month = 생월, day = 생일
    
    var span = 0;
    var real_month = Number(month); //1월~12월
    var real_day = Number(day);
    var isLeap = check_leap(year);
    
    // length = [0:1월 ~ 11:12월]까지
    // 윤년 아닐때
    var length = [...mensis];
    if(isLeap == true){
        length = [...mensis2];
    }

    // * 순행: 이후 절입일 - 생일

    // <1992년 1월 16일 순행> 순행자 생월의 절입일 <= 생일
    // 1월 6일~2월 4일
    // 31(1월 날수) + 4(2월 4일) - 16(생일) 
    // = 19일차
    // 19일차/3 = 6.333

    // <1979년 1월 4일 순행> 순행자 생월의 절입일 > 생일
    // 12월 7일 ~1월 6일
    // 6(1월 6일) - 4(생일)
    // =2일차
    // 2일차/3 = 0.66

    // * 역행: 생일 - 이전 절입일

    // <1989년 11월 28일 역행> 역행자 생월의 절입일 <= 생일
    // 11월 7일~12월 7일
    // 28(생일) - 7(11월 7일)
    // = 21일차
    // 21일차/3 = 7

    // <1990년 1월 1일 역행> 역행자 생월의 절입일 > 생일
    // 12월 7일 ~ 1월 5일
    // 31(12월 날수) + 1(생일) - 7(12월 7일)
    // =25일차
    // 25일차/3 = 8.33

    
    if(check_sex != z_year%2){
        var after_month = real_month + 1;
        if(after_month > 12){
            after_month -= 12;
        }

        // 순행자
        if(point[real_month-1] <= real_day){
            span = length[parseInt(real_month-1)] + point[parseInt(after_month-1)] - real_day;
            // debug = '순행 중순';
            // console.log(length[parseInt(real_month-1)], point[parseInt(after_month-1)], real_day);
        }
        else{
            span = point[real_month-1] - real_day;
            // debug = '순행 초순';
            // console.log(point[parseInt(real_month-1)], real_day);
        }
    }
    else{
        var before_month = real_month - 1;
        if(before_month <=0){
            before_month +=12;
        }
        // console.log("이전 월 ", length[parseInt(before_month-1)]);

        // 역행자
        if(point[real_month-1] <= real_day){
            span = real_day - point[parseInt(real_month-1)];
            // debug = '역행 중순';
            // console.log(real_day, point[parseInt(real_month-1)]);
        }
        else{
            span = length[parseInt(before_month-1)] + real_day - point[parseInt(before_month-1)];
            // debug = '역행 중순';
            // console.log(length[parseInt(before_month-1)], real_day, point[parseInt(before_month-1)]);
        }
        
    }
    // console.log(debug);
    // console.log(span);
    result = (span <= 1) ? 1 : Number((span/3).toFixed());
    return result;
}

function Starting(yearCycle_sky, value_num, value_year, value_nowYear){
    // start 첫 대운 세운년도, n_great 대운 번째, startYear 현재 대운 시작 년도
    var bornYear = parseInt(value_year);
    var param = ((bornYear+57)%10) - ((yearCycle_sky+1)%10);
    var start = (bornYear-1) - param + value_num;
    var age = value_nowYear - value_year + 1;
    var n_great = 1 + Math.floor((age - value_num)/10);
    var startYear = 10*(n_great-1) + start;
    var result = [start, n_great, startYear, age];
    return result;
}




function great_luck_refresh(flag){

    for(var i=0; i<12; i++){

        document.getElementById('sky'+(i+1).toString().padStart(3, '0')).style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    }

    for(var i=0; i<12; i++){

        document.getElementById('land'+(i+1).toString().padStart(3, '0')).style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    }

    if(flag == true){
        // 일진 보기
        ten_years_refresh();
        for(i=0; i<12; i++){
            var idTag = "t" + String(i+1).padStart(2, '0');
            document.getElementById(idTag).innerHTML = "";
        }

        for(i=0; i<12; i++){
            var n = String(i + 1);
            var idTag = n.padStart(3, '0') + "i"; 
            document.getElementById(idTag).style.display = "none";
        }
        
        for(i=0; i<12; i++){
            var n = String(i + 1);
            var idTag = n.padStart(3, '0') + "p"; 
            document.getElementById(idTag).style.display = "none";
        }

        for(i=0; i<10; i++){
            var idTag = "j" + String(i+1).padStart(2, '0');
            document.getElementById(idTag).innerHTML = "";
        }

        for(i=0; i<10; i++){
            var n = String(i + 1);
            var idTag = n.padStart(3, '0') + "ji"; 
            document.getElementById(idTag).style.display = "none";
        }
        
        for(i=0; i<10; i++){
            var n = String(i + 1);
            var idTag = n.padStart(3, '0') + "jp"; 
            document.getElementById(idTag).style.display = "none";
        }
    
    }
    else{
        // 
        for(i=0; i<12; i++){
            var idTag = "t" + String(i+1).padStart(2, '0');
            document.getElementById(idTag).innerHTML = "";
        }

        for(i=0; i<12; i++){
            var n = String(i + 1);
            var idTag = n.padStart(3, '0') + "i"; 
            document.getElementById(idTag).style.display = "";
        }
        
        for(i=0; i<12; i++){
            var n = String(i + 1);
            var idTag = n.padStart(3, '0') + "p"; 
            document.getElementById(idTag).style.display = "";
        }

        for(i=0; i<10; i++){
            var idTag = "j" + String(i+1).padStart(2, '0');
            document.getElementById(idTag).innerHTML = "";
        }

        for(i=0; i<10; i++){
            var n = String(i + 1);
            var idTag = n.padStart(3, '0') + "ji"; 
            document.getElementById(idTag).style.display = "";
        }
        
        for(i=0; i<10; i++){
            var n = String(i + 1);
            var idTag = n.padStart(3, '0') + "jp"; 
            document.getElementById(idTag).style.display = "";
        }
    }

}



function ten_years_refresh(){
    document.getElementById('jsky001').style.background = `rgba(${0}, ${0}, ${0}, ${0})`; 
    document.getElementById('jsky002').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jsky003').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jsky004').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jsky005').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jsky006').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jsky007').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jsky008').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jsky009').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jsky010').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;

    document.getElementById('jland001').style.background = `rgba(${0}, ${0}, ${0}, ${0})`; 
    document.getElementById('jland002').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jland003').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jland004').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jland005').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jland006').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jland007').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jland008').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jland009').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    document.getElementById('jland010').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;

    

}

function great_luck_show(value_seasons, value_num, value_startNum){
    // var g_num = "";
    var g_sky = "";
    var g_land = "";

    for(i=0; i<12; i++){
        var t_n = (10*i) + value_num;
        var idTag = "t" + String(i+1).padStart(2, '0');
        document.getElementById(idTag).innerHTML = String(t_n);
    }

    for(i=0; i<12; i++){
        var n = String(i + 1);
        var idTag = n.padStart(3, '0') + "i"; 
        document.getElementById(idTag).src = i_img(sky_tag[value_seasons[i][0]]);
        g_sky += sky[value_seasons[11-i][0]] + " ";
    }
    
    for(i=0; i<12; i++){
        var n = String(i + 1);
        var idTag = n.padStart(3, '0') + "p"; 
        document.getElementById(idTag).src = p_img(land_tag[value_seasons[i][1]]);
        g_land += land[value_seasons[11-i][1]] + " ";
    }

    if(value_startNum > 0 && value_startNum <=12){
        var tag = String(value_startNum);
        var skyTag = 'sky' + tag.padStart(3, '0');
        var landTag = 'land' + tag.padStart(3, '0');
        document.getElementById(skyTag).style.background = `rgba(${50}, ${150}, ${220}, ${0.5})`;
        document.getElementById(landTag).style.background = `rgba(${50}, ${150}, ${220}, ${0.5})`;
    }
    greatLuckCopy = "\n" + "\n" + g_sky + "\n" + g_land;
}

//지장간: 甲=0 ~ 癸=9, list = result_data, 년(x=1), 월(x=2), 일(x=3), 시(x=4)
function mens(list, x){
    
    var r = lall[list[(2*x-1)]].duty[0].name;
    var c = lall[list[(2*x-1)]].duty[1].name;
    var s = lall[list[(2*x-1)]].duty[2].name;

    var rem = sall.find(e => e.name === r).id-1; //여기 甲:0, 乙:1 ... 壬:8, 癸:9
    var mid = (c !=='  ') ? sall.find(e => e.name === c).id-1 : "aa" //중기 甲:0, 乙:1 ... 壬:8, 癸:9, 
    var std = sall.find(e => e.name === s).id-1; //정기 甲:0, 乙:1 ... 壬:8, 癸:9

    //이미지 파일을 읽기 위해 숫자로 변환 ex) 戊=5=> 4
    var x_men = [rem, mid, std]
    
    return x_men;
}

function Fortune_img_Today(){
    great_luck_refresh(true);
    var yyyy = document.getElementById("year_msg").value;
    var md = document.getElementById("monthday_msg").value;
    var mm = md.substring(0,2).toString().padStart(2, '0');
    var dd = md.substring(2,4).toString().padStart(2, '0');
    var hm = document.getElementById("hourmin_msg").value;
    var hh = hm.substring(0,2).toString().padStart(2, '0');
    var min = hm.substring(2,4).toString().padStart(2, '0');

    document.getElementById("debug1").innerHTML = String(yyyy) + "년 " + String(mm) + "월 " + String(dd) + "일 " + String(hh) + "시 " + String(min)+ "분";
    fileName = String(yyyy) + "_" + String(mm) + "_" + String(dd) + "_" + String(hh) + "_" + String(min);
    pdfFileName = String(yyyy) + "_" + String(mm) + "_" + String(dd) + "_" + String(hh) + "_" + String(min)+"_day.pdf";
    
    var a = zy(yyyy, mm, dd)[0];
    var b = zy(yyyy, mm, dd)[1];
    var c = zm(yyyy, mm, dd)[0];
    var d = zm(yyyy, mm, dd)[1];
    var e = zd(yyyy, mm, dd, hh, min)[0];
    var f = zd(yyyy, mm, dd, hh, min)[1];
    var g = zt(e, hh, min)[0];
    var h = zt(e, hh, min)[1];

    document.getElementById("SKY0").src = i_img(sky_tag[g]);
    document.getElementById("SKY1").src = i_img(sky_tag[e]);
    document.getElementById("SKY2").src = i_img(sky_tag[c]);
    document.getElementById("SKY3").src = i_img(sky_tag[a]);

    document.getElementById("LAND0").src = p_img(land_tag[h]);
    document.getElementById("LAND1").src = p_img(land_tag[f]);
    document.getElementById("LAND2").src = p_img(land_tag[d]);
    document.getElementById("LAND3").src = p_img(land_tag[b]);

    document.getElementById("debug2").innerHTML = "";
    document.getElementById("debug3").innerHTML = "";


    var todaySky = sky[sky_tag[g]-1] + " " + sky[sky_tag[e]-1] + " "  + sky[sky_tag[c]-1] + " " + sky[sky_tag[a]-1];
    var todayLand = land[land_tag[h]-1] + " " + land[land_tag[f]-1] + " " + land[land_tag[d]-1] + " " + land[land_tag[b]-1];
    resultCopy = todaySky + "\n" + todayLand;
    greatLuckCopy = "";
}

function tenyears_img_show(startingYear){
    var jYear = (startingYear + 57)%60;
    if(jYear <= 0){
        jYear +=60;
    }

    var sky_start = jYear%10;
    var land_start = jYear%12;


    for(i=0; i<10; i++){
        var t_n = i + startingYear;
        var idTag = "j" + String(i+1).padStart(2, '0');
        document.getElementById(idTag).innerHTML = String(t_n);
    }

    for(i=0; i<10; i++){
        var n = String(i + 1);
        var idTag = n.padStart(3, '0') + "ji"; 
        var sky_word = (sky_start+i)%10;
        if(sky_word <=0){
            sky_word +=10;
        }
        document.getElementById(idTag).src = i_img(sky_tag[(sky_word-1)]);
    }
    
    for(i=0; i<10; i++){
        var n = String(i + 1);
        var idTag = n.padStart(3, '0') + "jp"; 
        var land_word = (land_start+i)%12;
        if(land_word <=0){
            land_word +=12;
        }
        document.getElementById(idTag).src = p_img(land_tag[(land_word-1)]);
    }
}

function this_year_coloring(startingYear, value_nowYear){
    if(value_nowYear >= startingYear && value_nowYear <= startingYear+9){
        var tag = String(value_nowYear - startingYear + 1);
        var skyTag = 'jsky' + tag.padStart(3, '0');
        var landTag = 'jland' + tag.padStart(3, '0');
        document.getElementById(skyTag).style.background = `rgba(${100}, ${180}, ${230}, ${0.5})`;
        document.getElementById(landTag).style.background = `rgba(${100}, ${180}, ${230}, ${0.5})`;
    }
    else{
        document.getElementById('jsky001').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky002').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky003').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky004').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky005').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky006').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky007').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky008').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky009').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jsky010').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;

        document.getElementById('jland001').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland002').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland003').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland004').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland005').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland006').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland007').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland008').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland009').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
        document.getElementById('jland010').style.background = `rgba(${0}, ${0}, ${0}, ${0})`;
    }
}

function Copy(){
    var inter = document.getElementById("debug2").innerText+document.getElementById("debug3").innerText+"\n\n"+
    document.getElementById("debug4").innerText+
    document.getElementById("debug5").innerText+"\n\n"+
    document.getElementById("debug6").innerText+
    document.getElementById("debug7").innerText+"\n\n";

    inter +="※ 대운 ※\n";
    for(var i=0; i<TextRole().length; i++){
        inter += TextRole()[i] + "\n\n"
    }

    inter +="\n\n";

    inter +="※ 세운 ※\n";
    for(var i=0; i<TextUse().length; i++){
        inter += TextUse()[i] +"\n";
        inter += TextYears()[i] +"\n\n";
    }

    var str = fullName + "\n\n" +resultCopy + greatLuckCopy + "\n\n" + inter;
    
    var copyMsg = confirm("클립보드로 복사했습니다. [확인]: 복사 완료 / [취소]: 복사 취소");
    if(copyMsg === false){
        str = "";
    }
    CopyStringToClipboard(str);
}

function CopyStringToClipboard (string) {
    function handler (event){
        event.clipboardData.setData('text/plain', string);
        event.preventDefault();
        document.removeEventListener('copy', handler, true);
    }

    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
}

function savePDF(){
    var pdfMsg = confirm("PDF파일로 저장했습니다. [확인]: 저장 완료 / [취소]: 저장 취소 ");
    if(pdfMsg === true){
    //저장 영역 div id
        html2canvas($('#pdfArea')[0] ,{	
            //logging : true,		// 디버그 목적 로그
            //proxy: "html2canvasproxy.php",
            allowTaint : true,	// cross-origin allow 
            useCORS: true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
            scale : 2		// 기본 96dpi에서 해상도를 두 배로 증가
            
            }).then(function(canvas) {	
                // 캔버스를 이미지로 변환
                var imgData = canvas.toDataURL('image/png');

                var imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
                var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
                var imgHeight = canvas.height * (imgWidth / canvas.width);
                
                var heightLeft = imgHeight;
                var margin = 10; // 출력 페이지 여백설정
                var doc = new jsPDF('p', 'mm');
                var position = 10;

                

                // 첫 페이지 출력
                doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                console.log(position, canvas.height, canvas.width, imgWidth, imgHeight, heightLeft)

                // 한 페이지 이상일 경우 루프 돌면서 출력
                while (heightLeft >= 20) {			// 35
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
                    position = position - 20 ;		// -25
                    heightLeft -= pageHeight;
                }

                
                // 파일 저장
                doc.save(pdfFileName);
            });
    }
    
}
