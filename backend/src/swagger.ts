export const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Mini Feed API",
    version: "1.0.0",
    description: "API for a mini social feed: auth, posts, comments, and likes.",
  },
  servers: [{ url: "http://localhost:4000", description: "Local" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT from /auth/register or /auth/login",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: { message: { type: "string" } },
      },
      AuthRegister: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      AuthLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
          token: { type: "string" },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      PostCreate: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string", maxLength: 70 },
          description: { type: "string", maxLength: 200 },
          media: { type: "array", items: { type: "string" }, default: [] },
        },
      },
      PostUpdate: {
        type: "object",
        properties: {
          title: { type: "string", maxLength: 70 },
          description: { type: "string", maxLength: 200 },
          media: { type: "array", items: { type: "string" } },
        },
      },
      Author: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
        },
      },
      CommentItem: {
        type: "object",
        properties: {
          _id: { type: "string" },
          postId: { type: "string" },
          author: { $ref: "#/components/schemas/Author" },
          text: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      PostDetail: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          media: { type: "array", items: { type: "string" } },
          author: { $ref: "#/components/schemas/Author" },
          likesCount: { type: "integer" },
          commentsCount: { type: "integer" },
          isLikedByCurrentUser: { type: "boolean", description: "Whether the current user has liked this post" },
          comments: { type: "array", items: { $ref: "#/components/schemas/CommentItem" } },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      PostFeedItem: {
        type: "object",
        properties: {
          id: { type: "string" },
          author: { $ref: "#/components/schemas/Author" },
          title: { type: "string" },
          description: { type: "string" },
          media: { type: "array", items: { type: "string" } },
          likesCount: { type: "integer" },
          commentsCount: { type: "integer" },
          isLikedByCurrentUser: { type: "boolean", description: "Whether the current user has liked this post" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      FeedResponse: {
        type: "object",
        properties: {
          posts: { type: "array", items: { $ref: "#/components/schemas/PostFeedItem" } },
          page: { type: "integer" },
          limit: { type: "integer" },
        },
      },
      CommentCreate: {
        type: "object",
        required: ["text"],
        properties: { text: { type: "string", maxLength: 200 } },
      },
      CommentUpdate: {
        type: "object",
        required: ["text"],
        properties: { text: { type: "string", maxLength: 200 } },
      },
      LikeResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
          likesCount: { type: "integer" },
        },
      },
      MessageResponse: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        summary: "Register",
        tags: ["Auth"],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/AuthRegister" } } } },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
          "400": { description: "User already exists", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Login",
        tags: ["Auth"],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/AuthLogin" } } } },
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
          "400": { description: "Email required / Password required / User does not exist / Invalid credentials", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/{id}": {
      get: {
        summary: "Get user by ID",
        tags: ["Auth"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "User ID" }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          "400": { description: "User ID is required", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "User not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/post": {
      post: {
        summary: "Create post",
        tags: ["Post"],
        security: [{ bearerAuth: [] }],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/PostCreate" } } } },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/MessageResponse" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/post/feed": {
      get: {
        summary: "Get paginated feed",
        tags: ["Post"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 }, description: "Page (≥1)" },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 }, description: "Limit 1–50" },
        ],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/FeedResponse" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/post/{id}": {
      get: {
        summary: "Get post by ID",
        tags: ["Post"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "Post ID" }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/PostDetail" } } } },
          "400": { description: "Invalid Post ID", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "Post not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      put: {
        summary: "Update post",
        tags: ["Post"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/PostUpdate" } } } },
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { type: "object" } } } },
          "400": { description: "Invalid Post / Post not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      delete: {
        summary: "Delete post",
        tags: ["Post"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/MessageResponse" } } } },
          "400": { description: "Post not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "403": { description: "Not allowed to delete", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/comment/{id}": {
      post: {
        summary: "Add comment to post",
        tags: ["Comment"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "Post ID" }],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/CommentCreate" } } } },
        responses: {
          "201": { description: "Created", content: { "application/json": { schema: { $ref: "#/components/schemas/MessageResponse" } } } },
          "400": { description: "Invalid Post ID / Empty Comment / Invalid Post", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      get: {
        summary: "Get comments for post",
        tags: ["Comment"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "Post ID" }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/CommentItem" } } } } },
          "400": { description: "Invalid Post ID", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      put: {
        summary: "Edit comment",
        tags: ["Comment"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "Comment ID" }],
        requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/CommentUpdate" } } } },
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/MessageResponse" } } } },
          "400": { description: "Invalid Comment ID / Empty Comment", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "403": { description: "Unauthorized to edit", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "Comment not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      delete: {
        summary: "Delete comment",
        tags: ["Comment"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "Comment ID" }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/MessageResponse" } } } },
          "400": { description: "Invalid Comment ID", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "403": { description: "Unauthorized to delete", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "Comment not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/like/{id}": {
      post: {
        summary: "Toggle like on post",
        tags: ["Like"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "Post ID" }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/LikeResponse" } } } },
          "400": { description: "Invalid Post ID / Post not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
  },
};
