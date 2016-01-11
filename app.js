$(document).ready(init);

var suits = ['\u2663', '\u2662', '\u2660', '\u2661'];
var state = 'hit play'; 
var $hold; 
var $roof; 
var $top; 
var $play; 
var points = 0; 

function shuffle(deck) {
  var currentIndex = deck.length;
  var temp; 
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
  return deck;
}

// deck = shuffle(deck); 

var numbers = []; 
function generateNumbs(){
  for (var i = 0; i < 8; i++) {
    var random = Math.floor(Math.random()*13)+1; 
    if (random === 1) {random = "Ace"};
    if (random === 11) {random = "Jack"};
    if (random === 12) {random = "Queen"};
    if (random === 13) {random = "King"};
    var suit = Math.floor(Math.random()*4);
    random = random + suits[suit]; 
    numbers.push(random); numbers.push(random); 
  };
  console.log(numbers);
}

var table = []; 

function init(){
  $roof = $('#roof');
  $top = $('#top');
  $play = $('#play');
  $play.click(hitPlay); 
  $('.card').click(hitCard); 

}

function hitPlay(event){
  if (state === 'You win!') {
    reset(); 
  };

  if (state === 'You win!' || state === 'hit play') {
    generateNumbs(); 
    shuffle(numbers); 
    console.log(numbers);
    assign(); 
    state = 'pick card'; 
    $roof.text(state);    
    $play.text('reset'); 
  } 
  // else {
  //   reset();
  // }
}

function hitCard(event){
  if (state === 'pick card') {
    $this = $(this); 
    $this.css('background-color', 'white').css('color', 'black');
    $hold = $this; 
    $hold.off(); 
    text = $hold.text(); 
    state = 'pick another card'; 
  } else if(state==='pick another card'){
    $this = $(this); 
    if ($this.text()===text) {
      $this.css('background-color', 'black');
      $hold.css('background-color', 'black');
      $this.css('color', 'white');
      $hold.css('color', 'white');
      $this.off(); 
      $hold.off(); 
      points++; 
      if (points===8) {
        state = 'You win!'; 
        alert('You win!'); 
        $play.text("Play Again"); 
      } else {
        state = 'pick card'; 
      }
      text = ' '; 
    } else if ($this.text() !== text) {      
      $this.css('background-color', 'white').css('color', 'black');
      text = ' '; 
      state = 'nope! click anywhere to continue'; 
    };
  } else {
    $this.css('background-color', 'green').css('color', 'green');
    $hold.css('background-color', 'green').css('color', 'green');
    $hold.click(hitCard); 
    state = 'pick card'; 
  }
  $top.text(text); 
  $roof.text(state);
}

function assign(event){  
  var row = 0; 
  var col = 0; 
  while(row < 4){
    for (var i = 0; i < numbers.length; i++) {      
      if (col === 4) { 
        col = 0; 
        row++; 
      };
      $('#table').children().eq(row).children().eq(col).text(numbers[i]);
      col++; 
    };
  }
}

function reset(event){
  table = []; 
  // var row = 0; 
  // var col = 0; 
  // while(row < 4){
  //   for (var i = 0; i < numbers.length; i++) {      
  //     if (col === 4) { 
  //       col = 0; 
  //       row++; 
  //     };
  //     $('#table').children().eq(row).children().eq(col).text(numbers[i]);
  //     col++; 
  //   };
  // } 
  $('.card').css('background-color', 'green').css('color', 'green').click(hitCard);
  points = 0; 
  numbers = []; 
  generateNumbs(); 
  shuffle(numbers); 
  console.log(numbers);
  assign(); 
}