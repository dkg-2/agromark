"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImageUpload } from "@/components/hooks/use-image-upload";
import { ImagePlus, X, Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export default function PlantDiseasePage() {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload({
    onUpload: (url) => console.log("Uploaded image URL:", url),
  });

  const [isDragging, setIsDragging] = useState(false);
  const [predictionResult, setPredictionResult] = useState<string | null>(null); // State for prediction result
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const fakeEvent = {
          target: {
            files: [file],
          },
        };

        handleFileChange(
          fakeEvent as unknown as React.ChangeEvent<HTMLInputElement>
        );
        setPredictionResult(null); // Clear previous result
      }
    },
    [handleFileChange]
  );

  const handleUploadAndPredict = async () => {
    if (!previewUrl) return;

    setIsLoading(true);
    setPredictionResult("Analyzing image for diseases...");

    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob, fileName || "image.png");
      formData.append("language", "English"); // You can make this dynamic if needed

      const apiResponse = await fetch("/api/plant-disease", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || "Failed to get prediction");
      }

      const data = await apiResponse.json();
      setPredictionResult(data.prediction); // Store raw HTML
    } catch (error: any) {
      console.error("Error during prediction:", error);
      setPredictionResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Plant Disease Detection</h1>
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Upload Plant Image</h3>
          <p className="text-sm text-muted-foreground">
            Supported formats: JPG, PNG, GIF
          </p>
        </div>

        <Input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {!previewUrl ? (
          <div
            onClick={handleThumbnailClick}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
              isDragging && "border-primary/50 bg-primary/5"
            )}
          >
            <div className="rounded-full bg-background p-3 shadow-sm">
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click to select</p>
              <p className="text-xs text-muted-foreground">
                or drag and drop file here
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="group relative h-64 overflow-hidden rounded-lg border">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleThumbnailClick}
                  className="h-9 w-9 p-0"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                  className="h-9 w-9 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {fileName && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="truncate">{fileName}</span>
                <button
                  onClick={handleRemove}
                  className="ml-auto rounded-full p-1 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <Button
              onClick={handleUploadAndPredict}
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Analyze Image"}
            </Button>
          </div>
        )}

        {predictionResult && (
          <div className="mt-4 p-4 border rounded-lg bg-secondary text-secondary-foreground">
            <h4 className="font-medium">Prediction Result:</h4>
            <div
              className="prose prose-sm prose-p:text-secondary-foreground prose-h2:text-secondary-foreground prose-strong:text-secondary-foreground"
              dangerouslySetInnerHTML={{ __html: predictionResult }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
