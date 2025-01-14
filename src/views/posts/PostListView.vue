<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col-12 mb-3">
          <input
            v-model="searchKeyword"
            type="text"
            class="form-control"
            placeholder="제목으로 검색"
          />
          <button class="btn btn-primary mt-2" @click="searchPosts">
            검색
          </button>
        </div>
      </div>
    </form>
    <hr class="my-4" />
    <div class="row g-3">
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
    <!-- <nav class="mt-5" aria-label="Page navigation example">
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
    </nav> -->

    <AppPagnation
      :current-page="currentPage"
      :total-pages="totalPages"
      @page="page => (currentPage.value = page)"
    />

    <hr class="my-5" />
    <AppCard> </AppCard>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import PostItem from '@/components/posts/PostItem.vue';
import AppCard from '@/components/AppCard.vue';
import { useRouter, useRoute } from 'vue-router';
import { getPosts } from '@/api/posts';
import AppPagnation from '@/components/AppPagnation.vue';

const router = useRouter();
const route = useRoute();

const currentPage = ref(parseInt(route.query.page) || 1); // URL 쿼리에서 초기 페이지 값 가져오기
const data = ref({});
const totalPages = computed(() => data.value.totalPages || 0);
const posts = computed(() => data.value.posts || []);

const fetchPosts = async () => {
  try {
    const response = await getPosts({ page: currentPage.value }); // API 호출
    data.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

// 날짜 형식 변환
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

// 상세 페이지 이동
const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: { id },
  });
};

onBeforeMount(() => {
  fetchPosts();
});
</script>
