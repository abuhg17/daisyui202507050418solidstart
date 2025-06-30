import { createSignal, createEffect, onCleanup } from "solid-js";

function CountdownPage() {
  const [countdownData, setCountdownData] = createSignal(null);

  // 單一 createEffect 處理初始化與每秒更新
  createEffect(() => {
    const fetchCountdown = async () => {
      try {
        const response = await fetch("/api/countdown/202507050418");
        const data = await response.json();
        setCountdownData(data);
      } catch (error) {
        console.error("Failed to fetch countdown data:", error);
      }
    };

    fetchCountdown(); // 立即執行一次
    const interval = setInterval(fetchCountdown, 1000); // 每秒更新
    onCleanup(() => clearInterval(interval)); // 清除定時器
  });

  const capitals = [
    { city: "日本東京", color: "bg-red-600" },
    { city: "臺灣臺北", color: "bg-red-500" },
    { city: "中國北京", color: "bg-red-700" },
    { city: "韓國首爾", color: "bg-red-500" },
    { city: "朝鮮平壤", color: "bg-red-600" },
    { city: "美國華盛頓", color: "bg-red-500" },
    { city: "英國倫敦", color: "bg-red-600" },
    { city: "法國巴黎", color: "bg-red-500" },
    { city: "德國柏林", color: "bg-red-600" },
    { city: "俄國莫斯科", color: "bg-red-500" },
    { city: "澳洲坎培拉", color: "bg-red-600" },
  ];

  return (
    <>
      <h1>This is Countdown Page.</h1>
      <h2>First, fetch /api/countdown/202507050418 once.</h2>
      <h2>Second, setInterval every one sec.</h2>

      <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-800 via-black to-indigo-900 p-6">
        <div class="flex flex-col items-center gap-8 max-w-6xl w-full">
          {/* 警示卡片群 */}
          <div class="flex flex-wrap justify-center gap-6">
            <div
              class="card w-128 bg-red-500 text-white shadow-xl hover:scale-105 transition duration-200 cursor-help"
              title="全世界各國首都圈大地震"
            >
              <div class="card-body items-center text-center">
                <h2 class="card-title text-xl">
                  2025/07/05 04:18
                  <br />
                  全世界各國首都
                  <br />
                  (當地時間)
                  <br />
                  🌍⚠️🌏
                </h2>
              </div>
            </div>

            {capitals.map(({ city, color }) => (
              <div
                class={`card w-64 ${color} text-white shadow-xl hover:scale-105 transition duration-200 cursor-help`}
                title={`${city}首都圈大地震`}
              >
                <div class="card-body items-center text-center">
                  <h2 class="card-title text-xl">
                    ⚠️
                    <br />
                    2025/07/05 04:18
                    <br />
                    {city}(當地時間)
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-black to-red-800 text-white p-8">
            <h1 class="text-4xl font-bold mb-4">倒數計時</h1>
            {countdownData() ? (
              <div class="text-2xl space-y-2">
                <p>
                  目標時間：{new Date(countdownData().slugISO).toLocaleString()}
                </p>
                <p>
                  現在時間：{new Date(countdownData().now).toLocaleString()}
                </p>
                <p class="text-yellow-300 font-semibold">
                  剩餘時間：{countdownData().diffday} 天{" "}
                  {countdownData().diffhour} 小時 {countdownData().diffminute}{" "}
                  分 {countdownData().diffsecond} 秒
                </p>
              </div>
            ) : (
              <p>載入中...</p>
            )}
          </div>
          {/* 緊急資訊 */}
          <div class="bg-red-900 bg-opacity-80 p-6 rounded-lg text-white text-center max-w-2xl">
            <h2 class="text-2xl font-bold mb-4">⚠️ 緊急警告 ⚠️</h2>
            <p class="text-lg">全球各國首都圈將於指定時間發生重大地震事件</p>
            <p class="text-sm mt-2 opacity-80">
              請做好相應準備措施，關注官方最新消息
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountdownPage;
