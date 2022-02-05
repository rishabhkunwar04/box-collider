let paintbox = document.getElementById('paintbox')
let context = paintbox.getContext('2d')

let gameOn=true
let playerSpeed=5


class Box {
  constructor(size, color) {
    this.size = size
    this.color = color
    this.x = 0
    this.y = 0
  }
}

class Player extends Box {
  constructor() {
    super(50, 'blue')
    this.x = 0
    this.y = 225
    this.speed=0
  }
  move()
  {
    this.x+=this.speed

    if(this.x+this.size>500)
    {
      this.speed=-Math.abs(this.speed)
    }
    if(this.x<0)
    {
      this.speed=Math.abs(this.speed)
    }
  }

  }


class Enemy extends Box {
  constructor(speed) {
    super(50, 'red')
    this.speed=speed
  
  }

  move(){

    this.y+=this.speed  //move boxes down
    if(this.y+this.size>500)//move boxes up if box cross lower boundry
    {
      this.speed=-Math.abs(this.speed)
    }
    if(this.y<0)//move boxes down if box cross lower boundry
    {
      this.speed=Math.abs(this.speed)
    }

  } 
}





let player = new Player()
let e1 = new Enemy(3)
let e2 = new Enemy(4)
let e3 = new Enemy(8)
e1.x = 100
e2.x = 233
e3.x = 366

//checking for Collison of boxes

function isCollided(e,p) {
  let x1 = p.x, x2 = p.x + p.size, y1 = e.x, y2 = e.x + e.size;
    let X1 = p.y, X2 = p.y + p.size, Y1 = e.y, Y2 = e.y + e.size;
    if(((x1 >= y1 && x1 <= y2) ||(x2 >= y1 && x2 <= y2) ||(y1 >= x1 && y1 <= x2) ||(y2 >= x1 && y2 <= x2)) && 
    ((X1 >= Y1 && X1 <= Y2) ||(X2 >= Y1 && X2 <= Y2) ||(Y1 >= X1 && Y1 <= X2) ||(Y2 >= X1 && Y2 <= X2)))
    {
        return true;
    }
    return false;
  
}



paintbox.addEventListener('mousedown', () => {   //addEventListner(event,function(){}) ,on event invoke the function 
  player.speed = playerSpeed
})

paintbox.addEventListener('mouseup', () => {
  player.speed = 0
})




function drawBox(box) {
  context.fillStyle = box.color
  context.fillRect(box.x, box.y, box.size, box.size)
}

function Gameloop(){
  if(!gameOn){
    return;
}

  context.clearRect(0,0,500,500)
  //it will draw all boxes in canvas
  drawBox(e1)
  drawBox(e2)
  drawBox(e3)
  drawBox(player)

  //move all boxes
  e1.move()
  e2.move()
  e3.move()
  player.move()

  //
  if (isCollided(e1, player) || isCollided(e2, player) || isCollided(e3, player)) {
    gameOn = false  
    window.alert('Game Over')
  }

  //
  window.requestAnimationFrame(Gameloop)//reference:-css tricks,
                                        //it make animation smoother better alternative of setTimeout()
                                        //we can even stop it,let id=requestAnimationFrame()
                                        //                      cancelAnimationFrame(id)

}
Gameloop()