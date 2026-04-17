// app/satchel/(app)/layout.tsx
import { auth, signOut } from "@/lib/satchel/auth-config";
import Header from "@/components/satchel/Header";

async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/satchel" });
}

export default async function SatchelAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session
    ? { name: session.user.name, tag: session.user.tag }
    : undefined;

  return (
    <div className="min-h-screen valorant-bg flex flex-col">
      <Header signOutAction={handleSignOut} user={user} />
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
