import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectInput({
  width = 180,
  placeholder = "select",
  title,
  values,
  onChange,
  value,
}: {
  width: number;
  placeholder: string;
  title: string;
  values: {
    name: string;
    value: any;
  }[];
  onChange: (value: any) => void;
  value: any;
}) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={`w-[${width}px]`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {values.map((value, index) => (
            <SelectItem key={index} value={value.value}>
              {value.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
