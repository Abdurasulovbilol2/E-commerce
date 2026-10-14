import { expect, test } from "@playwright/test";
import { JsonPlaceholderClient } from "./JsonPlaceholderClient";

test.describe("JSONPlaceholder API", () => {
  test("GET returns a valid post payload", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);
    const response = await client.getPost(1);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      userId: 1,
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
    });
    expect(body.title.length).toBeGreaterThan(0);
    expect(body.body.length).toBeGreaterThan(0);
  });

  test("GET by userId returns a list of posts", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);
    const response = await client.getPostsForUser(1);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    body.forEach((post: unknown) => {
      expect(post).toMatchObject({
        userId: 1,
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      });
    });
  });

  test("POST creates a new resource", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);
    const payload = {
      userId: 99,
      title: "Playwright API portfolio test",
      body: "This payload validates the create operation.",
    };

    const response = await client.createPost(payload);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      userId: 99,
      title: payload.title,
      body: payload.body,
      id: expect.any(Number),
    });
  });

  test("PUT replaces a resource", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);
    const payload = {
      userId: 7,
      title: "Updated Playwright title",
      body: "Updated Playwright body",
    };

    const response = await client.replacePost(1, payload);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      userId: 7,
      title: payload.title,
      body: payload.body,
      id: 1,
    });
  });

  test("PATCH partially updates a resource", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);

    const response = await client.patchPost(1, { title: "Patched title" });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      id: 1,
      title: "Patched title",
    });
  });

  test("DELETE removes a resource", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);
    const response = await client.deletePost(1);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({});
  });

  test("GET on a missing ID returns 404", async ({ request }) => {
    const client = new JsonPlaceholderClient(request);
    const response = await client.getPost(999999);

    expect(response.status()).toBe(404);
  });
});
