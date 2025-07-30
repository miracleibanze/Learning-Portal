// app/search/page.tsx
import SearchPanel from "./SearchPanel";
import Results from "./Results";

export default function SearchPage({ searchParams }) {
  const { q = "", type = "user" } = searchParams;
  return (
    <div>
      <SearchPanel q={q} />
      <Results q={q} type={type} />
    </div>
  );
}
xcvs;
