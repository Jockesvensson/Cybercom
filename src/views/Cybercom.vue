<template>
    <div class="container">
        <div class="">
            <div class="container house-container">
                <div v-for="house in houses" :key="house.id" :class=" 
                {highlight:selected.includes(house.id)}" 
                class="house-wrapper"></div>
            </div>

            <div v-show="startFirstGame" class="btn-container"><button @click="startGameAuto()" :disabled="isDisable()" class="btn btn-start">Starta</button></div>
            
            <div v-show="showRounds" class="rounds-container">
                <div v-for="round in rounds" :key="round.id" class="rounds-wrapper">{{'Det tog ' + round + ' rundor innan alla blev zombies'}}</div>
            </div>
            
            <div v-show="showAverageRounds" class="average-rounds-container">{{'Medelvärde antal rundor: ' + total.toFixed(2)}}</div>
            <div v-show="startNewGame" class="btn-container"><button @click="resetGame()" class="btn btn-reset">Köra igen?</button></div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'Cybercom',
    data() {
        return {
            houses: [],
            selected: [],
            rounds: [],
            roundsAverage: 0,
            maxRounds: 0,
            showAverageRounds: false,
            showRounds: false,
            startNewGame: false,
            startFirstGame: true,
        }
    },
    mounted() {
        // Här ritas alla 100 hus upp vid start av programmet samt tilldelas ett unikt id.
        let squares = [];
            for (var i = 1; i <= 100; i++) {
                squares.push({
                id: i
            })
        }
        this.houses = squares;
    },
    computed: {
        // För att få fram medelvärdet på antal rundor på 10 försök. Summerar varje värde i rounds och sedan kör en division med längden på round arrayen.
        total() {
            let sum = 0;
            sum = this.rounds.reduce((acc, item) => acc + item, 0).toFixed(2);
            return sum / this.rounds.length.toFixed(2);
        },
        // clickable() {
        //     if (this.rounds.length == 10) {
        //         return true;
        //     }
        // }
    },
    methods: {
        // Om man klickar på att köra igen så kommer man hit och variabler blir nollställda och efter det startar programmet igång igen.
        resetGame() {
            this.selected = [];
            this.rounds = [];
            this.roundsAverage = 0;
            this.showRounds = false;
            this.showAverageRounds = false;
            console.clear();
            this.startGameAuto();
        },
        // När alla värden har matchats och funnits mellan selected och houses så sparas antal rundor ner i rounds och selected arrayen töms.
        // Kollar även om maximalt antal rundor är uppnått, om det stämmer så avslutas programmet och visar information, annars forsätter programmet.
        gameOver() {
            this.rounds.push(this.selected.length);
            console.log('Det tog ' + this.rounds + 'rundor innan alla blev zombies');
            this.selected = [];
            this.showRounds = true;
            this.maxRounds++;

            if (this.rounds.length == 10) {
                console.log('nu är alla rundor över')
                clearInterval(this.interval);
                this.showAverageRounds = true;
                this.startNewGame = true;
            }
        },
        // Denna är för test, då det var enklare att klicka manuellt för att sprida viruset än att det sker snabbt automatiskt. 
        isDisable() {
            if (this.rounds.length == 10) {
                return true;
            }
        },
        // Denna gör att allting i programmet körs automatiskt, går även att ställa hastigheten så det går snabbare eller långsammare.
        startGameAuto() {
            this.interval = setInterval(() => this.startGame(), 100);
            this.startNewGame = false;
        },
        // Här är metoden som tar fram den första zombien. 
        startGame() {
            
            // Gömmer startknappen när programmet börjar.
            this.startFirstGame = false,
            this.isDisable();

            // Här nedan är möjligen en av de fulaste fullösningar som finns (kommer en till). Den här är till för att efter att första rundan är avslutad 
            // och ett hus har blivit smittad, så går programmet vidare till continueGame där vi får två zombies.
            if (this.selected.includes(1) || this.selected.includes(2) || this.selected.includes(3) || this.selected.includes(4) || this.selected.includes(5)
            || this.selected.includes(6) || this.selected.includes(7) || this.selected.includes(8) || this.selected.includes(9) || this.selected.includes(10)
            || this.selected.includes(11) || this.selected.includes(12) || this.selected.includes(13) || this.selected.includes(14) || this.selected.includes(15)
            || this.selected.includes(16) || this.selected.includes(17) || this.selected.includes(18) || this.selected.includes(19) || this.selected.includes(20)
            || this.selected.includes(21) || this.selected.includes(22) || this.selected.includes(23) || this.selected.includes(24) || this.selected.includes(25)
            || this.selected.includes(26) || this.selected.includes(27) || this.selected.includes(28) || this.selected.includes(29) || this.selected.includes(30)
            || this.selected.includes(31) || this.selected.includes(32) || this.selected.includes(33) || this.selected.includes(34) || this.selected.includes(35)
            || this.selected.includes(36) || this.selected.includes(37) || this.selected.includes(38) || this.selected.includes(39) || this.selected.includes(40)
            || this.selected.includes(41) || this.selected.includes(42) || this.selected.includes(43) || this.selected.includes(44) || this.selected.includes(45)
            || this.selected.includes(46) || this.selected.includes(47) || this.selected.includes(48) || this.selected.includes(49) || this.selected.includes(50)
            || this.selected.includes(51) || this.selected.includes(52) || this.selected.includes(53) || this.selected.includes(54) || this.selected.includes(55)
            || this.selected.includes(56) || this.selected.includes(57) || this.selected.includes(58) || this.selected.includes(59) || this.selected.includes(60)
            || this.selected.includes(61) || this.selected.includes(62) || this.selected.includes(63) || this.selected.includes(64) || this.selected.includes(65)
            || this.selected.includes(66) || this.selected.includes(67) || this.selected.includes(68) || this.selected.includes(69) || this.selected.includes(70)
            || this.selected.includes(71) || this.selected.includes(72) || this.selected.includes(73) || this.selected.includes(74) || this.selected.includes(75)
            || this.selected.includes(76) || this.selected.includes(77) || this.selected.includes(78) || this.selected.includes(79) || this.selected.includes(80)
            || this.selected.includes(81) || this.selected.includes(82) || this.selected.includes(83) || this.selected.includes(84) || this.selected.includes(85)
            || this.selected.includes(86) || this.selected.includes(87) || this.selected.includes(88) || this.selected.includes(89) || this.selected.includes(90)
            || this.selected.includes(91) || this.selected.includes(92) || this.selected.includes(93) || this.selected.includes(94) || this.selected.includes(95)
            || this.selected.includes(96) || this.selected.includes(97) || this.selected.includes(98) || this.selected.includes(99) || this.selected.includes(100)) {
                this.continueGame();
            } else {
        
                // Skapar en variabel som tar emot ett random värde som ligger inom houses.length (100 i detta fall).
                // Tar sedan och pushar in värdet i selected för att veta vilken ruta som ska ändra färg.
                let n = Math.floor(Math.random() * this.houses.length + 1);
                this.selected.push(n);

            }

            // Här kommer en till riktig fullösning (fungerar dock). Här kollar programmet igenom om alla värden 1-100 finns med i selected.
            // Om alla värden finns med så går den in i gameOver metoden, annars fortsätter programmet.
            if (this.selected.includes(1) && this.selected.includes(2) && this.selected.includes(3) && this.selected.includes(4) && this.selected.includes(5)
            && this.selected.includes(6) && this.selected.includes(7) && this.selected.includes(8) && this.selected.includes(9) && this.selected.includes(10)
            && this.selected.includes(11) && this.selected.includes(12) && this.selected.includes(13) && this.selected.includes(14) && this.selected.includes(15)
            && this.selected.includes(16) && this.selected.includes(17) && this.selected.includes(18) && this.selected.includes(19) && this.selected.includes(20)
            && this.selected.includes(21) && this.selected.includes(22) && this.selected.includes(23) && this.selected.includes(24) && this.selected.includes(25)
            && this.selected.includes(26) && this.selected.includes(27) && this.selected.includes(28) && this.selected.includes(29) && this.selected.includes(30)
            && this.selected.includes(31) && this.selected.includes(32) && this.selected.includes(33) && this.selected.includes(34) && this.selected.includes(35)
            && this.selected.includes(36) && this.selected.includes(37) && this.selected.includes(38) && this.selected.includes(39) && this.selected.includes(40)
            && this.selected.includes(41) && this.selected.includes(42) && this.selected.includes(43) && this.selected.includes(44) && this.selected.includes(45)
            && this.selected.includes(46) && this.selected.includes(47) && this.selected.includes(48) && this.selected.includes(49) && this.selected.includes(50)
            && this.selected.includes(51) && this.selected.includes(52) && this.selected.includes(53) && this.selected.includes(54) && this.selected.includes(55)
            && this.selected.includes(56) && this.selected.includes(57) && this.selected.includes(58) && this.selected.includes(59) && this.selected.includes(60)
            && this.selected.includes(61) && this.selected.includes(62) && this.selected.includes(63) && this.selected.includes(64) && this.selected.includes(65)
            && this.selected.includes(66) && this.selected.includes(67) && this.selected.includes(68) && this.selected.includes(69) && this.selected.includes(70)
            && this.selected.includes(71) && this.selected.includes(72) && this.selected.includes(73) && this.selected.includes(74) && this.selected.includes(75)
            && this.selected.includes(76) && this.selected.includes(77) && this.selected.includes(78) && this.selected.includes(79) && this.selected.includes(80)
            && this.selected.includes(81) && this.selected.includes(82) && this.selected.includes(83) && this.selected.includes(84) && this.selected.includes(85)
            && this.selected.includes(86) && this.selected.includes(87) && this.selected.includes(88) && this.selected.includes(89) && this.selected.includes(90)
            && this.selected.includes(91) && this.selected.includes(92) && this.selected.includes(93) && this.selected.includes(94) && this.selected.includes(95)
            && this.selected.includes(96) && this.selected.includes(97) && this.selected.includes(98) && this.selected.includes(99) && this.selected.includes(100)) {
                this.gameOver();
            }

        },
        // Här produceras det två nya zombies varje runda tills att inga människor finns kvar i husen.
        continueGame() {
            let o = Math.floor(Math.random() * this.houses.length + 1);
            let m = Math.floor(Math.random() * this.houses.length + 1);
            this.selected.push(o, m);
            // console.log(this.selected);
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
    text-align: left;
}

.house-container {
    max-width: 120px;
}

.house-wrapper {
    height: 10px;
    width: 10px;
    text-align: center;
    border: 1px solid black;
    background-color: green;
}

.highlight {
    background: red;
}

.btn-container {
    margin-top: 10px;
    text-align: center;
}

.btn {
    width: 65px;
    height: 35px;
    font-size: 18px;
    cursor: pointer;
    color: white;
    background-color: rgba(0, 100, 0, 0.61);
    border: none;
    border-radius: 6px 6px 6px 6px;
}

.btn-reset {
    width: 100px;
}

.rounds-container {
    margin: 10px 0px;
    padding: 15px;
    border: 1px solid lightgrey;
}

.average-rounds-container {
    margin: 10px 0px;
    text-align: center;
}

</style>