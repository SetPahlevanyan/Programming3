function matrixGenerator(matrixSize, grass,grassEater,predator,man,bomb,energyEater) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
         //GrassEater 2

         for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 predator


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }
     

        ///////4 man
 
        for (let i = 0; i < man; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }
            ////////5 bomb
            for (let i = 0; i < bomb; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }
            /////////6 energyEater

            for (let i = 0; i < energyEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }








       
        return matrix
}

let matrix = matrixGenerator(20, 15,13,7,9,8,6)
let side = 30
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var manArr=[]
var bombArr=[]
var energyEaterArr=[]


function setup() {
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if(matrix[y][x] == 2){
                             let grEat = new  GrassEater(x,y)
                             grassEaterArr.push(grEat)
                        }else if(matrix[y][x] ==  3){
                             let pre = new Predator(x,y)
                             predatorArr.push(pre)
                        }
                        else if(matrix[y][x] ==  4){
                                let m = new Man(x,y)
                                manArr.push(m)
                           }
                           else if(matrix[y][x] ==  5){
                                let bo = new Bomb(x,y)
                                bombArr.push(bo)
                           }else if(matrix[y][x] == 6 ){
                                let enE = new EnergyEater(x,y)
                                energyEaterArr.push(enE)
                           }


                             


                }
        }

}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                fill("green")
                        } else if(matrix[y][x] == 2){
                                fill ("yellow")
                        }else if(matrix[y][x] == 3){
                                fill ("red")
                        }else if(matrix[y][x] == 4){
                                fill ("orange")
                        }else if(matrix[y][x] == 5){
                                fill ("black")
                        }
                        else if(matrix[y][x] == 6){
                                fill ("pink")
                        }
                        else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)

                }
        }



                for (let i in grassArr) {
                        grassArr[i].mul()
                }


                for(let i in grassEaterArr){
                        grassEaterArr[i].eat()
                }

             

                for(let i in predatorArr){
                        predatorArr[i].eat()
                }

                for(let i in manArr){
                        manArr[i].eat()
                }
                for(let i in bombArr){
                        bombArr[i].eat()
                }
                for(let i in energyEaterArr){
                        energyEaterArr[i].eat()
                }
                
}
