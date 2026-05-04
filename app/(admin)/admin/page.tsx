// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// const cases = [
//   {
//     id: "#00421",
//     title: "Property dispute — Lekki estate",
//     type: "Civil",
//     user: "John Doe",
//     status: "Pending",
//     date: "Apr 28, 2026",
//   },
//   {
//     id: "#00418",
//     title: "Contract breach — vendor agreement",
//     type: "Commercial",
//     user: "Sarah K.",
//     status: "In review",
//     date: "Apr 20, 2026",
//   },
//   {
//     id: "#00410",
//     title: "Employment termination appeal",
//     type: "Labour",
//     user: "Mark O.",
//     status: "Approved",
//     date: "Apr 12, 2026",
//   },
//   {
//     id: "#00404",
//     title: "Debt recovery — personal loan",
//     type: "Civil",
//     user: "Amaka B.",
//     status: "Canceled",
//     date: "Mar 30, 2026",
//   },
//   {
//     id: "#00399",
//     title: "Land acquisition — Abuja FCT",
//     type: "Property",
//     user: "Emeka T.",
//     status: "Pending",
//     date: "Mar 22, 2026",
//   },
// ];

// const badgeStyles: Record<string, string> = {
//   Pending: "bg-yellow-100 text-yellow-800",
//   Approved: "bg-green-100 text-green-800",
//   "In review": "bg-purple-100 text-purple-800",
//   Canceled: "bg-red-100 text-red-800",
// };

// export default function AdminPage() {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4">
//       {/* stat cards */}
//       <div className="grid  auto-rows-min gap-4 md:grid-cols-4">
//         <div className="aspect-video ring ring-blue-500 rounded-xl bg-[#bfdbfe] flex flex-col p-4">
//           <h1 className="text-sm font-medium text-blue-500 ">Total</h1>
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-4xl text-blue-500 font-semibold">58</p>
//           </div>
//         </div>
//         <div className="aspect-video rounded-xl bg-[#fef9c3] ring ring-yellow-400 text-yellow-600 flex flex-col p-4">
//           <h1 className="text-sm font-medium">Pending</h1>
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-4xl font-semibold">14</p>
//           </div>
//         </div>
//         <div className="aspect-video rounded-xl bg-[#dcfce7] ring ring-green-400 text-green-600 flex flex-col p-4">
//           <h1 className="text-sm font-medium">Approved</h1>
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-4xl font-semibold">31</p>
//           </div>
//         </div>
//         <div className="aspect-video rounded-xl bg-[#fee2e2] ring ring-red-400 text-red-600 flex flex-col p-4">
//           <h1 className="text-sm font-medium">Canceled</h1>
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-4xl font-semibold">13</p>
//           </div>
//         </div>
//       </div>

//       {/* cases table */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-sm font-inter font-medium">
//             All Cases
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-3">
//           {cases.map((c) => (
//             <div
//               key={c.id}
//               className="flex items-center justify-between rounded-lg border p-3 gap-3"
//             >
//               <div className="flex flex-col gap-0.5 flex-1">
//                 <p className="text-sm font-medium">{c.title}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {c.id} · {c.type}
//                 </p>
//               </div>
//               <span className="text-xs text-muted-foreground hidden md:block">
//                 {c.user}
//               </span>
//               <Badge
//                 className={`${badgeStyles[c.status]} rounded-full text-xs`}
//               >
//                 {c.status}
//               </Badge>
//               <span className="text-xs text-muted-foreground hidden md:block">
//                 {c.date}
//               </span>
//               <div className="flex gap-2">
//                 {(c.status === "Pending" || c.status === "In review") && (
//                   <>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="text-xs text-green-600 border-green-300 h-7"
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="text-xs text-red-600 border-red-300 h-7"
//                     >
//                       Cancel
//                     </Button>
//                   </>
//                 )}
//                 <Button size="sm" variant="outline" className="text-xs h-7">
//                   View
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cases = [
  {
    id: "#00421",
    title: "Property dispute — Lekki estate",
    type: "Civil",
    user: "John Doe",
    status: "Pending",
    date: "Apr 28, 2026",
  },
  {
    id: "#00418",
    title: "Contract breach — vendor agreement",
    type: "Commercial",
    user: "Sarah K.",
    status: "In review",
    date: "Apr 20, 2026",
  },
  {
    id: "#00410",
    title: "Employment termination appeal",
    type: "Labour",
    user: "Mark O.",
    status: "Approved",
    date: "Apr 12, 2026",
  },
  {
    id: "#00404",
    title: "Debt recovery — personal loan",
    type: "Civil",
    user: "Amaka B.",
    status: "Canceled",
    date: "Mar 30, 2026",
  },
  {
    id: "#00399",
    title: "Land acquisition — Abuja FCT",
    type: "Property",
    user: "Emeka T.",
    status: "Pending",
    date: "Mar 22, 2026",
  },
];

const badgeStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  "In review": "bg-purple-100 text-purple-800",
  Canceled: "bg-red-100 text-red-800",
};

export default function AdminPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* stat cards — horizontal scroll on mobile */}
      <div className="flex px-2 py-2 gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
        <div className="min-w-32.5 ring ring-blue-500 rounded-xl bg-[#bfdbfe] text-blue-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Total</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">58</p>
          </div>
        </div>
        <div className="min-w-32.5 rounded-xl bg-[#fef9c3] ring ring-yellow-400 text-yellow-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Pending</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">14</p>
          </div>
        </div>
        <div className="min-w-32.5 rounded-xl bg-[#dcfce7] ring ring-green-400 text-green-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Approved</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">31</p>
          </div>
        </div>
        <div className="min-w-32.5 rounded-xl bg-[#fee2e2] ring ring-red-400 text-red-600 flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Canceled</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">13</p>
          </div>
        </div>
      </div>

      {/* cases — scrollable, view only */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-inter font-medium">
            All Cases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
            {cases.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 border rounded-md p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.id} · {c.type} · {c.user}
                  </p>
                </div>
                <Badge
                  className={`${badgeStyles[c.status]} rounded-full text-xs shrink-0`}
                >
                  {c.status}
                </Badge>
                <span className="text-xs text-muted-foreground hidden md:block shrink-0">
                  {c.date}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 shrink-0"
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
