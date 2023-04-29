var express= require("express")
 var app=express()
 var server = require("http").Server(app)
 var io=require("socket.io")(server)
 var fs = require("fs")
const { kill } = require('process');



 
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
predator = require("./predator")
man= require("./man")
bomb= require("./bomb")
Energyeater = require("./energyEater")

//
function createobject() {

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
    
                if (matrix[y][x] == 1) {
                    let gr = new Grass(x, y);
                    grassArr.push(gr);
                }
                else if (matrix[y][x] == 2) {
                    let eater = new GrassEater(x, y);
                    grassEaterArr.push(eater);
                }
                else if (matrix[y][x] == 3) {
                    let pre = new predator(x, y);
                    predatorArr.push(pre);
                }
                else if (matrix[y][x] == 4) {
                    let ma = new man(x, y);
                    manArr.push(ma);
                }
                else if (matrix[y][x] == 5) {
                    let bo = new bomb(x, y);
                    bombArr.push(bo);
                }
                else if (matrix[y][x] == 6) {
                    let ater = new Energyeater(x, y);
                    energyEaterArr.push(ater);
                }
            }
        }
        io.sockets.emit('send matrix', matrix)
    
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

setInterval(game,600)


var weath;

function Winter() {
    weath = "winter";
    io.sockets.emit('Winter', weath);
}

function Summer() {
    weath = "summer";
    io.sockets.emit('Summer', weath);
}

function Spring() {
    weath = "spring";
    io.sockets.emit('Spring', weath);
}
function Autumn() {
    weath = "autumn";
    io.sockets.emit('Autumn', weath);
}

function Kill() {
        grassArr = [];
        grassEaterArr = [];
        predatorArr= [];
        manArr = [];
        bombArr = [];
        energyEaterArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
        io.sockets.emit("send matrix", matrix);
    }

    function AddGrass() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1;
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddGrassEater() {
        let count = 0;
        for (var i = 0; i < 50; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (count < 7) {
                if (i < 30) {
                    if (matrix[y][x] == 0) {
                        count++;
                        matrix[y][x] = 2;
                        var grEater = new GrassEater(x, y);
                        grassEaterArr.push(grEater);
                    }
    
                } else if (i >= 30) {
                    if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                        count++;
                        matrix[y][x] = 2;
                        var grEater = new GrassEater(x, y);
                        grassEaterArr.push(grEater);
                    }
                }
            }
    
    
        }
    
        io.sockets.emit("send matrix", matrix);
    }
    function AddPredator() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3;
                var pr = new predator(x, y);
                predatorArr.push(pr);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddMan() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4;
                var ma = new man(x, y);
                manArr.push(ma);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    
    function AddBomb() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                var bo = new bomb(x, y);
                bombArr.push(bo);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    function AddEnergyeater() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 6;
                var ene = new Energyeater(x, y);
                energyEaterArr.push(ene);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }







    io.on('connection', function (socket) {
         createobject();
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);
        socket.on("addGrass", AddGrass);
        socket.on("addGrassEater", AddGrassEater);
        socket.on("killAll", Kill);
        socket.on("addMan", AddMan);
        socket.on("addPredator", AddPredator);
        socket.on("addBomb", AddBomb);
        socket.on("addEnergyeater", AddEnergyeater);
})

var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.man = manArr.length;
    statistics.bomb = bombArr.length;
    statistics.energyEater = energyEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000);
