import { useEffect } from "react";
import { useRouter } from "next/router";

import * as gtag from "../lib/gtag";

const usePageView = () => {
  const router = useRouter();
  console.log(gtag.GA_ID);
  
  useEffect(() => {
    if (!gtag.existsGaId) {
      return;
    }

    const handleRouteChange = (path, { shallow }) => {
      if (!shallow) {
        gtag.pageview(path);
      }
    };

    router.events.on("routerChangeComplete", handleRouteChange);

    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off("routerChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export default usePageView;
