import htmlIcon from "@phosphor-icons/core/regular/file-html.svg?raw";
import packageIcon from "@phosphor-icons/core/regular/package.svg?raw";
import usersIcon from "@phosphor-icons/core/regular/users.svg?raw";
import sx from "./features.module.css";

export const Features = () => {
  return (
    <ul class={sx.features}>
      <li>
        <span class={sx.icon} innerHTML={htmlIcon} />
        <h3>HTML standard</h3>
        <span>Validate forms with HTML standard based validation API</span>
      </li>
      <li>
        <span class={sx.icon} innerHTML={packageIcon} />
        <h3>Super Light</h3>
        <span>
          Package size matters. Solid Hook Form is a tiny library (12 kB) without any dependencies.
        </span>
      </li>
      <li>
        <span class={sx.icon} innerHTML={usersIcon} />
        <h3>UX</h3>
        <span>
          Striving to provide the best user experience and bringing consistent validation
          strategies.
        </span>
      </li>
    </ul>
  );
};
