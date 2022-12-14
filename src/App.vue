<script setup lang="ts">
import { ref } from 'vue'
import { convertPositive } from './helpers/convertNumber'
import { generateFloors } from './helpers/floorGenerator'
import { setStorageItem, getStorageItem } from './helpers/storage'
import Floor from './components/floor.vue'
import Elevator from './components/elevator.vue'

interface IStorage {
  floor: number
  elevatorQueue: number[]
}

const savedData = getStorageItem('data') as IStorage // elevator data saves in local sotorage

const floorState = ref<number>(savedData?.floor || 1) // whitch floor to go on
const directionState = ref<number>(1) // positive up negative down
const durationState = ref<number>(1) // how fast elevator will travel. 1 seconds a floor as default
const waitingState = ref<number>(3) // how long elevator will be waiting after arrival to a floor. 3 seconds as default
const elevatorState = ref<string>('idle') // what elevator is doing rn
const elevatorQueue = ref<number[]>(savedData?.elevatorQueue || []) // a list of floors elevator has to visit

const floors: number[] = generateFloors(5) // how many floors

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
      }, waitingState.value * 1000)
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

// executes if there is a saved queue in local storage
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
