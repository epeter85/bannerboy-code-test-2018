function mainInit() {

    ///////////////////////////////
    //set up sprites and containers
    ///////////////////////////////

    //setup stage
    stage = document.querySelectorAll('.container')[0];
    stage.style.width = dimensions.width + 'px';
    stage.style.height = dimensions.height + 'px';
    stage.style.overflow = "hidden";
    stage.style.position = "absolute";
    stage.style.display = 'none';
    stage.style.opacity = 0;
    stage.style.filter = 'alpha(opacity=0)';
    stage.style.border = '1px solid black';

    //template
    template = generateSprite('template/template_300x250_1.jpg');
    stage.appendChild(template);

    //frame01
    mc_side = generateContainer();
    mc_side_front_light = addSprite();

    stage.appendChild(car_side);


    //test = addSprite('icon-bottle_batman');
    //background = addSprite('background');

    /*test = generateSprite(sparkle_small_1_1);
    stage.appendChild(test);

    stage.style.backgroundColor = 'black';*/
  //  test.style.opacity = 1;
   // background.style.opacity = 1;


    stage.addEventListener('click', exitClickHandler);


    //add sprites and containers to stage

    //init();

}

function init() {

    //set init placement


    //set init visibility
    template.style.opacity = 1;


    //set listeners

    frame00();

}

function frame00() {

    stopWatch = new Date().getTime();

    stage.style.display = 'block';

    var twnDelay = .5;

    TweenLite.to(stage, .25, {delay: twnDelay, opacity: 1});


    TweenLite.delayedCall(twnDelay, frame01);

}

function frame01() {

    var twnDelay = 0;

    twnDelay += .25;

    //TweenLite.delayedCall(twnDelay, toggleISI);

}
