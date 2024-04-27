'use client';
import { Spinner } from '@material-tailwind/react';

export function DefaultSpinner({ text }) {
  return (
    <span className="flex w-full justify-center items-center gap-4">
      {text} <Spinner className="h-4 w-4" />
    </span>
  );
}
