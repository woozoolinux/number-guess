// 게임 규칙
// 만약에 맞추면 , 맞췄습니다.
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호 < 유저번호 Up!!
// Reset 버튼
// 5번의 기회를 다 쓰면 게임이 종료 ( 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려주고, 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

// Math.random() 함수는 0 이상 1 미만의 값을 반환합니다.
// 그리고 소수점으로 반환됨
// 그러므로 100을 곱해주면 소수점 뒤에 2자리까지 출력된다.
// 소수점을 버리는 함수인 Math.floor로 전체를 감싸준다.
// 0부터 99까지만 나오므로 +1을 해서 1~100으로 변경한다.
// 1에서 100까지의 랜덤 번호 생성

let computerNum;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area")
let chances = 5;
let history = [];
let historyCount = 0;

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
  userInput.value = "";
})

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log("정답", computerNum);
}

pickRandomNum();

function play() {
  let userValue = userInput.value;

  if (userValue > 100){
    resultArea.textContent = "100보다 작은 값을 입력하세요";
  } else if (userValue < 1) {
    resultArea.textContent = "100보다 큰 값을 입력하세요";
  } else {

    history[historyCount] =  userValue;


    for (let i = 0; i < history.length; i++) {
      if ( i != historyCount){

      if (history[i] == history[historyCount]){
        resultArea.textContent = "같은 숫자를 입력하셨습니다.";
        return;
      }
    }
    }

  historyCount ++ ;
  chances -- ;


  if (userValue < computerNum) {
    resultArea.textContent = "UP!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!";
  } else {
    resultArea.textContent = "맞췄습니다!!";
    playButton.disabled = true
    chanceArea.textContent = "게임종료";
    return;
  }
  chanceArea.textContent = `기회는 총 ${chances}번`;
  if (chances == 0){
    playButton.disabled = true
    chanceArea.textContent = `기회는 끝났다!`;
  }
}

}

function reset() {
  userInput.value = "";
  resultArea.textContent = "";
  pickRandomNum();
  chances = 5;
  playButton.disabled = false;
  history = [];
}
