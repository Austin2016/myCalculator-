//global variables needed for this applicaiton 
//
//

var display = ""; // string that keeps track of user inputs. 
var inputs = ["1","2","3","4","5","6","7","8","9","0","+","-","*","/","."]; //set of possible user inputs

 
// basic math functions for plus, minus, times , divide.
//
//

var sum = function(a,b) {                

	return a +b; 

}


var subtract = function(a,b) {

	return a-b; 

}

var multiply = function(a,b) {

	return a*b; 

}
  
var divide = function(a,b) {   // division by zero returns infinity

		return a/b; 
}

var operate = function(a,b,c) {                //function that employs the above math functions 

	if (c== "+")   { return sum(a,b);      }
	if (c== "-")   { return subtract(a,b); }
	if (c== "*") { return multiply(a,b); }
	if (c== "/") { return divide(a,b);   }

	return "error invalid character";

	
}



// function that links the HTML buttons to the JS and routes the value of the HTML button
//to the appropriate logic to process it and apply the right functionality 
//

var hook = function(btn) { 
	 
	 processCommand( btn.value );  
	
}


//Keyboard support: similar to above, it routes command from the user to the apprpriate logic and  
// associated functionality 
//

document.addEventListener('keydown',function(event) { 

processCommand(event.key);

});


//these functions below work together to  take a string and 
//process it down to an answer to display on the screen 
//


var processString = function(string) {  //ex) converts string "1+3-4*5" to aray ["1","+","3","-" etc. ]
	var startNumber=0;
	var array=[];
	var arraySplit = string.split("");
	var position   = array.length;   
	for ( var i=startNumber; i<arraySplit.length; i++ ) {
		
		if ( arraySplit[i]!="+" && arraySplit[i]!="-" && arraySplit[i]!="*" && arraySplit[i]!="/" ){
			if(array[position]!==undefined) {     //when array =[] this takes care of undefined

				array[position]+=arraySplit[i];
			}

			else { 

				array[position] = arraySplit[i];    //cannot do += with an undefined element 
			}
		}

		else if (arraySplit[i]=="+"||arraySplit[i]=="-"||arraySplit[i]=="*"||arraySplit[i]=="/") {
			if(i==0){
				array[position] = arraySplit[i];
			}
			else { 
				array.push(arraySplit[i]);
				position++;   //trial
				position++;   //trial
			}

		} 


		

	}
	return array; 	


} 


var arrayOfStringsToNumbers = function (array) {  // converts the operands from strings to numbers, leaves the operators as strings.  ex) ["1","+","2"] becomes [1,"+",2]	

	for (var i =0; i<array.length; i++) { 

		if ( array[i]!="+" && array[i]!="-" && array[i]!="*" && array[i]!="/" ) {
			
			array[i]=parseFloat(array[i]); 
		}


	}

	return array ; 
}



                                         
var computeTimesAndDivide=function(array) { //does all the multiplaction and division needed ex) converts [3, "+", 3, "*", 5, "/", 5] to [3,"+",3]

	var returnArray=[];
 
	for (i=0; i<array.length; i++) {
		if (typeof array[i]==="number") {

			var leftOperand = array[i];
			
			if (array[i+1]==="+"||array[i+1]==="-"||i==array.length-1) {

				returnArray.push(array[i]);

			} 
		}
		else if (array[i]==="*"||array[i]==="/") {

			var leftOperand = operate( leftOperand,array[i+1],array[i] );
			
			if (array[i-2]==="*"||array[i-2]==="/") {

				returnArray[returnArray.length - 1] = leftOperand; 

			}

			else { 
			

			returnArray.push(leftOperand); //current solution to operate 
			}

			i++;

		}

		else { 

			returnArray.push(array[i]); 

		}
		


 	}




return returnArray;  
}

var computePlusAndMinus = function(array) {  //computes all the plus and minus operations ex) [3,"+",3,"-",1] becomes 5


	var leftOperand=array[0];
	for (i=1; i<array.length; i++) {

		leftOperand=operate( leftOperand, array[i+1], array[i] )
		i++;




	}




return leftOperand;
}

var execute = function(string) {      // combines the above functins to compute answer to user query 
  var lastChar=string.charAt(string.length - 1);

		if ( lastChar!="+"&&lastChar!="-"&&lastChar!="*"&&lastChar!="/"&&string!="") {
			var array = [];
			array = processString(string); // include last number
			array = arrayOfStringsToNumbers(array);   //turn the strings to numbers
			array = computeTimesAndDivide(array);
			var numberAnswer=computePlusAndMinus(array);
			numberAnswer = Math.round(numberAnswer*10000)/10000 //only allows for 4 decimals 
			var stringAnswer = numberAnswer.toString();
			
			return stringAnswer; 

		}

		else { 

             // do nothing so the equal button can't be pushed when it would create NaN 
		}
} 

 
var processCommand = function(cmd) { // takes the user input at does the appropriate logi based on it 


	if (cmd == "=") { 

		document.getElementById("display").value = execute( display );
		display = "";

	}
	else if (cmd=="clear" ) {  //is clr right ? 

		clearField(); 

	}

	else if(cmd=="Backspace") {
		
		backSpace();

	}

	else if ( inputs.includes(cmd) ) { 

		if ( cmd=="0"&&display.charAt(display.length - 1)=="/" ) {   //no division by zero 
			alert("You can't divide by Zero! If you wish to divide by a decimal value, do not apply a leading zero before the decimal.");
		}
		else if (cmd==".") {
			if( decimalFind(display)==true ) {
				display = document.getElementById("display").value+=cmd; 
			}  


		} 

		else { 
			display = document.getElementById("display").value+=cmd;
			
		}



	}

}

//smaller functions to support the other functions 

var clearField = function() {  //deletes the UI textfield and the display variable 

		display = document.getElementById("display").value="";
		display = ""; // string 
		//return display; 

}

var backSpace = function() {  //deletes the last entry 
	if(display!="") {
		display = display.slice(0,display.length-1);
		document.getElementById("display").value=display; 
	}

}

var decimalFind = function(string) {     //checks if the last number has a decimal already in place

	var i=string.length - 1; 
	
	while( i>=0 && typeof parseInt(string.charAt(i))=="number" && isNaN(parseInt(string.charAt(i)))==false ) {
		i--; 
	}
	if (i>=0) {
		if(string.charAt(i)===".") {
			return false; 
		}
		else {
			return true;
		}
	}

	else { 

		return true; 
	}
	
}


/*

var handleEqualsButton = function() { 

		document.getElementById("display").value = execute( display );
		display = ""; // string

}
*/

///Old code that used window onload to prevent loading stuff that was tied to buttons. 

/*
window.onload = function(){  //wait for html to load the following 

	document.getElementById("myBtn+").onclick = function() {
		populateSum();
		//processString(display,displayProcessed,storeArray);	
		//displayProcessed = display.length; 
		//return storeArray;   
	
	}

	document.getElementById("myBtn-").onclick = function() {
		populateSubtract();
		//processString(display,displayProcessed,storeArray);	
		//displayProcessed = display.length; 
		//return storeArray;   
	
	}
	document.getElementById("myBtn*").onclick = function() {
		populateMultiply();
		//processString(display,displayProcessed,storeArray);	
		//displayProcessed = display.length; 
		//return storeArray;   
	
	}
	document.getElementById("myBtn/").onclick = function() {
		populateDivide();
		//processString(display,displayProcessed,storeArray);	
		//displayProcessed = display.length; 
		//return storeArray;   
	
	}
          //calls functions necessary to display the solution and re-initializes the variables 
	


	document.getElementById("myBtn=").onclick = function() {
  
		document.getElementById("display").value = execute( display );
		display = ""; // string 
		//displayProcessed=0; //startNumber
		//storeArray=[];      //array 
	}   
} // wait to load

*/


/*
var populateSum = function() { 
	display = document.getElementById("display").value+=document.getElementById("myBtn+").value;;
	 
}
var populateSubtract = function() { 
	display = document.getElementById("display").value+=document.getElementById("myBtn-").value;
	 
}
var populateMultiply = function() { 
	display = document.getElementById("display").value+=document.getElementById("myBtn*").value;
	 
}
var populateDivide = function() { 
	display = document.getElementById("display").value+=document.getElementById("myBtn/").value;
	 
}
*/

/*
document.addEventListener( 'keypress',function(event)  {
	switch (event.key) {
	 	case "0":
	 		if ( display.charAt(display.length - 1)=="/" ) {   //no division by zero 
			alert("You can't divide by Zero!!");
		}	 
			display = document.getElementById("display").value+="0";
			break;
	
		case "1": 
			display = document.getElementById("display").value+="1";
			break;

		case "2": 
			display = document.getElementById("display").value+="2";
			break;

		case "3": 
			display = document.getElementById("display").value+="3";
			break;

		case "4": 
			display = document.getElementById("display").value+="4";
			break;

		case "5": 
			display = document.getElementById("display").value+="5";
			break;

		case "6": 
			display = document.getElementById("display").value+="6";
			break;

		case "7": 
			display = document.getElementById("display").value+="7";
			break;

		case "8": 
			display = document.getElementById("display").value+="8"; 
			break;                                                  
																

		case "9": 
			display = document.getElementById("display").value+="9";
			break;

		case "*":                                              
			populateMultiply();                                       
			//processString(display,displayProcessed,storeArray);	     
			//displayProcessed = display.length;
			break;

		case "+":                                           
 			populateSum();											
			//processString(display,displayProcessed,storeArray);	
			//displayProcessed = display.length;
			break;

		case "-": 
			populateSubtract();
			//processString(display,displayProcessed,storeArray);	
			//displayProcessed = display.length;
			break;

		case "/": 
			populateDivide();
			//processString(display,displayProcessed,storeArray);	
			//displayProcessed = display.length;
			break;

		case ".": 
			if( decimalFind(display)==true ) {
				display = document.getElementById("display").value+="."; 
			}
			break;  

		case "=":
			document.getElementById("display").value = execute( display );
			display = ""; // string 
			//displayProcessed=0; //startNumber
			//storeArray=[];      //array 
			break; 

		default: 
	}

});  


document.addEventListener('keydown',function(event) {    //keyboard support for delete 
	if (event.keyCode == 8 && display!="") {

		display = display.slice(0,display.length-1);
		document.getElementById("display").value=display;
	}
});
*/
  
/*
var clearText = function(btn) { 
	display = document.getElementById("display").value=btn.value;
	display = ""; // string 
	//return display; 
}

var populateDecimal = function(btn) { 
	if( decimalFind(display)==true ) {
		display = document.getElementById("display").value+=btn.value; 
	} 
}
*/

/*
var unpopulateLast = function(btn) {
	if(display!="") {
		display = display.slice(0,display.length-1);
		document.getElementById("display").value=display; 
	}
}
*/
