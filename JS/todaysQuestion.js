//c 버튼을 누르면 두 질문창과 답변창이 80%로 작아져야됨
// 질문하고 답을 미리 저장해놨다가 
const question_OS = ["프로세스와 스레드의 차이?","멀티 스레드의 장점과 단점?"]
const question_DataBase = []
const question_Algorithm = []
const question_Network = []
const answer_OS = [["code","data","heap","최소","작업","단위","인스턴스","메모리","동적","할당"],["하나의, 프로세스, 다수의,여러개, 스레드,교착상태,단위,작업,자원"]]
const answer_DataBase = []
const answer_Algorithm = []
const answer_Network = []
var score = 0

// 질문생성
$('#question').html(question_OS[0])
myStorage = window.localStorage;
let v1 = [];
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
})