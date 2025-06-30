import { createSignal } from "solid-js";

function Nav() {
  const [menuOpen, setMenuOpen] = createSignal(false);

  return (
    <nav class="bg-base-100 shadow-sm p-3">
      <div class="flex items-center justify-between">
        {/* 左側：漢堡按鈕 */}
        <button
          onClick={() => setMenuOpen(!menuOpen())}
          class="btn btn-ghost md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen() ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* 右側：標題群 */}
        <div class="flex flex-col flex-1 ml-4">
          <h1 class="text-xl font-bold">This is Nav.</h1>
          <h2>🔢Nust(Vue)</h2>
          <h2>🔢daisyUI(Tailwind)</h2>
        </div>
      </div>

      {/* 導航選單 */}
      <div
        class={`flex flex-col md:flex-row md:space-x-4 mt-2 ${
          menuOpen() ? "block" : "hidden"
        } md:block`}
      >
        <a href="/" class="btn btn-ghost text-xl">
          Home page
        </a>
        <a href="/about" class="btn btn-ghost text-xl">
          About page
        </a>
        <a href="/blog/202507050418" class="btn btn-ghost text-xl">
          Blog page 202507050418
        </a>
        <a href="/countdown" class="btn btn-ghost text-xl">
          Countdown page
        </a>
        <a href="/bilibili" class="btn btn-ghost text-xl">
          Bilibili page
        </a>
        <a href="/firebasefood" class="btn btn-ghost text-xl">
          FirebaseFood page
        </a>
        <a href="/youtube" class="btn btn-ghost text-xl">
          Youtube page
        </a>
      </div>
    </nav>
  );
}

export default Nav;
