$(document).ready(function() {
    var teamOnev = localStorage.getItem('teamOneStored');
    var teamTwov = localStorage.getItem('teamTwoStored');
    //team names to localstorage
    //test to see if local storage is already set on page load and add default team names
    if (!localStorage.getItem("teamOneStored")) {
        localStorage.setItem("teamOneStored", "Team One");
    }
    if (!localStorage.getItem("teamTwoStored")) {
        localStorage.setItem("teamTwoStored", "Team Two");
    }

    //if there isn't  a team score then set it to 0
    if (!localStorage.getItem("teamOneScore")) {
        localStorage.setItem("teamOneScore", "0");
    }    
    if (!localStorage.getItem("teamTwoScore")) {
        localStorage.setItem("teamTwoScore", "0");
    }

    //get team scores and display them
    if (localStorage.getItem("teamOneScore")) {
    	var currentTeamOneScore = localStorage.getItem('teamOneScore');    
    	$('div.teamOnePoints').text(currentTeamOneScore);
	}
	if (localStorage.getItem("teamTwoScore")) {
    	var currentTeamTwoScore = localStorage.getItem('teamTwoScore');    
    	$('div.teamTwoPoints').text(currentTeamTwoScore);
	}


    //set up random team to start if no game stored
	var theirTurn;

	if (!localStorage.getItem("whosTurn")) {
	  // team turn array
	  var turn = ['0', '1'];
	  //set a random team
	  theirTurn = Math.floor(Math.random() * (turn.length));
	  localStorage.setItem("whosTurn", theirTurn);
	  //if a game is already stored then get current team    
	} else {
	  theirTurn = localStorage.getItem("whosTurn");
	}

	if(theirTurn == 0) {
	  //First team name
	  var currentTeamOne = localStorage.getItem("teamOneStored")
	  $('div.teamsTurn').html(currentTeamOne);
      $('.js-teamOneTurn > i').css('color', '#0c0');
	} else {
	  // Second team name
	  var currentTeamTwo = localStorage.getItem("teamTwoStored")
	  $('div.teamsTurn').html(currentTeamTwo);
      $('.js-teamTwoTurn > i').css('color', '#0c0');
	}

    //set up the turn points
    if (!localStorage.getItem("turnScore")) {
        localStorage.setItem("turnScore", "0");
    }

    //▼ click continue
        $(".continueGame").click(function() {
            //just need to toggle the overlay when continui
            var continueTeamOneName = localStorage.getItem('teamOneStored');
            var continueTeamTwoName = localStorage.getItem('teamTwoStored');
            $('div.teamOneName').text(continueTeamOneName);
            $('div.teamTwoName').text(continueTeamTwoName); 
            $('.overlay').toggle();
        });
    //▲ click continue
//Start Game
    //click new game button
       $(".newGame").click(function() {
        //hide the start game buttons row
        $('.start-game-buttons').toggle();
        //shows the row with the form to enter the team names
        $('.showTeamNames').addClass('fade-in');
        $('.showTeamNames').toggle();
    });

    //submit team names from toggle on game start
   
     $("#theTeamNamesForm").submit(function(evt) {
            // Get the value of the name field.
            var name = document.getElementById('startteamOneId').value;
            var name2 = document.getElementById('startteamTwoId').value;
            // Save the name in localStorage.
            localStorage.setItem('teamOneStored', name);
            localStorage.setItem('teamTwoStored', name2);

            //reset turn points
            localStorage.setItem("turnScore", "0");
            $('.turnPoints').text('0');

            //reset team points
            localStorage.setItem("teamOneScore", "0");
            localStorage.setItem("teamTwoScore", "0");
            $('div.teamOnePoints').text('0');
            $('div.teamTwoPoints').text('0');

            //put names in html
            $('div.teamOneName').text(name);
            $('div.teamTwoName').text(name2); 

            //close the overlay 
            //$('.overlay').toggle();
            $('.showTeamNames').toggle();
            $('.random-team').addClass('fade-in');
            $('.random-team').toggle();
            evt.preventDefault();

        });

       $(".start-game").click(function() {
            $('.overlay').toggle();
        });
     

    //put the team names in the settings form
    var inputFillNameOne = localStorage.getItem('teamOneStored');
    var inputFillNameTwo = localStorage.getItem('teamTwoStored');
    $( "#teamOneId" ).attr( "placeholder", "Current Name:" + inputFillNameOne );
    $( "#teamTwoId" ).attr( "placeholder", "Current Name:" + inputFillNameTwo );



    //put the team names on the page
    $('div.teamOneName').html(teamOnev);
    $('div.teamTwoName').html(teamTwov);    

    //get the turn points into a variable
	var theTurnPoints = localStorage.getItem('turnScore');

    //put the turn points on the page
    $('div.turnPoints').html(theTurnPoints);


    // multiplicands: they go past 12 to help randomize the appearance of obor. If > 12 then obor is displayed. The more numbers > 12 the more obor will appear.
    var multiplicand = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];

    $('#newMultiplican').click(function() {
        var rand = Math.floor(Math.random() * (multiplicand.length - 1));
        $('div.multiplicandHolder').html('<span class="theProblemDetail">' + rand + "</span>");
        //if number greater than 12 then display image  
        if (rand > 12) {
            $('div.multiplicandHolder').html('<img class="img-responsive" src="./img/obor.svg">');
            $(this).endTurnClearTurnPoints();
        }
    });

    //user clicks on mutiplyer and it updates the page
    $('.multNum').click(function() {
        $('.theMultiplier').text($(this).text());
        $('.multNum').not(this).removeClass('js-num-clicked');
        $( this ).toggleClass( "js-num-clicked" )
    });


    //check the answer
    $('.check').click(function() {
        //get the mutiplier
        var multi = $('.theMultiplier').html();
        //get the mutiplicand
        var multi2 = $('.multiplicandHolder > .theProblemDetail').html();
        //calculate the productr
        var product = multi * multi2;
        //get their answer
        //var theAnswer = $('.myAnswer').html(); 
        var checkAnswer = $('.myAnswer').val();

        //if their answer is correct
        if (checkAnswer == product) {
            $('#alertModal').modal('show');
            $('.js-alert').html("Correct");

            //get the turnScore out of local storage and increase by 1
            var increaseTurn =  parseInt(localStorage.getItem('turnScore')) + 1
            //set turnScore to the new point value
            localStorage.setItem('turnScore', increaseTurn);

            //get the turn points
        	var newTurnPoints = localStorage.getItem('turnScore');
            //update the turn points on the page
            $('div.turnPoints').html(newTurnPoints);
            //display the problem with the correct answer
            $('.product').html(multi + ' X ' + multi2 + ' \= ' + product);
        //if their answer is incorrect
        } else {
            $('#alertModal').modal('show');
            $('.js-alert').html("Incorrect");
            $('.product').html("Next teams turn");
            $(this).endIncorrectanswer();
            //need to end the turn here 
        }

    });

    //▼ end turn for when obot appears
        $.fn.endTurnClearTurnPoints = function() {
        var thisTurnPoints = $('.turnPoints').html();
        var teamTotal = localStorage.getItem('teamOneScore');
        var teamTwoTotal = localStorage.getItem('teamTwoScore');
        var theTurn = localStorage.getItem('whosTurn');
        var teamOneName = localStorage.getItem('teamOneStored');
        var teamTwoName = localStorage.getItem('teamTwoStored');
        if (theTurn == 0) {
            localStorage.setItem('whosTurn', '1');
            localStorage.setItem('turnScore', '0');
            $('.turnPoints').text('0');
            $('.teamsTurn').text(teamTwoName);

            $('.js-teamOneTurn > i').css('color', '#fff');
            $('.js-teamTwoTurn > i').css('color', '#0c0');


        } else {
            localStorage.setItem('whosTurn', '0');
            localStorage.setItem('turnScore', '0');
            $('.turnPoints').text('0');
            $('.teamsTurn').text(teamOneName);
            $('.js-teamOneTurn > i').css('color', '#0c0');
            $('.js-teamTwoTurn > i').css('color', '#fff');
        }
    }
    //▲ end end turn for when obor appears

    //end the turn add turn points to total switch to other team
    $('.endTurn').click(function() {
        $(this).endThisTurn();
    });
    
    $.fn.endThisTurn = function() {
        var thisTurnPoints = $('.turnPoints').html();
        var teamTotal = localStorage.getItem('teamOneScore');
        var teamTwoTotal = localStorage.getItem('teamTwoScore');
        var theTurn = localStorage.getItem('whosTurn');
        var teamOneName = localStorage.getItem('teamOneStored');
        var teamTwoName = localStorage.getItem('teamTwoStored');
        if (theTurn == 0) {
            var addedPoints = parseInt(thisTurnPoints) + parseInt(teamTotal);
            localStorage.setItem('teamOneScore', addedPoints);
            $('.teamOnePoints').html(addedPoints);
            localStorage.setItem('whosTurn', '1');
            localStorage.setItem('turnScore', '0');
            $('.turnPoints').text('0');
            $('.teamsTurn').text(teamTwoName);

            $('.js-teamOneTurn > i').css('color', '#fff');
            $('.js-teamTwoTurn > i').css('color', '#0c0');


        } else {
            var addedPointsTwo = parseInt(thisTurnPoints) + parseInt(teamTwoTotal);
            localStorage.setItem('teamTwoScore', addedPointsTwo);
            $('.teamTwoPoints').html(addedPointsTwo);
            localStorage.setItem('whosTurn', '0');
            localStorage.setItem('turnScore', '0');
            $('.turnPoints').text('0');
            $('.teamsTurn').text(teamOneName);
            $('.js-teamOneTurn > i').css('color', '#0c0');
            $('.js-teamTwoTurn > i').css('color', '#fff');
        }
    }

    // If the answer supplied is incorrect
    $.fn.endIncorrectanswer = function() {
        //put whos turn it is into a variable
        var theTurn = localStorage.getItem('whosTurn');
        //put team one name into a variable
        var teamOneName = localStorage.getItem('teamOneStored');
        //put team two name into a variable
        var teamTwoName = localStorage.getItem('teamTwoStored');
        //if it is team one
        if (theTurn == 0) {
            //change the turn to team two
            localStorage.setItem('whosTurn', '1');
            //change the turn score in storage to 0
            localStorage.setItem('turnScore', '0');
            //set the turn points on page to 0
            $('.turnPoints').text('0');
            //change the team name on page to team two
            $('.teamsTurn').text(teamTwoName);
            //switch the turn indicator
            $('.js-teamOneTurn > i').css('color', '#fff');
            $('.js-teamTwoTurn > i').css('color', '#0c0');
        } else {
            localStorage.setItem('whosTurn', '0');
            localStorage.setItem('turnScore', '0');
            $('.turnPoints').text('0');
            $('.teamsTurn').text(teamOneName);
            $('.js-teamOneTurn > i').css('color', '#0c0');
            $('.js-teamTwoTurn > i').css('color', '#fff');
        }
    }

    //allow the user to decide what operator they want to use
    $('.fa-times').click(function() {
        $('.theOperator').text('X');
    });
    $('.fa-asterisk').click(function() {
        $('.theOperator').text('*');
    });
        $('.js-flip').click(function() {
        $('.card').toggleClass('flipped');
    });

    //close the model when ok is clicked
    $('.js-modal-close').click(function() {
        $('#gridModal').modal('toggle')
    });
    

    //equal height columns with matchHeight.js
        $(function() {
            $('.problem-col').matchHeight();
        });

    
    //equal width columns
    function equalWidth () {
            //get the width of column
            var divWidth = $(".teamOnePoints").width();
            //get the width of column
            var divWidthTwo = $(".teamTwoPoints").width();
            //compare and set the column width 
            //if first column is wider then set the second column's width as column one's
            if (divWidth > divWidthTwo) {
                $(".teamTwoPoints").width(divWidth);
            }
            //if second column is wider then set the first column's width as column two's 
            if (divWidthTwo > divWidth ) {
                $(".teamOnePoints").width(divWidthTwo);
            }
        }



    
    /*to deal with the absolute positioned card flipping. makes the content of the card match the column height for problem row*/
    $(window).on('resize',function() {
    //match parent height
        $(".card__back").height($(".card__front").height());   
        //then mathch the child to the parent 
        $(".card").height($(".card__back").height());
        //problem row match height of prroblem button row
        /*$(".problem-buttons").height($(".theProblem").height());  */

        var probButRow = $('#footer').offset().top - $('.problem-buttons').offset().top;
        $('.problem-buttons').css('height', probButRow);

        equalWidth();
    });

    //resize when document ready
    $(window).trigger('resize');

    //animation
    var svg = document.querySelector('.obor-svg'),
    /*eyeBrows = svg.querySelectorAll('.js-eyebrow'),*/
    eyes = svg.querySelectorAll('#lid');

    $(eyes).velocity({ 
        scaleY: 0.1,
        transformOrigin:"0 50% 50%"
    }, 2000);

// Instance the tour
    var tour = new Tour({
      steps: [
      {
        element: "#tour-step-1",
        placement: "bottom",
        title: "Scoreboard",
        content: "This is were all the scoring information is displayed..."
      },
      {
        element: "#tour-step-2",
        placement: "bottom",
        title: "Turn points",
        content: "For each answer you get correct..."
      },
      {
        element: "#tour-step-3",
        placement: "bottom",
        title: "Team Points",
        content: "Your team total..."
      },
      {
        element: "#tour-step-4",
        placement: "bottom",
        title: "Turn indicator",
        content: "This shows you who's turn it is"
      },
      {
        element: "#tour-step-5",
        placement: "bottom",
        title: "End Turn",
        content: "Save your turn points and end your turn"
      },
      {
        element: "#tour-step-6",
        orphan: true,
        title: "Makeing a Problem",
        content: "something"

      },
      {
        element: "#tour-step-7",
        orphan: false,
        placement: "top",
        title: "The Problem",
        content: "You build a problem"
      },
      {
        element: "#tour-step-8",
        reflex: "true",
        placement: "top",
        title: "Create problem - Step 1",
        content: "Clcik here to select a multiplican"
      },
      {
        element: "#tour-step-9",
        reflex: "true",
        placement: "bottom",
        title: "Create problem - Step 2",
        content: "Select a number"
      },
      {
        element: "#tour-step-10",
        reflex: "true",
        placement: "bottom",
        title: "Create problem - Step 3",
        content: "Click ok"
      },
      {
        element: "#tour-step-11",
        placement: "bottom",
        title: "Create problem - Step 4",
        content: "Now you have a multiplican"
      },
      {
        element: "#tour-step-12",
        placement: "bottom",
        title: "Create problem - Step 5",
        content: "operator, this can be changed in the settings"
      },
      {
        element: "#tour-step-13",
        placement: "bottom",
        reflex: "true",
        title: "Create problem - Step 6",
        content: "operator, click here to get your mutiplcand. Beware! If you get Obor then you lose your turn points and your turn."
      },
      {
        element: "#tour-step-14",
        placement: "bottom",
        reflex: "true",
        title: "Create problem - Step 7",
        content: "enter your answer here. click to enter answer"
      }      

    ],
    backdrop: true,
    });



    // Start the tour
    $('.start-tour').click(function() {
        $('.overlay').toggle();
        // Initialize the tour
        tour.init();
        tour.restart();
    });
    $('.start-tour-footer').click(function() {
        // Initialize the tour
        tour.init();
        tour.restart();
    });

        

        $("#teamOneNameForm").submit(function(evt) {

            // Get the value of the name field.
            var settingsName = document.getElementById('teamOneId').value;
            var settingsName2 = document.getElementById('teamTwoId').value;
            
            if (settingsName == "") {

            } else {
                // Save the name in localStorage.
                localStorage.setItem('teamOneStored', settingsName);
            }


            if (settingsName2 == "") {

            } else {
              // Save the name in localStorage.
                localStorage.setItem('teamTwoStored', settingsName2);  
            }

            //update the placeholder names
                //put the team names in the settings form
            var inputFillNameOne = localStorage.getItem('teamOneStored');
            var inputFillNameTwo = localStorage.getItem('teamTwoStored');
            $( "#teamOneId" ).attr( "placeholder", "Current Name:" + inputFillNameOne );
            $( "#teamTwoId" ).attr( "placeholder", "Current Name:" + inputFillNameTwo );          

            
            //put names in html
            $('div.teamOneName').text(settingsName);
            $('div.teamTwoName').text(settingsName2);
            $('#settingsModal').modal('hide')
            

            evt.preventDefault();

        });



}); //end document.ready































