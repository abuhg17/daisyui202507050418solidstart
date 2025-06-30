import axios from "axios";

export async function GET({ params }) {
  const channelIdsParam = params?.channelIds;
  const apikey = "AIzaSyAUD7ipwX-VAIIgbtw4V6sHKOTfyWoPdMo";

  if (!channelIdsParam) {
    return new Response(
      JSON.stringify({ error: "請提供 channelIds 參數（可用逗號分隔多個）" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const channelIds = channelIdsParam
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  if (channelIds.length === 0 || channelIds.length > 50) {
    return new Response(
      JSON.stringify({ error: "頻道 ID 數量需介於 1 到 50 之間" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics",
          id: channelIds.join(","),
          key: apikey,
        },
      }
    );

    const items = res.data?.items || [];

    if (items.length === 0) {
      return new Response(JSON.stringify({ error: "找不到任何頻道資料" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        count: items.length,
        items,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "無法取得頻道資料",
        message: error.message,
        status: error.response?.status || null,
        response: error.response?.data || null,
      }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
