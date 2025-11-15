"use client";
import { startTransition, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  changeLocale,
  deletePushSubscription,
  updateUserLanguage,
  registerPushSubscription,
} from "@/app/lib/actions";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { AutoComplete } from "@/components/ui/auto-complete";
import { User } from "@/app/lib/schema";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function Settings({ user }: { user: User }) {
  const t = useTranslations("Settings");
  const locale = useLocale();

  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSupported(true);
      void registerServiceWorker();
    }
  }, []);

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(sub);
    const encodedString = btoa(JSON.stringify(sub));

    const registeredSubscription =
      await registerPushSubscription(encodedString);

    localStorage.setItem("deviceId", registeredSubscription.id);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);

    const deviceId = localStorage.getItem("deviceId");

    if (deviceId) {
      await deletePushSubscription(deviceId);
      localStorage.removeItem("deviceId");
    }
  }

  const handleSubscriptionChange = (checked: boolean) => {
    if (checked) {
      return subscribeToPush();
    } else {
      return unsubscribeFromPush();
    }
  };

  const handleChangeLanguage = (locale: string) => {
    startTransition(async () => {
      await Promise.all([
        changeLocale(locale),
        updateUserLanguage(user.id, locale),
      ]);
    });
  };

  return (
    <div className="flex gap-4 flex-col">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">{t("language")}</FieldLabel>
            <AutoComplete
              options={[
                { value: "en", label: t("english") },
                { value: "es", label: t("spanish") },
              ]}
              value={locale}
              onChange={handleChangeLanguage}
              clearable={false}
            />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field orientation="horizontal">
            <Switch
              checked={Boolean(subscription)}
              onCheckedChange={handleSubscriptionChange}
              disabled={!isSupported}
              name="subscription"
            />
            <FieldContent>
              <FieldLabel htmlFor="subscription">
                {t("receiveNotifications")}
              </FieldLabel>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
