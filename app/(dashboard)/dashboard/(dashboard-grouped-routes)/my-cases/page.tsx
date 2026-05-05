// "use client";

// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";

// const cases = [
//   {
//     id: "#00421",
//     title: "Property dispute — Lekki estate",
//     type: "Civil litigation",
//     status: "Pending",
//     date: "Apr 28, 2026",
//   },
//   {
//     id: "#00418",
//     title: "Contract breach — vendor agreement",
//     type: "Commercial / business",
//     status: "Approved",
//     date: "Apr 20, 2026",
//   },
//   {
//     id: "#00410",
//     title: "Employment termination appeal",
//     type: "Employment & labour",
//     status: "In review",
//     date: "Apr 12, 2026",
//   },
//   {
//     id: "#00404",
//     title: "Debt recovery — personal loan",
//     type: "Debt recovery",
//     status: "Canceled",
//     date: "Mar 30, 2026",
//   },
// ];

// const badgeStyles: Record<string, string> = {
//   Pending: "bg-yellow-100 text-yellow-800",
//   Approved: "bg-green-100 text-green-800",
//   "In review": "bg-purple-100 text-purple-800",
//   Canceled: "bg-red-100 text-red-800",
// };

// const filters = ["All", "Pending", "Approved", "In review", "Canceled"];

// export default function MyCasesPage() {
//   const [active, setActive] = useState("All");
//   const filtered =
//     active === "All" ? cases : cases.filter((c) => c.status === active);

//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4">
//       <div className="flex items-center justify-between gap-2">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">My cases</h1>
//           <p className="text-sm text-muted-foreground">
//             Track and manage all your filed cases
//           </p>
//         </div>
//         <Button
//           asChild
//           className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 text-xs"
//         >
//           <Link href="/dashboard/file-case">+ New case</Link>
//         </Button>
//       </div>

//       <Card>
//         <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <CardTitle className="text-sm font-inter font-medium">
//             All cases ({filtered.length})
//           </CardTitle>
//           {/* filters scroll horizontally on mobile */}
//           <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
//             {filters.map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setActive(f)}
//                 className={`px-3 py-1 rounded-full text-xs border shrink-0 transition-colors ${
//                   active === f
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "border-border text-muted-foreground hover:bg-muted"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
//             {filtered.length === 0 && (
//               <p className="text-sm text-muted-foreground text-center py-10">
//                 No cases found.
//               </p>
//             )}
//             {filtered.map((c) => (
//               <div
//                 key={c.id}
//                 className="flex items-center gap-3 border rounded-md p-3"
//               >
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium truncate">{c.title}</p>
//                   <p className="text-xs text-muted-foreground">
//                     {c.id} · {c.type} · {c.date}
//                   </p>
//                 </div>
//                 <Badge
//                   className={`${badgeStyles[c.status]} rounded-full text-xs shrink-0`}
//                 >
//                   {c.status}
//                 </Badge>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="text-xs h-7 shrink-0"
//                 >
//                   View
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

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

const filters = ["All", "pending", "approved", "in_review", "canceled"];
const filterLabels: Record<string, string> = {
  All: "All",
  pending: "Pending",
  approved: "Approved",
  in_review: "In Review",
  canceled: "Canceled",
};

export default function MyCasesPage() {
  const { user } = useUser();
  const router = useRouter();
  const [active, setActive] = useState("All");

  const cases =
    useQuery(
      api.cases.getUserCases,
      user?.id ? { clerkId: user.id } : "skip",
    ) ?? [];

  const filtered =
    active === "All" ? cases : cases.filter((c) => c.status === active);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My cases</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage all your filed cases
          </p>
        </div>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 text-xs"
        >
          <Link href="/dashboard/file-case">+ New case</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-sm font-medium">
            All cases ({filtered.length})
          </CardTitle>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-3 py-1 rounded-full text-xs border shrink-0 transition-colors ${
                  active === f
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">
                No cases found.
              </p>
            )}
            {filtered.map((c) => (
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
                  onClick={() => router.push(`/dashboard/my-cases/${c._id}`)}
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
