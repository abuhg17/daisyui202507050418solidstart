import { createSignal, createMemo, onMount } from "solid-js";
import { For } from "solid-js";

export default function FirebaseFoodPage() {
  const [foods, setFoods] = createSignal([]);
  const [sortKey, setSortKey] = createSignal("");
  const [sortAsc, setSortAsc] = createSignal(true);

  // 抓取資料
  onMount(async () => {
    try {
      const response = await fetch("/api/firebasefood");
      const data = await response.json();
      setFoods(data.myvue3food || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  });

  // 點擊排序欄位切換排序
  function sort(key) {
    if (sortKey() === key) {
      setSortAsc(!sortAsc());
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  // 顯示箭頭
  function arrow(key) {
    if (sortKey() !== key) return "";
    return sortAsc() ? "🔼" : "🔽";
  }

  // 輔助解析日期 YYYY-MM-DD 或 YYYY/MM/DD
  function parseYMDDate(str) {
    if (typeof str !== "string") return 0;
    const normalized = str.replace(/\//g, "-");
    const parts = normalized.split("-");
    if (parts.length === 3) {
      const [y, m, d] = parts.map(Number);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d).getTime();
      }
    }
    return 0;
  }

  // 排序資料 computed
  const sortedFoods = createMemo(() => {
    if (!sortKey()) return foods();

    return [...foods()].sort((a, b) => {
      let v1 = a[sortKey()];
      let v2 = b[sortKey()];

      if (sortKey() === "fooddate") {
        const t1 = parseYMDDate(v1);
        const t2 = parseYMDDate(v2);
        return sortAsc() ? t1 - t2 : t2 - t1;
      }

      const n1 = parseFloat(v1);
      const n2 = parseFloat(v2);
      if (!isNaN(n1) && !isNaN(n2)) {
        return sortAsc() ? n1 - n2 : n2 - n1;
      }

      return sortAsc()
        ? String(v1).localeCompare(String(v2))
        : String(v2).localeCompare(String(v1));
    });
  });

  return (
    <>
      <h1>FirebaseFood Page</h1>

      <p class="mb-2">
        目前排序：<strong>{sortKey() || "無"}</strong>
        {sortKey() && <span>{sortAsc() ? "🔼 升冪" : "🔽 降冪"}</span>}
      </p>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={() => sort("foodname")}
                class="cursor-pointer select-none"
              >
                foodname <span>{arrow("foodname")}</span>
              </th>
              <th
                onClick={() => sort("foodbrand")}
                class="cursor-pointer select-none"
              >
                foodbrand <span>{arrow("foodbrand")}</span>
              </th>
              <th
                onClick={() => sort("foodstore")}
                class="cursor-pointer select-none"
              >
                foodstore <span>{arrow("foodstore")}</span>
              </th>
              <th
                onClick={() => sort("foodprice")}
                class="cursor-pointer select-none"
              >
                foodprice <span>{arrow("foodprice")}</span>
              </th>
              <th
                onClick={() => sort("foodamount")}
                class="cursor-pointer select-none"
              >
                foodamount <span>{arrow("foodamount")}</span>
              </th>
              <th
                onClick={() => sort("fooddate")}
                class="cursor-pointer select-none"
              >
                fooddate <span>{arrow("fooddate")}</span>
              </th>
              <th onClick={() => sort("id")} class="cursor-pointer select-none">
                id <span>{arrow("id")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <For each={sortedFoods()}>
              {(food, idx) => (
                <tr>
                  <td>{idx() + 1}</td>
                  <td>{food.foodname}</td>
                  <td>{food.foodbrand}</td>
                  <td>{food.foodstore}</td>
                  <td>{food.foodprice}</td>
                  <td>{food.foodamount}</td>
                  <td>{food.fooddate}</td>
                  <td>{food.id}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </>
  );
}
