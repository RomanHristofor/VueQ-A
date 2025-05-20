import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref([
    // Тема: Composition vs Options API
    {
      id: 1,
      theme: 'Composition vs Options API',
      question: 'Что делает setup() в Composition API?',
      options: [
        'Определяет шаблон',
        'Регистрирует хуки жизненного цикла',
        'Инициализирует компонент и возвращает реактивные данные',
        'Вызывает рендер компонент'
      ],
      correctIndex: 2,
      explanation: 'setup() — точка входа в Composition API. Возвращает объект или функции, доступные в шаблоне.'
    },
    // Тема: Reactivity
    {
      id: 2,
      theme: 'Reactivity',
      question: 'Что возвращает ref(0)?',
      options: [
        'Примитив 0',
        'Объект с value',
        'Proxy',
        'Reactive-массив'
      ],
      correctIndex: 1,
      explanation: 'ref(0) возвращает реактивный объект со свойством value.'
    },

    // Тема: Computed vs Watch
    {
      id: 3,
      theme: 'Computed vs Watch',
      question: 'Что произойдёт, если computed-свойство не используется в шаблоне или в другом computed/watch?',
      options: [
        'Оно всё равно будет пересчитываться при изменении зависимостей',
        'Оно не будет пересчитываться, пока не потребуется',
        'Оно вызовет ошибку',
        'Оно сработает как watch'
      ],
      correctIndex: 1,
      explanation: 'Computed-свойство лениво вычисляется и кэшируется: если его значение никуда не читают, пересчёта не происходит.'
    },
    {
      id: 4,
      theme: 'Computed vs Watch',
      question: `Когда будет выведено "Computing total" в этом коде?
        <pre><code>
const price = ref(100)
const tax = ref(0.2)

const total = computed(() => {
  console.log('Computing total')
  return price.value * (1 + tax.value)
})

price.value = 200
        </code></pre>`,
      options: [
        'Сразу после price.value = 200',
        'Только если total.value будет использовано после изменения',
        'Никогда',
        'Каждый раз при изменении price или tax'
      ],
      correctIndex: 1,
      explanation: 'Computed-свойство помечается устаревшим, но реально вычислится (и выведет лог) только при чтении total.value.'
    },
    {
      id: 5,
      theme: 'Computed vs Watch',
      question: `Ты хочешь вызвать API-запрос при каждом изменении <code>searchQuery</code>. Что лучше использовать?
<pre><code>const searchQuery = ref('')</code></pre>`,
      options: [
        'computed(() => fetchResults(searchQuery.value))',
        'watch(searchQuery, (val) => fetchResults(val))',
        'searchQuery.value = fetchResults()',
        'computed(fetchResults)'
      ],
      correctIndex: 1,
      explanation: 'Для побочных эффектов (особенно async/API) всегда используется watch, а не computed.'
    },

  ])

  const selectedTheme = ref(null)

  return { questions, selectedTheme }
})
