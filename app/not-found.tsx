import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span>404 / A LITTLE OFF THE GRID.</span>
      <h1>
        GREAT IDEAS
        <br />
        GET LOST TOO.
      </h1>
      <p>This page took a different direction. Let&apos;s get you back.</p>
      <Button href="/">Back to the studio</Button>
    </main>
  );
}
