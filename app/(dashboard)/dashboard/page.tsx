// "use client";

// import { RecentCases } from "@/components/RecentCases";
// import { useUser } from "@clerk/nextjs";

// export default function Page() {
//   const { user } = useUser();

//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4">
//       <div className="flex flex-col">
//         <h1 className="text-4xl font-bold tracking-tighter">
//           Hello, <span>{user?.firstName ?? "there"}</span>
//         </h1>
//         <p className="text-muted-foreground">
//           File your case and get it resolved online
//         </p>
//       </div>

//       <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//         <div className="aspect-video text-yellow-600 ring ring-yellow-400 rounded-xl bg-[#fef9c3] flex flex-col p-4">
//           <h1 className="text-sm font-medium">Total Cases</h1>
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-4xl font-semibold">12</p>
//           </div>
//         </div>
//         <div className="aspect-video text-blue-600 ring ring-blue-400 rounded-xl bg-[#dbeafe] flex flex-col p-4">
//           <h1 className="text-sm font-medium">Pending</h1>
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-4xl font-semibold">4</p>
//           </div>
//         </div>
//         <div className="aspect-video text-green-600 ring ring-green-400 rounded-xl bg-[#dcfce7] flex flex-col p-4">
//           <h1 className="text-sm font-medium">Approved</h1>
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-4xl font-semibold">6</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 rounded-xl">
//         <RecentCases />
//       </div>
//     </div>
//   );
// }

"use client";

import { RecentCases } from "@/components/RecentCases";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col">
        <h1 className=" text-lg md:text-4xl font-bold tracking-tighter">
          Hello, <span>{user?.firstName ?? "there"}</span>
        </h1>
        <p className="text-muted-foreground">
          File your case and get it resolved online
        </p>
      </div>

      {/* scrollable row on mobile, grid on md+ */}
      <div className="flex gap-3 px-2 py-2 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible">
        <div className="min-w-[140px] text-yellow-600 ring ring-yellow-400 rounded-xl bg-[#fef9c3] flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Total Cases</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">12</p>
          </div>
        </div>
        <div className="min-w-[140px] text-blue-600 ring ring-blue-400 rounded-xl bg-[#dbeafe] flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Pending</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">4</p>
          </div>
        </div>
        <div className="min-w-[140px] text-green-600 ring ring-green-400 rounded-xl bg-[#dcfce7] flex flex-col p-4 md:aspect-video shrink-0 md:shrink md:min-w-0">
          <h1 className="text-sm font-medium">Approved</h1>
          <div className="flex flex-1 items-center justify-center py-4 md:py-0">
            <p className="text-4xl font-semibold">6</p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl">
        <RecentCases />
      </div>
    </div>
  );
}
