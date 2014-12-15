
function buildArgcArgv(seed,howManyQuestions,pointsEach)
{      
    var randomStream = new RandomStream(seed);

    var result="";

   var i;   
   var progNames = ["myprog","progname","runIt","thing"];
   var fruits = ["apple", "banana",
		 "cherry", "date", "fig", "grape", "guava", "kiwi",
		 "lemon", "lime", "mango"];
   

   var progName= randomStream.pick(progNames);
   var argc = randomStream.intBetween(3,5);
   var fruitsCopy = fruits.slice(0); // shallow copy
   randomStream.shuffle(fruitsCopy);
   
   var cmdLine="./" + progName;
   var argv=[cmdLine];
   for (var i=0; i<argc-1; i++) {
       cmdLine += " " + fruitsCopy[i];
       argv.push(fruitsCopy[i]);
   }
   
   result += "<p>Assume the <code>main</code> function in the program ";
   result += "<code>" + progName + ".cpp</code> starts with: </p>";
   result += "<pre>int main(int argc, char *argv[]) {\n...\n</pre>";
   result += "<p>Further, suppose this program is invoked with the following command line:</p>";
   result += "<pre>";
   result += cmdLine;
   result += "</pre>";

   result += "<ol>";

   result += "<li> (" + pointsEach + " pts) ";

   result += "What is the value of <code>argc</code> in this case? ";
   
   result += "<span class='answer' style='padding-left:4em;'>" + argc + "</span>";

   result += "</li>\n";

   var askAbout = []; // which elements of argv to ask about
   
   for (var j=0; j<howManyQuestions-1; j++) {
       askAbout.push(j%argc);
   }

   randomStream.shuffle(askAbout);

   for (var j=0; j<howManyQuestions-1; j++) {
       var whichIndex = randomStream.nextIntRange(argv[askAbout[j]].length);
       result += "<li> (" + pointsEach + " pts) ";
       result += "What is the value of argv[" + askAbout[j] + "][" + whichIndex + "]?";
       result += "<span class='answer' style='padding-left: 4em;'>" +
	   argv[askAbout[j]].charAt(whichIndex) + "</span>";
       result += "</li>";
   }
   result += "</ol>\n";
	 
  return result;
}

