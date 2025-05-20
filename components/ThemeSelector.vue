<template>
  <div class="theme-selector">
    <h2>Выбери тему</h2>
    <ul>
      <li v-for="theme in themes"
        :key="theme"
        @click="select(theme)"
        class="theme-option"
      >
        {{ theme }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()

const themes = computed(() => {
  const unique = new Set(store.questions.map(q => q.theme))
  return Array.from(unique)
})

const select = async (theme) => {
  store.selectedTheme = theme
  await navigateTo('/quiz')
}
</script>

<style scoped>
.theme-selector {
  max-width: 500px;
  margin: 0 auto;
  font-family: sans-serif;
}

.theme-option {
  list-style: none;
  cursor: pointer;
  padding: 10px;
  background: #f0f0f0;
  margin-bottom: 8px;
  border-radius: 6px;
  transition: background 0.2s ease;
}
.theme-option:hover {
  background: #d6f5e3;
}
</style>
