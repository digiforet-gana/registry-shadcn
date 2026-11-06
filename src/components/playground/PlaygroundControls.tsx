import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
              <Select value={values[key] as string} onValueChange={(value) => onChange(key, value)}>
                <SelectTrigger id={id} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {control.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input id={id} value={values[key] as string} onChange={(e) => onChange(key, e.target.value)} />
            )}
          </div>
        );
      })}
    </div>
  );
};
