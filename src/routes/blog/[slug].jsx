import { useParams } from "@solidjs/router";

export default function BlogPage() {
  const params = useParams();

  return (
    <>
      <h1>Blog Page</h1>
      <h2>post: {params.slug}</h2>
    </>
  );
}
