function convert2Image(){
    var resultDiv =  document.getElementById('result');

    var s0 = document.getElementById("SKY0").src.split("Fortune_HP/")[1];
    var s1 = document.getElementById("SKY1").src.split("Fortune_HP/")[1];
    var s2 = document.getElementById("SKY2").src.split("Fortune_HP/")[1];
    var s3 = document.getElementById("SKY3").src.split("Fortune_HP/")[1];
    

    resultDiv.innerHTML = '<a download="test.png" href="'+s0+'">test</a>';
}


