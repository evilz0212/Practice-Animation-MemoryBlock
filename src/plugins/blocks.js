export default class Blocks {
    constructor(blockAssign, setAssign) {
        // 音頻模塊（消除 Safari 播放延遲）
        // FIX: 播放延遲（改用 Web Audio API，非H TML5 <audio></audio>）
        const AudioContext = window.AudioContext || window.webkitAudioContext
        const audioCtx = new AudioContext()

        this.allOn = false
        this.blocks = blockAssign.map((data, index) => ({
            name: data.name,
            el: $(data.selector),
            audio: this.getAudioObject(data.pitch),
        }))
        this.soundSets = setAssign.map((data, index) => ({
            name: data.name,
            sets: data.sets.map((pitch) => this.getAudioObject(pitch)),
        }))
    }

    // 取得聲音物件
    getAudioObject(pitch) {
        const audio = new Audio(`sounds/${pitch}.mp3`)
        audio.setAttribute("preload", "auto")
        return audio
    }

    // 閃爍單一方塊 + 聲音
    flash(note) {
        let block = this.blocks.find((data) => data.name == note)
        if (block) {
            block.audio.currentTime = 0
            block.audio.play()
            block.el.addClass("active")
            setTimeout(() => {
                if (this.allOn == false) {
                    block.el.removeClass("active")
                }
            }, 100)
        }
    }

    // 點亮所有方塊
    turnOnAll(note) {
        this.allOn = true
        this.blocks.forEach((data) => {
            data.el.addClass("active")
        })
    }
    // 關掉所有方塊
    turnOffAll(note) {
        this.allOn = false
        this.blocks.forEach((data) => {
            data.el.removeClass("active")
        })
    }

    // 播放序列聲音
    playSet(type) {
        // FIX: 出現非物件錯誤（不明原因）
        console.log(this.soundSets)
        this.soundSets
            .find((set) => set.name == type)
            .sets.forEach((o) => {
                o.currentTime = 0
                o.play()
            })
    }
}
