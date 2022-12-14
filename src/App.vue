<script setup lang="ts">
import { ref } from 'vue'
import { convertPositive } from './helpers/convertNumber'
import Floor from './components/floor.vue'
import Elevator from './components/elevator.vue'

const floorState = ref<number>(1) // whitch floor to go on
const directionState = ref<number>(1) // direction positive up negative down
const durationState = ref<number>(1) // seconds
const elevatorState = ref<string>('idle') // what elevator is doing rn
const elevatorQueue = ref<number[]>([]) // a list of floors elevator has to visit

const floors: number[] = [1, 2, 3, 4, 5].reverse() // how many floors

const elevatorHandler = (floorIndex: number) =>
  new Promise((resolve, reject) => {
    elevatorState.value = 'going'
    const prev = floorState.value
    floorState.value = floorIndex
    directionState.value = floorIndex - prev
    durationState.value = convertPositive(prev - floorIndex)
    setTimeout(() => {
      elevatorState.value = 'waiting'
      setTimeout(() => {
        const index = elevatorQueue.value.findIndex((floor) => {
          return floor === floorIndex
        })
        elevatorQueue.value.splice(index, 1)
        resolve((elevatorState.value = 'idle'))
        if (elevatorQueue.value.length > 0) {
          promises()
        }
      }, 3000)
    }, durationState.value * 1000)
  })

const floorHandler = async (floorIndex: number) => {
  elevatorQueue.value.push(floorIndex)
  if (elevatorQueue.value.length === 1) {
    promises()
  }
}
const promises = async () => {
  await elevatorHandler(elevatorQueue.value[0])
}
</script>

<template>
  <div class="app">
    <div class="floors">
      <Floor
        v-for="floor in floors"
        :floor="floor"
        :isActive="elevatorQueue.includes(floor)"
        @click="floorHandler(floor)"
      />
      <Elevator
        :direction="directionState"
        :to="floorState - 1"
        :duration="durationState"
        :elevatorState="elevatorState"
      />
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.floors {
  position: relative;
}
</style>
