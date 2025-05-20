<template>
  <div class="comparison">
    <h3>📌 Краткое сравнение:</h3>
    <table>
      <thead>
      <tr>
        <th>Характеристика</th>
        <th><code>computed</code></th>
        <th><code>watch</code></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in rows" :key="index">
        <td>{{ item.label }}</td>
        <td>
          <span v-if="item.computed === true">✅</span>
          <span v-else-if="typeof item.computed === 'string' && !item.both">❌ ({{ item.computed }})</span>
          <span v-if="typeof item.computed !== 'string' && !item.computed">❌</span>
          <span v-if="typeof item.computed === 'string' && item.both">✅ ({{ item.computed }})</span>
        </td>
        <td>
          <span v-if="item.watch === true">✅</span>
          <span v-else-if="typeof item.watch === 'string' && !item.both">❌ ({{ item.watch }})</span>
          <span v-if="typeof item.watch !== 'string' && !item.watch">❌</span>
          <span v-if="typeof item.watch === 'string' && item.both">✅ ({{ item.watch }})</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const rows = [
  { label: 'Возвращает значение', computed: true, watch: false },
  { label: 'Кэширование', computed: true, watch: false },
  { label: 'Побочные эффекты', computed: 'не предназначено', watch: true },
  { label: 'Поддержка async', computed: 'ограниченно', watch: true },
  { label: 'Ленивая реакция', computed: 'только при необходимости', watch: 'можно настроить', both: true },
]
</script>

<style scoped>
.comparison {
  margin-top: 30px;
  font-family: sans-serif;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f9f9f9;
}
</style>
