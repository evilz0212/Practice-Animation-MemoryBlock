<template lang="pug">
.infos
    h2 Practice
    h1 Memory<br>Block
    h3.status -
.blocks
    .row
        .block.block1
        .block.block2
    .row
        .block.block3
        .block.block4
    .row
        .inputStatus
</template>

<script setup>
</script>

<style lang="sass" scoped>
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
</style>