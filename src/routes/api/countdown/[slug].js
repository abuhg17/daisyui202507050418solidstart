export async function GET({ params }) {
  const slug = params.slug; // 在 SolidStart 中，動態參數透過 params 物件獲取

  if (!slug || slug.length < 12) {
    return new Response(
      JSON.stringify({ error: "Invalid slug. Format should be: YYYYMMDDHHMM" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 轉換為 ISO 格式並指定台北時區（+08:00）
  // 注意：這裡的時區處理是基於字串拼接，實際應用中建議使用日期庫如 Luxon 或 date-fns-tz
  const slugISO =
    slug.slice(0, 4) +
    "-" + // YYYY-
    slug.slice(4, 6) +
    "-" + // MM-
    slug.slice(6, 8) +
    "T" + // DD + T
    slug.slice(8, 10) +
    ":" + // HH:
    slug.slice(10, 12) +
    ":00+08:00"; // MM:00 + 時區

  const now = new Date();
  const next = new Date(slugISO);

  // 檢查 next 是否為有效日期
  if (isNaN(next.getTime())) {
    return new Response(
      JSON.stringify({ error: "Invalid date format in slug." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const diffMs = next.getTime() - now.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  let remaining = diffSec;
  const diffday = Math.floor(remaining / 86400);
  remaining -= diffday * 86400;

  const diffhour = Math.floor(remaining / 3600);
  remaining -= diffhour * 3600;

  const diffminute = Math.floor(remaining / 60);
  const diffsecond = remaining % 60;

  const responseData = {
    slug,
    now: now.toISOString(), // 將 Date 物件轉換為 ISO 字串以便傳輸
    slugISO,
    next: next.toISOString(), // 將 Date 物件轉換為 ISO 字串以便傳輸
    diffMs,
    diffday,
    diffhour,
    diffminute,
    diffsecond,
  };

  return new Response(JSON.stringify(responseData), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
