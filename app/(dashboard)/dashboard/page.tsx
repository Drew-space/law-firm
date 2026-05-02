"use client";

// replace <AppSidebar /> with <AdminSidebar />
import { AppSidebar } from "@/components/app-sidebar";
import { RecentCases } from "@/components/RecentCases";
import { Card, CardContent } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <div className=" flex justify-between w-full items-center">
            <h1>Dashboard</h1>
            <UserButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className=" flex flex-col">
            <h1 className="text-4xl text-black tracking-tighter font-inter  font-bold ">
              Hello, <span>Drew </span>{" "}
            </h1>
            <p className="text-muted-foreground">
              File your case and get it resolve online
            </p>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video text-yellow-500 ring ring-yellow-500 rounded-xl bg-[#fef9c3] flex flex-col p-4">
              <h1 className="text-sm font-medium">Total Case</h1>
              <div className="flex flex-1 items-center justify-center">
                <p className="text-4xl font-semibold">12</p>
              </div>
            </div>
            <div className="aspect-video text-blue-500 ring ring-blue-500 rounded-xl bg-[#dbeafe] flex flex-col p-4">
              <h1 className="text-sm font-medium ">Pending</h1>
              <div className="flex flex-1 items-center justify-center">
                <p className="text-4xl font-semibold">4</p>
              </div>
            </div>
            <div className="aspect-video rounded-xl bg-[#dcfce7] flex flex-col ring ring-green-500 p-4">
              <h1 className="text-sm font-medium text-[#66a98d] ">Approved</h1>
              <div className="flex flex-1 items-center justify-center">
                <p className="text-4xl  text-[#66a98d] font-semibold">6</p>
              </div>
            </div>
          </div>
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <RecentCases />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
