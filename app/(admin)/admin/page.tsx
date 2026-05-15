"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function AdminPage() {
  const router = useRouter();
  const stats = useQuery(api.cases.getAdminCaseStats);
  const cases = useQuery(api.cases.getAllCases) ?? [];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex gap-3 overflow-x-auto py-1 md:grid md:grid-cols-4 md:overflow-visible">
        <div className="min-w-[130px] ring ring-blue-500 rounded-xl bg-[#bfdbfe] text-blue-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Total</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">{stats?.total ?? 0}</p>
          </div>
        </div>
        <div className="min-w-[130px] rounded-xl bg-[#fef9c3] ring ring-yellow-400 text-yellow-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Pending</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">{stats?.pending ?? 0}</p>
          </div>
        </div>
        <div className="min-w-[130px] rounded-xl bg-[#dcfce7] ring ring-green-400 text-green-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Approved</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">{stats?.approved ?? 0}</p>
          </div>
        </div>
        <div className="min-w-[130px] rounded-xl bg-[#fee2e2] ring ring-red-400 text-red-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Canceled</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">{stats?.canceled ?? 0}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-inter font-medium">
            All Cases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 max-h-150 overflow-y-auto pr-1">
            {cases.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">
                No cases yet.
              </p>
            )}
            {cases.map((c) => (
              <div
                key={c._id}
                className="flex items-center gap-3 border rounded-md p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.caseType} ·{" "}
                    {new Date(c._creationTime).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  className={`${badgeStyles[c.status]} rounded-full text-xs shrink-0`}
                >
                  {statusLabel[c.status]}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 shrink-0"
                  onClick={() => router.push(`/admin/cases/${c._id}`)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
