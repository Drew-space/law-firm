import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-xl font-semibold mt-2">Page not found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The page you are looking for does not exist 
        </p>
      </div>
      <Link
        href="/"
        className="text-sm text-blue-600 hover:underline"
      >
        Go back home
      </Link>
    </div>
  );
}