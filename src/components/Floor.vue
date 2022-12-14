<script setup lang="ts">
defineProps<{
  floor: number
  isActive: boolean
  click: (index: number) => void
}>()
</script>

<template>
  <div class="floor" :key="floor">
    <div class="shaft"></div>
    <button
      class="btn"
      @click="click(floor)"
      :disabled="isActive"
      :style="{
        color: `${isActive ? 'black' : 'white'}`,
        backgroundColor: `${isActive ? '#ECB365' : '#064663'}`,
      }"
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
  align-items: center;
  border: 1px solid black;
}
.shaft {
  border-left: 2px solid black;
  border-right: 2px solid black;
  width: 100px;
  height: 150px;
}
.btn {
  border: none;
  background-color: #064663;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 1rem;
  cursor: pointer;
}
</style>
