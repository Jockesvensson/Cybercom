<template>
    <div class="container">
        <div class="welcome-wrapper">Välkommen till <span v-for="(item, index) in bingoText"
                                v-bind:key="index"
                                v-bind:style="{
                                color: colors[index % colors.length]}"
                                class="text"
                                >{{item}}</span></div>
        <div class="name-wrapper">
            Fyll i ditt namn: <input @keyup.enter="playBingo" v-model="playerName" class="name-input" type="text">
        </div>
        <!-- <div class="">
            Fyll på med pengar: <input v-model="startCash"> kr 
        </div> -->
        <div class="play-bingo-wrapper"><button @click="playBingo()" class="btn-play-bingo">Gå vidare till Bingon</button></div>
    </div>
</template>

<script>
export default {
    name: 'startBingo',
    data() {
        return {
            playerName: '',
            startCash: '',
            bingoText: ['B', 'I', 'N', 'G', 'O'],
            colors: ['red', 'gold', 'teal', 'purple', 'green'],
        }
    },
    methods: {
        playBingo() {
            this.$store.dispatch('updatePlayerName', {
                updatedPlayerName: this.playerName
            })
            this.$store.dispatch('updatePlayerCash', {
                updatedPlayerCash: this.startCash
            })
            
            this.$router.push({name: 'Bingo'})
        }
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
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
}

.welcome-wrapper {
    font-size: 30px;
}

.text {
    font-size: 40px;
}

.name-wrapper {
    margin-top: 40px;
}

input[type=text] {
  width: 20%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

.play-bingo-wrapper {
    margin-top: 20px;
}

.btn-play-bingo {
    height: 40px;
    width: 150px;
    border-radius: 8px;
    border: 1px solid green;
    color: green;
}

</style>