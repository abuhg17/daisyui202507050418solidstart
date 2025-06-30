// src/routes/api/bilibili/[bvid].js

import axios from "axios";

export async function GET({ params }) {
  // <-- 這裡是 SolidStart 的寫法
  const bvid = params.bvid; // 在 SolidStart 中，動態參數透過 params 物件獲取

  if (!bvid) {
    return new Response(JSON.stringify({ error: "請提供 bvid 參數" }), {
      status: 400,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  try {
    const res = await axios.get(
      "https://api.bilibili.com/x/web-interface/view",
      {
        params: { bvid },
      }
    );

    // 檢查 Bilibili API 的響應結構
    if (!res.data || res.data.code !== 0 || !res.data.data) {
      return new Response(
        JSON.stringify({
          error: "Bilibili API 返回錯誤或無效數據",
          bilibiliResponse: res.data,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
    }

    const { pic, title, owner, stat, pages } = res.data.data;
    const { data } = res.data;
    const raw = data;
    const newdata = {};
    for (const key in raw) {
      if (typeof raw[key] !== "object") {
        newdata[key] = raw[key];
      }
    }

    const responseData = {
      pic,
      title,
      owner,
      stat,
      data: newdata,
      pages,
    };

    return new Response(JSON.stringify(responseData), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching Bilibili data:", error);

    const errorResponse = {
      error: "無法取得 Bilibili 資料",
      message: error.message,
      status: error.response?.status,
      response: error.response?.data,
    };

    return new Response(JSON.stringify(errorResponse), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      status: error.response?.status || 500,
    });
  }
}
