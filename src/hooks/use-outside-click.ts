import { useEffect } from "react";
import type { RefObject } from "react"; // Use type-only import

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  callback: (event: MouseEvent | TouchEvent) => void // Define function type explicitly
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => { // Specify event type
      if (!ref.current || ref.current.contains(event.target as Node)) { // Type assertion for event.target
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
