import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCase = mutation({
  args: {
    title: v.string(),
    caseType: v.string(),
    opposingParty: v.optional(v.string()),
    description: v.string(),
    clerkId: v.string(),
    fileUrls: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const count = await ctx.db.query("cases").collect();
    const number = String(count.length + 1).padStart(5, "0");
    const year = new Date().getFullYear();
    const caseNumber = `CASE-${year}-${number}`;

    const caseId = await ctx.db.insert("cases", {
      caseNumber,
      title: args.title,
      caseType: args.caseType,
      opposingParty: args.opposingParty,
      description: args.description,
      clerkId: args.clerkId,
      status: "pending",
      fileUrls: args.fileUrls ?? [],
    });

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (user?.email) {
      await ctx.scheduler.runAfter(0, internal.email.sendStatusEmail, {
        email: user.email,
        userName: user.name,
        caseTitle: args.title,
        caseNumber,
        status: "pending",
        assignedLawyer: undefined,
        hearingDate: undefined,
        venue: undefined,
      });
    }

    return caseId;
  },
});

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

export const getCaseById = query({
  args: { caseId: v.id("cases") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.caseId);
  },
});

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

export const getAllCases = query({
  handler: async (ctx) => {
    return await ctx.db.query("cases").order("desc").collect();
  },
});

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

export const updateCaseStatus = mutation({
  args: {
    caseId: v.id("cases"),
    status: v.union(
      v.literal("pending"),
      v.literal("in_review"),
      v.literal("approved"),
      v.literal("canceled"),
    ),
    assignedLawyer: v.optional(v.string()),
    hearingDate: v.optional(v.string()),
    venue: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const caseData = await ctx.db.get(args.caseId);
    if (!caseData) throw new Error("Case not found");

    await ctx.db.patch(args.caseId, {
      status: args.status,
      assignedLawyer: args.assignedLawyer,
      hearingDate: args.hearingDate,
      venue: args.venue,
    });

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", caseData.clerkId))
      .unique();

    if (user?.email) {
      await ctx.scheduler.runAfter(0, internal.email.sendStatusEmail, {
        email: user.email,
        userName: user.name,
        caseTitle: caseData.title,
        caseNumber: caseData.caseNumber ?? "N/A",
        status: args.status,
        assignedLawyer: args.assignedLawyer,
        hearingDate: args.hearingDate,
        venue: args.venue,
      });
    }
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId as any);
  },
});
