var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["8a91637a-9069-490f-8dad-a6d8b8377efc","c23eba63-d5a0-4413-8d3d-fcd4f50c256a","3bbebcc7-afd3-4821-93cf-5b04e527a8b5"],"propsByKey":{"8a91637a-9069-490f-8dad-a6d8b8377efc":{"name":"running_monkey","sourceUrl":null,"frameSize":{"x":87,"y":95},"frameCount":8,"looping":true,"frameDelay":12,"version":"xbghlp09OHwjvQlPW6L0Ua5YWuPp9CTP","loadedFromSource":true,"saved":true,"sourceSize":{"x":261,"y":285},"rootRelativePath":"8a91637a-9069-490f-8dad-a6d8b8377efc.png"},"c23eba63-d5a0-4413-8d3d-fcd4f50c256a":{"name":"Banana","sourceUrl":"assets/v3/animations/T7tI2dNVreXFuVq_tdnuDQgMh1RNKKIIfdHI8WxbU6k/c23eba63-d5a0-4413-8d3d-fcd4f50c256a.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"uQDjXm1zUznWZPnTu_h9huuLDh6Ax9O9","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/T7tI2dNVreXFuVq_tdnuDQgMh1RNKKIIfdHI8WxbU6k/c23eba63-d5a0-4413-8d3d-fcd4f50c256a.png"},"3bbebcc7-afd3-4821-93cf-5b04e527a8b5":{"name":"stone","sourceUrl":"T7tI2dNVreXFuVq_tdnuDQgMh1RNKKIIfdHI8WxbU6k/3bbebcc7-afd3-4821-93cf-5b04e527a8b5.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"FnXat.YxMeX7s38Ws3uwU8d.G_n7ZQQC","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/T7tI2dNVreXFuVq_tdnuDQgMh1RNKKIIfdHI8WxbU6k/3bbebcc7-afd3-4821-93cf-5b04e527a8b5.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var monkey = createSprite(100,300,10,10);
monkey.setAnimation("running_monkey");
monkey.scale = 1.3;

var ground = createSprite(200,350,800,5);
ground.velocityX = -5;
ground.shapeColor = ("green");

var bananaGroup = createGroup();
var obstacleGroup = createGroup();

var gameState = ("play");

var survivalTime = 0;


function draw(){
  background("lightGreen");
  
  if (gameState === "play"){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    bananas();
    stones();
    
    stroke(0);
    textSize(20);
    fill(0);
    survivalTime = survivalTime + Math.round(World.frameRate/60);
    text("Survival Time: " + survivalTime, 140,50);
    
    if (keyDown("space")&& monkey.y>250 && monkey.y<400){
      monkey.velocityY =-6;
    }
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = "end";
    }
  }
  
  if (gameState === "end"){
    
    monkey.scale =0;

    ground.x = 200;
    ground.velocityX = 0;
    
    bananaGroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);
    
    bananaGroup.setLifetimeEach(0);
    obstacleGroup.setLifetimeEach(0);
    
    stroke(0);
    textSize(20);
    fill(0);
    text ("game over",150,150);
    
  }
  
  //monkey.debug = true;
  monkey.setCollider("rectangle",0,0,50,70);
  
  monkey.velocityY = monkey.velocityY + 0.15;
monkey.collide(ground);
  drawSprites();
}

function bananas(){
  if (World.frameCount % 80 === 0){
    var banana = createSprite(430,randomNumber(100,200),15,15);
    banana.setAnimation("Banana");
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.setLifetime = 130;
    bananaGroup.add(banana);
    
  }
}

function stones(){
  if(World.frameCount % 300 === 0){
    var stone = createSprite(350,320,15,15);
    stone.setAnimation("stone");
    stone.scale = 0.2;
    stone.velocityX = -4;
    stone.setLifetime = 130;
    obstacleGroup.add(stone);
    //stone.debug = true;
    stone.setCollider("circle",0,0,200);
  }
  
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
