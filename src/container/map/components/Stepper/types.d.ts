export type StepperProps = {
  steps: Array<{ id: number; label: string }>;
  onChange: (selectedStepId: number) => void;
  onLastStep: () => void;
};
export type StepProps = {
  label: string;
  id: number;
  isEnd: boolean;
  isSelected: boolean;
};
