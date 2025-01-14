<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <PostForm @submit.prevent="save">
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
        <button type="submit" class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Vue 라우터 사용
const router = useRouter();
const form = ref({
  title: null,
  content: null,
});

const save = async () => {
  try {
    await createPost(form.value);
    goListPage();
  } catch (error) {
    console.error(error);
  }
};

// 목록 페이지로 이동
const goListPage = () => {
  router.push({ name: 'PostList' }); // 라우트 이름 사용
};
</script>

<style lang="scss" scoped></style>
