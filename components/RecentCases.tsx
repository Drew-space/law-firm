import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cases = [
  {
    id: "#00421",
    title: "Property dispute — Lekki estate",
    type: "Civil",
    status: "Pending",
    date: "Apr 28, 2026",
  },
  {
    id: "#00418",
    title: "Contract breach — vendor agreement",
    type: "Commercial",
    status: "Approved",
    date: "Apr 20, 2026",
  },
  {
    id: "#00410",
    title: "Employment termination appeal",
    type: "Labour",
    status: "In review",
    date: "Apr 12, 2026",
  },
  {
    id: "#00404",
    title: "Debt recovery — personal loan",
    type: "Civil",
    status: "Canceled",
    date: "Mar 30, 2026",
  },
];

const badgeStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  "In review": "bg-purple-100 text-purple-800",
  Canceled: "bg-red-100 text-red-800",
};

export function RecentCases() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-inter font-medium">
          Recent Cases
        </CardTitle>
        <span className="text-xs text-blue-600 cursor-pointer">View all</span>
      </CardHeader>
      <CardContent className="flex   flex-col gap-3">
        {cases.map((c) => (
          <div
            key={c.id}
            className="flex cursor-pointer items-center justify-between rounded-lg border p-3"
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium">{c.title}</p>
              <p className="text-xs text-muted-foreground">
                {c.id} · {c.type}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={`${badgeStyles[c.status]} rounded-full text-xs`}
              >
                {c.status}
              </Badge>
              <span className="text-xs text-muted-foreground">{c.date}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
