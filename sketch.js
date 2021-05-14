var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;
var fedtime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {

  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedthedog=createButton("feed the dog");
  feedthedog.position(600,95);
  feedthedog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedtime=database.on('FeedTime')
 
  //write code to display text lastFed time here
if(fedtime===12){
  text("last feed : 12PM",200,100);
}else if(fedtime>=12){
  text("last feed : 6PM",200,100);
}else if(fedtime===0){
  text("last feed : 12AM",200,100);
}else{
  text("last feed : 6AM",200,100);
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
   if(mousepressed(feedthedog)){
    lastFed=hour();
     foodS=foodS-1;
     database.ref('/').update({
       Food:foodS,
       lastFeed:lastFed
 
     })
    /* lastFed=hour();
     database.ref('/').update({
        lastFeed:lastFed
     })*/
   }

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
