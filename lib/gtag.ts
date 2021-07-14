/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Event } from "../types/googleAnalytics/event";

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''

// IDが取得できない場合
export const existsGaId = GA_ID !== "";

// PVを測定する
export const pageview = (path) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

// GAイベントを発火させる
export const event = ({ action, category, label }: Event) => {
  if (!existsGaId) {
    return;
  }

  window.gtag("event", action, {
    event_vategory: category,
    event_label: JSON.stringify(label),
  });
};
