import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/15">
        <span className="text-5xl">404</span>
      </div>
      <div>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          Oops! This page doesn't exist. Let's get you back to the game.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-2.5 text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Return to SAT Sprint
      </Link>
    </div>
  )
}
