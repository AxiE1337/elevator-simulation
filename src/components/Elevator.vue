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
      backgroundColor: `${elevatorState === 'waiting' ? 'blue' : ''}`,
    }"
  >
    <p v-if="elevatorState === 'going'">{{ 'to floor ' + (to + 1) }}</p>
    <p v-if="elevatorState !== 'going'">{{ elevatorState }}</p>
    <p v-if="elevatorState === 'going'">{{ direction > 0 ? 'up' : 'down' }}</p>
  </div>
</template>

<style scoped>
.elevator {
  width: 100px;
  height: 150px;
  border: 1px solid black;
  position: absolute;
  transition-duration: 1s;
}
</style>
