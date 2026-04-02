import { useState } from "react";
import { AnalysisResult } from "../types";

interface UseAnalyzeReturn {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  analyze: (input: any) => Promise<void>;
}

export function useAnalyze(analyzeFn: (input: any) => Promise<AnalysisResult>): UseAnalyzeReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (input: any) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeFn(input);
      setResult(data);
    } catch (e: any) {
      if (e.message?.includes("503") || e.message?.includes("rate limit")) {
          setError("Service is currently busy. Please try again soon.");
      } else {
          setError(e.message || "Failed to analyze. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}
