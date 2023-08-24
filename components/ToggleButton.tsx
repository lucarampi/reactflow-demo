interface ToggleButtonProps {
  label: string;
  checkedValue: boolean;
  setCheckedValue: any;
}

export default function ToggleButton({
  checkedValue,
  label,
  setCheckedValue,
}: ToggleButtonProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checkedValue}
        defaultChecked={checkedValue}
        className="sr-only peer"
        onChange={(ev) => setCheckedValue(ev.currentTarget.checked)}
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
}
