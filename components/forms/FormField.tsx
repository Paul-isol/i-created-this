import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormFieldProps = {
    label: string;
    name: string;
    id: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
    helperText?: string;
    textarea?: boolean;
    defaultValue?: string;
}

export default function FormField({
  label,
  name,
  id,
  placeholder,
  onChange,
  error,
  required,
  helperText,
  textarea,
  defaultValue
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label 
        htmlFor={id} 
        className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground"
      >
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {textarea ? (
        <Textarea
          aria-invalid={!!error}
          className="min-h-[120px] rounded-none border-border"
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          defaultValue={defaultValue}
        />
      ) : (
        <Input
          aria-invalid={!!error}
          className="rounded-none border-border"
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          defaultValue={defaultValue}
        />
      )}
      {helperText && (
        <p className="text-[10px] font-mono text-muted-foreground/60 leading-relaxed">
          {helperText}
        </p>
      )}
      {error && (
        <p className="text-[11px] font-mono text-destructive font-semibold mt-0.5 animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}