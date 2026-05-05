"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

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

export default function UserCasePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const caseData = useQuery(api.cases.getCaseById, {
    caseId: params.caseId as Id<"cases">,
  });

  const updateStatus = useMutation(api.cases.updateCaseStatus);

  const handleCancel = async () => {
    if (!caseData) return;
    setLoading(true);
    try {
      await updateStatus({ caseId: caseData._id, status: "canceled" });
      toast.success("Case canceled");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (caseData === undefined)
    return <div className="p-6 text-sm text-muted-foreground">Loading...</div>;

  if (caseData === null)
    return (
      <div className="p-6 text-sm text-muted-foreground">Case not found.</div>
    );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 max-w-3xl">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground w-fit"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to my cases
      </button>

      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">{caseData.title}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Filed {new Date(caseData._creationTime).toDateString()}
          </p>
        </div>
        <Badge
          className={`${badgeStyles[caseData.status]} rounded-full text-xs shrink-0`}
        >
          {statusLabel[caseData.status]}
        </Badge>
      </div>

      {/* case details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-inter font-medium">
            Case details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Case type</p>
            <p className="text-sm">{caseData.caseType}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Opposing party</p>
            <p className="text-sm">{caseData.opposingParty || "—"}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm">{statusLabel[caseData.status]}</p>
          </div>
        </CardContent>
      </Card>

      {/* description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-inter font-medium">
            Case description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="text-sm text-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-bold [&_strong]:font-bold [&_em]:italic [&_u]:underline"
            dangerouslySetInnerHTML={{ __html: caseData.description }}
          />
        </CardContent>
      </Card>

      {/* documents */}
      {caseData.fileUrls && caseData.fileUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Uploaded documents
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {caseData.fileUrls.map((url, i) => {
              const isImage =
                url.match(/\.(jpg|jpeg|png|webp)$/i) ||
                url.includes("unsplash");
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 border rounded-md px-3 py-2"
                >
                  {isImage ? (
                    <ImageIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="flex-1 text-sm truncate">
                    Document {i + 1}
                  </span>

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600"
                  >
                    View
                  </a>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* cancel — only show if pending */}
      {caseData.status === "pending" && (
        <div className="flex justify-end pb-4">
          <Button
            variant="outline"
            className="text-red-600 border-red-300 text-xs"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? "Canceling..." : "Cancel case"}
          </Button>
        </div>
      )}
    </div>
  );
}
