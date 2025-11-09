import React, { memo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardImage = () => (
  <Image
    src="/assets/images/dashboard.png"
    alt="Dashboard Preview"
    width={1440}
    height={1150}
    className="auth-dashboard-preview absolute top-0"
    loading="lazy"
  />
);

const AuthLayoutComponent = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) redirect("/");

  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            Signalist turned my trading around. The insights and strategies I
            gained helped me achieve consistent profits.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author"> PS: </cite>
              <p className="max-md:text-xs text-gray-500">Trader & Developer</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={star}
                  src="/assets/icons/star.svg"
                  alt="Star"
                  width={20}
                  height={20}
                  className="h-4 w-4"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <Suspense fallback={<div style={{ height: 300 }} />}>
            <DashboardImage />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

const AuthLayout = memo(AuthLayoutComponent);
AuthLayout.displayName = "AuthLayout";

export default AuthLayout;
