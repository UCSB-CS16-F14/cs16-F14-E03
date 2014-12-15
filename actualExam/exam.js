// exam.js  P. Conrad, UD 03/08/2007 
// Functions to count points on an exam


function generatePageHeader(examNum,pageNum) {
    return "<div class='examNumber'>Exam #"
	+ examNum + ' Page: ' + pageNum + 
	" Name: _____________________________________";
}

function pointCountText(text) {

    var totalPts = 0;
    var pointRegExp = /\([ ]*([0-9]+)[ ]*pt[s]?[ ]*\)/g;  

    while (match = pointRegExp.exec(text)) {
	totalPts += parseInt(match[1]);
    }

    return totalPts;
}

    var answerKeyVisible = true;
    var shuffleColorVisible = true;
	
    $(document.body).ready(function () {

	    var url = purl(); //Parse the current URL using the purl library
	    
	    var startExamNum = parseInt(url.param("start"));
	    var examCount = parseInt(url.param("count"));

          $('.initialsTableDiv').load('initialsTable.html');


	  $(".showAnswerKey").click(function(){
	      if (answerKeyVisible)  {
                  // We are toggling back to no answers visible, 
                  // and bringing back hidden stuff
                  $(".hideOnKey").each( function(i) { $(this).show();});

                  // Hide all answers
 	          $(".answer").each(function (i) {$(this).hide();});
                  // No border on the circled answers
	          $(".circledAnswerWithBorder").each(function (i) {
	             $(this).addClass("circledAnswerNoBorder");
                     $(this).removeClass("circledAnswerWithBorder");
		  });
                  // Not sure why we have this too... is it a duplicate? 
                  $(".circledAnswer").each(function (i) {
                    $(this).addClass("circledAnswerNoBorder");
                    $(this).removeClass("circledAnswer");
                  });
                  // toggle the state, and the inner text 
	          answerKeyVisible = false;
 	          $(".showAnswerKey").each(function (i) {$(this).text("show answer key");});

	      } else {
                // toggling from showing questions to showing answers
                  $(".hideOnKey").each( function(i) { $(this).hide();});
                // show all answers
                $(".answer").each(function (i) {$(this).show();});
                // circle all answers
                $(".circledAnswerNoBorder").each(function (i) {
	             $(this).addClass("circledAnswerWithBorder");
	             $(this).removeClass("circledAnswerNoBorder");
		});
    	        answerKeyVisible = true;
 	        $(".showAnswerKey").each(function (i) {$(this).text("hide answer key");});
	      }
      });
	
     $(".makeCopies").click(function(){
	     $(this).css("background-color","red");
	     $("#containerCopies").empty();
	     $("#container").each(function (j) { 
		     console.log("#container j=" + j); 
		     console.log("startExamNum=" + startExamNum + " examCount=" + examCount); 
		     
		     for (var i=startExamNum; i<startExamNum+examCount; i++) { 
		        $(this).clone().removeAttr("id").addClass("containerCopy").data("sequence",i).appendTo("#containerCopies");
		     }
		 });
	     $(".containerCopy").each( function(k) {
		     var sequence = $(this).data("sequence");
		     console.log(".containerCopy k=" + k + " sequence=" + sequence);


		     $(this).find("ol.theQuestions li").each( function(i) {
			     console.log("setting questionNum to " + (i+1));
			     $(this).data("questionNum",i+1);
			     $(this).find(".continued").data("questionNum",i+1);
			 });

		     $(this).find(".radixQuestions").each( function (n) {
			     console.log("radixQuestions n= " + n + " sequence=" + sequence);
			     var radixQuestions=buildRadixQuiz(sequence,10,2);
			     $(this).append(radixQuestions);
			 });

		     $(this).find(".argcArgvQuestions").each( function (n) {
			     console.log("argcArgvQuestions n= " + n + " sequence=" + sequence);
			     $(this).append(buildArgcArgv(sequence,4,2));
			 });

		     $(this).find(".whatTypeQuestions").each( function (n) {
			     console.log("whatTypeQuestions n= " + n + " sequence=" + sequence);
			     $(this).append(buildWhatType(sequence,2));
			 });


		 $(this).find(".pageBreakBefore").each( function(n) {
		     var theHTML = generatePageHeader(sequence, n+1);
		     console.log("pageBreakBefore n= " + n + " sequence=" + sequence);
		     console.log("pageBreakBefore, theHTML=" + theHTML);
			     $(this).before( $('<div/>', { class: 'examNumber',
					     text: 'Exam #' + sequence + ' Page: ' + (n+1)
					     + " Name: _____________________________________",
					     }));
                             $(this).before($('<hr/>', {class: 'pageHeader'}));

		      }); 

		     $(this).find(".continued").each( function(n) {
			     console.log("continued n= " + n + " sequence=" + sequence);
			     var qNum = $(this).data("questionNum");
			     $(this).before($('<p/>', {class: 'continuedLabel',
					     text: "Extra space for answer to question " + qNum
					     }));


		      }); 

		     var text= $(this).contents().text();
		     var totalPoints = pointCountText(text);
		     console.log("Found: " + text + " totalPoints=" + totalPoints);

		     $(this).find(".pointCount").text("total points=" + totalPoints);

		 });

	     
	 });


    $(".shuffleNow").click(function(){
         $(".shuffle").each(function (i) { $(this).shuffle(); });
         $(".selectOne").each(function (i) { $(this).selectOne(); });	



         $(".shuffledTFQs").each(function (i) { 
             if (i%2==1) {
               $(this).css("pageBreakBefore","always");
               $(this).css("margin-bottom","3em");
             } else {
               $(this).css("pageBreakBefore","avoid");
               $(this).css("margin-bottom","0em");
             }

          });

         alert("Shuffled!");
    });
	
     $(".hideShuffleColor").click(function(){

       if (shuffleColorVisible)  {
          $(".shuffle").each(function (i) {
   	  this.style.color = "#000";
          this.style.backgroundColor = "#fff";
          }); 
          shuffleColorVisible = false;
          $(".hideShuffleColor").each(function (i) {$(this).text("show shuffle color");});
       } else {
          $(".shuffle").each(function (i) {
   	  this.style.color = "#000";
          this.style.backgroundColor = "#efe";
          }); 
          shuffleColorVisible = true;
          $(".hideShuffleColor").each(function (i) {$(this).text("hide shuffle color");});
       }
	
      }); // hideShuffleColor click function
		

     
	
    }); // document.body ready function


