import { useLayoutEffect, useState } from "react";

function MediaQuery(query: any, callback: any) {
  const [matches, setMatches] = useState<boolean>(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: any) => {
      callback(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    handleChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query, callback]);

  return matches;
}

export default MediaQuery;
