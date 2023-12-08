import { Day } from "../../day";
import assert from "assert";
enum Rank {
  NOTHING = 0,
  PAIR,
  TWO_PAIR,
  TRIPS,
  FULL_HOUSE,
  QUADS,
  QUINTS,
}
function compareCardP1(card1: string, card2: string) {
  let cardRanks = [
    "A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2",
  ];
  let index1 = cardRanks.indexOf(card1);
  let index2 = cardRanks.indexOf(card2);
  if (index1 > index2) {
    return -1;
  }
  if (index2 > index1) {
    return 1;
  }

  return 0;
}

function handRankP1(hand: any) {
  let values = Object.values(hand)
  //@ts-ignore
  let maxOcc = Math.max(...values)

  if(maxOcc == 5) {
    return Rank.QUINTS
  }

  if(maxOcc == 4) {
    return Rank.QUADS
  }

  if(maxOcc == 3) {
    if(values.length == 2){
      return Rank.FULL_HOUSE
    }
    return Rank.TRIPS
  }

  if(maxOcc == 2) {
    if(values.length == 3) {
      return Rank.TWO_PAIR
    }
    return Rank.PAIR
  }

  return Rank.NOTHING
}

function compareCardP2(card1: string, card2: string) {
  let cardRanks = [
    "A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J",
  ];
  let index1 = cardRanks.indexOf(card1);
  let index2 = cardRanks.indexOf(card2);
  if (index1 > index2) {
    return -1;
  }
  if (index2 > index1) {
    return 1;
  }

  return 0;
}
function handRankP2(hand: any) {
  let numberOfJokers = hand.J
  if( numberOfJokers == null){
    return handRankP1(hand)
  }
  let values = Object.values(hand)
  //@ts-ignore
  let maxOcc = Math.max(...values)
  
  if(maxOcc >= 4) {
    return Rank.QUINTS // quints already quints // quads can always move to quints // JJJJ2 -> 22222 // J2222 -> 22222
  }

  if(maxOcc == 3) {
    if(values.length == 2){
      return Rank.QUINTS // fh can always move to quints // JJKKK -> KKKKK // KKJJJ -> KKKKK
    }
    return Rank.QUADS // trips can always move to quads // JJJAK -> AAAAK // AAAJK -> AAAAK -> // KKKAJ -> KKKKA
  }

  if(maxOcc == 2) {
    if(values.length == 3) {
      if(numberOfJokers== 2){ // JJ KK A -> KKKKA // KK AA J 
          return Rank.QUADS
      }else{
        return Rank.FULL_HOUSE
      }
    }
    return Rank.TRIPS // JJAKQ -> AAA // AAJKQ -> AAAKQ
  }

  return Rank.PAIR // can always move to pair
}


class Day7 extends Day {
  constructor() {
    super(__dirname);
  }

  compareHandP1(hand1: any, hand2: any) {
    let hand1Rank = handRankP1(hand1.hand);
    let hand2Rank = handRankP1(hand2.hand)
    if(hand1Rank > hand2Rank) {
      return 1
    }

    if(hand2Rank > hand1Rank) {
      return -1
    } 

    for(let i=0; i< hand1.handOriginal.length; i++){
      let curHand1 = hand1.handOriginal[i]
      let curHand2 = hand2.handOriginal[i]

      if(curHand1 == curHand2){
        continue
      }

      return compareCardP1(curHand1, curHand2)
    }
    return 0;

  }

  compareHandP2(hand1: any, hand2: any) {
    let hand1Rank = handRankP2(hand1.hand);
    let hand2Rank = handRankP2(hand2.hand)
    if(hand1Rank > hand2Rank) {
      return 1
    }

    if(hand2Rank > hand1Rank) {
      return -1
    } 

    for(let i=0; i< hand1.handOriginal.length; i++){
      let curHand1 = hand1.handOriginal[i]
      let curHand2 = hand2.handOriginal[i]

      if(curHand1 == curHand2){
        continue
      }

      return compareCardP2(curHand1, curHand2)
    }
    return 0;

  }

 

  override solveP1(): void {

    let hands = this.listOfStrings.map((e) => {
      let split = e.split(" ");
      let hand = split[0].split("").reduce((acc, chr) => {
        //@ts-ignore
        acc[chr] = (acc[chr] || 0) + 1;
        return acc;
      }, {});
      return {
        hand,     handOriginal: split[0].split(""),     bid: parseInt(split[1].trim()),   };
    }).sort(this.compareHandP1)

    this.p1 = hands.map((e, i)=>{
      return e.bid * (i+1)
    }).reduce(this.sum)
    assert(this.p1 == 248453531)
  }

  override solveP2(): void {

    let hands = this.listOfStrings.map((e) => {
      let split = e.split(" ");
      let hand = split[0].split("").reduce((acc, chr) => {
        //@ts-ignore
        acc[chr] = (acc[chr] || 0) + 1;
        return acc;
      }, {});
      return {
        hand, handOriginal: split[0].split(""), bid: parseInt(split[1].trim())
      };
    }).sort(this.compareHandP2)

    this.p2 = hands.map((e, i)=>{
      return e.bid * (i+1)
    }).reduce(this.sum)

    assert(this.p2 == 248781813)

  }


}

new Day7().solve();
