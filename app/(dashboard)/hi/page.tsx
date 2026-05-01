"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileIcon, FileText } from "lucide-react";

export default function Page() {
  const { user } = useUser();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col   ">
              <h1>welcome {user?.firstName} </h1>
              <p>File your case and get it resolved online </p>
            </div>
            <div className="w-full flex justify-center px-4">
              <div className="w-full max-w-5xl">
                <div className="flex gap-6 w-full">
                  <Card className="w-[40%] h-65 text-center ">
                    <CardContent className="flex flex-col items-center ">
                      <div className="">
                        <FileText />
                      </div>
                      Submit documents, describe your issue and get matched with
                      a lawyer.
                    </CardContent>
                  </Card>

                  <Card className="w-[60%] h-[260px]">
                    <CardHeader>
                      <CardTitle>Your Activity</CardTitle>
                      <CardDescription>
                        Track your recent cases and updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>Chart / table goes here</CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
