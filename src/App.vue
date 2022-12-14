<script setup lang="ts">
import { ref } from 'vue'
import { convertPositive } from './helpers/convertNumber'
import { setStorageItem, getStorageItem } from './helpers/storage'
import Floor from './components/floor.vue'
import Elevator from './components/elevator.vue'

const savedFloor = Number(getStorageItem('data')?.floor) || 1
const savedQueue = getStorageItem('data')?.elevatorQueue || []

const floorState = ref<number>(savedFloor) // whitch floor to go on
const directionState = ref<number>(1) // positive up negative down
const durationState = ref<number>(1) // seconds
const elevatorState = ref<string>('idle') // what elevator is doing rn
const elevatorQueue = ref<number[]>(savedQueue) // a list of floors elevator has to visit

const floors: number[] = [1, 2, 3, 4, 5].reverse() // how many floors

const elevatorHandler = (floorIndex: number) =>
  new Promise((resolve, reject) => {
    const prev = floorState.value
    elevatorState.value = 'going'
    floorState.value = floorIndex
    directionState.value = floorIndex - prev
    durationState.value = convertPositive(prev - floorIndex)
    setTimeout(() => {
      elevatorState.value = 'waiting'
      setStorageItem('data', {
        floor: floorIndex,
        elevatorQueue: elevatorQueue.value,
      })
      setTimeout(() => {
        const index = elevatorQueue.value.findIndex((floor) => {
          return floor === floorIndex
        })
        elevatorQueue.value.splice(index, 1)
        resolve((elevatorState.value = 'idle'))
        setStorageItem('data', {
          floor: floorIndex,
          elevatorQueue: elevatorQueue.value,
        })
        if (elevatorQueue.value.length > 0) {
          promises()
        }
      }, 3000)
    }, durationState.value * 1000)
  })

const floorHandler = async (floorIndex: number) => {
  if (floorIndex === floorState.value) {
    return
  }
  elevatorQueue.value.push(floorIndex)
  setStorageItem('data', {
    floor: floorIndex,
    elevatorQueue: elevatorQueue.value,
  })
  if (elevatorQueue.value.length === 1) {
    promises()
  }
}
const promises = async () => {
  await elevatorHandler(elevatorQueue.value[0])
}
if (elevatorQueue.value.length > 0) {
  promises()
}
</script>

<template>
  <div class="app">
    <div class="floors">
      <Floor
        v-for="floor in floors"
        :floor="floor"
        :isActive="elevatorQueue.includes(floor)"
        :click="(index: number) => floorHandler(index)"
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
