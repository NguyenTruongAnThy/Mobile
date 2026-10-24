import React, { useState, useEffect, useCallback } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { SelectPhoneApp } from "./SelectPhoneApp";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <ErrorBox message={error} onRetry={load} />;
  if (!phone) return <Loading />;
  return <SelectPhoneApp phone={phone} />;
}
