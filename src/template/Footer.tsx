// import { Logo } from "./Logo";

export function Footer({ title = "", url = "" }) {
  return (
    <footer>
      <a href={url} target="_blank" rel="noreferrer">
        <code>Multi-Timers</code>
      </a>
    </footer>
  );
}
