import { Component, OnInit } from '@angular/core';
import { Card } from '../Card';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  deck: Array<Card>=[];
  card1:Card;
  card2:Card;
  symbols:Array<String> = ["angular","d3","jenkins","postcss","react","redux","sass","supercharge","ts","webpack"];
  deckSize:number;
  gameStarted:boolean=false;
  tries:number=0;
  cardsLeft:number;
  hiScore:number;


  constructor() { }

  ngOnInit() {

  }

  fillDeck() {
    this.deck =[];
    this.card1 =null;
    this.card2 =null;
    this.tries = 0;
    var idArray:Array<number> = [];
    this.cardsLeft = this.deckSize;
    for(var i = 0;i < this.deckSize;i++) {
      idArray.push(i);
    }
    for(var i=0;i <this.deckSize/2;i++) {
      var card = new Card();
      card.id =idArray.splice(Math.floor(Math.random()*idArray.length), 1)[0] ;
      card.symbol =this.symbols[i];
      card.hidden = true;
      card.matched =false;
      this.deck.push(card);
      var card = new Card();
      card.id =idArray.splice(Math.floor(Math.random()*idArray.length), 1)[0] ;
      card.symbol =this.symbols[i];
      card.hidden = true;
      card.matched =false;
      this.deck.push(card);
    }
    var tempArr:Array<Card> =[];
    for(var i =0;i<this.deckSize;i++) {
      for(var j = 0;j <this.deckSize;j++) {
        if(this.deck[j].id == i) {
          tempArr.push(this.deck[j]);
        }
      }
    }
    this.deck = tempArr;
    this.gameStarted = true;

  }

  check(card:Card) {
    if(card.matched || (this.card1 && this.card2)) {
      return;
    }
    if(!this.card1) {
      this.card1 =card;
      card.hidden = false;
    }
    else if(this.card1 && this.card1.id != card.id){
      this.tries++;
      this.card2 = card;
      card.hidden = false;
      if (this.card1.symbol == this.card2.symbol) {
        console.log("its a match!");
        this.cardsLeft -=2;
        this.card1.matched = true;
        this.card2.matched = true;
        this.card1 = null;
        this.card2 = null;
        if(this.cardsLeft == 0) {
          console.log("You won!");
          if(this.hiScore) {
            if(this.tries < this.hiScore){
              this.hiScore = this.tries;
              console.log("New highscore!");
            }
          }
          else {
            this.hiScore = this.tries;
            console.log("New highscore!");
          }

        }
      }
      else {
        console.log("not matching.");
        setTimeout(()=>{
          this.card1.hidden = true;
          this.card2.hidden = true;
          this.card1 = null;
          this.card2 = null;
        },1000);


      }
    }
  }

  restartGame() {
    this.deck =[];
    this.card1 =null;
    this.card2 =null;
    this.tries = 0;
    this.fillDeck()
  }



}
