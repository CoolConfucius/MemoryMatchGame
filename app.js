$(document).ready(init);

// var suits = ['\u2663', '\u2662', '\u2660', '\u2661'];
// var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
// var deck = []; 
// suits.forEach(function(suit){
//   ranks.forEach(function(rank){
//     var card = {};
//     card.rank = rank;
//     card.suit = suit; 
//     deck.push(rank + suit);
//   });
// });

var state = 'hit play'; 
var $hold; 
var $roof; 
var $top; 
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
    var random = Math.floor(Math.random()*12)+1; 
    numbers.push(random); numbers.push(random); 
  };
  console.log(numbers);
}

var table = []; 

function init(){
  $roof = $('#roof');
  $top = $('#top');
  $('#play').click(hitPlay); 
  $('.card').click(hitCard); 

}

function hitPlay(event){
  generateNumbs(); 
  shuffle(numbers); 
  console.log(numbers);
  assign(); 
  state = 'pick card'; 
  $('#roof').text(state);
}

function hitCard(event){
  if (state === 'pick card') {
    $this = $(this); 
    $this.css('background-color', 'white');
    $hold = $this; 
    $hold.off(); 
    text = $hold.text(); 
    state = 'pick another card'; 
  } else if(state==='pick another card'){
    $this = $(this); 
    if ($this.text()===text) {
      $this.css('background-color', 'black');
      $hold.css('background-color', 'black');
      $this.css('color', 'black');
      $hold.css('color', 'black');
      $this.off(); 
      $hold.off(); 
      points++; 
      if (points===8) {
        state = 'You win!'; 
        alert('You win!'); 
      } else {
        state = 'pick card'; 
      }
      text = ' '; 
    } else if ($this.text() !== text) {      
      $this.css('background-color', 'white');
      text = ' '; 
      state = 'nope! click anywhere to continue'; 
    };
  } else {
    $this.css('background-color', 'green');
    $hold.css('background-color', 'green');
    $hold.click(hitCard); 
    state = 'pick card'; 
  }
  $top.text(text); 
  $roof.text(state);
}

function assign(event){
  console.log($('#table'));
  console.log($('#table').children().eq(4));
  var row = 0; 
  var col = 0; 
  while(row < 4){
    for (var i = 0; i < numbers.length; i++) {      
      if (col === 4) { 
        col = 0; 
        row++; 
      };
      console.log('row ', row, 'col ', col);
      $('#table').children().eq(row).children().eq(col).text(numbers[i]);
      col++; 
    };
  }
}

