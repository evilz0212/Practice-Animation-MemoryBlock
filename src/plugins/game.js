import Blocks from "./blocks"
import { blockAssign, setAssign, levels } from "/servies/settings.json"

class Game {
    constructor() {
        window.onload = () => {
            this.blocks = new Blocks(blockAssign, setAssign)
        }
        this.levels = levels

        this.currentLevel = 0
        this.playInterval = 400
        this.mode = "waiting"
    }

    // 開始關卡
    startLevel() {
        this.showMessage("Level: " + this.currentLevel)
        this.startGame(this.levels[this.currentLevel])
    }
    // 開始遊戲
    startGame(answer) {
        this.mode = "gamePlay"
        this.answer = answer
        let notes = this.answer.split("")

        this.showStatus("")
        this.timer = setInterval(() => {
            let char = notes.shift()
            if (!notes.length) {
                // 換使用者輸入
                clearInterval(this.timer)
                this.startUserInput()
            }
            this.playNote(char)
        }, this.playInterval)
    }

    // 顯示訊息
    showMessage(message) {
        $(".status").text(message)
    }
    // 顯示回答狀態
    showStatus(tempString) {
        $(".inputStatus").html("")

        // 顯示所有圈圈
        this.answer.split("").forEach((data, index) => {
            var circle = $("<div class='circle'></div>")
            if (index < tempString.length) {
                circle.addClass("current")
            }
            $(".inputStatus").append(circle)
        })

        // 完成！
        if (tempString == this.answer) {
            $(".inputStatus").addClass("corrent")
            this.showMessage("Corrent!")
            setTimeout(() => {
                this.blocks.turnOnAll()
                this.blocks.playSet("corrent")
            }, 500)
        }
        // 尚未輸入
        if (tempString == "") {
            this.blocks.turnOffAll()
        }
        // 輸入錯誤
        if (this.answer.indexOf(tempString) != 0) {
            this.showMessage("Wrong...")
            $(".inputStatus").addClass("wrong")
            this.blocks.turnOnAll()
            this.blocks.playSet("wrong")
        } else {
            $(".inputStatus").removeClass("wrong")
        }
    }

    // 播放音符
    playNote(note) {
        this.blocks.flash(note)
    }

    // 開始輸入模式
    startUserInput() {
        this.userInput = ""
        this.mode = "userInput"
    }

    // 使用者彈奏
    // FIX: 播放期間輸入，播放聲音會不正常
    userSendInput(inputChar) {
        if (this.mode == "userInput") {
            let tempString = this.userInput + inputChar
            this.playNote(inputChar)
            this.showStatus(tempString)

            if (this.answer.indexOf(tempString) == 0) {
                if (this.answer == tempString) {
                    this.currentLevel += 1
                    this.mode = "waiting"
                    setTimeout(() => {
                        this.startLevel()
                    }, 1000)
                }
                this.userInput += inputChar
            } else {
                this.currentLevel = 0
                this.mode = "reset"
                setTimeout(() => {
                    this.startLevel()
                }, 1000)
            }
        }
    }
}

export default new Game()
