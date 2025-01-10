<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <p>{{ totalPages }}</p>
      <p>{{ totalCount }}</p>
      <p>{{ currentPage }}</p>
      <!-- 게시글 목록 반복 출력 -->
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :createdAt="formatDate(post.created_at)"
          @click="goPage(post.id)"
        ></PostItem>
      </div>
    </div>
    <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(currentPage - 1)"
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
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <hr class="my-5" />
    <AppCard> </AppCard>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import PostItem from '@/components/posts/PostItem.vue';
import AppCard from '@/components/AppCard.vue';
import { useRouter } from 'vue-router';
import { getPosts } from '@/api/posts';

// API 파일에서 함수 가져오기

const router = useRouter();
const totalCount = computed(() => data.value.totalCount);
const currentPage = ref(0);
const totalPages = computed(() => data.value.totalPages);
const posts = computed(() => data.value.posts);
const data = ref();

const fetchPosts = async () => {
  try {
    const response = await getPosts();
    data.value = response.data;
    currentPage.value = response.data.currentPage;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(() => {
  fetchPosts();
});

// 날짜 형식 변환 함수
const formatDate = dateString => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

// 상세 페이지 이동 함수
const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};
</script>
