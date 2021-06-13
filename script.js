/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */


/**************************************************
** speltoestand **
***************************************************/
const UITLEG = 0;           // startscherm
const SPELEN = 1;           // het spel
const GAMEOVER = 2;         // eindscherm

/*************************************/

var spelStatus = 'SPELEN';    // wat het spel nu doet


/*************************************************
** aantal meter **
*************************************************/ 
var frameTeller = 0;
var aantalMeters = 0;



/**************************************************
** speler **
**************************************************/
var spelerX = 200;          // x-positie van speler
var spelerY = 500;          // y-positie van speler
var spelerW = 70;          // breedte van speler x
var spelerH = 70;          // hoogte van speler y 

var snelheidX = 10;


/************************************************
** vijand **
************************************************/
var vijandX = 200;          // x-positie van vijand
var vijandY = 200;          // y-positie van vijand
var vijandW = 100;          // breedte van vijand x
var vijandH = 100;          // hoogte van vijand y
var vijanden = [];


var snelheidY = 5;


/*************************************************
** extra **
*************************************************
var score = 0;              // aantal behaalde punten
*/
const veldBreedte = 1000;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
var spelBeginnen = false;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**************************************************
 ** SET UP **
 *************************************************/

function setup() {
  frameRate(30);
  createCanvas(1000, 1000);
  background(220, 225, 255);
  noStroke();

  for (var i = 0; i < 5; i++) {
    var vijand = {x:random(0+veldBreedte, veldBreedte-(vijandW/2)), y:0-(vijandH/2)}
    vijanden.push(vijand);
  }
}
/**************************************************
 * Tekent het speelveld
 *************************************************/
var tekenVeld = function () {
  fill("white");
  rect(20, 20, 1240, 680);
};


/****************************************
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 ****************************************/

var tekenSpeler = function(x, y) {  
  // speler getekend
  fill("grey");
  ellipse(spelerX+395, spelerY-95, spelerW-20, spelerH-20);
  ellipse(spelerX+575, spelerY-95, spelerW-20, spelerH-20);

  fill("blue");
  rect(spelerX+400, spelerY-70, spelerW+100, spelerH+65);
  rect(spelerX+370, spelerY-100, spelerW-20, spelerH+30);
  rect(spelerX+550, spelerY-100, spelerW-20, spelerH+30);

  fill("grey");
  ellipse(spelerX+485, spelerY, spelerW-20, spelerH+10);

  // beweging speler                                               // CHECK WAAROM TOETSEN HET NIET DOEN
  
  if( keyIsDown(37)){
          spelerX = spelerX - 30;
  }
  if (keyIsDown(39)){
          spelerX = spelerX + 30;
  }

 
};






// ---------------------------------------------------
//    BEWEGING SPELER: pijlen en niet buiten scherm
// ---------------------------------------------------
var bewegingSpeler = function () {

  // ----- pijlen op scherm -----
  fill(255, 255, 255);
  rect(435, 875, 50, 20); // --- pijl 1 ---
  triangle(435, 905, 410, 885, 435, 865);

  rect(515, 875, 50, 20); // --- pijl 2 ---
  triangle(565, 905, 590, 885, 565, 865);


  if (mouseIsPressed) {
    if (mouseX < 500 && mouseX > 410 && mouseY < 905 && mouseY > 865) {
      spelerX = spelerX - snelheidX;

      fill(random(100, 255), random(100, 255), random(100, 255));
      rect(435, 875, 50, 20);
      triangle(435, 905, 410, 885, 435, 865);
    }

    if (mouseX < 590 && mouseX > 515 && mouseY < 905 && mouseY > 865) {
      spelerX = spelerX + snelheidX;

      fill(random(100, 255), random(100, 255), random(100, 255));
      rect(515, 875, 50, 20);
      triangle(565, 905, 590, 885, 565, 865);
    }
  }

  // ----- pijltjestoetsen op toetsenbord -----
  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      spelerX = spelerX - snelheidX;

      fill(random(100, 255), random(100, 255), random(100, 255));
      rect(435, 875, 50, 20);
      triangle(435, 905, 410, 885, 435, 865);
    }
    if (keyCode === RIGHT_ARROW) {
      spelerX = spelerX + snelheidX;

      fill(random(100, 255), random(100, 255), random(100, 255));
      rect(515, 875, 50, 20);
      triangle(565, 905, 590, 885, 565, 865);
    }
  }

  // ----- speler niet buiten scherm -----
  if (spelerX < 0) {
    spelerX = 0;
  }
  if (spelerX > 1000 - spelerW * 1 / 2) {
    spelerX = 1000 - spelerW * 1 / 2;
  }
}

/*****************************************************
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 *****************************************************/
var tekenVijand = function(x, y) {
    fill("red");
    ellipse(vijandX, vijandY, vijandW+10, vijandH+10);

    // pistolen
    fill("white")
    rect(vijandX-10, vijandY-80, vijandW-80, vijandH-55);    // boven
    rect(vijandX-10, vijandY+35, vijandW-80, vijandH-55);    // onder
    rect (vijandX-80, vijandY-15, vijandW-55, vijandH-80);   // rechts
    rect(vijandX+35, vijandY-15, vijandW-55, vijandH-80);    // links

    // ronddraaiende kabine
    rect (vijandX-35, vijandY-35, vijandW-30, vijandH-30);
    fill("red");
    ellipse(vijandX, vijandY, vijandW-50, vijandH-50);

};


// --------------------------------------------------
//   STARTSCHERM: uitleg werkinng spel en startknop
// --------------------------------------------------
var startScherm = function () {
  background(209, 235, 255);
  opnieuw();

  // ----- titel ------
  
  fill(random(100, 255), random(100, 255), random(100, 255));
  textSize(100);
  text("enemydodger", 305, 100,400,500);

  // ----- startknop -----
  rect(400, 455, 200, 90);
  fill(0, 0, 0);
  textSize(45);
  text("START", 425, 515,400,500);
  

  if (mouseIsPressed) {
    if (mouseX < 615 && mouseX > 385 && mouseY < 545 && mouseY > 455) {
      spelBeginnen = true;
    }
  }

  return spelBeginnen;
}


// -------------------------------------------
//   EINDSCHERM: behaalde score en startknop
// -------------------------------------------
var eindScherm = function () {
  background(209, 235, 255);

  textSize(100);
  text("GAME OVER", 175, 150,400,500);

  // ----- startknop -----
  fill(random(100, 255), random(100, 255), random(100, 255));
  rect(385, 455, 230, 90);
  fill(0, 0, 0);
  textSize(25);
  text("opnieuw proberen", 400, 510,400,500);

  // ----- behaalde score -----
  textSize(50);
  text("score:", 430, 300,400,500);
  text(aantalMeters.toString(), 440, 375,400,500);

}


// ------------------------------------
//   GAME OVER: het spel is afgelopen
// ------------------------------------
var gameOver = function () {
  var returnWaarde = "verder";
  var i = 0;

  while (returnWaarde === "verder" && i < vijanden.length) {
    if (spelerX < vijanden[i].x + 110 &&
      spelerX + 75 > vijanden[i].x - 15 &&
      spelerY + 20 < vijanden[i].y + 15 &&
      spelerY + 20 > vijanden[i].y - 30 ||
      spelerX < vijanden[i].x + 110 &&
      spelerX + 75 > vijanden[i].x - 15 &&
      spelerY + 125 < vijanden[i].y + 15 &&
      spelerY + 125 > vijanden[i].y - 30) {
      returnWaarde = "af";
    }

    i++;
  }

  return returnWaarde;
}


// ---------------------------------------------------------
//  DATA RESETTEN: snelheid, aantal meters, positie vijand
// ---------------------------------------------------------
var opnieuw = function () {
  snelheidY = 5;
  aantalMeters = 0;
  for (var i = 0; i < vijanden.length; i++) {
    vijanden[i].y = random(-80, -800);
  }

}

/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

 // X KOGEL = X VIJAND && Y KOGEL = Y VIJAND 
  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
    // ZEGGEN X VIJAND = X SPELER && Y VIJNAD (- GROOTE VIJAND) = Y SPELER (GEEFT GAME OVER)

  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**************************************************************************
***************************************************************************
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
**************************************************************************
**************************************************************************/

function setup() {
  createCanvas(1280, 720);

  background('blue');

}


/**************************************************************************
***************************************************************************
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
***************************************************************************
**************************************************************************/

function draw() {

    
  switch (spelStatus) {
    case 'SPELEN':

      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken

        /* BIJV IF ISVIJNADGERAAKT = TRUE {
            PUNTEN = PUNTEN +1;
        }
        */
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = 'GAMEOVER';
      }
      break;
    }
}


