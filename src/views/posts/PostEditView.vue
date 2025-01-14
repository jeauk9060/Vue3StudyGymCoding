<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <slot>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="goDetailPage"
          >
            취소
          </button>
          <button class="btn btn-primary">수정</button>
        </slot>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { updatePost } from '@/api/posts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({
  title: null,
  content: null,
});

const fetchPost = async () => {
  try {
    const response = await getPostById(id);
    form.value.title = response.data.title;
    form.value.content = response.data.content;
  } catch (error) {
    console.error(error);
  }
};

const edit = async () => {
  try {
    await updatePost(id, form.value);
    goDetailPage();
  } catch (error) {
    console.error(error);
  }
};

fetchPost();

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
</script>

<style lang="scss" scoped></style>
