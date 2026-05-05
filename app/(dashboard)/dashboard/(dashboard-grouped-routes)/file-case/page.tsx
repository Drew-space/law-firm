"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PricingTable, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TiptapEditor } from "@/components/tiptap-editor";
import { FileText, ImageIcon, X, Upload } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// zod schema
const caseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  caseType: z.string().min(1, "Please select a case type"),
  opposingParty: z.string().optional(),
});

type CaseForm = z.infer<typeof caseSchema>;

const caseTypes = [
  "Civil litigation",
  "Criminal defence",
  "Commercial / business",
  "Family & matrimonial",
  "Property & land",
  "Employment & labour",
  "Debt recovery",
  "Human rights",
  "Immigration",
  "Probate & succession",
  "Other",
];

export default function FileCasePage() {
  const { has } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const generateUploadUrl = useMutation(api.cases.generateUploadUrl);
  const createCase = useMutation(api.cases.createCase);

  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isSubscribed =
    has({ plan: "basic" }) ||
    has({ plan: "standard" }) ||
    has({ plan: "premium" });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CaseForm>({ resolver: zodResolver(caseSchema) });

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  const onSubmit = async (data: CaseForm) => {
    if (!user) return;
    if (!description || description === "<p></p>") {
      toast.error("Please enter a case description");
      return;
    }

    setLoading(true);
    try {
      // step 1 — upload each file and collect storageIds
      const storageIds: string[] = [];

      for (const file of files) {
        // get upload url from convex
        const uploadUrl = await generateUploadUrl();

        // upload the file directly to convex storage
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!result.ok) throw new Error("File upload failed");

        const { storageId } = await result.json();
        storageIds.push(storageId);
      }

      // step 2 — create the case with storageIds
      await createCase({
        title: data.title,
        caseType: data.caseType,
        opposingParty: data.opposingParty || undefined,
        description,
        clerkId: user.id,
        storageIds,
      });

      toast.success("Case submitted successfully");
      router.push("/dashboard/my-cases");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isSubscribed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <div className="text-center max-w-sm">
          <h1 className="text-xl font-semibold">Subscription required</h1>
          <p className="text-sm text-muted-foreground mt-2">
            You need an active subscription to file a case. Choose any plan to
            get started.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <PricingTable />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 max-w-3xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">File a case</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below and submit your case for review.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* case details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium font-inter">
              Case details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label>Case title</Label>
              <Input
                placeholder="e.g. Property dispute — Lekki estate"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Case type</Label>
              <Select onValueChange={(val) => setValue("caseType", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type..." />
                </SelectTrigger>
                <SelectContent>
                  {caseTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.caseType && (
                <p className="text-xs text-red-500">
                  {errors.caseType.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>
                Opposing party{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                placeholder="Full name or company name"
                {...register("opposingParty")}
              />
            </div>
          </CardContent>
        </Card>

        {/* description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm  font-inter font-medium">
              Case description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TiptapEditor onChange={setDescription} />
            {(!description || description === "<p></p>") && (
              <p className="text-xs text-muted-foreground mt-2">
                Describe the background, key facts, and the outcome you are
                seeking.
              </p>
            )}
          </CardContent>
        </Card>

        {/* uploads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-inter font-medium">
              Supporting documents & images
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div
              className="border border-dashed rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, DOCX, JPG, PNG — max 10MB each
              </p>
            </div>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFiles}
            />
            {files.length > 0 && (
              <div className="flex flex-col gap-2">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm"
                  >
                    {file.type.startsWith("image/") ? (
                      <ImageIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className="flex-1 truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatSize(file.size)}
                    </span>
                    <button type="button" onClick={() => removeFile(i)}>
                      <X className="h-3.5 w-3.5 text-muted-foreground hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2 pb-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Submitting..." : "Submit case"}
          </Button>
        </div>
      </form>
    </div>
  );
}
