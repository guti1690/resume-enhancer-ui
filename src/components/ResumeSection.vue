<script setup lang="ts">
type Props = {
  label?: string
  content?: string | string[]
}
const props = defineProps<Props>()
</script>

<template>
  <div>
    <h2 v-if="props.label" class="text-3xl">{{ props.label }}</h2>

    <template v-if="props.content">
      <ul v-if="Array.isArray(props.content)" class="list-inside list-disc">
        <li v-for="item in props.content" :key="item">{{ item }}</li>
      </ul>
      <template v-else>
        {{ content }}
      </template>
    </template>
  </div>
</template>
