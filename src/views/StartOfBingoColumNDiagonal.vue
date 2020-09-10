for (let i = 0; i < 25; i+=5) {
            this.bingoColumnOne.push(this.firstTest[i].id)
        }
        for (let i = 1; i < 25; i+=5) {
            this.bingoColumnTwo.push(this.firstTest[i].id)
        }
        for (let i = 2; i < 25; i+=5) {
            this.bingoColumnThree.push(this.firstTest[i].id)
        }
        for (let i = 3; i < 25; i+=5) {
            this.bingoColumnFour.push(this.firstTest[i].id)
        }
        for (let i = 4; i < 25; i+=5) {
            this.bingoColumnFive.push(this.firstTest[i].id)
        }

        for (let i = 0; i < 25; i+=5) {
            this.bingoColumnSix.push(this.secondTest[i].id)
        }
        for (let i = 1; i < 25; i+=5) {
            this.bingoColumnSeven.push(this.secondTest[i].id)
        }
        for (let i = 2; i < 25; i+=5) {
            this.bingoColumnEight.push(this.secondTest[i].id)
        }
        for (let i = 3; i < 25; i+=5) {
            this.bingoColumnNine.push(this.secondTest[i].id)
        }
        for (let i = 4; i < 25; i+=5) {
            this.bingoColumnTen.push(this.secondTest[i].id)
        }

        for (let i = 0; i < 25; i+=5) {
            this.bingoColumnEleven.push(this.thirdTest[i].id)
        }
        for (let i = 1; i < 25; i+=5) {
            this.bingoColumnTwelve.push(this.thirdTest[i].id)
        }
        for (let i = 2; i < 25; i+=5) {
            this.bingoColumnThirteen.push(this.thirdTest[i].id)
        }
        for (let i = 3; i < 25; i+=5) {
            this.bingoColumnFourteen.push(this.thirdTest[i].id)
        }
        for (let i = 4; i < 25; i+=5) {
            this.bingoColumnFifteen.push(this.thirdTest[i].id)
        }

        for (let i = 0; i < 25; i+=6) {
            this.bingoDiagonalOne.push(this.firstTest[i].id)
        }
        for (let i = 4; i < 22; i+=4) {
            this.bingoDiagonalTwo.push(this.firstTest[i].id)
        }
        for (let i = 0; i < 25; i+=6) {
            this.bingoDiagonalThree.push(this.secondTest[i].id)
        }
        for (let i = 4; i < 22; i+=4) {
            this.bingoDiagonalFour.push(this.secondTest[i].id)
        }
        for (let i = 0; i < 25; i+=6) {
            this.bingoDiagonalFive.push(this.thirdTest[i].id)
        }
        for (let i = 4; i < 22; i+=4) {
            this.bingoDiagonalSix.push(this.thirdTest[i].id)
        }



firstBingoColumn: false,
secondBingoColumn: false,
thirdBingoColumn: false,
fourBingoColumn: false,
fiveBingoColumn: false,
sixBingoColumn: false,
sevenBingoColumn: false,
eightBingoColumn: false,
nineBingoColumn: false,
tenBingoColumn: false,
elevenBingoColumn: false,
twelveBingoColumn: false,
thirteenBingoColumn: false,
fourteenhBingoColumn: false,
fiftenBingoColumn: false,
firstBingoDiagonal: false,
secondBingoDiagonal: false,
thirdBingoDiagonal: false,
fourBingoDiagonal: false,
fiveBingoDiagonal: false,
sixBingoDiagonal: false,


bingoDiagonalOne: [],
bingoDiagonalTwo: [],
bingoDiagonalThree: [],
bingoDiagonalFour: [],
bingoDiagonalFive: [],
bingoDiagonalSix: [],
bingoColumnOne: [],
bingoColumnTwo: [],
bingoColumnThree: [],
bingoColumnFour: [],
bingoColumnFive: [],
bingoColumnSix: [],
bingoColumnSeven: [],
bingoColumnEight: [],
bingoColumnNine: [],
bingoColumnTen: [],
bingoColumnEleven: [],
bingoColumnTwelve: [],
bingoColumnThirteen: [],
bingoColumnFourteen: [],
bingoColumnFifteen: [],

showBingoOneMessageColumn: false,
showBingoOneMessageDiagonal: false,

bingoOneColumn: [],
bingoOneDiagonal: [],

<div v-show="showBingoOneMessageColumn" class="">DU FICK BINGO PÅ COLUMN {{bingoOneColumn[0]}}</div>
<div v-show="showBingoOneMessageDiagonal" class="">DU FICK BINGO PÅ DIAGONALEN {{bingoOneDiagonal[0]}}</div>




this.checkFirstColumnBingo();
this.checkFirstDiagonalBingo();



checkFirstColumnBingo() {
            if (this.bingoColumnOne.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(1);
                // this.firstBingo = true;
                this.firstBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnTwo.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(2);
                // this.firstBingo = true;
                this.secondBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnThree.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(3);
                // this.firstBingo = true;
                this.thirdBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnFour.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(4);
                // this.firstBingo = true;
                this.fourBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnFive.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(5);
                // this.firstBingo = true;
                this.fiveBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnSix.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(1);
                // this.firstBingo = true;
                this.sixBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnSeven.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(2);
                // this.firstBingo = true;
                this.sevenBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnEight.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(3);
                // this.firstBingo = true;
                this.eightBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnNine.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(4);
                // this.firstBingo = true;
                this.nineBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnTen.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(5);
                // this.firstBingo = true;
                this.tenBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnEleven.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(1);
                // this.firstBingo = true;
                this.elevenBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnTwelve.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(2);
                // this.firstBingo = true;
                this.twelveBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnThirteen.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(3);
                // this.firstBingo = true;
                this.thirteenBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnFourteen.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(4);
                // this.firstBingo = true;
                this.fourteenhBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            if (this.bingoColumnFifteen.every(v => this.selected.includes(v))) {
                this.bingoOneColumn.push(5);
                // this.firstBingo = true;
                this.fiftenBingoColumn = true;
                this.showBingoOneMessageColumn = true;
                this.firstBingo = true;
            }
            // this.firstBingo = true;
        },
        checkFirstDiagonalBingo() {
            if (this.bingoDiagonalOne.every(v => this.selected.includes(v))) {
                this.bingoOneDiagonal.push(1);
                // this.firstBingo = true;
                this.firstBingoDiagonal = true;
                this.showBingoOneMessageDiagonal = true;
                this.firstBingo = true;
            }
            if (this.bingoDiagonalOne.every(v => this.selected.includes(v))) {
                this.bingoOneDiagonal.push(2);
                // this.firstBingo = true;
                this.firstBingoDiagonal = true;
                this.showBingoOneMessageDiagonal = true;
                this.firstBingo = true;
            }
            if (this.bingoDiagonalOne.every(v => this.selected.includes(v))) {
                this.bingoOneDiagonal.push(3);
                // this.firstBingo = true;
                this.firstBingoDiagonal = true;
                this.showBingoOneMessageDiagonal = true;
                this.firstBingo = true;
            }
            if (this.bingoDiagonalOne.every(v => this.selected.includes(v))) {
                this.bingoOneDiagonal.push(4);
                // this.firstBingo = true;
                this.firstBingoDiagonal = true;
                this.showBingoOneMessageDiagonal = true;
                this.firstBingo = true;
            }
            if (this.bingoDiagonalOne.every(v => this.selected.includes(v))) {
                this.bingoOneDiagonal.push(5);
                // this.firstBingo = true;
                this.firstBingoDiagonal = true;
                this.showBingoOneMessageDiagonal = true;
                this.firstBingo = true;
            }
            if (this.bingoDiagonalOne.every(v => this.selected.includes(v))) {
                this.bingoOneDiagonal.push(6);
                // this.firstBingo = true;
                this.firstBingoDiagonal = true;
                this.showBingoOneMessageDiagonal = true;
                this.firstBingo = true;
            }
        },