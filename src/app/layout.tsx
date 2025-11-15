import { headers, cookies } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { BrandProvider } from "@/brand-provider";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next";

const appleSplashScreens = [
  {
    query:
      "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 2048,
    height: 2732,
  },
  {
    query:
      "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 2732,
    height: 2048,
  },
  {
    query:
      "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 1668,
    height: 2388,
  },
  {
    query:
      "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 2388,
    height: 1668,
  },
  {
    query:
      "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 1536,
    height: 2048,
  },
  {
    query:
      "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 2048,
    height: 1536,
  },
  {
    query:
      "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 1640,
    height: 2360,
  },
  {
    query:
      "(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 2360,
    height: 1640,
  },
  {
    query:
      "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 1668,
    height: 2224,
  },
  {
    query:
      "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 2224,
    height: 1668,
  },
  {
    query:
      "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 1620,
    height: 2160,
  },
  {
    query:
      "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 2160,
    height: 1620,
  },
  {
    query:
      "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 1488,
    height: 2266,
  },
  {
    query:
      "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 2266,
    height: 1488,
  },
  {
    query:
      "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1320,
    height: 2868,
  },
  {
    query:
      "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2868,
    height: 1320,
  },
  {
    query:
      "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1206,
    height: 2622,
  },
  {
    query:
      "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2622,
    height: 1206,
  },
  {
    query:
      "(device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1260,
    height: 2736,
  },
  {
    query:
      "(device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2736,
    height: 1260,
  },
  {
    query:
      "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1290,
    height: 2796,
  },
  {
    query:
      "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2796,
    height: 1290,
  },
  {
    query:
      "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1179,
    height: 2556,
  },
  {
    query:
      "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2556,
    height: 1179,
  },
  {
    query:
      "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1170,
    height: 2532,
  },
  {
    query:
      "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2532,
    height: 1170,
  },
  {
    query:
      "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1284,
    height: 2778,
  },
  {
    query:
      "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2778,
    height: 1284,
  },
  {
    query:
      "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1125,
    height: 2436,
  },
  {
    query:
      "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2436,
    height: 1125,
  },
  {
    query:
      "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1242,
    height: 2688,
  },
  {
    query:
      "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2688,
    height: 1242,
  },
  {
    query:
      "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 828,
    height: 1792,
  },
  {
    query:
      "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 1792,
    height: 828,
  },
  {
    query:
      "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    width: 1242,
    height: 2208,
  },
  {
    query:
      "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    width: 2208,
    height: 1242,
  },
  {
    query:
      "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 750,
    height: 1334,
  },
  {
    query:
      "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    width: 1334,
    height: 750,
  },
  {
    query:
      "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    width: 640,
    height: 1136,
  },
];

const getSplashScreens = (logo: string) => {
  const logos = [];

  for (const screen of appleSplashScreens) {
    const url = logo.replace(
      "image/upload",
      `image/upload/b_rgb:FFFFFF,c_pad,h_${screen.height},w_${screen.width}`,
    );

    logos.push({
      url: url,
      media: screen.query,
    });
  }

  return logos;
};

const getFavicon = (image: string) => {
  return image
    .replace("image/upload", `image/upload/h_48,w_48`)
    .replace("png", "ico");
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: brandConfig.name,
    appleWebApp: {
      capable: true,
      title: brandConfig.name,
      startupImage: getSplashScreens(brandConfig.logo),
    },
    icons: {
      icon: { url: brandConfig.logo, type: "image/png", sizes: "512x512" },
      shortcut: {
        url: getFavicon(brandConfig.logo),
        type: "image/x-icon",
        sizes: "48x48",
      },
      apple: { url: brandConfig.logo, type: "image/png", sizes: "512x512" },
    },
    other: {
      // NextJS 15 removed the flag (respectively parses appleWebApp.capable into a different property), breaking the iOS splash screen
      // See https://github.com/vercel/next.js/pull/70363 for change
      // See for (unresolved) bug ticket: https://github.com/vercel/next.js/issues/74524
      "apple-mobile-web-app-capable": "yes",
    },
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookiesList = await cookies();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  const locale = cookiesList.get("locale")?.value || "en";
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <style>{`
          :root {
            --primary: ${brandConfig.colors.light.primary};
            --secondary: ${brandConfig.colors.light.secondary};
          }
          .dark {
            --primary: ${brandConfig.colors.dark.primary};
            --secondary: ${brandConfig.colors.dark.secondary};
          }
        `}</style>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BrandProvider config={brandConfig}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NuqsAdapter>{children}</NuqsAdapter>
            </ThemeProvider>
          </BrandProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
