import { Fragment } from "react";

/**
 * Renders an array of lines (or a single "\n"-separated string) with <br>
 * between them, which is how the original copy was written.
 */
export default function MultilineText({ lines }: { lines: string[] | string }) {
  const list = Array.isArray(lines) ? lines.flatMap((line) => line.split("\n")) : lines.split("\n");

  return (
    <>
      {list.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
