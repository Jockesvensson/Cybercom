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
            newHouses: [],
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
            this.interval = setInterval(() => this.startGame(), 1);
            this.startNewGame = false;
        },
        // Här är metoden som tar fram den första zombien. 
        startGame() {
            
            // Gömmer startknappen när programmet börjar.
            this.startFirstGame = false,
            this.isDisable();

            // Den här är till för att efter att första rundan är avslutad och ett hus har blivit smittad, så går programmet vidare till continueGame
            // där vi får två zombies.
            if (this.selected.length >= 1) {
                this.continueGame();
            } else {
        
                // Skapar en variabel som tar emot ett random värde som ligger inom houses.length (100 i detta fall).
                // Tar sedan och pushar in värdet i selected för att veta vilken ruta som ska ändra färg.
                let n = Math.floor(Math.random() * this.houses.length + 1);
                this.selected.push(n);

            }

            // Här kollar jag om newHouses arrayen är tom, om det stämmer går jag in i loopen. Inne i loopen så gör jag om tidigare houses arrayen från en object
            // array till en array utan object. Detta så jag kan jämföra senare om newHouses har alla nummber som selected.
            if (!this.newHouses.length) {

                    for (let i = 0; this.houses[i].id < this.houses.length; i++) {
    
                        this.newHouses.push(this.houses[i].id);
                    }
                } else return 

        },
        // Här produceras det två nya zombies varje runda tills att inga människor finns kvar i husen.
        continueGame() {
            let o = Math.floor(Math.random() * this.houses.length + 1);
            let m = Math.floor(Math.random() * this.houses.length + 1);
            this.selected.push(o, m);

            // Kollar om alla nummer som finns i newHouses finns i selected. Jag var tvungen att lägga till includes(100) manuellt, då jag i tidigare steg inte lyckades
            // få newHouses till samma lenght som houses, i detta fall blir det endast 1-99 i newHouses men 100 ska även vara med. Men med hjälp av includes(100)
            // så blir det korrekt, då selected fortfarande tar nummer 100.
            // Om alla värden finns med så går den in i gameOver metoden, annars fortsätter programmet.
            if (this.newHouses.every(v => this.selected.includes(v)) && this.selected.includes(100)) {
                this.gameOver();
            }
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