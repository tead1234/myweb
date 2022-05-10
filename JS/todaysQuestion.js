//c 버튼을 누르면 두 질문창과 답변창이 80%로 작아져야됨
// 질문하고 답을 미리 저장해놨다가 
const question_OS = ["프로세스와 스레드의 차이?","멀티 스레드의 장점과 단점?"]
const question_DataBase = ["스키마란 무엇인가?"]
const question_Algorithm = ["시간복잡도란 무엇인가?"]
const question_Network = ["TCP와 IP의 차이?"]
const answer_OS = [["code","data","heap","최소","작업","단위","인스턴스","메모리","동적","할당"],["하나의", "프로세스", "다수의","여러개", "스레드","교착상태","단위","작업","자원"]]
const answer_DataBase = []
const answer_Algorithm = []
const answer_Network = []
let sucess_answer = []
var score = 0
// 각 카테고리별 구분 키가 필요함
let key = 0
var rand = 0
// 질문생성
// nav매뉴중 버튼을 누르면 랜덤으로 질문을 생성하도록 구성
$('#nav-OS').click(()=>{
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_OS[rand])
    key = 0
})
$('#nav-Data').click(()=>{
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_DataBase[rand])
    key = 1

})
$('#nav-Net').click(()=>{
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_Network[rand])
    key = 2

})
$('#nav-Algo').click(()=>{
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_Algorithm[rand])
    key = 3

})


// 저장부분
myStorage = window.localStorage;


// 진행도 보이기/ 닫기
$('#open-question-bar').click(()=>{
    if($('.question-bar').css('display')== 'none'){
    $('.question-bar').css('display','inline');
    $('.main-question-screen').css('width','80%');
    }
    else{
        $('.question-bar').css('display','none');
        $('.main-question-screen').css('width','100%');
    }
})

$("#submitAnswer").click(()=>{
    let answer = $("#answer-board").val();
    let 답안리스트 = null
    let 질문리스트 = null
    // 답안이랑 answer_OS[i]가 문제ㄹ를 말함 
    if (key == 0){
        답안리스트 = answer_OS
        질문리스트 = question_OS
    }else if(key == 1){
        답안리스트 = answer_DataBase
        질문리스트 = question_DataBase

    }else if(key == 2){
        답안리스트 = answer_Network
        질문리스트 = question_Network

    }else if(key == 3){
        질문리스트 = question_Algorithm
        답안리스트 = answer_Algorithm
    }
    for(let i =0; i<답안리스트[rand].length;i++){
        if (answer.includes(답안리스트[rand][i])){
            score += 10
        }
    }
    if(score>50){
        passOrfail();
        //  답안리스트 == 이놈은 답안
        saveAnswer(질문리스트[rand],answer)
    }else{
        alert("점수 미달입니다.")
    }

    score = 0
})
function passOrfail(){
   alert("축하합니다 통과하셨습니다.")
}
function saveAnswer(문항, 제출정답){
    // 통과된 문항기록
    sucess_answer.push(문항);
    // 로컬스토리지에 저장
    myStorage.setItem(문항, 제출정답);
}   