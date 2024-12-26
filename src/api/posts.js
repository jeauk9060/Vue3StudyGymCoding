import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 API 기본 URL
  headers: {
    'Content-Type': 'application/json', // JSON 형식
  },
  timeout: 5000, // 요청 시간 제한 (5초)
});

// 게시글 관련 API 요청 관리
export default {
  // 모든 게시글 조회
  getAllPosts() {
    return apiClient.get('/posts');
  },

  // 특정 게시글 조회
  getPostById(id) {
    return apiClient.get(`/posts/${id}`);
  },

  // 게시글 작성
  createPost(post) {
    return apiClient.post('/posts/create', post);
  },

  // 게시글 수정
  updatePost(id, post) {
    return apiClient.put(`/posts/${id}/edit`, post);
  },

  // // 게시글 삭제
  // deletePost(id) {
  //   return apiClient.delete(`/posts/${id}`);
  // },
};
