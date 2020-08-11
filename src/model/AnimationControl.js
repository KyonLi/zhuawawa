'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var PIXI = require('pixi.js')
var AnimationControl = /** @class */ (function() {
  function AnimationControl(instance) {
    var _this = this
    this.canvasId = 'canvas'
    this.imgHead = new PIXI.Sprite()
    this.imgPawCatch = new PIXI.Sprite()
    this.imgPawRelease = new PIXI.Sprite()
    this.catchedBaby = undefined
    this.catchedIndex = undefined
    this.babies = []
    this.babiesTaken = []
    this.inter = 0
    this.babyWidth = 0
    this.catching = false
    this.uplimit = -80
    this.downlimit = 40
    this.switchPaw = -10
    this.ratio = 0
    this.movingDown = false
    this.instance = instance
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerWidth * 1100 / 697,
      transparent: true,
      resolution: 1
    })
    this.app.view.id = this.canvasId
    this.instance.$el.insertBefore(this.app.view, this.instance.$el.childNodes[0])
    this.loader = new PIXI.Loader()
    this.loader.add(require('../assets/game/baby_0.png'))
      .add(require('../assets/game/baby_1.png'))
      .add(require('../assets/game/baby_2.png'))
      .add(require('../assets/game/p2_claw_0.png'))
      .add(require('../assets/game/p2_claw_1.png'))
      .add(require('../assets/game/p2_top.png'))
      .add(require('../assets/game/p2_wood_1.png'))
      .add(require('../assets/game/p2_woodhead.png'))
      .add(require('../assets/game/bg.png'))
      .load(function() {
        _this.setup()
      })
  }

  AnimationControl.prototype.setup = function() {
    var _this = this
    var resource = this.loader.resources[require('../assets/game/p2_top.png')]
    var img = new PIXI.Sprite(resource.texture)
    this.ratio = this.app.view.width / img.width
    // 背景
    var resourceBg = this.loader.resources[require('../assets/game/bg.png')]
    var imgBg = new PIXI.Sprite(resourceBg.texture)
    imgBg.width = this.app.view.width
    imgBg.height = this.app.view.height
    imgBg.x = 0
    imgBg.y = 0
    this.app.stage.addChild(imgBg)
    // 移动杆
    var resourceHead = this.loader.resources[require('../assets/game/p2_wood_1.png')]
    var imgHead = new PIXI.Sprite(resourceHead.texture)
    imgHead.width = imgHead.width * this.ratio
    imgHead.height = imgHead.height * this.ratio
    imgHead.y = this.uplimit
    imgHead.x = (this.app.view.width - imgHead.width) / 2
    this.app.stage.addChild(imgHead)
    this.imgHead = imgHead
    //爪子
    // 抓住
    var resourcdPawCatch = this.loader.resources[require('../assets/game/p2_claw_0.png')]
    var imgPawCatch = new PIXI.Sprite(resourcdPawCatch.texture)
    imgPawCatch.width = imgPawCatch.width * this.ratio
    imgPawCatch.height = imgPawCatch.height * this.ratio
    imgPawCatch.x = (this.app.view.width - imgPawCatch.width) / 2
    imgPawCatch.y = imgHead.height + imgHead.y
    this.app.stage.addChild(imgPawCatch)
    this.imgPawCatch = imgPawCatch
    // 没抓住
    var resourcdPawRelease = this.loader.resources[require('../assets/game/p2_claw_1.png')]
    var imgPawRelease = new PIXI.Sprite(resourcdPawRelease.texture)
    imgPawRelease.width = imgPawRelease.width * this.ratio
    imgPawRelease.height = imgPawRelease.height * this.ratio
    imgPawRelease.x = (this.app.view.width - imgPawRelease.width) / 2
    imgPawRelease.y = imgHead.height + imgHead.y
    imgPawRelease.visible = false
    this.app.stage.addChild(imgPawRelease)
    this.imgPawRelease = imgPawRelease
    //移动娃娃
    var resourceBaby = this.loader.resources[require('../assets/game/baby_0.png')]
    var imgBaby = new PIXI.Sprite(resourceBaby.texture)
    imgBaby.width = imgBaby.width * this.ratio
    imgBaby.height = imgBaby.height * this.ratio
    this.inter = (this.app.view.width - imgBaby.width * 3) / 2
    this.babyWidth = imgBaby.width
    imgBaby.x = 0
    imgBaby.y = (829 - 267) * this.ratio
    this.app.stage.addChild(imgBaby)
    this.babies.push(imgBaby)
    this.babiesTaken.push(false)
    resourceBaby = this.loader.resources[require('../assets/game/baby_1.png')]
    imgBaby = new PIXI.Sprite(resourceBaby.texture)
    imgBaby.width = imgBaby.width * this.ratio
    imgBaby.height = imgBaby.height * this.ratio
    imgBaby.x = this.babyWidth + this.inter + (this.babyWidth - imgBaby.width) / 2
    imgBaby.y = (829 - 267) * this.ratio
    this.app.stage.addChild(imgBaby)
    this.babies.push(imgBaby)
    this.babiesTaken.push(false)
    resourceBaby = this.loader.resources[require('../assets/game/baby_2.png')]
    imgBaby = new PIXI.Sprite(resourceBaby.texture)
    imgBaby.width = imgBaby.width * this.ratio
    imgBaby.height = imgBaby.height * this.ratio
    imgBaby.x = (this.babyWidth + this.inter) * 2 + (this.babyWidth - imgBaby.width) / 2
    imgBaby.y = (829 - 267) * this.ratio
    this.app.stage.addChild(imgBaby)
    this.babies.push(imgBaby)
    this.babiesTaken.push(false)
    resourceBaby = this.loader.resources[require('../assets/game/baby_0.png')]
    imgBaby = new PIXI.Sprite(resourceBaby.texture)
    imgBaby.width = imgBaby.width * this.ratio
    imgBaby.height = imgBaby.height * this.ratio
    imgBaby.x = (this.babyWidth + this.inter) * 3 + (this.babyWidth - imgBaby.width) / 2
    imgBaby.y = (829 - 267) * this.ratio
    this.app.stage.addChild(imgBaby)
    this.babies.push(imgBaby)
    this.babiesTaken.push(false)
    resourceBaby = this.loader.resources[require('../assets/game/baby_1.png')]
    imgBaby = new PIXI.Sprite(resourceBaby.texture)
    imgBaby.width = imgBaby.width * this.ratio
    imgBaby.height = imgBaby.height * this.ratio
    imgBaby.x = (this.babyWidth + this.inter) * 4 + (this.babyWidth - imgBaby.width) / 2
    imgBaby.y = (829 - 267) * this.ratio
    this.app.stage.addChild(imgBaby)
    this.babies.push(imgBaby)
    this.babiesTaken.push(false)
    resourceBaby = this.loader.resources[require('../assets/game/baby_2.png')]
    imgBaby = new PIXI.Sprite(resourceBaby.texture)
    imgBaby.width = imgBaby.width * this.ratio
    imgBaby.height = imgBaby.height * this.ratio
    imgBaby.x = (this.babyWidth + this.inter) * 5 + (this.babyWidth - imgBaby.width) / 2
    imgBaby.y = (829 - 267) * this.ratio
    this.app.stage.addChild(imgBaby)
    this.babies.push(imgBaby)
    this.babiesTaken.push(false)
    // 背景图
    img.width = this.app.view.width
    img.height = this.app.view.height
    this.app.stage.addChild(img)
    // 顶部固定
    resource = this.loader.resources[require('../assets/game/p2_woodhead.png')]
    img = new PIXI.Sprite(resource.texture)
    img.width = img.width * this.ratio
    img.height = img.height * this.ratio
    img.x = (this.app.view.width - img.width) / 2
    img.y = 140 * this.ratio
    this.app.stage.addChild(img)
    this.app.ticker.add(function(delta) {
      return _this.gameLoop(delta)
    })
  }
  AnimationControl.prototype.start = function() {
    this.catching = true
    this.movingDown = true
  }
  AnimationControl.prototype.catch = function() {
    for (var inx = 0; inx < this.babies.length; ++inx) {
      if (Math.abs(this.babies[inx].y - this.imgPawCatch.y) < 80
        && Math.abs((this.babies[inx].x + this.babies[inx].width / 2) - (this.imgPawCatch.x + this.imgPawCatch.width / 2)) < 50) {
        this.babiesTaken[inx] = true
        this.catchedBaby = this.babies[inx]
        this.catchedIndex = inx
        break
      }
    }
  }
  AnimationControl.prototype.reset = function() {
    this.catchedBaby = undefined
    this.catchedIndex = undefined
    for (var inx = 0; inx < this.babiesTaken.length; ++inx) {
      this.babiesTaken[inx] = false
      this.babies[inx].y = (829 - 267) * this.ratio
      this.babies[inx].x = (this.babyWidth + this.inter) * inx + (this.babyWidth - this.babies[inx].width) / 2
    }
    this.imgPawCatch.visible = true
    this.imgPawRelease.visible = false
    this.imgHead.y = this.uplimit
  }
  AnimationControl.prototype.gameLoop = function() {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    for (var inx = 0; inx < this.babies.length; ++inx) {
      if (!this.babiesTaken[inx]) {
        this.babies[inx].x = this.babies[inx].x + 1
        if (this.babies[inx].x >= (this.babyWidth + this.inter) * 5 + this.inter + (this.babyWidth - this.babies[inx].width) / 2) {
          this.babies[inx].x = -this.babyWidth + (this.babyWidth - this.babies[inx].width) / 2
        }
      }
    }
    if (this.catching) {
      if (this.movingDown) {
        this.imgHead.y = this.imgHead.y + 1
        if (this.imgHead.y >= this.downlimit) {
          // 开始抓娃娃
          this.imgPawRelease.visible = false
          this.imgPawCatch.visible = true
          this.imgPawCatch.y = this.imgHead.height + this.imgHead.y
          this.imgPawRelease.y = this.imgHead.height + this.imgHead.y
          this.movingDown = false
          this.catch()
        } else if (this.imgHead.y >= this.switchPaw) {
          // 开始展开爪子
          this.imgPawRelease.visible = true
          this.imgPawCatch.visible = false
          this.imgPawCatch.y = this.imgHead.height + this.imgHead.y
          this.imgPawRelease.y = this.imgHead.height + this.imgHead.y
        } else {
          this.imgPawCatch.y = this.imgHead.height + this.imgHead.y
          this.imgPawRelease.y = this.imgHead.height + this.imgHead.y
        }
      } else {
        this.imgHead.y = this.imgHead.y - 1
        if (this.imgHead.y >= this.uplimit) {
          this.imgPawCatch.y = this.imgHead.height + this.imgHead.y
          this.imgPawRelease.y = this.imgHead.height + this.imgHead.y
          this.movingDown = false
          if (this.catchedBaby) {
            this.catchedBaby.y = this.imgPawCatch.y + this.imgPawCatch.height - 20
            this.catchedBaby.x = this.imgPawCatch.x - (this.catchedBaby.width - this.imgPawCatch.width) / 2
          }
        } else {
          this.imgPawRelease.visible = false
          this.imgPawCatch.visible = true
          this.catching = false
          this.instance.stop.call(this.instance)
        }
      }
    }
  }
  return AnimationControl
}())
exports.AnimationControl = AnimationControl
