<template>
  <nav class="mt-5" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="prevPageClass">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPageChange(currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="emitPageChange(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="nextPageClass">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPageChange(currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page']);

const prevPageClass = computed(() => ({ disabled: props.currentPage === 1 }));
const nextPageClass = computed(() => ({
  disabled: props.currentPage === props.totalPages,
}));

const emitPageChange = page => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page', page);
  }
};
</script>
