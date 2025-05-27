"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Prop = {
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  placeholder?: string;
  list: {
    value: string;
    label?: string;
  }[];
};
export default function SelectCustom(props: Prop) {
  return (
    <Select value={props.value} onValueChange={props.onChange}>
      <SelectTrigger
        className={cn(
          "w-[180px] border-0 shadow-none cursor-pointer hover:bg-base-5 font-bold",
          props.className
        )}
      >
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.list.map(({ value, label }) => (
            <SelectItem key={`select-item-${value}`} value={value}>
              {label || value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
