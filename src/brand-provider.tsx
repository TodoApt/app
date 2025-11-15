"use client";

import { createContext, useContext } from "react";
import { Brand } from "@/lib/edge-config";

const BrandContext = createContext<Brand>(null!);

export function BrandProvider({
  config,
  children,
}: {
  config: Brand;
  children: React.ReactNode;
}) {
  return (
    <BrandContext.Provider value={config}>{children}</BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
