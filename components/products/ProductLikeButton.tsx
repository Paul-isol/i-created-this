"use client"
import { Heart } from "lucide-react";
import { Product } from "@/lib/generated/prisma/client";
import { likeProductAction } from "@/lib/products/product-action";
import { useOptimistic, useTransition } from "react";

type LikeState = {
  liked: boolean;
  count: number;
};

export default function ProductLikeButton({
  product,
  hasLiked,
  variant = "default",
}: {
  product: Product;
  hasLiked: boolean;
  variant?: "default" | "stat";
}) {
  const [isPending, startTransition] = useTransition();

  const [optimisticLike, setOptimisticLike] = useOptimistic<LikeState, void>(
    { liked: hasLiked, count: product.likes },
    (currentState) => ({
      liked: !currentState.liked,
      count: currentState.liked ? currentState.count - 1 : currentState.count + 1,
    })
  );

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticLike();
      await likeProductAction(product.id as number);
    });
  };

  if (variant === "stat") {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="font-heading text-xl font-black text-foreground">
          {optimisticLike.count.toLocaleString()}
        </span>
        <button
          onClick={handleLike}
          disabled={isPending}
          className="flex items-center justify-center p-2 border border-border bg-background hover:bg-muted hover:text-red-500 transition-all duration-300 disabled:opacity-50 active:translate-y-px"
          aria-label={optimisticLike.liked ? "Unlike product" : "Like product"}
        >
          {optimisticLike.liked ? (
            <Heart className="size-4 fill-red-500 text-red-500" />
          ) : (
            <Heart className="size-4" />
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className="flex items-center gap-1 transition-colors duration-200 hover:text-red-500 disabled:opacity-50"
      aria-label={optimisticLike.liked ? "Unlike product" : "Like product"}
    >
      {optimisticLike.liked ? (
        <Heart className="w-3 h-3 fill-red-500 text-red-500" />
      ) : (
        <Heart className="w-3 h-3" />
      )}
      {optimisticLike.count}
    </button>
  );
}