// "use client";

// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "johndoe@email.com",
//     cases: 4,
//     status: "Active",
//     initials: "JD",
//   },
//   {
//     id: 2,
//     name: "Sarah K.",
//     email: "sarah.k@email.com",
//     cases: 2,
//     status: "Active",
//     initials: "SK",
//   },
//   {
//     id: 3,
//     name: "Mark O.",
//     email: "mark.o@email.com",
//     cases: 1,
//     status: "Active",
//     initials: "MO",
//   },
//   {
//     id: 4,
//     name: "Amaka B.",
//     email: "amaka.b@email.com",
//     cases: 3,
//     status: "Active",
//     initials: "AB",
//   },
//   {
//     id: 5,
//     name: "Emeka T.",
//     email: "emeka.t@email.com",
//     cases: 2,
//     status: "Active",
//     initials: "ET",
//   },
// ];

// export default function UsersPage() {
//   const [search, setSearch] = useState("");

//   const filtered = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4">
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight">Users</h1>
//         <p className="text-sm text-muted-foreground">
//           All registered users on the platform
//         </p>
//       </div>

//       <Card>
//         <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <CardTitle className="text-sm font-inter font-medium">
//             All users ({filtered.length})
//           </CardTitle>
//           <Input
//             placeholder="Search..."
//             className="w-full sm:w-48 h-8 text-xs"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
//             {filtered.length === 0 && (
//               <p className="text-sm text-muted-foreground text-center py-10">
//                 No users found.
//               </p>
//             )}
//             {filtered.map((u) => (
//               <div
//                 key={u.id}
//                 className="flex items-center gap-3 border rounded-md p-3"
//               >
//                 <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium shrink-0">
//                   {u.initials}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium truncate">{u.name}</p>
//                   <p className="text-xs text-muted-foreground truncate">
//                     {u.email}
//                   </p>
//                 </div>
//                 <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
//                   {u.cases} {u.cases === 1 ? "case" : "cases"}
//                 </span>
//                 <Badge className="rounded-full text-xs bg-green-100 text-green-800 shrink-0">
//                   {u.status}
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const users = useQuery(api.users.getAllUsers) ?? [];

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">
          All registered users on the platform
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-sm font-medium">
            All users ({filtered.length})
          </CardTitle>
          <Input
            placeholder="Search..."
            className="w-full sm:w-48 h-8 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">
                No users found.
              </p>
            )}
            {filtered.map((u) => (
              <div
                key={u._id}
                className="flex items-center gap-3 border rounded-md p-3"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium shrink-0">
                  {u.name?.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {u.email}
                  </p>
                </div>
                <Badge className="rounded-full text-xs bg-green-100 text-green-800 shrink-0">
                  Active
                </Badge>
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
