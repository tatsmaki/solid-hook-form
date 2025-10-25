import sx from "./table.module.css";

type TableProps = {
  children: any[][];
};

export const Table = (props: TableProps) => {
  return (
    <table class={sx.table}>
      <thead>
        <tr>
          {props.children[0].map((th) => (
            <th class={sx.th}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.children.slice(1).map((row) => (
          <tr>
            {row.map((td) => (
              <td class={sx.td}>{td}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
