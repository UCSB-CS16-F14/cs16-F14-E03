
var debug = false;

function randomIndex(randomStream,n) // returns random index between 0 and n-1
{
    return randomStream.nextIntRange(n);
}

function radixDesc(randomStream,radix)
{
    var whichWay = randomIndex(randomStream,2); // returns either 0 or 1

   if (whichWay == 0)
      return "base " + radix;
	  
   switch(radix)
   {
      case 8: return "octal";
	  case 16: return "hexadecimal";
	  case 2: return "binary";
	  case 10: return "decimal";
	  default: return "base " + radix;
   }


}


function randomIntBetween(randomStream,minVal,maxVal)  {	
   if (minVal > maxVal) {alert("problem in randomIntBetween function");}
   var numIntsInRange = maxVal - minVal + 1;
   return randomStream.nextIntRange(numIntsInRange) + minVal;
}

function buildRadixQuiz(seed,numQuestions,pointsEach)
{      

    var randomStream = new RandomStream(seed);

   var theQuizQuestions = "";

   var i;   
   var conversions = [ {fromRad: 10, toRad: 2, minVal: 0, maxVal: 255},
                       {fromRad: 2, toRad: 10, minVal: 0, maxVal: 255},
					   {fromRad: 2, toRad: 8, minVal: 0, maxVal: 511 },
					   {fromRad: 8, toRad: 2, minVal: 0, maxVal: 63 },
					   {fromRad: 2, toRad: 16, minVal: 0, maxVal: 65535},
					   {fromRad: 16, toRad: 2, minVal: 0, maxVal: 65535} ]
	
   
   theQuizQuestions += "<ol>\n"
   for (i = 1; i<=numQuestions; i++) // index counts up 0,1,2, etc through the array
   {
       var whichConversion =  randomIndex(randomStream,conversions.length);
	  
       var numToConvert = randomIntBetween(randomStream,conversions[whichConversion].minVal,
	                                      conversions[whichConversion].maxVal);
	    	  
      theQuizQuestions += "<li> (" + pointsEach + " pts) "

      theQuizQuestions += "Convert "
	  
	  var fromRad = conversions[whichConversion].fromRad;
	  var toRad = conversions[whichConversion].toRad;
	
	  
	  theQuizQuestions += formatFor(numToConvert.toString(fromRad), fromRad, toRad);
	   
	  theQuizQuestions += " from " + radixDesc(randomStream,fromRad) +
	  	                  " to " + radixDesc(randomStream,toRad);
						  


       var answer = formatFor(numToConvert.toString(toRad),toRad,fromRad);
	 
       theQuizQuestions += "<span class='answer' style='padding-left:4em;'>" + answer + "</span>"

      theQuizQuestions += "</li>\n"
   }

   theQuizQuestions += "</ol>\n"

  return theQuizQuestions;
}

