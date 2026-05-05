"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const badgeStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  in_review: "bg-purple-100 text-purple-800",
  canceled: "bg-red-100 text-red-800",
};

const statusLabel: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  in_review: "In Review",
  canceled: "Canceled",
};

export function RecentCases() {
  const { user } = useUser();
  const router = useRouter();

  const cases =
    useQuery(
      api.cases.getUserCases,
      user?.id ? { clerkId: user.id } : "skip",
    ) ?? [];

  const recent = cases.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Recent Cases</CardTitle>
        <span
          className="text-xs text-blue-600 cursor-pointer"
          onClick={() => router.push("/dashboard/my-cases")}
        >
          View all
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
          {recent.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No cases yet. File your first case.
            </p>
          )}
          {recent.map((c) => (
            <div
              key={c._id}
              className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => router.push(`/dashboard/my-cases/${c._id}`)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.caseType}</p>
              </div>
              <Badge
                className={`${badgeStyles[c.status]} rounded-full text-xs shrink-0`}
              >
                {statusLabel[c.status]}
              </Badge>
              <span className="text-xs text-muted-foreground hidden md:block shrink-0">
                {new Date(c._creationTime).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
