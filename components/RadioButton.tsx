import { BackgroundVariant } from "reactflow";

interface RadioButtonProps{
  label: string;
  value: string;
  checkedValue: string;
  groupName: string;
  setCheckedValue: any;
}

export default function RadioButton({
  label,
  value,
  checkedValue,
  groupName,
  setCheckedValue,
}: RadioButtonProps) {
  return (
    <>
      <div className="flex items-center">
        <input
          id={value}
          type="radio"
          checked={checkedValue === value}
          value={value}
          onChange={(ev) => setCheckedValue(ev.currentTarget.value)}
          name={groupName}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300   dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={value}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    </>
  );
}
