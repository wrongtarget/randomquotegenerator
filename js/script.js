// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);


//Create a global array for storing the quotes
var quotes = []
var recentQuotes = [];

//Function to read the local csv where quotes are stored   
function readTextFile(file)
{
    //creates a new XMLHttpRequest object
    var rawFile = new XMLHttpRequest();
    //Open the file with a GET HTTP request
    rawFile.open("GET", file, false);
    //When the request is ready
    rawFile.onreadystatechange = function ()
    {
        //if the response is ready
        if(rawFile.readyState === 4)
        {
            //And everything is OK
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                //Store the file text on a csv string variable
                var csv = rawFile.responseText;
                //Convert that csv string to an array of objects and store it in the quotes array
                 quotes = $.csv.toObjects(csv);
                 
            }
        }
    }
    //send request to server. May not be necessary.
    rawFile.send(null);
}

//Call the function above and pass the corresponding quotes csv file
readTextFile("quotes.csv");

/*
Previously I had defined the properties of a quote object like so:

quote = {
  quote: "",
  source: "",
  citation: null,
  date: null
};

Not necessary now since they're defined on the file.
*/

function changeColor(){
var hue = Math.floor(Math.random() * 360);
var pastel = 'hsl(' + hue + ', 60%, 55%)';
    $('body').animate({
  backgroundColor: $('body').backgroundColor
}, 500).animate({
  backgroundColor: pastel
}, 500);
}

function getRandomQuote (){

     if (quotes.length == 0)
    {
        readTextFile("quotes.csv");
    }
    
   var randomIndex = Math.floor(Math.random()* quotes.length)
  var randomQuote =   quotes[randomIndex]
     
    if (randomIndex > -1) {
    
        console.log(quotes.length)
    quotes.splice(randomIndex, 1);
    
}
   
   return randomQuote;
   
}

function printQuote (){
    
    var quoteObject = getRandomQuote()
    var quoteString = '<p class="quote">' 
    + quoteObject.quote 
    +  '</p> <p class="source">' 
    + quoteObject.source 
    + (typeof quoteObject.citation  !== "undefined" ? '<span class="citation">'
    + quoteObject.citation  + '</span>' : "")
     + (typeof quoteObject.tags  !== "undefined" ? '<span class="tags">'
    + quoteObject.tags  + '</span>' : "")  
    + (typeof quoteObject.date  !== "undefined" ? '<span class="year">'
    + quoteObject.date  + '</span> </p>' : "")  
    
    document.getElementById('quote-box').innerHTML = quoteString;

    changeColor();

}

setInterval(function(){ printQuote(); }, 30000)

                             

                