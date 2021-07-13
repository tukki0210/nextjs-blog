import { Event } from "../types/googleAnalytics/event";

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYSTICS_ID;

// IDが取得できない場合
export const existsGaId = GA_ID !== "";

// PVを測定する
export const pageview = (path) => {
  window.gtag("cofig", GA_ID, {
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
