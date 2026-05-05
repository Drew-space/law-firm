import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// user submits a case
export const createCase = mutation({
  args: {
    title: v.string(),
    caseType: v.string(),
    opposingParty: v.optional(v.string()),
    description: v.string(),
    clerkId: v.string(),
    storageIds: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cases", {
      title: args.title,
      caseType: args.caseType,
      opposingParty: args.opposingParty,
      description: args.description,
      clerkId: args.clerkId,
      fileUrls: args.storageIds ?? [],
      status: "pending",
    });
  },
});

// get all cases for a specific user
export const getUserCases = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cases")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .order("desc")
      .collect();
  },
});

// get a single case by its id — for the view case page
export const getCaseById = query({
  args: { caseId: v.id("cases") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.caseId);
  },
});

// get case stats for a user — for their dashboard
export const getUserCaseStats = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const cases = await ctx.db
      .query("cases")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .collect();

    return {
      total: cases.length,
      pending: cases.filter((c) => c.status === "pending").length,
      approved: cases.filter((c) => c.status === "approved").length,
      in_review: cases.filter((c) => c.status === "in_review").length,
      canceled: cases.filter((c) => c.status === "canceled").length,
    };
  },
});

// get all cases — for admin
export const getAllCases = query({
  handler: async (ctx) => {
    return await ctx.db.query("cases").order("desc").collect();
  },
});

// get case stats — for admin dashboard
export const getAdminCaseStats = query({
  handler: async (ctx) => {
    const cases = await ctx.db.query("cases").collect();
    return {
      total: cases.length,
      pending: cases.filter((c) => c.status === "pending").length,
      approved: cases.filter((c) => c.status === "approved").length,
      in_review: cases.filter((c) => c.status === "in_review").length,
      canceled: cases.filter((c) => c.status === "canceled").length,
    };
  },
});

// admin updates a case status — approve, cancel, set in_review
export const updateCaseStatus = mutation({
  args: {
    caseId: v.id("cases"),
    status: v.union(
      v.literal("pending"),
      v.literal("in_review"),
      v.literal("approved"),
      v.literal("canceled"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.caseId, { status: args.status });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// step 2 — get the file url from storageId (for displaying)
export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId as any);
  },
});
