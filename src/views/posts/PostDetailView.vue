<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <div class="text-muted">{{ formatDate(post.created_at) }}</div>
    <div class="my-4">
      <div class="row g-2">
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="goPreviousPost">
            이전글
          </button>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="goNextPost">
            다음글
          </button>
        </div>
        <div class="col-auto me-auto"></div>
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="goListPage">목록</button>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-primary" @click="goEditPage">
            수정
          </button>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-danger" @click="deletePost">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>게시물을 불러오는 중입니다...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';

// 라우터 및 상태 초기화
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const post = ref(null);

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

// 게시물 데이터 로드
const fetchPost = async () => {
  try {
    const response = await getPostById(id);
    post.value = response.data; // API 응답 데이터 저장
  } catch (error) {
    console.error('Failed to load post:', error);
    alert('게시물을 불러오는 데 실패했습니다.');
  }
};

// 페이지 이동 함수
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => router.push({ name: 'PostEdit', params: { id } });
const goPreviousPost = () =>
  alert('이전 글로 이동 기능은 아직 구현되지 않았습니다.');
const goNextPost = () =>
  alert('다음 글로 이동 기능은 아직 구현되지 않았습니다.');
const deletePost = () => alert('삭제 기능은 아직 구현되지 않았습니다.');

// 컴포넌트가 마운트될 때 데이터 로드
onMounted(() => {
  fetchPost();
});
</script>

<style lang="scss" scoped></style>
