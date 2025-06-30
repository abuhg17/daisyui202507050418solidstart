export async function GET({ request }) {
  return new Response(
    JSON.stringify({
      message: "Hello World.",
      message2: "こんにちは、世界。",
      message3: "世界，你好!",
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
}
