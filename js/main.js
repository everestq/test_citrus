
let fractionWidth = 6
let fractionHeight = 4

let fieldWidth = document.documentElement.clientWidth
let fieldHeight = window.innerHeight

let deltaWidth = fieldWidth / fractionWidth
let deltaHeight = fieldHeight / fractionHeight


const app = new PIXI.Application({
  width: fieldWidth,
  height: fieldHeight,
  backgroundColor: 0x87CEEB
})


document.body.appendChild(app.view)

app.view.style.position = 'absolute';
app.view.style.left = 0;
app.view.style.top = 0;


for (let index = 1; index < fractionWidth; index++) {
  let line = new PIXI.Graphics()

  line.lineStyle(1, 0x000000, 1)
  line.moveTo(0, 0)
  line.lineTo(0, fieldHeight)
  line.x = fieldWidth / fractionWidth * index
  line.y = 0

  app.stage.addChild(line)
}

for (let index = 1; index < fractionHeight; index++) {
  let line = new PIXI.Graphics()

  line.lineStyle(1, 0x000000, 1)
  line.moveTo(0, 0)
  line.lineTo(fieldWidth, 0)
  line.x = 0
  line.y = fieldHeight / fractionHeight * index

  app.stage.addChild(line)
}

const lines = [
  [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2], [3, 3, 3, 3, 3, 3],
  [1, 2, 1, 2, 1, 2], [0, 1, 0, 1, 0, 1], [2, 3, 2, 3, 2, 3], [2, 1, 2, 1, 2, 1],
  [1, 0, 1, 0, 1, 0], [3, 2, 3, 2, 3, 2], [0, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1],
  [2, 3, 3, 3, 3, 2], [3, 2, 2, 2, 2, 3], [3, 3, 0, 0, 3, 3], [0, 0, 1, 1, 0, 0],
  [0, 0, 3, 3, 0, 0], [3, 3, 2, 2, 3, 3], [1, 2, 3, 3, 2, 1], [2, 1, 0, 0, 1, 2]
]

function randomColor() {
  const r = Math.floor(Math.random() * (256))
  const g = Math.floor(Math.random() * (256))
  const b = Math.floor(Math.random() * (256))
  return "0x" + r.toString(16) + g.toString(16) + b.toString(16)
}

function renderLine(arr) {
  const colorLine = randomColor()

  arr.forEach((item, idx) => {

    if (Array.isArray(item)) {
      renderLine(item)
    } else {
      const line = new PIXI.Graphics()
      line.lineStyle(2, colorLine, 1)
      line.moveTo(idx * deltaWidth, item * deltaHeight)
      line.lineTo((idx + 1) * deltaWidth, arr[idx + 1] * deltaHeight)
      line.x = deltaWidth / 2
      line.y = deltaHeight / 2
      app.stage.addChild(line)
    }
  })

}

renderLine(lines)


function resize() {
  let resizeWidth = document.documentElement.clientWidth
  let resizeHeight = window.innerHeight

  app.view.style.position = 'absolute';
  app.view.style.width = resizeWidth + 'px';
  app.view.style.height = resizeHeight + 'px';

}
window.addEventListener('resize', resize)
