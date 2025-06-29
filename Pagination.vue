<template>
  <div>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1">Назад</button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages">Вперед</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    },
  },
};
</script>
