//c 버튼을 누르면 두 질문창과 답변창이 80%로 작아져야됨
// 질문하고 답을 미리 저장해놨다가 
const question_OS = ["프로세스와 스레드의 차이?","멀티 스레드의 장점과 단점?"]
const question_DataBase = ["스키마란 무엇인가?"]
const question_Algorithm = ["시간복잡도란 무엇인가?"]
const question_Network = ["TCP와 IP의 차이?"]
const answer_OS = [["code","data","heap","최소","작업","단위","인스턴스","메모리","동적","할당"],["하나의, 프로세스, 다수의,여러개, 스레드,교착상태,단위,작업,자원"]]
const answer_DataBase = []
const answer_Algorithm = []
const answer_Network = []
var score = 0

// 질문생성
// nav매뉴중 버튼을 누르면 랜덤으로 질문을 생성하도록 구성
$('#nav-OS').click(()=>{
    var rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_OS[rand])
})
$('#nav-Data').click(()=>{
    var rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_DataBase[rand])
})
$('#nav-Net').click(()=>{
    var rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_Network[rand])
})
$('#nav-Algo').click(()=>{
    var rand = Math.floor(Math.random() * question_OS.length)
    $('#question').html(question_Algorithm[rand])
})

// const os = document.getElementById("nav-OS")
// os.onclick = function(){
//     console.log("눌림");
// }

// 저장부분
myStorage = window.localStorage;
let v1 = [];

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
    // 답안이랑 
    for(let i =0; i<answer_OS[0].length;i++){
        if (answer.includes(answer_OS[0][i])){
            score += 10
        }
    }
    v1.push(answer)
    myStorage.setItem("k1", JSON.stringify(v1));
    alert(score)
    score = 0
})
function passOrfail(score){
    if (score >50){

    }
}
function saveAnswer(){
    
}