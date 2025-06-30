// src/routes/api/bilibili/proxyimg.js

import axios from "axios";

export async function GET({ request }) {
  // SolidStart API 路由的入口點
  const url = new URL(request.url); // 獲取請求的 URL 物件
  const imageUrl = url.searchParams.get("url"); // 從查詢參數中獲取 'url'

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "請提供 url 參數" }), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer", // SolidStart 的 Response 建議使用 arraybuffer 或 blob
      headers: {
        Referer: "https://www.bilibili.com/",
        // User-Agent 可以加上模擬瀏覽器 ，視需要
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
      },
    });

    // 獲取原始圖片的 Content-Type
    const contentType =
      response.headers["content-type"] || "application/octet-stream";

    // 返回圖片數據作為 Response
    return new Response(response.data, {
      // response.data 已經是 arraybuffer
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // 設置緩存
      },
      status: 200,
    });
  } catch (err) {
    console.error("圖片代理失敗:", err); // 打印詳細錯誤到伺服器日誌

    return new Response(
      JSON.stringify({ error: "圖片代理失敗", message: err.message }),
      {
        status: err.response?.status || 500, // 使用原始響應的狀態碼，否則為 500
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }
}
