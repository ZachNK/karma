var sky_tag = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var land_tag = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var point = [6, 4, 5, 5, 5, 5, 7, 7, 7, 8, 7, 7]; //丑月, 寅月, 卯月, 辰月, 巳月, 午月, 未月, 申月, 酉月, 戌月, 亥月, 子月
var sky = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
var land = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
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
        document.getElementById('month_msg').value = tMonth;
        document.getElementById('day_msg').value = tDay;
        document.getElementById('hour_msg').value = tHour;
        document.getElementById('min_msg').value = tMin;
    }
    else{
        ten_years_refresh();
        document.getElementById('year_msg').value = "";
        document.getElementById('month_msg').value = "";
        document.getElementById('day_msg').value = "";
        document.getElementById('hour_msg').value = "";
        document.getElementById('min_msg').value = "";
    }
}

function select_char(){
    var char_result = ""
    var char = document.querySelector('input[name="char"]').checked;
    if(char == true){
        char_result = "img/oracle/";
    }
    else{
        char_result = "img/modern/";
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

function Fortune_img(){
    great_luck_refresh(false);
    nameText = document.getElementById("name").value;
    var yyyy = document.getElementById("year_msg").value;
    var mm = document.getElementById("month_msg").value;
    var dd = document.getElementById("day_msg").value;
    var hh = document.getElementById("hour_msg").value;
    var min = document.getElementById("min_msg").value;
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
    
    document.getElementById("SKY0").src = i_img(sky_tag[g]);
    document.getElementById("SKY1").src = i_img(sky_tag[e]);
    document.getElementById("SKY2").src = i_img(sky_tag[c]);
    document.getElementById("SKY3").src = i_img(sky_tag[a]);

    document.getElementById("LAND0").src = p_img(land_tag[h]);
    document.getElementById("LAND1").src = p_img(land_tag[f]);
    document.getElementById("LAND2").src = p_img(land_tag[d]);
    document.getElementById("LAND3").src = p_img(land_tag[b]);

    document.getElementById("time0").src = i_img(sky_tag[mens(result_data, 4)[0]]);
    document.getElementById("time1").src = i_img(sky_tag[mens(result_data, 4)[1]]);
    document.getElementById("time2").src = i_img(sky_tag[mens(result_data, 4)[2]]);

    document.getElementById("day0").src = i_img(sky_tag[mens(result_data, 3)[0]]);
    document.getElementById("day1").src = i_img(sky_tag[mens(result_data, 3)[1]]);
    document.getElementById("day2").src = i_img(sky_tag[mens(result_data, 3)[2]]);

    document.getElementById("month0").src = i_img(sky_tag[mens(result_data, 2)[0]]);
    document.getElementById("month1").src = i_img(sky_tag[mens(result_data, 2)[1]]);
    document.getElementById("month2").src = i_img(sky_tag[mens(result_data, 2)[2]]);

    document.getElementById("year0").src = i_img(sky_tag[mens(result_data, 1)[0]]);
    document.getElementById("year1").src = i_img(sky_tag[mens(result_data, 1)[1]]);
    document.getElementById("year2").src = i_img(sky_tag[mens(result_data, 1)[2]]);

    ten_years_refresh();
    great_luck_show(seasons, num, starting[1]);
    tenyears_img_show(starting[2]);
    this_year_coloring(starting[2], nowYear);

    var resultSky = sky[sky_tag[g]-1] + " " + sky[sky_tag[e]-1] + " "  + sky[sky_tag[c]-1] + " " + sky[sky_tag[a]-1];
    var resultLand = land[land_tag[h]-1] + " " + land[land_tag[f]-1] + " " + land[land_tag[d]-1] + " " + land[land_tag[b]-1];
    resultCopy = resultSky + "\n" + resultLand;

    for(i=0; i<12; i++){
        var t_name = '#t' + String(i+1).padStart(2, '0');
        $(t_name).click(function(){
            var x = $(this).text();
            var picks = Number(Math.floor((parseInt(x)-1)/10))+1;
            // console.log(picks);
            var stYear = 10*(picks-1) + starting[0];
            ten_years_refresh();
            tenyears_img_show(stYear);
            this_year_coloring(stYear, nowYear);
        });
    }

    /****************************************************debugging***************************************************************/
    fullName = nameText + " " + yyyy+"년 "+mm+"월 "+dd+"일 "+hh+"시 "+min+"분생 "+starting[3]+"세 "+thisSex;
    document.getElementById("debug1").innerHTML = fullName;
    
    /****************************************************debugging***************************************************************/

    pdfFileName = nameText + "_" + yyyy+"_"+mm+"_"+dd+"_"+hh+"_"+min+"_"+starting[3]+"_"+thisSex+".pdf";

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

    var y = year;
    var m = month;
    var d = day;
    var deltaMonth = parseInt(m);
    var zodiac= (y-3)%60;
    if(d >= point[m-1]){
        deltaMonth += 1;
    }
    var temp = 12*((zodiac-1) % 5) + deltaMonth;
    if(temp <= 0){
        temp += 60;
    }        
    result = [((temp-1) % 10), ((temp-1) % 12)]
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
    var end = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];

    leap = check_leap(year);
    for(var i=1; i<year; i++){
        if(check_leap(i)==true){
            leapCount += 1;
        }
    }

    if(leap == true){
        end = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30];
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
    var length = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(isLeap == true){
        length = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
        // console.log("이후 월 ", point[parseInt(after_month-1)]);

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
    result = Number((span/3).toFixed());
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
    document.getElementById('sky001').style.background = '#FFFFFF';
    document.getElementById('sky002').style.background = '#FFFFFF';
    document.getElementById('sky003').style.background = '#FFFFFF';
    document.getElementById('sky004').style.background = '#FFFFFF';
    document.getElementById('sky005').style.background = '#FFFFFF';
    document.getElementById('sky006').style.background = '#FFFFFF';
    document.getElementById('sky007').style.background = '#FFFFFF';
    document.getElementById('sky008').style.background = '#FFFFFF';
    document.getElementById('sky009').style.background = '#FFFFFF';
    document.getElementById('sky010').style.background = '#FFFFFF';
    document.getElementById('sky011').style.background = '#FFFFFF';
    document.getElementById('sky012').style.background = '#FFFFFF';

    document.getElementById('land001').style.background = '#FFFFFF';
    document.getElementById('land002').style.background = '#FFFFFF';
    document.getElementById('land003').style.background = '#FFFFFF';
    document.getElementById('land004').style.background = '#FFFFFF';
    document.getElementById('land005').style.background = '#FFFFFF';
    document.getElementById('land006').style.background = '#FFFFFF';
    document.getElementById('land007').style.background = '#FFFFFF';
    document.getElementById('land008').style.background = '#FFFFFF';
    document.getElementById('land009').style.background = '#FFFFFF';
    document.getElementById('land010').style.background = '#FFFFFF';
    document.getElementById('land011').style.background = '#FFFFFF';
    document.getElementById('land012').style.background = '#FFFFFF';

    


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
    document.getElementById('jsky001').style.background = '#FFFFFF';
    document.getElementById('jsky002').style.background = '#FFFFFF';
    document.getElementById('jsky003').style.background = '#FFFFFF';
    document.getElementById('jsky004').style.background = '#FFFFFF';
    document.getElementById('jsky005').style.background = '#FFFFFF';
    document.getElementById('jsky006').style.background = '#FFFFFF';
    document.getElementById('jsky007').style.background = '#FFFFFF';
    document.getElementById('jsky008').style.background = '#FFFFFF';
    document.getElementById('jsky009').style.background = '#FFFFFF';
    document.getElementById('jsky010').style.background = '#FFFFFF';

    document.getElementById('jland001').style.background = '#FFFFFF';
    document.getElementById('jland002').style.background = '#FFFFFF';
    document.getElementById('jland003').style.background = '#FFFFFF';
    document.getElementById('jland004').style.background = '#FFFFFF';
    document.getElementById('jland005').style.background = '#FFFFFF';
    document.getElementById('jland006').style.background = '#FFFFFF';
    document.getElementById('jland007').style.background = '#FFFFFF';
    document.getElementById('jland008').style.background = '#FFFFFF';
    document.getElementById('jland009').style.background = '#FFFFFF';
    document.getElementById('jland010').style.background = '#FFFFFF';
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
        document.getElementById(skyTag).style.background = '#EFEFEF';
        document.getElementById(landTag).style.background = '#EFEFEF';
    }
    greatLuckCopy = "\n" + "\n" + g_sky + "\n" + g_land;
}

//지장간: 甲=0 ~ 癸=9, list = result_data, 년(x=1), 월(x=2), 일(x=3), 시(x=4)
function mens(list, x){
    
    var k = [8, 9, 9, 9, 7, 5, 4, 2, 0, 0, 1, 1, 1, 9, 4, 4, 6, 2, 2, 5, 3, 3, 1, 5, 4, 8, 6, 6, 7, 7, 7, 3, 4, 4, 0, 8];
    var x_men = [k[list[(2*x-1)]*3], k[1+list[(2*x-1)]*3], k[2+list[(2*x-1)]*3]];
    
    return [x_men[0], x_men[1], x_men[2]];
}

function Fortune_img_Today(){
    great_luck_refresh(true);
    var yyyy = document.getElementById("year_msg").value;
    var mm = document.getElementById("month_msg").value;
    var dd = document.getElementById("day_msg").value;
    var hh = document.getElementById("hour_msg").value;
    var min = document.getElementById("min_msg").value;
    document.getElementById("debug1").innerHTML = String(yyyy) + "년 " + String(mm) + "월 " + String(dd) + "일 " + String(hh) + "시 " + String(min)+ "분";
    fileName = String(yyyy) + "_" + String(mm) + "_" + String(dd) + "_" + String(hh) + "_" + String(min);
    pdfFileName = String(yyyy) + "_" + String(mm) + "_" + String(dd) + "_" + String(hh) + "_" + String(min)+".pdf";
    
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
        document.getElementById(skyTag).style.background = '#EFEFEF';
        document.getElementById(landTag).style.background = '#EFEFEF';
    }
    else{
        document.getElementById('jsky001').style.background = '#FFFFFF';
        document.getElementById('jsky002').style.background = '#FFFFFF';
        document.getElementById('jsky003').style.background = '#FFFFFF';
        document.getElementById('jsky004').style.background = '#FFFFFF';
        document.getElementById('jsky005').style.background = '#FFFFFF';
        document.getElementById('jsky006').style.background = '#FFFFFF';
        document.getElementById('jsky007').style.background = '#FFFFFF';
        document.getElementById('jsky008').style.background = '#FFFFFF';
        document.getElementById('jsky009').style.background = '#FFFFFF';
        document.getElementById('jsky010').style.background = '#FFFFFF';

        document.getElementById('jland001').style.background = '#FFFFFF';
        document.getElementById('jland002').style.background = '#FFFFFF';
        document.getElementById('jland003').style.background = '#FFFFFF';
        document.getElementById('jland004').style.background = '#FFFFFF';
        document.getElementById('jland005').style.background = '#FFFFFF';
        document.getElementById('jland006').style.background = '#FFFFFF';
        document.getElementById('jland007').style.background = '#FFFFFF';
        document.getElementById('jland008').style.background = '#FFFFFF';
        document.getElementById('jland009').style.background = '#FFFFFF';
        document.getElementById('jland010').style.background = '#FFFFFF';
    }
}

function Copy(){
    var str = resultCopy + greatLuckCopy;
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


function Convert2Image(e){
    
    const canvas = document.getElementById("FRESH");
    const context = canvas.getContext("2d");

    context.reset();
    const width = 500;
    const height = 500;
    const cw = width/2;
    const ch = height/2;
    context.fillStyle = "rgba(255,255,255,1)";
    context.fillRect(0, 0, width, height);
    context.textAlign = "center"
    context.fillStyle = "rgba(0, 0, 0, 1)";
    
    context.font = "15pt 맑은고딕";
    console.log(fullName.split(' '))
    context.fillText(fullName.split(' ',8)[0], cw, ch-200);
    context.fillText(fullName.slice(fullName.split(' ',8)[0].length+1, fullName.length), cw, ch-170);

    // 추가
    context.font = "22pt 맑은고딕";
    context.fillText(resultCopy.split('\n',2)[0], cw, ch-40);
    context.fillText(resultCopy.split('\n',2)[1], cw, ch);

    context.fillText(greatLuckCopy.split('\n', 4)[2], cw, ch+100);
    context.fillText(greatLuckCopy.split('\n', 4)[3], cw, ch+140);




    // var m = [8];
    // for (i=0; i<8; i++){
    //     m[i] = new Image();
        
    //     var k = i%4;
    //     var idN = '';
    //     if(i<4){
    //         idN = 'SKY';
    //     }
    //     else{
    //         idN = 'LAND'
    //     }

    //     idN += k.toString();
    //     m[i].src = document.getElementById(idN).src.split('karma/')[1];
    //     console.log(m[i])
    // }

    
    // m[0].onload = function() {context.drawImage(m[0], 50, 50, 80, 80);}
    // m[1].onload = function() {context.drawImage(m[1], 150, 50, 80, 80);}
    // m[2].onload = function() {context.drawImage(m[2], 250, 50, 80, 80);}
    // m[3].onload = function() {context.drawImage(m[3], 350, 50, 80, 80);}
    // m[4].onload = function() {context.drawImage(m[4], 50, 140, 80, 80);}
    // m[5].onload = function() {context.drawImage(m[5], 150, 140, 80, 80);}
    // m[6].onload = function() {context.drawImage(m[6], 250, 140, 80, 80);}
    // m[7].onload = function() {context.drawImage(m[7], 350, 140, 80, 80);}

    // var luck = [20];
    // for(i=0; i<20; i++){
    //     luck[i] = new Image();
    //     var k = '';
    //     if(i<10){
    //         k = 'i';
    //     }
    //     else{
    //         k = 'p';
    //     }
    //     var n = (i%10)+1;
    //     luck[i].src = document.getElementById(n.toString().padStart(3, '0') + k).src.split('karma/')[1];
        
    // }

    // luck[0].onload = function() {context.drawImage(luck[0], 410, 250, 40, 40);}
    // luck[1].onload = function() {context.drawImage(luck[1], 370, 250, 40, 40);}
    // luck[2].onload = function() {context.drawImage(luck[2], 330, 250, 40, 40);}
    // luck[3].onload = function() {context.drawImage(luck[3], 290, 250, 40, 40);}
    // luck[4].onload = function() {context.drawImage(luck[4], 250, 250, 40, 40);}
    // luck[5].onload = function() {context.drawImage(luck[5], 210, 250, 40, 40);}
    // luck[6].onload = function() {context.drawImage(luck[6], 170, 250, 40, 40);}
    // luck[7].onload = function() {context.drawImage(luck[7], 130, 250, 40, 40);}
    // luck[8].onload = function() {context.drawImage(luck[8], 90, 250, 40, 40);}
    // luck[9].onload = function() {context.drawImage(luck[9], 50, 250, 40, 40);}
    // luck[10].onload = function() {context.drawImage(luck[10], 410, 300, 40, 40);}
    // luck[11].onload = function() {context.drawImage(luck[11], 370, 300, 40, 40);}
    // luck[12].onload = function() {context.drawImage(luck[12], 330, 300, 40, 40);}
    // luck[13].onload = function() {context.drawImage(luck[13], 290, 300, 40, 40);}
    // luck[14].onload = function() {context.drawImage(luck[14], 250, 300, 40, 40);}
    // luck[15].onload = function() {context.drawImage(luck[15], 210, 300, 40, 40);}
    // luck[16].onload = function() {context.drawImage(luck[16], 170, 300, 40, 40);}
    // luck[17].onload = function() {context.drawImage(luck[17], 130, 300, 40, 40);}
    // luck[18].onload = function() {context.drawImage(luck[18], 90, 300, 40, 40);}
    // luck[19].onload = function() {context.drawImage(luck[19], 50, 300, 40, 40);}

    
    
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    const linkEle = document.querySelector('a');
    linkEle.download = fullName+'.png'
    linkEle.href = dataURL;
    linkEle.addEventListener('click', event => event.target.href = dataURL);


    
}

function savePDF(){
    //저장 영역 div id
    html2canvas($('#pdfArea')[0] ,{	
      //logging : true,		// 디버그 목적 로그
      //proxy: "html2canvasproxy.php",
      allowTaint : true,	// cross-origin allow 
      useCORS: true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
      scale : 2			// 기본 96dpi에서 해상도를 두 배로 증가
      
    }).then(function(canvas) {	
      // 캔버스를 이미지로 변환
      var imgData = canvas.toDataURL('image/png');

      var imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
      var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var margin = 10; // 출력 페이지 여백설정
      var doc = new jsPDF('p', 'mm');
      var position = 0;

      // 첫 페이지 출력
      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 한 페이지 이상일 경우 루프 돌면서 출력
      while (heightLeft >= 20) {			// 35
      position = heightLeft - imgHeight;
      position = position - 20 ;		// -25

      doc.addPage();
      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      }

      
      // 파일 저장
      doc.save(pdfFileName);
    });
  }

