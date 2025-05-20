<template>
  <div>
    Property Page for ID: {{ id }}
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
</script>
