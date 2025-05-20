import { ref, computed } from 'vue'

export function useTaskFilter(tasks) {
  const filter = ref('all')

  const filteredTasks = computed(() => {
    if (filter.value === 'active') {
      return tasks.value.filter(task => !task.done)
    }
    if (filter.value === 'completed') {
      return tasks.value.filter(task => task.done)
    }
    return tasks.value
  })

  return {
    filter,
    filteredTasks
  }
}
