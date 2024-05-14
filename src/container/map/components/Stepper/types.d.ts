export type StepperProps = {
  steps: Array<{ id: number; label: string }>;
  onClick: () => void;
};
export type StepProps = {
  label: string;
  id: number;
  isEnd: boolean;
};
