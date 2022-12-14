<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ floor: number; isActive: boolean }>()

const color = ref<string>('')

const floorBtn = (floor: number) => {
  color.value = 'green'
}
</script>

<template>
  <div class="floor" :key="floor">
    <div class="shaft"></div>
    <button
      @click="floorBtn(floor)"
      :disabled="isActive"
      :style="{ color: `${isActive ? 'blue' : ''}` }"
    >
      {{ floor }}
    </button>
  </div>
</template>

<style scoped>
.floor {
  width: 100vh;
  height: 150px;
  display: flex;
  border: 1px solid black;
}
.shaft {
  border: 2px solid black;
  width: 100px;
  height: 150px;
}
</style>
