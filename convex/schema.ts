import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    username: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
    updatedAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  cases: defineTable({
    title: v.string(),
    caseType: v.string(),
    opposingParty: v.optional(v.string()),
    description: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("in_review"),
      v.literal("approved"),
      v.literal("canceled"),
    ),
    clerkId: v.string(),
    fileUrls: v.optional(v.array(v.string())),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_status", ["status"]),
});
