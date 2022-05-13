//c 버튼을 누르면 두 질문창과 답변창이 80%로 작아져야됨
// 질문하고 답을 미리 저장해놨다가 
const question_OS = ["프로세스와 스레드의 차이?","멀티 스레드의 장점과 단점?","ㅇ","1", "3", "5"]
const question_DataBase = ["스키마란 무엇인가?"]
const question_Algorithm = ["시간복잡도란 무엇인가?"]
const question_Network = ["TCP와 IP의 차이?"]
const answer_OS = [["code","data","heap","최소","작업","단위","인스턴스","메모리","동적","할당"],["하나의", "프로세스", "다수의","여러개", "스레드","교착상태","단위","작업","자원"]]
const answer_DataBase = [["스키마","1","2","3","4","5", "6"]]
const answer_Algorithm = []
const answer_Network = []
let sucess_answer = []
var score = 0
// 각 카테고리별 구분 키가 필요함
let key = 0
var rand = 0
let progValue = [0,0,0,0]
let 답안리스트 = null
let 질문리스트 = null
// 질문생성
// nav매뉴중 버튼을 누르면 랜덤으로 질문을 생성하도록 구성
$('#nav-OS').click(()=>{
    
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_OS[rand])
    key = 0
    changeProgressBar(key)
})
$('#nav-Data').click(()=>{
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_DataBase[rand])
    key = 1
    changeProgressBar(key)
})
$('#nav-Net').click(()=>{
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_Network[rand])
    key = 2
    changeProgressBar(key)
})
$('#nav-Algo').click(()=>{
    rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_Algorithm[rand])
    key = 3
    changeProgressBar(key)
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
        saveAnswer(질문리스트[rand],answer)
        passOrfail();
        //  답안리스트 == 이놈은 답안

        /// 맞추면 맞춘 갯수를 저장하는건 여기다가 따로 만들어야 할듯
        checkSuccessQuestion(key)
        changeProgressBar(key)
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
    if(문항 in sucess_answer){
        alert('이미 맞춘문제입니다.')
        return
    }
    sucess_answer.push(문항);
    // 로컬스토리지에 저장
    myStorage.setItem(문항, 제출정답);
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
function showSavedAnswer(){

}