"use client";

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
import { RegisterForm } from "@/components/auth/register-form";

const Register = () => {
  const t = useTranslations("Register");
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
              <RegisterForm />
            </div>

            <div className="mt-4 text-center text-sm">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/auth/login" className="underline">
                {t("login")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
