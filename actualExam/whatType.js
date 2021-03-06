
function buildWhatType(seed,pointsEach) {      

    return whatTypeHelper(seed, pointsEach);

}

function whatTypeHelper(seed, pointsEach) {


    var randomStream = new RandomStream(seed);

    var result="";

   var typeNamesList = ["int","double","char","Node"];
   var numTypes = typeNamesList.length;
   randomStream.shuffle(typeNamesList);
   var typeNames = typeNamesList.slice(0);


   for (var i=0; i<typeNamesList.length; i++) {
       typeNames.push(typeNamesList[i] + " *");
   }

   var varNameList = ["a","b","c","d","e","f","g","h","p","q","r","s","t","w","x","y","z"];

   var numVarsNeeded = typeNames.length * 2;
   var varNames = randomStream.cut(varNameList).slice(0,numVarsNeeded);

   var declarations = [];

   for (var i=0; i<typeNames.length; i++) {
       var thisOne = typeNames[i] + " " + varNames[i];
       thisOne = thisOne.replace(" * "," *");
       declarations.push(thisOne);
   }

   // Now we have:
   //  varNames is the list of variables names
   //  typeNames is the list of types names
   //  declarations is the list of declarations (without semicolons);
   // The types are permuted, and the variable names are cut.
   // BUT: 0..(numTypes-1) are standard
   // BUT: numTypes..(numTypes*2-1) are pointer types
   // and the types are numTypes offset from each other.  i.e. if [i] is int, then [i+numTypes] is int *

   preContents = "<pre>\n\nstruct Node {\n  int data;\n  Node *next;\n};\n\n\nint main(int argc, char *argv[]) {\n";
   
   for (var i=0;i<declarations.length; i++) {
       preContents += "  " + declarations[i] + ";\n";
   }
   preContents += "\n\n  return 0;\n}\n\n</pre>";


   // Now for the questions:
   // For this exam: we have these types
   //  (1) Non pointer variable, undecorated
   //  (2) Pointer variable, undecorated
   //  (3) Non pointer variable with &
   //  (4) Pointer variables with &
   //  (5) Pointer variable, deferenced
   //  (6) argc  
   //  (7) argv[0]  
   //  (8) argv[1][2]  
   //  (9) Node * with arrow to next
   //  (10) Node * with arrow to data
   
   var questions=[];
   var k;

   //  (1) Non pointer variable, undecorated
   k = randomStream.nextIntRange(numTypes);
   questions.push( { q: varNames[k], a:  typeNames[k] });

   //  (2) Pointer variable, undecorated

   k = randomStream.nextIntRange(numTypes);
   questions.push( { q: varNames[numTypes + k], a:  typeNames[numTypes + k] });

   //  (3) Non pointer variable with &

   k = randomStream.nextIntRange(numTypes);
   questions.push( { q: "&" + varNames[k], a:  typeNames[k] + " *" });

   //  (4) Pointer variables with &

   k = randomStream.nextIntRange(numTypes);
   questions.push( { q: "&" + varNames[numTypes + k], a:  typeNames[numTypes + k] + "*" });

   //  (5) Pointer variable, deferenced

   k = randomStream.nextIntRange(numTypes);
   questions.push( { q: "*" + varNames[numTypes + k], a:  typeNames[numTypes + k].replace(" *","") });

   //  (6) argc  

   questions.push( { q: "argc", a: "int"});

   //  (7) argv[0]  

   questions.push( { q: "argv[0]", a: "char *"});

   //  (8) argv[1][2]  

   questions.push( { q: "argv[1][2]", a: "char"});

   //  (9) Node * with arrow to next

   var nodeStar = typeNames.indexOf("Node *");
   questions.push( { q: varNames[nodeStar]+"->next", a: "Node *" });
   
   //  (10) Node * with arrow to data

   questions.push( { q: varNames[nodeStar]+"->data", a: "int" });

   // (11) Two levels of pointer

   questions.push( { q: varNames[nodeStar]+"->next->next", a: "Node *" });

   randomStream.shuffle(questions);

   result += "<p>Given the following declarations:</p>";
   result += preContents;
   result += "<p>Specify the type of each of these expressions (e.g. <code>int</code>, <code>int *</code>, etc.</p>";

   result += "<ol>";

   for (var i=0; i<questions.length; i++) {
       result += "<li> (" + pointsEach + " pts) ";
       result += questions[i].q;
       result += "<span class='answer' style='padding-left:4em;'>" + questions[i].a + "</span>";
       result += "</li>\n";
   }


   result += "</ol>\n";
	 
  return result;

}