import Link from 'next/link';

export default function WorkInProgressPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Page Under Construction</h1>
      <p className="text-lg text-muted-foreground mb-8">
        This page is currently in the development phase. Please check back later!
      </p>
      <Link href="/" className="text-primary hover:underline">
        Return to Homepage
      </Link>
    </div>
  );
}
