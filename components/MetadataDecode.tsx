import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useDynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean); // Remove empty strings
    let title = "Umurava Platform | Build Work Experience";

    if (segments.length >= 2) {
      title = `Umurava | ${decodeURIComponent(segments[1])}`;
    }

    document.title = title;
  }, [pathname]);
}
