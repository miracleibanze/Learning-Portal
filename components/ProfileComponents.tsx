export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-semibold rounded-md">
      {children}
    </span>
  );
}

export function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: React.ReactNode;
}) {
  return <div className="mt-6">{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 w-full bg-gray-100 p-1 rounded-lg">
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <button className="w-full py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg">
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <div className="p-4 border-t mt-2">{children}</div>;
}

export function Switch({ checked }: { checked: boolean }) {
  return (
    <input type="checkbox" className="toggle-checkbox" checked={checked} />
  );
}
