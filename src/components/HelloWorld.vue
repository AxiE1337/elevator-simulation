<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string; number: string }>()

const count = ref(0)
const countHandler = (btn: HTMLButtonElement) => {
  console.log(btn)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button @click="(e) => countHandler(e.target as HTMLButtonElement)">
      log
    </button>
  </div>
</template>

<style scoped></style>
