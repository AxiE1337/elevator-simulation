<script setup lang="ts">
defineProps<{
  direction: number
  to: number
  duration: number
  elevatorState: string
}>()
</script>

<template>
  <div
    class="elevator"
    :style="{
      bottom: `${to * 150}px`,
      transitionDuration: `${duration}s`,
    }"
  >
    <div
      class="indicators"
      :style="{
        backgroundColor: `${
          elevatorState === 'waiting' ? '#A7D2CB' : '#EEEEEE'
        }`,
        color: `${elevatorState === 'waiting' ? 'white' : 'black'}`,
      }"
    >
      <p v-if="elevatorState === 'going'">{{ 'to floor ' + (to + 1) }}</p>
      <p v-if="elevatorState !== 'going'">{{ elevatorState }}</p>
      <p class="arrow" v-if="elevatorState === 'going'">
        {{ direction > 0 ? '🠕' : '🠗' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.elevator {
  width: 100px;
  height: 150px;
  border: 1px solid black;
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #eeeeee;
  animation: ease-in-out;
}
.indicators {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.arrow {
  font-size: 2rem;
  align-self: center;
}
</style>
