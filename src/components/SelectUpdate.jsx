"use client";
import { Select, Option } from "@material-tailwind/react";

function SelectUpdate({ data, value, label, name, className }) {
  // console.log(value);
  return (
    <div className={className}>
      <Select
        disabled
        // onChange={(e) => handlerChange({ ...dataAbsen, [name]: Number(e) })}
        size="lg"
        name={name}
        label={label}
        aria-required
        value={`${value?.kelas ? value?.kelas : value?.mapel}`}
      >
        {data?.map((e) => {
          return (
            <Option key={e?.id} value={`${e?.id}`}>
              {!e?.kelas ? e?.mapel : e?.kelas}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}

export default SelectUpdate;
