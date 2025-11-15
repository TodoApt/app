import React from "react";
import { auth } from "@/auth";
import { getBrandConfig } from "@/lib/edge-config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/header";

export default async function Layout({
  modals,
  children,
}: {
  modals: React.ReactNode;
  children: React.ReactNode;
}) {
  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header user={session.user} brandConfig={brandConfig} />
      <main className="p-4">{children}</main>
      {modals}
    </div>
  );
}
