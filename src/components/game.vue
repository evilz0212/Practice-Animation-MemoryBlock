<template lang="pug">
.infos.fadeIn.animated
    h2 Practice
    h1 Memory<br>Block
    h3.status -
    .startBtn(@click="startGame()") 開始遊戲
.blocks.fadeIn.animated
    .row
        .block.block1(@click="playBlock('1')")
        .block.block2(@click="playBlock('2')")
    .row
        .block.block3(@click="playBlock('3')")
        .block.block4(@click="playBlock('4')")
    .row
        .inputStatus
</template>

<script setup>
import Game from "/@/plugins/game.js";

export function startGame() {
    Game.startLevel();
}

export function playBlock(char) {
    Game.userSendInput(char);
}
</script>

<style lang="sass">
.infos
    position: absolute
    left: 40px
    top: 40px

    color: color(basic-white)

h1
    margin: 0

    font-size: 40px
    letter-spacing: 1px
    line-height: 1.2

h3
    font-weight: 500
    color: color(basic-red)

.row
    +flex

.inputStatus
    margin-top: 10px
    height: 20px

    .circle
        +size(6px)
        display: inline-block
        opacity: 0.3
        background-color: white
        border-radius: 100%
        margin: 5px

        &.correct,.wrong
            opacity: 1

    &.wrong .circle
        background-color: color(block-red)

    &.correct .circle
        background-color: color(block-blue)

.startBtn
    +flex()

    +size(100px, 30px)

    border: 1px solid color(basic-white)
    border-radius: 6px

    &:hover
        color: color(basic-black)
        background-color: color(basic-white)

        cursor: pointer
</style>