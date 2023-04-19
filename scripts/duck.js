var tID; //we will use this variable to clear the setInterval()
function animateScript() {
var    position = 256; //start position for the image slicer
const  interval = 100; //100 ms of interval for the setInterval()
tID = setInterval ( () => {
document.getElementById("kimpossible").style.backgroundPosition = 
`-${position}px 0px`; 
//we use the ES6 template literal to insert the variable "position"
if (position < 1536)
{ position = position + 256;}
//we increment the position by 256 each time
else
{ position = 256; }
//reset the position to 256px, once position exceeds 1536px
}
, interval ); //end of setInterval
} //end of animateScript()


var tID2; //we will use this variable to clear the setInterval()
function animateScript2() {
var    position = 70; //start position for the image slicer
const  interval = 100; //100 ms of interval for the setInterval()
tID2 = setInterval ( () => {
document.getElementById("duck").style.backgroundPosition = 
`-${position}px 0px`; 
//we use the ES6 template literal to insert the variable "position"
if (position < 210)
{ position = position + 70;}
//we increment the position by 256 each time
else
{ position = 70; }
//reset the position to 256px, once position exceeds 1536px
}
, interval ); //end of setInterval
}


