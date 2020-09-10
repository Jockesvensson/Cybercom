<template>
    <div>
        <div v-if="this.timerCount > 0" class="bingo-timer-container">BINGON STARTAR OM <span class="bingo-count-down">{{timerCount}}</span> SEKUNDER</div>
        <div class="container">
            <div class="left-container">
                <div class="counter-container">
                    <div class="counter-wrapper">
                        <div class="counter">{{numberNow}} / {{totalNumbers}}</div>
                    </div>
                </div>
                <div class="bingorow-wrapper">
                    <div class="bingorow">{{activeLines}}</div>
                </div>
                <div v-show="bingoCardMain" class="bingo-card-main-wrapper">
                    <div class="bingo-card-main"><button @click="decreaseCard()" :disabled="isDisabled()" class="btn-bingo-card-main">-</button></div>
                    <div class="bingo-card-main"><button class="btn-bingo-card-main">{{bingoCard}}</button></div>
                    <div class="bingo-card-main"><button @click="increaseCard()" class="btn-bingo-card-main">+</button></div>
                </div>
                <div v-show="bingoCardSecondary" class="bingo-card-secondary-wrapper">
                    <div class="bingo-card-secondary"><button @click="buyTenCards()" class="btn-bingo-card-secondary">10</button></div>
                    <div class="bingo-card-secondary"><button @click="buyTwentyCards()" class="btn-bingo-card-secondary">20</button></div>
                    <div class="bingo-card-secondary"><button @click="buyMaxCards()" class="btn-bingo-card-secondary-big">MAX</button></div>
                </div>
                <div v-show="buyBingoCard" class="buy-bingo-card-wrapper">
                    <div class="buy-bingo-card"><button @click="buyBingoCards()" :disabled="isDisable()" class="btn-buy-bingo-card">
                        KÖP {{bingoCard}} för {{bingoCostTotal}} kr</button>
                    </div>
                </div>
                <div v-show="randomNewBingoCard" class="new-random-card-wrapper">
                    <div class="new-random-card"><button @click="randomNewCard()" class="btn-new-random-card">Slumpa ny bricka</button></div>
                </div>
                <div v-show="boughtBingoCards" class="player-cash-wrapper">
                    <div v-if="bingoCard < 1" class="">Du har {{bingoCard}} st bingobrickor</div>
                    <div v-else-if="bingoCard <= 1" class="">Du har {{bingoCard}} st bingobricka</div>
                    <div v-else-if="bingoCard > 1" class="">Du har {{bingoCard}} st bingobrickor</div>
                </div>
                
            </div>
            <div class="middle-container">
                <div class="test-container">
                    <div class="test-wrapper">
                        <div class="test-container bingo-text-container">
                            <div
                                v-for="(item, index) in bingoText"
                                v-bind:key="index"
                                v-bind:style="{
                                color: colors[index % colors.length]}"
                                class="text-wrapper"
                                >{{item}}
                            </div>
                        </div>
                        <div class="test-container bingo-container">
                            <div v-for="item in firstTest" :key="item.id" :class=" 
                            {highlight:selected.includes(item.id)}" class="house-wrapper">{{item.id}}</div>
                        </div>
                        <div class="test-container bingo-container">
                            <div v-for="item in secondTest" :key="item.id" :class=" 
                            {highlight:selected.includes(item.id)}" class="house-wrapper">{{item.id}}</div>
                        </div>
                        <div class="test-container bingo-container">
                            <div v-for="item in thirdTest" :key="item.id" :class=" 
                            {highlight:selected.includes(item.id)}" class="house-wrapper">{{item.id}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-container">
                <div class="number-container">
                    <div v-if="this.selected.length > 0" :style="colorStyleMain" class="main-wrapper">
                        <div class="main-letter">{{showLetters}}</div>
                        <div class="main-number">{{showNumbers}}</div>
                    </div>
                    <div v-if="this.selected.length > 1" :style="colorStyleSecond" class="second-wrapper">
                        <div class="second-letter">{{showLetters1}}</div>
                        <div class="second-number">{{showNumbers1}}</div>
                    </div>
                    <div v-if="this.selected.length > 2" :style="colorStyleThird" class="third-wrapper">
                        <div class="third-letter">{{showLetters2}}</div>
                        <div class="third-number">{{showNumbers2}}</div>
                    </div>
                    <div v-if="this.selected.length > 3" :style="colorStyleFourth" class="fourth-wrapper">
                        <div class="fourth-letter">{{showLetters3}}</div>
                        <div class="fourth-number">{{showNumbers3}}</div>
                    </div>
                    <div v-if="this.selected.length > 4" :style="colorStyleFifth" class="fifth-wrapper">
                        <div class="fifth-letter">{{showLetters4}}</div>
                        <div class="fifth-number">{{showNumbers4}}</div>
                    </div>
                </div>
            </div>
            
        </div>
        <br>
        <div class="player-cash-wrapper">
            <div class="player-cash"><span class="bigger-text">{{testPlayerStartName}}</span> ditt saldo är: 
            <span class="bigger-text">{{playersCash}}</span> kr</div>
        </div>
        <!-- <div class="player-cash-wrapper">
            <div class="player-cash">Ditt saldo: {{getCash}} kr</div>
        </div>
        <div class="player-cash-wrapper">
            <div class="player-cash">Ditt startsaldo: {{testPlayerStartCash}} kr</div>
        </div> -->


        <!-- <div class="">
            <button @click="startGame()"  class="">Starta</button>
        </div>
        <br>
        <div class="">
            <button @click="resetGame()" class="">Starta om</button>
        </div> -->
        
        
        <transition name="bounce">
            <div v-show="showBingoOneMessage" class="win-container">
                <div class="win-text">BINGO</div>
                <div class="win-wrapper">
                    <div class="win-name">{{testPlayerStartName}}</div>
                    <div class="win-amount">{{firstBingoPrice}} kr</div>
                </div>
            </div>
        </transition>
        <transition name="bounce">
            <div v-show="showBingoTwoMessage" class="win-container">
                <div class="win-text">BINGO</div>
                <div class="win-wrapper">
                    <div class="win-name">{{testPlayerStartName}}</div>
                    <div class="win-amount">{{secondBingoPrice}} kr</div> 
                </div>     
            </div>
        </transition>
        <transition name="bounce">
            <div v-show="showBingoThreeMessage" class="win-container">
                <div class="win-text">BINGO</div>
                <div class="win-wrapper">
                    <div class="win-name">{{testPlayerStartName}}</div>
                    <div class="win-amount">{{thirdBingoPrice}} kr</div> 
                </div>
            </div>
        </transition>
        <transition name="bounce">
            <div v-show="showBingoFourMessage" class="win-container">
                <div class="win-text">BINGO</div>
                <div class="win-wrapper">
                    <div class="win-name">{{testPlayerStartName}}</div>
                    <div class="win-amount">{{fourBingoPrice}} kr</div> 
                </div>
            </div>
        </transition>
        <transition name="bounce">
            <div v-show="showBingoFiveMessage" class="win-container">
                <div class="win-text">BINGO</div>
                <div class="win-wrapper">
                    <div class="win-name">{{testPlayerStartName}}</div>
                    <div class="win-amount">{{fiveBingoPrice}} kr</div> 
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Bingo',
    data() {
        return {
            // firstColumn: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            // secondColumn: [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
            // thirdColumn: [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
            // fourthColumn: [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
            // fifthColumn: [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75],
            bingoText: ['B', 'I', 'N', 'G', 'O'],
            colors: ['red', 'gold', 'teal', 'purple', 'green'],
            firstColumn: [],
            secondColumn: [],
            thirdColumn: [],
            fourthColumn: [],
            fifthColumn: [],
            randomNumbers: [],
            selected: [],
            bingoOneRows: [],
            bingoTwoRows: [],
            bingoThreeRows: [],
            bingoFourRows: [],
            bingoFiveRows: [],
            showBingoOneMessage: false,
            showBingoTwoMessage: false,
            showBingoThreeMessage: false,
            showBingoFourMessage: false,
            showBingoFiveMessage: false,
            firstTest: [],
            secondTest: [],
            thirdTest: [],
            firstBingo: false,
            secondBingo: false,
            thirdBingo: false,
            fourthBingo: false,
            fiveBingo: false,
            bingoRowOne: [],
            bingoRowTwo: [],
            bingoRowThree: [],
            bingoRowFour: [],
            bingoRowFive: [],
            bingoRowSix: [],
            bingoRowSeven: [],
            bingoRowEight: [],
            bingoRowNine: [],
            bingoRowTen: [],
            bingoRowEleven: [],
            bingoRowTwelve: [],
            bingoRowThirteen: [],
            bingoRowFourteen: [],
            bingoRowFifteen: [],
            firstBingoRow: false,
            secondBingoRow: false,
            thirdBingoRow: false,
            fourBingoRow: false,
            fiveBingoRow: false,
            sixBingoRow: false,
            sevenBingoRow: false,
            eightBingoRow: false,
            nineBingoRow: false,
            tenBingoRow: false,
            elevenBingoRow: false,
            twelveBingoRow: false,
            thirteenBingoRow: false,
            fourteenhBingoRow: false,
            fiftenBingoRow: false,
            playerCash: 100,
            playerBingoCard: 0,
            bingoCard: 1,
            bingoCost: 50,
            // bingoCostTotal: 0,
            firstBingoPrice: 50,
            secondBingoPrice: 100,
            thirdBingoPrice: 150,
            fourBingoPrice: 200,
            fiveBingoPrice: 300,
            showFirstLine: false,
            boughtBingoCards: false,
            timerCount: 5,
            timer: null,
            bingoCardMain: true,
            bingoCardSecondary: true,
            buyBingoCard: true,
            randomNewBingoCard: true,
            cash: 0,
        }
    },
    mounted() { 

        for (let i = 1; i <= 15; i++) {
                this.firstColumn.push({
                id: i
            })
        }

        for (let i = 16; i <= 30; i++) {
                this.secondColumn.push({
                id: i
            })
        }

        for (let i = 31; i <= 45; i++) {
                this.thirdColumn.push({
                id: i
            })
        }

        for (let i = 46; i <= 60; i++) {
                this.fourthColumn.push({
                id: i
            })
        }

        for (let i = 61; i <= 75; i++) {
                this.fifthColumn.push({
                id: i
            })
        }


        for (let i = 1; i <= 75; i++) {
            this.randomNumbers.push(i)
        }


        for (let i = 0; i < 5; i++) {
            this.firstTest.push(this.firstNumberColumn[i]);
            this.firstTest.push(this.secondNumberColumn[i]);
            this.firstTest.push(this.thirdNumberColumn[i]);
            this.firstTest.push(this.fourthNumberColumn[i]);
            this.firstTest.push(this.fifthNumberColumn[i]);
        }

        for (let i = 5; i < 10; i++) {
            this.secondTest.push(this.firstNumberColumn[i]);
            this.secondTest.push(this.secondNumberColumn[i]);
            this.secondTest.push(this.thirdNumberColumn[i]);
            this.secondTest.push(this.fourthNumberColumn[i]);
            this.secondTest.push(this.fifthNumberColumn[i]);
        }

        for (let i = 10; i < 15; i++) {
            this.thirdTest.push(this.firstNumberColumn[i]);
            this.thirdTest.push(this.secondNumberColumn[i]);
            this.thirdTest.push(this.thirdNumberColumn[i]);
            this.thirdTest.push(this.fourthNumberColumn[i]);
            this.thirdTest.push(this.fifthNumberColumn[i]);
        }

        // for (var i = 0; i < 5; i++) {
        //     this.bingoRowOne.push(this.firstTest[i]);
        // }
        for (let i = 0; i < 5; i++) {
            this.bingoRowOne.push(this.firstTest[i].id);
        }
        for (let i = 5; i < 10; i++) {
            this.bingoRowTwo.push(this.firstTest[i].id);
        }
        for (let i = 10; i < 15; i++) {
            this.bingoRowThree.push(this.firstTest[i].id);
        }
        for (let i = 15; i < 20; i++) {
            this.bingoRowFour.push(this.firstTest[i].id);
        }
        for (let i = 20; i < 25; i++) {
            this.bingoRowFive.push(this.firstTest[i].id);
        }
        for (let i = 0; i < 5; i++) {
            this.bingoRowSix.push(this.secondTest[i].id);
        }
        for (let i = 5; i < 10; i++) {
            this.bingoRowSeven.push(this.secondTest[i].id);
        }
        for (let i = 10; i < 15; i++) {
            this.bingoRowEight.push(this.secondTest[i].id);
        }
        for (let i = 15; i < 20; i++) {
            this.bingoRowNine.push(this.secondTest[i].id);
        }
        for (let i = 20; i < 25; i++) {
            this.bingoRowTen.push(this.secondTest[i].id);
        }
        for (let i = 0; i < 5; i++) {
            this.bingoRowEleven.push(this.thirdTest[i].id);
        }
        for (let i = 5; i < 10; i++) {
            this.bingoRowTwelve.push(this.thirdTest[i].id);
        }
        for (let i = 10; i < 15; i++) {
            this.bingoRowThirteen.push(this.thirdTest[i].id);
        }
        for (let i = 15; i < 20; i++) {
            this.bingoRowFourteen.push(this.thirdTest[i].id);
        }
        for (let i = 20; i < 25; i++) {
            this.bingoRowFifteen.push(this.thirdTest[i].id);
        }

    },
    computed: {
        colorStyleMain() {
            var n = 0;
            n = this.selected.slice(-1)[0];
            
            if (n <= 15) {
                return {
                    'border': '10px solid red',
                    // 'backgroundColor': '#dd546e',
                    'color': 'red'
                }
            }
            if (n > 60) {
                return {
                    'border': '10px solid green',
                    'color': 'green'
                }
            }
            if (n > 45) {
                return {
                    'border': '10px solid purple',
                    'color': 'purple'
                }
            }
            if (n > 30) {
                return {
                    'border': '10px solid teal',
                    'color': 'teal'
                }
            }
            if (n > 15) {
                return {
                    'border': '10px solid gold',
                    'color': 'gold'
                }
            }
            if (!n) {
                return {
                    'border': '10px solid black'
                }
            }
        },
        colorStyleSecond() {

            if (this.selected.length <= 1) {
                return {
                    'border': '8px solid black',
                    'color': 'black'
                }
            }

            var n = 0;
            n = this.selected.slice(-2)[0];
            
            if (n <= 15) {
                return {
                    'border': '8px solid red',
                    'color': 'red'
                }
            }
            if (n > 60) {
                return {
                    'border': '8px solid green',
                    'color': 'green'
                }
            }
            if (n > 45) {
                return {
                    'border': '8px solid purple',
                    'color': 'purple'
                }
            }
            if (n > 30) {
                return {
                    'border': '8px solid teal',
                    'color': 'teal'
                }
            }
            if (n > 15) {
                return {
                    'border': '8px solid gold',
                    'color': 'gold'
                }
            }
            if (!n) {
                return {
                    'border': '8px solid black'
                }
            }
        },
        colorStyleThird() {

            if (this.selected.length <= 2) {
                return {
                    'border': '6px solid black',
                    'color': 'black'
                }
            }

            var n = 0;
            n = this.selected.slice(-3)[0];
            
            if (n <= 15) {
                return {
                    'border': '6px solid red',
                    'color': 'red'
                }
            }
            if (n > 60) {
                return {
                    'border': '6px solid green',
                    'color': 'green'
                }
            }
            if (n > 45) {
                return {
                    'border': '6px solid purple',
                    'color': 'purple'
                }
            }
            if (n > 30) {
                return {
                    'border': '6px solid teal',
                    'color': 'teal'
                }
            }
            if (n > 15) {
                return {
                    'border': '6px solid gold',
                    'color': 'gold'
                }
            }
            if (!n) {
                return {
                    'border': '6px solid black'
                }
            }
        },
        colorStyleFourth() {

            if (this.selected.length <= 3) {
                return {
                    'border': '5px solid black',
                    'color': 'black'
                }
            }

            var n = 0;
            n = this.selected.slice(-4)[0];
            
            if (n <= 15) {
                return {
                    'border': '5px solid red',
                    'color': 'red'
                }
            }
            if (n > 60) {
                return {
                    'border': '5px solid green',
                    'color': 'green'
                }
            }
            if (n > 45) {
                return {
                    'border': '5px solid purple',
                    'color': 'purple'
                }
            }
            if (n > 30) {
                return {
                    'border': '5px solid teal',
                    'color': 'teal'
                }
            }
            if (n > 15) {
                return {
                    'border': '5px solid gold',
                    'color': 'gold'
                }
            }
            if (!n) {
                return {
                    'border': '5px solid black'
                }
            }
        },
        colorStyleFifth() {

            if (this.selected.length <= 4) {
                return {
                    'border': '4px solid black',
                    'color': 'black'
                }
            }

            var n = 0;
            n = this.selected.slice(-5)[0];
            
            if (n <= 15) {
                return {
                    'border': '4px solid red',
                    'color': 'red'
                }
            }
            if (n > 60) {
                return {
                    'border': '4px solid green',
                    'color': 'green'
                }
            }
            if (n > 45) {
                return {
                    'border': '4px solid purple',
                    'color': 'purple'
                }
            }
            if (n > 30) {
                return {
                    'border': '4px solid teal',
                    'color': 'teal'
                }
            }
            if (n > 15) {
                return {
                    'border': '4px solid gold',
                    'color': 'gold'
                }
            }
            if (!n) {
                return {
                    'border': '4px solid black'
                }
            }
        },
        activeLines() {

            if (this.fourthBingo == true) {
                return 'Hel bricka för bingo'
            } else if (this.thirdBingo == true) {
                return '4 rader för bingo'
            } else if (this.secondBingo == true) {
                return '3 rader för bingo'
            } else if (this.firstBingo == true) {
                return '2 rader för bingo'
            } else return '1 rad för bingo'
            
        },
        bingoCostTotal() {
            return this.bingoCard * this.bingoCost;
        },
        // testCash() {
        //     return this.$store.getters.getPlayerCash;
        // },
        // testPlayerStartCash() {
        //     return this.$store.getters.getStartCash;
        // },
        testPlayerStartName() {
            return this.$store.getters.getPlayerName;
        },
        // getCash() {
        //     console.log(this.testCash);
        //     console.log(this.testCash.splice(-1)[0]);
            
        //     if (this.fiveBingo == true) {
        //         return this.$store.commit('addPlayerCashFirst', this.firstBingoPrice + this.secondBingoPrice + this.thirdBingoPrice + this.fourBingoPrice + this.fiveBingoPrice);
        //     } else if (this.fourthBingo == true) {
        //         return this.$store.commit('addPlayerCashFirst', this.firstBingoPrice + this.secondBingoPrice + this.thirdBingoPrice + this.fourBingoPrice);
        //     } else if (this.thirdBingo == true) {
        //         return this.$store.commit('addPlayerCashFirst', this.firstBingoPrice + this.secondBingoPrice + this.thirdBingoPrice);
        //     } else if (this.secondBingo == true) {
        //         return this.$store.commit('addPlayerCashFirst', this.firstBingoPrice + this.secondBingoPrice);
        //     } else if (this.firstBingo == true) {
        //         return this.$store.commit('addPlayerCashFirst', this.firstBingoPrice);
        //     } else return this.testCash; 


        //     // this.cash.push(this.playersCash);

        //     // var n = this.cash[this.cash.length - 2];

        //     // console.log(this.cash.slice(this.cash.length - 1));
        //     // console.log(n);
        //     // console.log(this.cash.slice(-1)[0])
        //     // return this.cash;

        //     // if (this.payOutFirstBingo == true) {
        //     //     return this.playerCash += this.firstBingoPrice;
        //     // } else {
        //     //     return this.playerCash;
        //     // }


            
        // },
        playersCash() {
            
            if (this.fiveBingo == true) {
                return this.playerCash + this.fiveBingoPrice + this.fourBingoPrice + this.thirdBingoPrice + this.secondBingoPrice + this.firstBingoPrice;
            } else if (this.fourthBingo == true) {
                return this.playerCash + this.fourBingoPrice + this.thirdBingoPrice + this.secondBingoPrice + this.firstBingoPrice;
            } else if (this.thirdBingo == true) {
                return this.playerCash + this.thirdBingoPrice + this.secondBingoPrice + this.firstBingoPrice;
            } else if (this.secondBingo == true) {
                return this.playerCash + this.secondBingoPrice + this.firstBingoPrice;
            } else if (this.firstBingo == true) {
                return this.playerCash + this.firstBingoPrice;
            } else return this.playerCash;
        },
        firstNumberColumn() {
            let n;
            n = this.firstColumn.sort(() => Math.random() - 0.5);
            return n;
        },
        secondNumberColumn() {
            let n;
            n = this.secondColumn.sort(() => Math.random() - 0.5);
            return n;
        },
        thirdNumberColumn() {
            let n;
            n = this.thirdColumn.sort(() => Math.random() - 0.5);
            return n;
        },
        fourthNumberColumn() {
            let n;
            n =  this.fourthColumn.sort(() => Math.random() - 0.5);
            return n;
        },
        fifthNumberColumn() {
            let n;
            n = this.fifthColumn.sort(() => Math.random() - 0.5);
            return n;
        },
        showNumbers() {
            if (this.selected.length < 1) {
                return 0
            } else {
                return this.selected.slice(-1)[0];
            }
        },
        showNumbers1() {
            if (this.selected.length < 2) {
                return 0
            } else {
                return this.selected.slice(-2)[0];
            }
        },
        showNumbers2() {
            if (this.selected.length < 3) {
                return 0
            } else {
                return this.selected.slice(-3)[0];
            }
        },
        showNumbers3() {
            if (this.selected.length < 4) {
                return 0
            } else {
                return this.selected.slice(-4)[0];
            }
        },
        showNumbers4() {
            if (this.selected.length < 5) {
                return 0
            } else {
                return this.selected.slice(-5)[0];
            }
        },
        showLetters() {
            var n = 0;
            n = this.selected.slice(-1)[0];
            
            if (n <= 15) {
                return this.bingoText[0];
            }
            if (n > 60) {
                return this.bingoText[4];
            }
            if (n > 45) {
                return this.bingoText[3];
            }
            if (n > 30) {
                return this.bingoText[2];
            }
            if (n > 15) {
                return this.bingoText[1];
            }    
            return n;
        },
        showLetters1() {
            var n = 0;
            n = this.selected.slice(-2)[0];
            
            if (n <= 15) {
                return this.bingoText[0];
            }
            if (n > 60) {
                return this.bingoText[4];
            }
            if (n > 45) {
                return this.bingoText[3];
            }
            if (n > 30) {
                return this.bingoText[2];
            }
            if (n > 15) {
                return this.bingoText[1];
            }    
            return n;
        },
        showLetters2() {
            var n = 0;
            n = this.selected.slice(-3)[0];
            
            if (n <= 15) {
                return this.bingoText[0];
            }
            if (n > 60) {
                return this.bingoText[4];
            }
            if (n > 45) {
                return this.bingoText[3];
            }
            if (n > 30) {
                return this.bingoText[2];
            }
            if (n > 15) {
                return this.bingoText[1];
            }    
            return n;
        },
        showLetters3() {
            var n = 0;
            n = this.selected.slice(-4)[0];
            
            if (n <= 15) {
                return this.bingoText[0];
            }
            if (n > 60) {
                return this.bingoText[4];
            }
            if (n > 45) {
                return this.bingoText[3];
            }
            if (n > 30) {
                return this.bingoText[2];
            }
            if (n > 15) {
                return this.bingoText[1];
            }    
            return n;
        },
        showLetters4() {
            var n = 0;
            n = this.selected.slice(-5)[0];
            
            if (n <= 15) {
                return this.bingoText[0];
            }
            if (n > 60) {
                return this.bingoText[4];
            }
            if (n > 45) {
                return this.bingoText[3];
            }
            if (n > 30) {
                return this.bingoText[2];
            }
            if (n > 15) {
                return this.bingoText[1];
            }    
            return n;
        },
        totalNumbers() {
            let number = this.bingoRowOne.length + this.bingoRowTwo.length + this.bingoRowThree.length + this.bingoRowFour.length + this.bingoRowFive.length 
            + this.bingoRowSix.length + this.bingoRowSeven.length + this.bingoRowEight.length + this.bingoRowNine.length + this.bingoRowTen.length
            + this.bingoRowEleven.length + this.bingoRowTwelve.length  + this.bingoRowThirteen.length + this.bingoRowFourteen.length + this.bingoRowFifteen.length;
            return number;
        },
        numberNow() {
            return this.selected.length;
        }   
    },
    methods: {
        startTimer() {
            this.timer = setInterval(this.CountDown, 1000)
        },
        CountDown() {

            if (this.timerCount > 0) {
                this.timerCount--
                return    
            } 
            if (this.timerCount == 0) {
                clearInterval(this.timer);
                this.interval = setInterval(() => this.startGame(), 2000);
            }
            
        },
        randomNewCard() {
            this.firstColumn = [];
            this.secondColumn = [];
            this.thirdColumn = [];
            this.fourthColumn = [];
            this.fifthColumn = [];
            
            this.firstTest = [];
            this.secondTest = [];
            this.thirdTest = [];

            this.randomNumbers = [];

            this.bingoRowOne = [];
            this.bingoRowTwo = [];
            this.bingoRowThree = [];
            this.bingoRowFour = [];
            this.bingoRowFive = [];
            this.bingoRowSix = [];
            this.bingoRowSeven = [];
            this.bingoRowEight = [];
            this.bingoRowNine = [];
            this.bingoRowTen = [];
            this.bingoRowEleven = [];
            this.bingoRowTwelve = [];
            this.bingoRowThirteen = [];
            this.bingoRowFourteen = [];
            this.bingoRowFifteen = [];

            for (let i = 1; i <= 15; i++) {
                this.firstColumn.push({
                    id: i
                })
            }

            for (let i = 16; i <= 30; i++) {
                this.secondColumn.push({
                    id: i
                })
            }

            for (let i = 31; i <= 45; i++) {
                this.thirdColumn.push({
                    id: i
                })
            }

            for (let i = 46; i <= 60; i++) {
                this.fourthColumn.push({
                    id: i
                })
            }

            for (let i = 61; i <= 75; i++) {
                this.fifthColumn.push({
                    id: i
                })
            }


            for (let i = 1; i <= 75; i++) {
                this.randomNumbers.push(i)
            }


            for (let i = 0; i < 5; i++) {
                this.firstTest.push(this.firstNumberColumn[i]);
                this.firstTest.push(this.secondNumberColumn[i]);
                this.firstTest.push(this.thirdNumberColumn[i]);
                this.firstTest.push(this.fourthNumberColumn[i]);
                this.firstTest.push(this.fifthNumberColumn[i]);
            }

            for (let i = 5; i < 10; i++) {
                this.secondTest.push(this.firstNumberColumn[i]);
                this.secondTest.push(this.secondNumberColumn[i]);
                this.secondTest.push(this.thirdNumberColumn[i]);
                this.secondTest.push(this.fourthNumberColumn[i]);
                this.secondTest.push(this.fifthNumberColumn[i]);
            }

            for (let i = 10; i < 15; i++) {
                this.thirdTest.push(this.firstNumberColumn[i]);
                this.thirdTest.push(this.secondNumberColumn[i]);
                this.thirdTest.push(this.thirdNumberColumn[i]);
                this.thirdTest.push(this.fourthNumberColumn[i]);
                this.thirdTest.push(this.fifthNumberColumn[i]);
            }

            for (let i = 0; i < 5; i++) {
                this.bingoRowOne.push(this.firstTest[i].id);
            }
            for (let i = 5; i < 10; i++) {
                this.bingoRowTwo.push(this.firstTest[i].id);
            }
            for (let i = 10; i < 15; i++) {
                this.bingoRowThree.push(this.firstTest[i].id);
            }
            for (let i = 15; i < 20; i++) {
                this.bingoRowFour.push(this.firstTest[i].id);
            }
            for (let i = 20; i < 25; i++) {
                this.bingoRowFive.push(this.firstTest[i].id);
            }
            for (let i = 0; i < 5; i++) {
                this.bingoRowSix.push(this.secondTest[i].id);
            }
            for (let i = 5; i < 10; i++) {
                this.bingoRowSeven.push(this.secondTest[i].id);
            }
            for (let i = 10; i < 15; i++) {
                this.bingoRowEight.push(this.secondTest[i].id);
            }
            for (let i = 15; i < 20; i++) {
                this.bingoRowNine.push(this.secondTest[i].id);
            }
            for (let i = 20; i < 25; i++) {
                this.bingoRowTen.push(this.secondTest[i].id);
            }
            for (let i = 0; i < 5; i++) {
                this.bingoRowEleven.push(this.thirdTest[i].id);
            }
            for (let i = 5; i < 10; i++) {
                this.bingoRowTwelve.push(this.thirdTest[i].id);
            }
            for (let i = 10; i < 15; i++) {
                this.bingoRowThirteen.push(this.thirdTest[i].id);
            }
            for (let i = 15; i < 20; i++) {
                this.bingoRowFourteen.push(this.thirdTest[i].id);
            }
            for (let i = 20; i < 25; i++) {
                this.bingoRowFifteen.push(this.thirdTest[i].id);
            }
        },
        decreaseCard() {
            this.bingoCard -= 1;
        },
        increaseCard() {
            this.bingoCard += 1;
        },
        buyTenCards() {
            if (this.playersCash >= 500) {

                this.bingoCard = 10;
            }
            else return
        },
        buyTwentyCards() {
            if (this.playersCash >= 1000) {

                this.bingoCard = 20;
            }
            else return
        },
        buyMaxCards() {
            var max;
            max = this.playersCash / this.bingoCost;
            this.bingoCard = max;
        },
        buyBingoCards() {

            this.playerCash -= this.bingoCostTotal;
            this.boughtBingoCards = true;

            this.bingoCardMain = false;
            this.bingoCardSecondary = false;
            this.buyBingoCard = false;
            this.randomNewBingoCard = false;

            this.startTimer();
        },
        isDisabled() {
            // if (this.bingoCard < 1) {
            //     return true
            // }
            // if (this.fiveBingo == true) {
            //     return true
            // }
            if(this.bingoCard < 2) {
                return true
            }
        },
        isDisable() {
            if (this.playersCash < this.bingoCost) {
                return true;
            }
            if (this.selected.length >= 1) {
                return true
            }
            if (this.playersCash < this.bingoCostTotal) {
                return true
            }          
        },
        startGameAuto() {
            this.interval = setInterval(() => this.startGame(), 2000);
        },
        startGame() {


            if (this.randomNumbers.length == 0) {
                console.log('slut på nummer');
            }
            let rand = Math.floor(Math.random() * this.randomNumbers.length);
            let num = this.randomNumbers[rand];
            this.selected.push(num);
            this.randomNumbers.splice(rand, 1);

            this.checkFirstBingo();
            this.checkSecondBingo();
            this.checkThirdBingo();
            this.checkFourBingo();
            this.checkFiveBingo();

            this.checkFirstBingoMessage();
            this.checkSecondBingoMessage();
            this.checkThirdBingoMessage();
            this.checkFourthBingoMessage();
            this.checkFifthBingoMessage();       
        },
        checkFirstBingoMessage() {
            if (this.bingoOneRows.length == 1) {
                this.showBingoOneMessage = true;
                this.payOutFirstBingo = true;
            } else this.showBingoOneMessage = false;
        },
        checkSecondBingoMessage() {
            if (this.bingoTwoRows.length == 2) {
                this.showBingoTwoMessage = true;
            } else this.showBingoTwoMessage = false;
        },
        checkThirdBingoMessage() {
            if (this.bingoThreeRows.length == 3) {
                this.showBingoThreeMessage = true;
            } else this.showBingoThreeMessage = false;
        },
        checkFourthBingoMessage() {
            if (this.bingoFourRows.length == 4) {
                this.showBingoFourMessage = true;
            } else this.showBingoFourMessage = false;
        },
        checkFifthBingoMessage() {
            if (this.bingoFiveRows.length == 5) {
                this.showBingoFiveMessage = true;
            } else this.showBingoFiveMessage = false;
        },
        checkFirstBingo() {

            if (this.bingoRowOne.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(1);
                this.firstBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowTwo.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(2);
                this.secondBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowThree.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(3);
                this.thirdBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowFour.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(4);
                this.fourBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowFive.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(5);
                this.fiveBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowSix.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(6);
                this.sixBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowSeven.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(7);
                this.sevenBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowEight.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(8);
                this.eightBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowNine.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(9);
                this.nineBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowTen.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(10);
                this.tenBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowEleven.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(11);
                this.elevenBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowTwelve.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(12);
                this.twelveBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowThirteen.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(13);
                this.thirteenBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowFourteen.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(14);
                this.fourteenhBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            if (this.bingoRowFifteen.every(v => this.selected.includes(v))) {
                this.bingoOneRows.push(15);
                this.fiftenBingoRow = true;
                // this.showBingoOneMessage = true;
                this.firstBingo = true;
            }
            
        },
        checkSecondBingo() {
            
            if (this.firstBingoRow == true && this.secondBingoRow == true) {
                this.bingoTwoRows.push(1, 2);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.firstBingoRow == true && this.thirdBingoRow == true) {
                this.bingoTwoRows.push(1, 3);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.firstBingoRow == true && this.fourBingoRow == true) {
                this.bingoTwoRows.push(1, 4);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.firstBingoRow == true && this.fiveBingoRow == true) {
                this.bingoTwoRows.push(1, 5);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            } 
            if (this.secondBingoRow == true && this.thirdBingoRow == true) {
                this.bingoTwoRows.push(2, 3);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.secondBingoRow == true && this.fourBingoRow == true) {
                this.bingoTwoRows.push(2, 4);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.secondBingoRow == true && this.fiveBingoRow == true) {
                this.bingoTwoRows.push(2, 5);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            } 
            if (this.thirdBingoRow == true && this.fourBingoRow == true) {
                this.bingoTwoRows.push(3, 4);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.thirdBingoRow == true && this.fiveBingoRow == true) {
                this.bingoTwoRows.push(3, 5);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }         
            if (this.fourBingoRow == true && this.fiveBingoRow == true) {
                this.bingoTwoRows.push(4, 5);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }

            if (this.sixBingoRow == true && this.sevenBingoRow == true) {
                this.bingoTwoRows.push(6, 7);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.sixBingoRow == true && this.eightBingoRow == true) {
                this.bingoTwoRows.push(6, 8);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.sixBingoRow == true && this.nineBingoRow == true) {
                this.bingoTwoRows.push(6, 9);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.sixBingoRow == true && this.tenBingoRow == true) {
                this.bingoTwoRows.push(6, 10);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            } 
            if (this.sevenBingoRow == true && this.eightBingoRow == true) {
                this.bingoTwoRows.push(7, 8);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.sevenBingoRow == true && this.nineBingoRow == true) {
                this.bingoTwoRows.push(7, 9);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.sevenBingoRow == true && this.tenBingoRow == true) {
                this.bingoTwoRows.push(7, 10);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            } 
            if (this.eightBingoRow == true && this.nineBingoRow == true) {
                this.bingoTwoRows.push(8, 9);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.eightBingoRow == true && this.tenBingoRow == true) {
                this.bingoTwoRows.push(8, 10);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }         
            if (this.nineBingoRow == true && this.tenBingoRow == true) {
                this.bingoTwoRows.push(9, 10);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }

            if (this.elevenBingoRow == true && this.twelveBingoRow == true) {
                this.bingoTwoRows.push(11, 12);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.elevenBingoRow == true && this.thirteenBingoRow == true) {
                this.bingoTwoRows.push(11, 13);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.elevenBingoRow == true && this.fourteenhBingoRow == true) {
                this.bingoTwoRows.push(11, 14);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.elevenBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoTwoRows.push(11, 15);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            } 
            if (this.twelveBingoRow == true && this.thirteenBingoRow == true) {
                this.bingoTwoRows.push(12, 13);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.twelveBingoRow == true && this.fourteenhBingoRow == true) {
                this.bingoTwoRows.push(12, 14);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.twelveBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoTwoRows.push(12, 15);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            } 
            if (this.thirteenBingoRow == true && this.fourteenhBingoRow == true) {
                this.bingoTwoRows.push(13, 14);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }
            if (this.thirteenBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoTwoRows.push(13, 15);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }         
            if (this.fourteenhBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoTwoRows.push(14, 15);
                this.secondBingo = true;
                // this.showBingoTwoMessage = true;
            }


        },
        checkThirdBingo() {
            if (this.firstBingoRow == true && this.secondBingoRow == true && this.thirdBingoRow == true) {
                this.bingoThreeRows.push(1, 2, 3);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.firstBingoRow == true && this.secondBingoRow == true && this.fourBingoRow == true) {
                this.bingoThreeRows.push(1, 2, 4);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.firstBingoRow == true && this.secondBingoRow == true && this.fiveBingoRow == true) {
                this.bingoThreeRows.push(1, 2, 5);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.secondBingoRow == true && this.thirdBingoRow == true && this.fourBingoRow == true) {
                this.bingoThreeRows.push(2, 3, 4);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.secondBingoRow == true && this.thirdBingoRow == true && this.fiveBingoRow == true) {
                this.bingoThreeRows.push(2, 3, 5);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.thirdBingoRow == true && this.fourBingoRow == true && this.fiveBingoRow == true) {
                this.bingoThreeRows.push(3, 4, 5);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }

            if (this.sixBingoRow == true && this.sevenBingoRow == true && this.eightBingoRow == true) {
                this.bingoThreeRows.push(6, 7, 8);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.sixBingoRow == true && this.sevenBingoRow == true && this.nineBingoRow == true) {
                this.bingoThreeRows.push(6, 7, 9);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.sixBingoRow == true && this.sevenBingoRow == true && this.tenBingoRow == true) {
                this.bingoThreeRows.push(6, 7, 10);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.sevenBingoRow == true && this.eightBingoRow == true && this.nineBingoRow == true) {
                this.bingoThreeRows.push(7, 8, 9);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.sevenBingoRow == true && this.eightBingoRow == true && this.tenBingoRow == true) {
                this.bingoThreeRows.push(7, 8, 10);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.eightBingoRow == true && this.nineBingoRow == true && this.tenBingoRow == true) {
                this.bingoThreeRows.push(8, 9, 10);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }

            if (this.elevenBingoRow == true && this.twelveBingoRow == true && this.thirteenBingoRow == true) {
                this.bingoThreeRows.push(11, 12, 13);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.elevenBingoRow == true && this.twelveBingoRow == true && this.fourteenhBingoRow == true) {
                this.bingoThreeRows.push(11, 12, 14);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.elevenBingoRow == true && this.twelveBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoThreeRows.push(11, 12, 15);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.twelveBingoRow == true && this.thirteenBingoRow == true && this.fourteenhBingoRow == true) {
                this.bingoThreeRows.push(12, 13, 14);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.twelveBingoRow == true && this.thirteenBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoThreeRows.push(12, 13, 15);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
            if (this.thirteenBingoRow == true && this.fourteenhBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoThreeRows.push(13, 14, 15);
                this.thirdBingo = true;
                // this.showBingoThreeMessage = true;
            }
        },
        checkFourBingo() {
            if (this.firstBingoRow == true && this.secondBingoRow == true && this.thirdBingoRow == true && this.fourBingoRow == true) {
                this.bingoFourRows.push(1, 2, 3, 4);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.firstBingoRow == true && this.secondBingoRow == true && this.thirdBingoRow == true && this.fiveBingoRow == true) {
                this.bingoFourRows.push(1, 2, 3, 5);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.firstBingoRow == true && this.secondBingoRow == true && this.fourBingoRow == true && this.fiveBingoRow == true) {
                this.bingoFourRows.push(1, 2, 4, 5);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.firstBingoRow == true && this.thirdBingoRow == true && this.fourBingoRow == true && this.fiveBingoRow == true) {
                this.bingoFourRows.push(1, 3, 4, 5);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.secondBingoRow == true && this.thirdBingoRow == true && this.fourBingoRow == true && this.fiveBingoRow == true) {
                this.bingoFourRows.push(2, 3, 4, 5);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }

            if (this.sixBingoRow == true && this.sevenBingoRow == true && this.eightBingoRow == true && this.nineBingoRow == true) {
                this.bingoFourRows.push(6, 7, 8, 9);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.sixBingoRow == true && this.sevenBingoRow == true && this.eightBingoRow == true && this.tenBingoRow == true) {
                this.bingoFourRows.push(6, 7, 8, 10);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.sixBingoRow == true && this.sevenBingoRow == true && this.nineBingoRow == true && this.tenBingoRow == true) {
                this.bingoFourRows.push(6, 7, 9, 10);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.sixBingoRow == true && this.eightBingoRow == true && this.nineBingoRow == true && this.tenBingoRow == true) {
                this.bingoFourRows.push(6, 8, 9, 10);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.sevenBingoRow == true && this.eightBingoRow == true && this.nineBingoRow == true && this.tenBingoRow == true) {
                this.bingoFourRows.push(7, 8, 9, 10);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }

            if (this.elevenBingoRow == true && this.twelveBingoRow == true && this.thirteenBingoRow == true && this.fourteenhBingoRow == true) {
                this.bingoFourRows.push(11, 12, 13, 14);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.elevenBingoRow == true && this.twelveBingoRow == true && this.thirteenBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoFourRows.push(11, 12, 13, 15);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.elevenBingoRow == true && this.twelveBingoRow == true && this.fourteenhBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoFourRows.push(11, 12, 14, 15);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.elevenBingoRow == true && this.thirteenBingoRow == true && this.fourteenhBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoFourRows.push(11, 13, 14, 15);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
            if (this.twelveBingoRow == true && this.thirteenBingoRow == true && this.fourteenhBingoRow == true && this.fiftenBingoRow == true) {
                this.bingoFourRows.push(12, 13, 14, 15);
                this.fourthBingo = true;
                // this.showBingoFourMessage = true;
            }
        },
        checkFiveBingo() {
            
            if (this.firstBingoRow == true && this.secondBingoRow == true && this.thirdBingoRow == true && this.fourBingoRow == true &&
            this.fiveBingoRow == true) {
                this.bingoFiveRows.push(1, 2, 3, 4, 5);
                this.fiveBingo = true;
                // this.showBingoFiveMessage = true;
                // clearInterval(this.interval);
                this.endGame();
            }
            if (this.sixBingoRow == true && this.sevenBingoRow == true && this.eightBingoRow == true && this.nineBingoRow == true &&
            this.tenBingoRow == true) {
                this.bingoFiveRows.push(6, 7, 8, 9, 10);
                this.fiveBingo = true;
                // this.showBingoFiveMessage = true;
                // clearInterval(this.interval);
                this.endGame();
            }
            if (this.elevenBingoRow == true && this.twelveBingoRow == true && this.thirteenBingoRow == true && this.fourteenhBingoRow == true &&
            this.fiftenBingoRow == true) {
                this.bingoFiveRows.push(11, 12, 13, 14, 15);
                this.fiveBingo = true;
                // this.showBingoFiveMessage = true;
                // clearInterval(this.interval);
                this.endGame();
            }

            
        },
        endGame() {
            clearInterval(this.interval);
            this.gameOver = setInterval(() => this.bingoIsOver(), 2000);
        },
        bingoIsOver() {
            this.showBingoFiveMessage = false;
            this.bingoCardMain = true;
            this.bingoCardSecondary = true;
            this.buyBingoCard = true;
            this.randomNewBingoCard = true;
            this.boughtBingoCards = 0;
            this.selected = [];
            this.timerCount = 5;
            this.firstBingoRow = false;
            this.secondBingoRow = false;
            this.thirdBingoRow = false;
            this.fourBingoRow = false;
            this.fiveBingoRow = false;
            this.sixBingoRow = false;
            this.sevenBingoRow = false;
            this.eightBingoRow = false;
            this.nineBingoRow = false;
            this.tenBingoRow = false;
            this.elevenBingoRow = false;
            this.twelveBingoRow = false;
            this.thirteenBingoRow = false;
            this.fourteenhBingoRow = false;
            this.fiftenBingoRow = false;
            this.firstBingo = false;
            this.secondBingo = false;
            this.thirdBingo = false;
            this.fourthBingo = false;
            this.fiveBingo = false;
            this.bingoFiveRows = [];
            this.bingoFourRows = [];
            this.bingoThreeRows = [];
            this.bingoTwoRows = [];
            this.bingoOneRows = [];
            this.randomNumbers = [];

            for (var i = 1; i <= 75; i++) {
                this.randomNumbers.push(i)
            }

            // this.bingoRowOne = [],
            // this.bingoRowTwo = [],
            // this.bingoRowThree = [],
            // this.bingoRowFour = [],
            // this.bingoRowFive = [],
            // this.bingoRowSix = [],
            // this.bingoRowSeven = [],
            // this.bingoRowEight = [],
            // this.bingoRowNine = [],
            // this.bingoRowTen = [],
            // this.bingoRowEleven = [],
            // this.bingoRowTwelve = [],
            // this.bingoRowThirteen = [],
            // this.bingoRowFourteen = [],
            // this.bingoRowFifteen = [],

            clearInterval(this.gameOver);
            // this.reset = setInterval(() => this.resetShit(), 50);
        },
        // resetShit() {
        //     this.fiveBingo = false;
        // },
        resetGame() {
            this.selected = [];
            this.bingoRows = [];
            this.showBingoMessage = false;
            this.randomNumbers = [];

            for (var i = 1; i <= 75; i++) {
                this.randomNumbers.push(i)
            }
            // this.startGameAuto();
        },
    }
}
</script>

<style scoped>

.container {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.left-container {
    flex: 20%;
    border: 1px solid black;
}

.middle-container {
    flex: 20%;
    border: 1px solid green;
}

.right-container {  
    flex: 35%;
    border: 1px solid pink;
}



/* .container-wrapper {
    display: flex;
    background-color: rgb(206, 167, 70);
    height: auto;
    width: auto;
    padding: 20px;
}

.boxes-wrapper {
    background: white;
}

.boxes {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    background: white;
} */

.highlight {
    background: yellow;
}


.test-container {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: left;
}

.bingo-text-container {
    max-width: 190px;
    margin-top: 5px;
    margin-bottom: 2px;
    font-size: 24px;
    font-weight: 700;
}

.bingo-container {
    max-width: 190px;
    margin: 0px 5px 5px 5px;
}

.house-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 35px;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    border: 1px solid rgb(206, 167, 70);
}

.text-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 35px;
    text-align: center;
    border: 1px solid rgb(206, 167, 70);
    /* background: rgb(230, 225, 225); */
}

.win-container {
    position: relative;
    bottom: 500px;
    margin: 0 auto;
    box-sizing: border-box;
    /* display: flex; */
    justify-content: center;
    text-align: center;
    height: 250px;
    width: 400px;
    border: none;
    border-radius: 8px;
    background: lightgray;
}

.win-text {
    padding-top: 20px;
    font-size: 60px;
    color: goldenrod;
}

.win-wrapper {
    height: 40%;
    margin: 20px 10px 10px 10px;
    padding: 10px;
    border: 1px solid goldenrod;
    border-radius: 10px;
}

.win-name {
    position: relative;
    right: 28%;
    display: inline-block;
    font-size: 32px;
}

.win-amount {
    position: relative;
    left: 28%;
    display: inline-block;
    font-size: 32px;
}

.bingo-card-main-wrapper {
    margin-top: 20px;
}

.bingo-card-main {
    display: inline-block;
}

.btn-bingo-card-main {
    width: 50px;
    height: 45px;
    border-radius: 8px;
}

.bingo-card-secondary-wrapper {
    margin-top: 20px;
}

.bingo-card-secondary {
    display: inline-block;
    margin-right: 2px;
}

.btn-bingo-card-secondary {
    width: 43px;
    height: 45px;
    border-radius: 8px;
}

.btn-bingo-card-secondary-big {
    width: 58px;
    height: 45px;
    border-radius: 8px;
}

.buy-bingo-card-wrapper {
    margin-top: 20px;
}

.buy-bingo-card {

}

.player-cash-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 30px;
}

.player-cash {
}

.btn-buy-bingo-card {
    width: 150px;
    height: 85px;
    border-radius: 8px;
}

.new-random-card-wrapper {
    margin-top: 10px;
}

.new-random-card {

}

.btn-new-random-card {
    height: 30px;
    border-radius: 8px;
}

.counter-container {
    display: flex;
    justify-content: center;
}

.counter-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid rgb(94, 4, 94);
}

.counter {
    position: relative;
    top: 32%;
    font-size: 30px;
}

.bingorow-wrapper {
    margin-top: 30px;
}

.bingorow {
    font-size: 30px;
}

.number-container {
    height: 200px;
    width: 300px;
    /* border: 1px solid red; */
    /* display: flex; */
}


.main-wrapper {
    position: relative;
    top: 0%;
    left: 0%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 10px solid red;
    /* background: rgb(230, 225, 225); */
}

.second-wrapper {
    position: relative;
    bottom: 36%;
    left: 28%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 8px solid red;
    /* background: rgb(230, 225, 225); */
}

.third-wrapper {
    position: relative;
    bottom: 66%;
    left: 51%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid red;
    /* background: rgb(230, 225, 225); */
}

.fourth-wrapper {
    position: relative;
    bottom: 90%;
    left: 69%;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 4px solid red;
    /* background: rgb(230, 225, 225); */
}

.fifth-wrapper {
    position: relative;
    bottom: 111%;
    left: 85%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 4px solid red;
    /* background: rgb(230, 225, 225); */
}

.main-letter {
    position: relative;
    font-weight: 700;
}

.second-letter {
    position: relative;
    font-weight: 700;
}

.third-letter {
    position: relative;
    font-weight: 700;
}

.fourth-letter {
    position: relative;
    font-weight: 700;
}

.fifth-letter {
    position: relative;
    font-weight: 700;
    font-size: 12px;
}

.main-number {
    position: relative;
    bottom: 5px;
    font-size: 40px;
}

.second-number {
    position: relative;
    bottom: 3px;
    font-size: 30px;
}

.third-number {
    position: relative;
    bottom: 6px;
    right: 1px;
    font-size: 24px;
}

.fourth-number {
    position: relative;
    bottom: 5px;
    font-size: 20px;
}

.fifth-number {
    position: relative;
    bottom: 4px;
    font-size: 18px;
}


.bounce-enter-active {
    animation: bounce-in 1.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.bingo-timer-container {
    font-size: 30px;
}

.bingo-count-down {
    font-weight: 500;
    font-size: 45px;
}

.bigger-text {
    font-size: 20px;
    font-weight: 600;
}


</style>