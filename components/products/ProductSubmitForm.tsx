"use client";
import { addProductAction } from "@/lib/products/product-action";
import FormField from "../forms/FormField";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { Loader2Icon, UploadCloudIcon } from "lucide-react";
import { toast } from "sonner";

const initialState = {
  success: false,
  errors: undefined as Record<string, string[]> | undefined,
  message: "",
  fields: undefined as Record<string, string> | undefined
}

export default function ProductSubmitForm() {
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState
  );

  const { errors, message, success, fields } = state;

  useEffect(() => {
    if (message) {
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  }, [message, success]);
  
  return (
    <div className="border border-border bg-card p-5 sm:p-7 shadow-2xl transition-all duration-500 hover:border-primary/10">
      <form className="space-y-5" action={formAction}>
        {/* Name and Slug Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="Product Name"
            id="name"
            name="name"
            placeholder="NextLaunch"
            onChange={() => {}}
            defaultValue={fields?.name}
            error={errors?.name?.[0]}
            required
          />

          <FormField
            label="Product Slug"
            id="slug"
            name="slug"
            placeholder="nextlaunch"
            helperText="An url-friendly version of your product name"
            onChange={() => {}}
            defaultValue={fields?.slug}
            error={errors?.slug?.[0]}
            required
          />
        </div>

        {/* Tagline */}
        <FormField
          label="Tagline"
          id="tagline"
          name="tagline"
          placeholder="The ultimate Next.js boilerplate for SaaS founders"
          onChange={() => {}}
          defaultValue={fields?.tagline}
          error={errors?.tagline?.[0]}
          required
        />

        {/* Website URL */}
        <FormField
          label="Website URL"
          id="websiteUrl"
          name="websiteUrl"
          placeholder="https://nextlaunch.dev"
          helperText="Enter your product's live url"
          onChange={() => {}}
          defaultValue={fields?.websiteUrl}
          error={errors?.websiteUrl?.[0]}
          required
        />

        {/* Tags */}
        <FormField
          label="Tags"
          id="tags"
          name="tags"
          placeholder="AI, Productivity, SaaS, Next.js"
          onChange={() => {}}
          helperText="Add comma-separated tags to help users discover your product"
          defaultValue={fields?.tags}
          error={errors?.tags?.[0]}
          required
        />

        {/* Description */}
        <FormField
          label="Description"
          id="description"
          name="description"
          placeholder="Write a detailed description about your product features, stack, and APIs..."
          onChange={() => {}}
          defaultValue={fields?.description}
          error={errors?.description?.[0]}
          textarea
          required
        />

        {/* Submit Action */}
        <div className="pt-2">
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-11 font-heading text-xs uppercase tracking-widest rounded-none transition-all duration-300 shadow-md active:translate-y-px"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2Icon className="h-4 w-4 animate-spin text-primary-foreground" />
                <span>Launching build...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UploadCloudIcon className="size-4" />
                <span>Submit Product</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
