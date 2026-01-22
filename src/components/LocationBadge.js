import GlobeIcon from "@/components/GlobeIcon";
import CircleFlagIcon from "@/components/CircleFlagIcon";

function Circle({ children, className = "" }) {
  return (
    <span
      aria-hidden
      className={`relative inline-flex h-4 w-4 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 bg-white ${className}`}
    >
      {children}
    </span>
  );
}

function FlagCircle({ countryCode }) {
  const code = String(countryCode || "").trim().toLowerCase();
  if (!code) return null;
  return <CircleFlagIcon code={code} className="h-4 w-4" />;
}

function GlobeCircle() {
  return (
    <Circle className="grid place-items-center bg-slate-50">
      <GlobeIcon className="h-3 w-3 text-slate-700" />
    </Circle>
  );
}

function SplitGlobeFlagCircle({ countryCode }) {
  const code = String(countryCode || "").trim().toLowerCase();
  if (!code) return <GlobeCircle />;

  return (
    <Circle>
      <CircleFlagIcon
        code={code}
        withRing={false}
        className="absolute inset-0 h-full w-full"
      />
      <span className="absolute inset-y-0 left-0 w-1/2 grid place-items-center bg-slate-50">
        <GlobeIcon className="h-3.5 w-3.5 text-slate-700" />
      </span>
    </Circle>
  );
}

export default function LocationBadge({ meta, children, className = "" }) {
  // meta: { mode: 'onsite'|'remote'|'remoteCompanyBased', countryCode?: 'DK' }
  const mode = meta?.mode || null;
  const countryCode = meta?.countryCode || null;

  let icon = null;
  if (mode === "remote") icon = <GlobeCircle />;
  else if (mode === "remoteCompanyBased") icon = <FlagCircle countryCode={countryCode} />;
  else if (countryCode) icon = <FlagCircle countryCode={countryCode} />;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {icon}
      <span>{children}</span>
    </span>
  );
}
