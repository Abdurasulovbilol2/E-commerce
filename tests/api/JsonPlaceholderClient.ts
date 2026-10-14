import type { APIRequestContext } from "@playwright/test";

export type PostPayload = {
  userId: number;
  title: string;
  body: string;
};

export class JsonPlaceholderClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string = process.env.API_BASE_URL ??
      "https://jsonplaceholder.typicode.com",
  ) {}

  async getPost(postId: number) {
    return this.request.get(`${this.baseUrl}/posts/${postId}`);
  }

  async getPostsForUser(userId: number) {
    return this.request.get(`${this.baseUrl}/posts`, {
      params: { userId },
    });
  }

  async createPost(payload: PostPayload) {
    return this.request.post(`${this.baseUrl}/posts`, {
      data: payload,
    });
  }

  async replacePost(postId: number, payload: PostPayload) {
    return this.request.put(`${this.baseUrl}/posts/${postId}`, {
      data: payload,
    });
  }

  async patchPost(postId: number, partialPayload: Partial<PostPayload>) {
    return this.request.patch(`${this.baseUrl}/posts/${postId}`, {
      data: partialPayload,
    });
  }

  async deletePost(postId: number) {
    return this.request.delete(`${this.baseUrl}/posts/${postId}`);
  }
}
