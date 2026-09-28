import Link from "next/link";

// No `metadata.title` here on purpose: routes without their own title and
// without an <h1> make the route announcer announce an empty string.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> | <Link href="/titled">Titled page</Link> |{" "}
          <Link href="/titled-again">Another titled page</Link> | <Link href="/untitled">Untitled page</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
