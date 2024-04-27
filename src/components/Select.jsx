'use client';
import { CreateAbsenContext } from '@/context/context.createabsen';
import { getCookie } from '@/helper/cookie';
import { Select, Option } from '@material-tailwind/react';
import { useContext } from 'react';

function SelectDefault({ data, label, name, className }) {
  const { state, dispatch } = useContext(CreateAbsenContext);
  function handlerChange(e) {
    return dispatch({
      type: 'SET',
      payload: {
        ...state,
        id_guru: Number(getCookie('unique')),
        [name]: e,
      },
    });
  }
  return (
    <div className={className}>
      <Select onChange={handlerChange} size="lg" name={name} label={label} aria-required>
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

export default SelectDefault;
