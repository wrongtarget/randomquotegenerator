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


//Function that changes the color of the background
function changeColor(){
    
//generates a random hue
var hue = Math.floor(Math.random() * 360);

//Creates a nice color with a steady saturation and lightness, but using the random hue.
var color = 'hsl(' + hue + ', 60%, 55%)';
    
//Animates the background color using the jQuery UI library
    $('body').animate({
  backgroundColor: $('body').backgroundColor
}, 500).animate({
  backgroundColor: color
}, 500);
}


//Pick a random quote from the array
function getRandomQuote (){

    //If the array is empty...
     if (quotes.length == 0)
    {
        //Refill it with the quotes on the file
        readTextFile("quotes.csv");
    }
    
    //Generate a random index based on the current lenght of the array
   var randomIndex = Math.floor(Math.random()* quotes.length)
   
   //Select and store a quote using the random index 
  var randomQuote =   quotes[randomIndex]
     
  
    if (randomIndex > -1) {
    
    //logs how many quotes are left in the array 
     console.log(quotes.length)
    //Deletes the quote from the array so it's not selected again until the array is completely empty
    quotes.splice(randomIndex, 1);
    
}
   
    //returns the random quote that was picked early
   return randomQuote;
   
}

//function that builds and changes the quote using the random quote data when button is clicked or when 30 seconds have elapsed
function printQuote (){
    
    //pick a random quote with the getRandomQuote function and store it
    var quoteObject = getRandomQuote()
    
    //Builds the string with the different key:values of the array's object
    var quoteString = '<p class="quote">' 
    + quoteObject.quote 
    +  '</p> <p class="source">' 
    + quoteObject.source 
    //if the citation property is empty, don't print anything on its place
    + (typeof quoteObject.citation  !== "undefined" ? '<span class="citation">'
    + quoteObject.citation  + '</span>' : "")
     //if the tags property is empty, don't print anything on its place
     + (typeof quoteObject.tags  !== "undefined" ? '<span class="tags">'
    + quoteObject.tags  + '</span>' : "")  
     //if the date property is empty, don't print anything on its place
    + (typeof quoteObject.date  !== "undefined" ? '<span class="year">'
    + quoteObject.date  + '</span> </p>' : "")  
    
    //change the HTML of the quote area to the string we just built
    document.getElementById('quote-box').innerHTML = quoteString;

    //call the function to change backgorund
    changeColor();

}

//call function to change quote every 30 seconds, regardless of whether button has been clicked or not.
setInterval(function(){ printQuote(); }, 30000)

                             

                