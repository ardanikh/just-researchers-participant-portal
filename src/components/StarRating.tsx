import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({ rating, max = 5, size = 16, interactive = false, onChange }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.round(rating);
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(i + 1)}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <Star
              style={{ width: size, height: size }}
              className={filled ? "fill-pending text-pending" : "text-border"}
            />
          </button>
        );
      })}
    </div>
  );
}
