var express= require("express")
 var app=express()
 var server = require("http").Server(app)
 var io=require("socket.io")(server)
 var fs = require("fs")
//   const { kill } = require('process');
 
 app.use(express.static("."))

 app.get("/",function(req,res){
     res.redirect("index.html")
  })
  server.listen(3000,function(){
      console.log("server is run");
  })

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

 matrix = matrixGenerator(20, 15,13,7,9,8,6)


 io.sockets.emit("send matrix",matrix)
// array
grassArr = []
grassEaterArr = []
predatorArr = []
manArr=[]
bombArr=[]
energyEaterArr=[]
//moduls
Grass= require("./grass")
GrassEater = require("./grassEater")
Predator= require("./predator")
Man= require("./man")
Bomb= require("./bomb")
EnergyEater = require("./energyEater")

//object generation

function createobject(){
       
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
    

    io.sockets.emit("send matrix",matrix)
}



    function game(){
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
        io.sockets.emit("send matrix",matrix) 
    }

setInterval(game,500)


io.on("connection",function(){
        createobject()
})

// function Kill() {
//         grassArr = [];
//         grassEaterArr = [];
//         predatorArr= [];
//         manArr = [];
//         bombArr = [];
//         energyEaterArr = [];
//         for (var y = 0; y < matrix.length; y++) {
//             for (var x = 0; x < matrix[y].length; x++) {
//                 matrix[y][x] = 0;
//             }
//         }
//         io.sockets.emit("send matrix", matrix);
//     }









// io.on('connection', function (socket) {
//     createObject();
//     socket.on("spring", Spring);
//     socket.on("summer", Summer);
//     socket.on("autumn", Autumn);
//     socket.on("winter", Winter);
//     socket.on("killAll", Kill);
// })

// var statistics = {};
// setInterval(function () {
//     statistics.grass = grassArr.length;
//     statistics.grassEater = grassEaterArr.length;
//     statistics.predator = predatorArr.length;
//     statistics.man = manArr.length;
//     statistics.bomb = bombarr.length;
//     statistics.energyEater = energyEaterArr.length;
//     fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
//     })
// }, 1000);
