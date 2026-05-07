import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllLawyers = query({
  handler: async (ctx) => {
    return await ctx.db.query("lawyers").collect();
  },
});

export const seedLawyers = mutation({
  handler: async (ctx) => {
    const lawyers = [
      {
        name: "Barr. Jane Okafor",
        email: "jane@acme.com",
        specialization: "Civil litigation",
      },
      {
        name: "Barr. Emeka Nwosu",
        email: "emeka@acme.com",
        specialization: "Commercial law",
      },
      {
        name: "Barr. Amaka Eze",
        email: "amaka@acme.com",
        specialization: "Property & land",
      },
      {
        name: "Barr. Tunde Adeyemi",
        email: "tunde@acme.com",
        specialization: "Employment law",
      },
      {
        name: "Barr. Chisom Obi",
        email: "chisom@acme.com",
        specialization: "Family law",
      },
    ];

    for (const lawyer of lawyers) {
      await ctx.db.insert("lawyers", lawyer);
    }
  },
});
