<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <form action="">
      <!-- 제목 입력 -->
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" class="form-control" id="title" />
      </div>
      <!-- 내용 입력 -->
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea class="form-control" id="content" rows="3"></textarea>
      </div>
      <!-- 버튼 -->
      <div class="pt-4">
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button type="submit" class="btn btn-primary">저장</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Vue 라우터 사용
const router = useRouter();

// 목록 페이지로 이동
const goListPage = () => {
  router.push({ name: 'PostList' }); // 라우트 이름 사용
};
</script>

<style lang="scss" scoped></style>
