<template>
  <div class="quiz">
    <h2>{{store.selectedTheme}}</h2>
    <div v-if="currentIndex < shuffledQuestions.length">
      <!-- Прогрессбар -->
      <div class="progress-bar">
        <div class="progress" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <p class="timer">⏱ Время: {{ timeElapsed }} сек</p>

      <h2>Тема: {{ currentQuestion.theme }}</h2>
      <p><strong>Вопрос {{ currentIndex + 1 }}:</strong></p>
      <p v-html="currentQuestion.question"></p>
      <pre><code>{{ currentQuestion.code }}</code></pre>

      <ul>
        <li v-for="(option, idx) in currentQuestion.options" :key="idx">
          <label>
            <input
              type="radio"
              :value="idx"
              v-model="answers[currentIndex]"
              :disabled="answered"
            />
            {{ option }}
          </label>
        </li>
      </ul>

      <button :disabled="!answered" @click="nextQuestion">
        {{ isLast ? 'Показать результат' : 'Следующий вопрос' }}
      </button>
    </div>

    <!-- Результаты -->
    <div v-else>
      <h2>Результаты</h2>
      <p>Вы правильно ответили на {{ score }} из {{ shuffledQuestions.length }} вопросов.</p>
      <p>⏱ Затраченное время: {{ timeElapsed }} сек</p>

      <div v-for="(question, index) in shuffledQuestions" :key="index" class="explanation">
        <p><strong>Вопрос {{ index + 1 }}:</strong></p>
        <p v-html="question.question"></p>
        <span>Ваш ответ: <pre><code>{{ question.options[answers[index]] || '—' }}</code></pre></span>
        <p>Правильный ответ: {{ question.options[question.correctIndex] }}</p>
        <p><em>Пояснение:</em> {{ question.explanation }}</p>
        <hr/>
      </div>

      <div v-if="shuffledQuestions.length && isTheme">
        <Comparison />
      </div>
    </div>
  </div>
</template>

<script setup>
import Comparison from './Comparison.vue'
import {computed, ref, onMounted, onUnmounted} from 'vue'
import {useQuizStore} from '@/stores/quiz'
import { useRouter } from 'vue-router'

const router = useRouter()

// 1. Данные из хранилища
const store = useQuizStore()
const originalQuestions = computed(() =>
    store.questions.filter(q => q.theme === store.selectedTheme)
)

const isTheme = computed(() => store.selectedTheme === 'Computed vs Watch')

// 2. Shuffle при монтировании
const shuffledQuestions = ref([])
onMounted(() => {
  if (!store.selectedTheme) {
    router.replace('/')
  }
  shuffledQuestions.value = [...originalQuestions.value].sort(() => Math.random() - 0.5)
})

// 3. Состояние
const currentIndex = ref(0)
const answers = ref([])

// 4. Таймер
const timeElapsed = ref(0)
let interval = null
onMounted(() => {
  interval = setInterval(() => {
    timeElapsed.value++
  }, 1000)
})
onUnmounted(() => {
  clearInterval(interval)
})

// 5. Текущий вопрос и логика
const currentQuestion = computed(() => shuffledQuestions.value[currentIndex.value] || {})
const answered = computed(() => answers.value[currentIndex.value] !== undefined)
const isLast = computed(() => currentIndex.value === shuffledQuestions.value.length - 1)

const nextQuestion = () => {
  if (!isLast.value) {
    currentIndex.value++
  } else {
    currentIndex.value++
    clearInterval(interval)
  }
}

// 6. Подсчёт результата
const score = computed(() =>
  shuffledQuestions.value.reduce((acc, q, idx) => {
    return answers.value[idx] === q.correctIndex ? acc + 1 : acc
  }, 0)
)

// 7. Прогрессбар
const progressPercent = computed(() => {
  return Math.floor((currentIndex.value / shuffledQuestions.value.length) * 100)
})
</script>

<style scoped>
.quiz {
  max-width: 650px;
  margin: auto;
  padding: 20px;
  font-family: sans-serif;
}

.progress-bar {
  height: 10px;
  background: #eee;
  margin-bottom: 15px;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #42b983;
  transition: width 0.3s ease;
}

.timer {
  font-weight: bold;
  margin-bottom: 15px;
}

.explanation {
  margin-top: 1em;
}
</style>
