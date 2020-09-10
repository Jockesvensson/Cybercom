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
                            <div v-for="item in secondBingoCardOne" :key="item.id" :class=" 
                            {highlight:selected.includes(item.id)}" class="house-wrapper">{{item.id}}</div>
                        </div>
                        <div class="test-container bingo-container">
                            <div v-for="item in secondBingoCardTwo" :key="item.id" :class=" 
                            {highlight:selected.includes(item.id)}" class="house-wrapper">{{item.id}}</div>
                        </div>
                        <div class="test-container bingo-container">
                            <div v-for="item in secondBingoCardThree" :key="item.id" :class=" 
                            {highlight:selected.includes(item.id)}" class="house-wrapper">{{item.id}}</div>
                        </div>
                    </div>


secondBingoCardOne: [],
            secondBingoCardTwo: [],
            secondBingoCardThree: [],


//Någon form av start för ytterligare en till bingobricka
        // for (var i = 0; i < 5; i++) {
        //     this.secondBingoCardOne.push(this.firstNumberColumnTwo[i]);
        //     this.secondBingoCardOne.push(this.secondNumberColumnTwo[i]);
        //     this.secondBingoCardOne.push(this.thirdNumberColumnTwo[i]);
        //     this.secondBingoCardOne.push(this.fourthNumberColumnTwo[i]);
        //     this.secondBingoCardOne.push(this.fifthNumberColumnTwo[i]);
        // }

        // for (var i = 5; i < 10; i++) {
        //     this.secondBingoCardTwo.push(this.firstNumberColumnTwo[i]);
        //     this.secondBingoCardTwo.push(this.secondNumberColumnTwo[i]);
        //     this.secondBingoCardTwo.push(this.thirdNumberColumnTwo[i]);
        //     this.secondBingoCardTwo.push(this.fourthNumberColumnTwo[i]);
        //     this.secondBingoCardTwo.push(this.fifthNumberColumnTwo[i]);
        // }

        // for (var i = 10; i < 15; i++) {
        //     this.secondBingoCardThree.push(this.firstNumberColumnTwo[i]);
        //     this.secondBingoCardThree.push(this.secondNumberColumnTwo[i]);
        //     this.secondBingoCardThree.push(this.thirdNumberColumnTwo[i]);
        //     this.secondBingoCardThree.push(this.fourthNumberColumnTwo[i]);
        //     this.secondBingoCardThree.push(this.fifthNumberColumnTwo[i]);
        // }

//För ytteligare en bingobricka
        // firstNumberColumnTwo() {
        //     return this.firstColumn.sort(() => Math.random() - 0.5);
        // },
        // secondNumberColumnTwo() {
        //     return this.secondColumn.sort(() => Math.random() - 0.5);
        // },
        // thirdNumberColumnTwo() {
        //     return this.thirdColumn.sort(() => Math.random() - 0.5);
        // },
        // fourthNumberColumnTwo() {
        //     return this.fourthColumn.sort(() => Math.random() - 0.5);
        // },
        // fifthNumberColumnTwo() {
        //     return this.fifthColumn.sort(() => Math.random() - 0.5);
        // },