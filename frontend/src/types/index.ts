export type Verdict = "FAKE" | "REAL";

export interface AnalysisResult {
  verdict: Verdict;
  confidence: number;
  reason: string;
  is_fake: boolean;
  all_scores?: Record<string, number>;
  frames_analyzed?: number;
}
