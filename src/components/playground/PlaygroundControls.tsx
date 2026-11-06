import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Switch } from '@/components/ui/switch';
import type { PlaygroundControls as Controls, PlaygroundValues } from '@/lib/playground';

interface PlaygroundControlsProps {
  controls: Controls;
  values: PlaygroundValues;
  onChange: (key: string, value: string | boolean) => void;
}

export const PlaygroundControls = ({ controls, values, onChange }: PlaygroundControlsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(controls).map(([key, control]) => {
        const id = `control-${key}`;

        if (control.type === 'boolean') {
          return (
            <div key={key} className="flex items-center justify-between gap-2">
              <Label htmlFor={id}>{key}</Label>
              <Switch id={id} checked={values[key] as boolean} onCheckedChange={(checked) => onChange(key, checked)} />
            </div>
          );
        }

        return (
          <div key={key} className="flex flex-col gap-2">
            <Label htmlFor={id}>{key}</Label>

            {control.type === 'select' ? (
              <NativeSelect
                id={id}
                className="w-full"
                value={values[key] as string}
                onChange={(e) => onChange(key, e.target.value)}
              >
                {control.options.map((option) => (
                  <NativeSelectOption key={option} value={option}>
                    {option}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            ) : (
              <Input id={id} value={values[key] as string} onChange={(e) => onChange(key, e.target.value)} />
            )}
          </div>
        );
      })}
    </div>
  );
};
