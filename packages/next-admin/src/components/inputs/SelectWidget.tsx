import { XMarkIcon } from "@heroicons/react/24/outline";
import { WidgetProps } from "@rjsf/utils";
import { useEffect, useRef } from "react";
import DoubleArrow from "../../assets/icons/DoubleArrow";
import { useForm } from "../../context/FormContext";
import useCloseOnOutsideClick from "../../hooks/useCloseOnOutsideClick";
import { Enumeration } from "../../types";
import { Selector } from "./Selector";

const SelectWidget = ({ options, onChange, value, ...props }: WidgetProps) => {
  const formContext = useForm();
  const name = props.name;
  options as { enumOptions: Enumeration[] };
  const enumOptions = options.enumOptions?.map(
    (option: any) => option.value as Enumeration
  );
  const containerRef = useRef<HTMLDivElement>(null);
  useCloseOnOutsideClick(containerRef, () => formContext.setOpen(false, name));

  useEffect(() => {
    if (formContext.relationState?.[name]?.open) {
      // @ts-expect-error
      containerRef.current?.querySelector(`#${name}-search`)?.focus();
    }
  }, []);

  return (
    <div
      className="relative"
      ref={containerRef}
    >
      <div className="relative flex justify-between w-full px-3 py-2 text-base placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm cursor-default">
        <input
          type="hidden"
          value={value?.value || ""}
          name={props.name}
          className="absolute -z-10 inset-0 w-full h-full opacity-0"
        />
        <input
          id={props.id}
          readOnly
          className="w-full h-full flex-1 appearance-none focus:outline-none cursor-default"
          value={value?.label || ""}
          onMouseDown={() => formContext.toggleOpen(name)}
        />
        <div className="flex space-x-3">
          {value && (
            <div className="flex items-center" onClick={() => onChange({})}>
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div className="flex items-center pointer-events-none">
            <DoubleArrow />
          </div>
        </div>
      </div>
      <Selector
        open={formContext.relationState?.[name]?.open!}
        options={enumOptions}
        name={props.name}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectWidget;
