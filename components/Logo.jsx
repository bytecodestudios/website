/* eslint-disable @next/next/no-img-element */
export default function Logo({ className = 'h-8 w-8' }) {
  return <img src="/logo-mark.png" alt="" aria-hidden="true" className={`${className} object-contain`} />;
}
