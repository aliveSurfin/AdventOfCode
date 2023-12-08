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

type Hand = {
  hand: HandOccs,
  handOriginal: string[],
  bid: number
}

type HandOccs = {
  [card: string] :{
    count: number}
  }

class Day7 extends Day {
  hands : Hand[] = []

  constructor() {
    super(__dirname);

    this.hands = this.listOfStrings.map((e) => {
      let split = e.split(" ");
      let hand = split[0].split("").reduce((acc, chr) => {
        //@ts-ignore
        acc[chr] = (acc[chr] || 0) + 1;
        return acc;
      }, {});
      return {
        hand, handOriginal: split[0].split(""), bid: parseInt(split[1].trim())};
    })
  }

  compareHandP1(hand1: Hand, hand2: Hand) {
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

  compareHandP2(hand1: Hand, hand2: Hand) {
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
    this.p1 = this.hands.sort(this.compareHandP1).map((e, i)=>{
      return e.bid * (i+1)
    }).reduce(this.sum)
    assert(this.p1 == 248453531)
  }

  override solveP2(): void {
    this.p2 = this.hands.sort(this.compareHandP2).map((e, i)=>{
      return e.bid * (i+1)
    }).reduce(this.sum)
    assert(this.p2 == 248781813)
  }
}

new Day7().solve();


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

function handRankP1(hand: HandOccs) {
  let values = Object.values(hand)
  //@ts-ignore
  let maxOcc = Math.max(...values)
  return maxOcc == 5 ? Rank.QUINTS : maxOcc == 4 ? Rank.QUADS 
  : maxOcc == 3 ? values.length == 2 ? Rank.FULL_HOUSE : Rank.TRIPS 
  : maxOcc == 2 ? values.length == 3 ? Rank.TWO_PAIR : Rank.PAIR 
  : Rank.NOTHING
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
function handRankP2(hand: HandOccs) {
  let numberOfJokers = hand.J as unknown as number
  if( numberOfJokers == null){
    return handRankP1(hand)
  }
  let values = Object.values(hand)
  //@ts-ignore
  let maxOcc = Math.max(...values)

  return maxOcc == 5 ? Rank.QUINTS : maxOcc == 4 ? Rank.QUINTS // quints already quints // quads can always move to quints // JJJJ2 -> 22222 // J2222 -> 22222
  : maxOcc == 3 ? values.length == 2 
    ? Rank.QUINTS // fh can always move to quints // JJKKK -> KKKKK // KKJJJ -> KKKKK
    : Rank.QUADS  // trips can always move to quads // JJJAK -> AAAAK // AAAJK -> AAAAK -> // KKKAJ -> KKKKA
  : maxOcc == 2 ? values.length == 3 
    ? numberOfJokers == 2 ? Rank.QUADS : Rank.FULL_HOUSE // two pair can move to quads or full house depending on number of jokers // JJ KK A -> KKKKA // KK AA J -> AAAKK 
    : Rank.TRIPS // pair can move to trips
  : Rank.PAIR // high card can move to pair
}