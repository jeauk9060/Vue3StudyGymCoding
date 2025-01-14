import axios from 'axios';

const BackDomain = 'http://localhost:8080';

export function getPosts(params) {
  return axios.get(BackDomain + '/posts', { params });
}

export function getPostById(id) {
  return axios.get(BackDomain + `/posts/${id}`);
}

export function createPost(post) {
  return axios.post(BackDomain + '/posts/create', post);
}

export function updatePost(id, post) {
  return axios.put(BackDomain + `/posts/${id}`, post);
}

export function deletePost(id) {
  return axios.delete(BackDomain + `/posts/${id}`);
}
