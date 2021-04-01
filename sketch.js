var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;


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
  addFood=createButton("Add Food");
  addFood.position(500,90);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  feedTime = database.ref('feedTime');
  feedTime.on("value", function (data){
  lastFed = data.val();
  }); 

  foodObj.display();

  textSize(25);
  fill("brown");
  stroke(255);
  
  if(lastFed >= 12){
     text("Last Feed: "+ lastFed % 12 + "PM", 500, 30);
    }else if(lastFed === 0){
     text("Last Feed: 12 AM", 350, 30);
    }else{
     text("Last Feed: "+ lastFed + "AM", 500, 30);
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
  foodObj.updateFoodStock(stock1-1);
  foodObj.deductFood();

  database.ref('/').update({
    feedTime:hour()
 })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
