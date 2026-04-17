import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/satchel/auth-config";
import SatchelLandingClient from "@/components/satchel/SatchelLandingClient";

export default async function SatchelLandingPage() {
  const session = await auth();
  if (session) redirect("/satchel/dashboard");

  async function handleSignIn() {
    "use server";
    await signIn("riot", { redirectTo: "/satchel/dashboard" });
  }

  return <SatchelLandingClient signInAction={handleSignIn} />;
}
