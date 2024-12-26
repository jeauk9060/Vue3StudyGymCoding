<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <!-- 게시글 목록 반복 출력 -->
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :createdAt="post.createdAt"
          @click="goPage(post.id)"
        ></PostItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PostItem from '@/components/posts/PostItem.vue';
import postApi from '@/api/posts'; // API 파일 import
import { useRouter } from 'vue-router';

const router = useRouter();

// 게시글 데이터를 관리할 반응형 변수 선언
const posts = ref([]);

// 서버에서 게시글 목록 가져오기
const fetchPosts = async () => {
  try {
    const response = await postApi.getAllPosts(); // API 호출
    posts.value = response.data; // 데이터 저장
  } catch (error) {
    console.error('게시글 조회 오류:', error);
  }
};

// 컴포넌트가 마운트될 때 게시글 불러오기
onMounted(() => {
  fetchPosts();
});

const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
