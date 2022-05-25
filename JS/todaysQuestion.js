//c 버튼을 누르면 두 질문창과 답변창이 80%로 작아져야됨
// 질문하고 답을 미리 저장해놨다가 
const question_OS = ["프로세스와 스레드의 차이?","멀티 스레드의 장점과 단점?","운영 체제 란 무엇입니까?"]
const question_DataBase = ["스키마란 무엇인가?","관계형 데이터베이스를 설명해보시오"]
const question_Algorithm = ["시간복잡도란 무엇인가?","스택과 큐의 차이가 무엇인가?"]
const question_Network = ["TCP/IP?","DNS란 무엇인가?"]
const answer_OS = [["code","data","heap","최소","작업","단위","인스턴스","메모리","동적","할당"],["하나의", "프로세스", "다수의","여러개", "스레드","교착상태","단위","작업","자원"]
[ "하드웨어","소프트웨어" ,"통신", "소프트웨어", "프로그램","운영체제"]]
const answer_DataBase = [["스키마","데이터베이스의 구조","제약조건","명세","메타데이터","데이터 개체","entity","속성","관계"]
["테이블","키","값","종속성","관계","레코드","튜플","무결성"]]
const answer_Algorithm = [["특정","알고리즘","시간","해결","빅오","연산","횟수"],["선입선출","후입선출","최악의","시간복잡도","log(N)","최선의","log(1)","마지막","처음"]]
const answer_Network = [[],["도메인","Domain","Name","Server","전화번호부","역할","서버","시스템","쿼리","query"]]
// 답안이 a입니다 >> 유사답안 a로 볼수 있습니다. >> 머신러닝이용해서 유사답안도 정답으로 인정해주는 알고리즘
let sucess_answer = []
var score = 0
// 각 카테고리별 구분 키가 필요함
let key = 0
let local_key = 0
let rand = 0
let progValue = [0,0,0,0]
let 답안리스트 = null
let 질문리스트 = []

// 질문생성
// nav매뉴중 버튼을 누르면 랜덤으로 질문을 생성하도록 구성
$('#nav-OS').click(()=>{
    $('#question').html("")
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_OS[rand])
    key = 0
    changeProgressBar(key)
})
$('#nav-Data').click(()=>{
    $('#question').html("")
    rand = Math.floor(Math.random() * question_DataBase.length)
    $('#question').html(question_DataBase[rand])
    key = 1
    changeProgressBar(key)
})
$('#nav-Net').click(()=>{
    $('#question').html("")
    rand = Math.floor(Math.random() * question_Network.length)
    $('#question').html(question_Network[rand])
    key = 2
    changeProgressBar(key)
})
$('#nav-Algo').click(()=>{
    $('#question').html("")
    rand = Math.floor(Math.random() * question_Algorithm.length)
    $('#question').html(question_Algorithm[rand])
    key = 3
    changeProgressBar(key)
})


// 저장부분
myStorage = window.localStorage;
// 진행도 보이기/ 닫기
$('#open-question-bar').click(()=>{
    if($('.question-bar').css('display')== 'none'){
        $('.main-question-screen').css('width', '80%')
        $('.main-question-screen').animate({width: '80%'}, 500)
}
    else{
        $('.main-question-screen').animate({width: '100%'}, 500)
        $('.question-bar').css('display','none');
    }
})

$("#submitAnswer").click(()=>{
    let answer = $("#answer-board").val();
    // 답안이랑 answer_OS[i]가 문제ㄹ를 말함 
    if (key == 0){
        답안리스트 = answer_OS
        질문리스트 = question_OS
        changeProgressBar(key)
    }else if(key == 1){
        답안리스트 = answer_DataBase
        질문리스트 = question_DataBase
        changeProgressBar(key)
    }else if(key == 2){
        답안리스트 = answer_Network
        질문리스트 = question_Network
        changeProgressBar(key)
    }else if(key == 3){
        질문리스트 = question_Algorithm
        답안리스트 = answer_Algorithm
        changeProgressBar(key)
    }
    for(let i =0; i<답안리스트[rand].length;i++){
        if (answer.includes(답안리스트[rand][i])){
            score += 10
        }
    }
    if(score>50){
        if(saveAnswer(질문리스트[rand],answer)){
            return
        }
        changeAlert("축하합니다.")
        $(".black-background").css('transform','translateY(-100px)')
        //  답안리스트 == 이놈은 답안
        /// 맞추면 맞춘 갯수를 저장하는건 여기다가 따로 만들어야 할듯
        checkSuccessQuestion(key)
        changeProgressBar(key)
        countAnswer();
        update();
    }else{
        //alert("점수 미달입니다.");
        changeAlert("응 다시해")
        $(".black-background").css('transform','translateY(-100px)')

        update_fail();
    }

    score = 0
})

function saveAnswer(문항, 제출정답){
    // 통과된 문항기록
    if(sucess_answer.includes(문항)){
        alert('이미 맞춘문제입니다.')
        return true
    }
    sucess_answer.push(문항);
    // 로컬스토리지에 저장
    // 이거 키값을 어떻게 해야 하지???
    myStorage.setItem(local_key,JSON.stringify([문항, 제출정답]));
    local_key += 1;
}   
// 점수별 진행도 부분을 변경해주는 함수
// ket값에 따라 화면에 나오는 멘트와 현재까지 진행도를 저장해놨다가 나와야함
function changeProgressBar(key){
    // 맞춘갯수는 어떻게 가져올까???
    //키값으로 문제 전체 갯수를 불러오고
    // 맞춘갯수는 그냥 1씩 올라가는걸로??
    // 맞춘갯수 / 전체 문제수 == 요걸 value값으로 넣어줘야됨
    $('#progress').attr("value", `${progValue[key]}`);
    $('#progress').attr('max', `${질문리스트.length}`);
}
function checkSuccessQuestion(key){
    if(key == 0){
        progValue[key] += 1
    }
    else if(key == 1){
        progValue[key] += 1
    }
    else if(key == 2){
        progValue[key] += 1
    }
    else{
        progValue[key] += 1
    }
}
// 저장된 답안을 보여주는 함수
function showSavedAnswer(문항){
    if(sucess_answer.includes(문항)){
        $("#answer-board").html()
    }

}
// 맞추면 맞춘 갯수 올라가는 카운터
function countAnswer(){
    var numOfAnswer = document.getElementById("success-answer-count").innerHTML
    numOfAnswer = parseInt(numOfAnswer)
    numOfAnswer += 1
    document.getElementById("success-answer-count").innerHTML = numOfAnswer;
}   
function update(){
    var point = document.getElementById("score").innerHTML
    point = parseInt(point)
    point += 10;
    document.getElementById("score").innerHTML = point
}
function update_fail(){
    var point = document.getElementById("score").innerHTML
    point = parseInt(point)
    point -= 10;
    document.getElementById("score").innerHTML = point
}
function closeAlert(창){
    if(창.click){
        $(".black-background").css('transform','translateY(-800px)')
    }
}
function changeAlert(멘트){
    
    $('#ment').html(멘트);
}
// 맞춘문제 페이지 기록하기
/// 로컬스토리지 자체는 공유가 되지만, 변수값은 공유가 되지않는다
// function getAnswerList(){
//     for(let i =0; i < myStorage.length; i ++){
        
//         let local_key = sucess_answer[i];
//         let sa = myStorage.getItem(local_key)
//         sen = `<tr><td>${local_key}</td><td>${sa}</td></tr>`
//         $('#table-content').after(sen);
//     }
// }