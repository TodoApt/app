"use client";

import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useBrand } from "@/brand-provider";
import Image from "next/image";

const Login = () => {
  const t = useTranslations("SignIn");
  const brand = useBrand();

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="mx-auto w-full">
          <CardHeader>
            <div className="flex justify-center">
              <Image
                src={brand.logo}
                height={100}
                width={100}
                alt={brand.name}
              />
            </div>
            <CardTitle className="text-2xl">{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <LoginForm />
            </div>

            <div className="mt-4 text-center text-sm">
              {t("forgottenPassword")}{" "}
              <Link href="/auth/forgot-password" className="underline">
                {t("resetPassword")}
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("doNotHaveAccount")}{" "}
              <Link href="/auth/register" className="underline">
                {t("register")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
