var stems = [
    '머리 좋은 사람들 주변에 많고 머리로 승부', 
    '상대에게 휘둘려 지배 당', 
    '스스로 성장', 
    '열정으로 노력',
    '믿을 만한 곳을 지배',
    '특정 분야로 지배',
    '어려움을 마주',
    '사소한 것으로 비범하게',
    '타이틀 보다 능력으로 승부 ',
    '남들이 나를 좋아',//
    '남에게 의존',
    '남과 서로 의지',
    '적극적으로 나대려고',
    '불규칙적으로 나대려고',
    '내부를 감지',
    '대중적인 곳에 지배',
    '완성된 사람 및 환경으로 몸 바쳐서 합류',
    '절대 지존자에게 충성',
    '타의에 의해 저 멀리로 진출',
    '적극적으로 긴밀히 접촉',//
    '선량한 마음으로 남 좋은일',
    '유망한 것을 보호하고 보존',
    '좋아 보이는 것을 더 좋아 보이게',
    '더 밝고 드러내려는 사람들을 마주',
    '적절히 타이밍을 맞추고 좋게 좋게',
    '길고 오랫동안 자세히 보려고',
    '오랜동안 예의 주시하여 이득을 취',
    '이상적인 것을 취',
    '비범하고 어려운 일을 해결',
    '가치를 투자',//
    '남에게 서비스',
    '예측 불가능하게 열심히 살려고',
    '주변에 더 따듯하게 하는 사람 마주',
    '열정에 열정을 추가',
    '상위권으로 안내',
    '아무것도 없는 분야에 개조 및 개발',
    '단기간에 완성을',
    '쓸모 있게 재활용',
    '무에서 유를 창조해 고생',
    '정신적으로 당',//
    '누군가로부터 희생당',
    '사람들에게 휘둘려 지배 당',
    '장점만 앞세우려고',
    '상위권으로 안내',
    '몸을 너무 사리고 답답하게',
    '보호 해줘야 할 사람 마주',
    '내 앞에 자랑할 만한 사람 마주',
    '내 능력 불안해서 실력 감추려고',
    '외부 소식을 잘 접해 위기를 통제',
    '비밀을 앉고 사는 운명을 맞이',//
    '사회적 타이틀로 자랑하려 내세우려고',
    '사람에게 잘 휘둘리는 운명을 맞이',
    '나 좀 자세히 봐달라고 볼만하게 행동',
    '나를 뜯어 고칠 사람 마주',
    '사람 보는 안목으로 충신이 옆에 있게',
    '다이렉트로 길을 이어주게',
    '의미있는 일을 하려고',
    '그 분야에 있을 만한 것 그대로 활용',
    '그때 그때 사정을 달리',
    '어딜 가든 대접 받고 인기있는 운명 마주',//
    '아직 숙련 중에 뭔가를 바꾸려고',
    '기대할 만한 것 더 끌어 올리려고',
    '남들에게 기분 좋게',
    '단기 코스로 완성을 더',
    '총대 매고 바지 사장',
    '자기 능력치 과대 포장',
    '아직 미완성인데 답답하게 살아서 힘겨워',
    '나 대신 집중해 줄 사람 마주',
    '문제를 대비하고 있는 그대로를 전달',
    '가치를 만들어 내는 행위',//
    '가르치려고',
    '훈계하여 절대 지존자로 받아들이게 하도록',
    '미완성임에 비해 그럴싸하게 뻥 튀기',
    '타이트 하게 어렵게 용도 변경',
    '동선 짧은 곳으로 이동',
    '어느 분야에 완성',
    '남이 등장으로 나를 밀려나가게',
    '전문가들을 마주해서 겸손한 자세로 생각',
    '나를 가치 높게',
    '어려운거 도전하여 정신일도', //
    '남을 중독 시키어 두뇌를 조종',
    '홀리게 만들어 행위로 자극하여 조종',
    '웅장하고 대단한 일을 ',
    '무에서 유를 창조해 야망을 가지고 비장',
    '올바른 선택으로 위기 관리에 능',
    '경계가 모호하거나 선을 넘어 지배',
    '날것을 온전히 그대로 유통 전달',
    '완성된 것을 온전히 전달',
    '어려운 일을 정면으로 마주',
    '정보를 더 퍼지게',//
    '새로운 방법과 시행착오로 의식을 깨우게',
    '자유로운 행위적인 방법으로 경험을 전달',
    '상대를 조져서 남 잘되는 꼴 못하게',
    '육체에 정신을 넣게',
    '속 깊게',
    '상대에게 편의를 제공 하려고 고생',
    '상대 말을 잘 들어서 잘 통하게',
    '결과를 통보 받고 남에게 전략을 전',
    '낯선 사람들과 합류',
    '정신에 정신을 더'
]

var resultSay = "";


function DecideTell(){

    var x = Number(out('day_sky'));
    var y = Number(out('month_sky'));
    var z = Number(out('time_sky'));
    var r = Number(out('year_sky'));
    var hkey = String(x-1);
    var gukey = String(y-1);
    var grkey = String(z-1);
    var gokey = String(r-1);
    var key_1 = Number(hkey+gukey); //일->월 ~하는 역할 가진 사람 5)
    var key_2 = Number(hkey+grkey); //일->시 ~하는 능력으로 3)
    var key_3 = Number(hkey+gokey); //일->년 공적으로 ~하는 사람으로 보여지며 4)
    var key_4 = Number(grkey+gokey); //시->년 ~하는 세상에서 1)
    var key_5 = Number(gukey+gokey); //월->년 ~하는 환경에 가서 2)

    var result1 = "\""+stems[key_4]+"하는 세상에서 " + stems[key_5]+"하는 환경에 가서 " + stems[key_2]+"하는 능력을 가져서 \n";
    var result2 = "공적으로 " + stems[key_3] + "하는 일에 " + stems[key_1] + "하는 역할을 가진 사람\"";
    resultSay = result1 + result2;
    
    console.log("통변", resultSay);
    if(answer != resultSay){
        document.getElementById('answer').innerHTML = resultSay;
    }
}

function Explains(){
    var x = Number(out('day_sky'));
    var y = Number(out('month_sky'));
    var z = Number(out('time_sky'));
    var r = Number(out('year_sky'));
    var hkey = String(x-1);
    var gukey = String(y-1);
    var grkey = String(z-1);
    var gokey = String(r-1);
    var key_1 = Number(hkey+gukey); //일->월 ~하는 역할 가진 사람 5)
    var key_2 = Number(hkey+grkey); //일->시 ~하는 능력으로 3)
    var key_3 = Number(hkey+gokey); //일->년 공적으로 ~하는 사람으로 보여지며 4)
    var key_4 = Number(grkey+gokey); //시->년 ~하는 세상에서 1)
    var key_5 = Number(gukey+gokey); //월->년 ~하는 환경에 가서 2)

    var result1 = "\""+stems[key_4]+"하는 세상에서 " + stems[key_5]+"하는 환경에 가서 " + stems[key_2]+"하는 능력을 가져서 \n";
    var result2 = "공적으로 " + stems[key_3] + "하는 일에 " + stems[key_1] + "하는 역할을 가진 사람\"";
    var answer = result1 + result2;

    if(answer != resultSay){
        document.getElementById('answer').innerHTML = "";
    }
}


function out(id_tag){
    var print = document.getElementById(id_tag).children[0];
    var srcName = print.getAttribute('src');
    var result =srcName[5] + srcName[6];       
    return result;                                               
}

