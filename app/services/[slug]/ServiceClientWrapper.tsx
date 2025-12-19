"use client";

import { useContext } from "react";
import ServiceClient from "./service-client";
import { LoadingContext } from "../../layout";

export default function ServiceClientWrapper({ service }: { service: any }) {
  const isLoadingComplete = useContext(LoadingContext);

  return (
    <ServiceClient service={service} isLoadingComplete={isLoadingComplete ?? false} />
  );
}