import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface FormFieldContainerProps {
  label: string;
  children: ReactNode;
}

const FormFieldContainer = (props: FormFieldContainerProps) => {
  const { label, children } = props;
  return (
    <div className="flex flex-col items-start gap-1">
      <Label className="text-slate-600">{label}</Label>
      {children}
    </div>
  );
};

export default FormFieldContainer;
