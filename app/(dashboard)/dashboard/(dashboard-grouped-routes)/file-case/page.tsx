"use client";

import { useState, useRef } from "react";
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
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 max-w-3xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">File a case</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below and submit your case for review.
        </p>
      </div>

      {/* case details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-inter font-medium">
            Case details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <Label>Case title</Label>
            <Input placeholder="e.g. Property dispute — Lekki estate" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Case type</Label>
            <Select>
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
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Opposing party (if any)</Label>
            <Input placeholder="Full name or company name" />
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
          <TiptapEditor onChange={setDescription} />
          <p className="text-xs text-muted-foreground mt-2">
            Describe the background, key facts, and the outcome you are seeking.
          </p>
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
                  <button onClick={() => removeFile(i)}>
                    <X className="h-3.5 w-3.5 text-muted-foreground hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2 pb-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Submit case
        </Button>
      </div>
    </div>
  );
}
