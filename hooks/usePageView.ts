import { useEffect } from "react";
import { useRouter } from "next/router";

import * as gtag from "../lib/gtag";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    if (!gtag.existsGaId) return;

    const handleRouteChange = (path: string) => {
      gtag.pageview(path);
    };

    router.events.on("routerChangeComplete", handleRouteChange);

    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off("routerChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export default usePageView;
