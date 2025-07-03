const useFormattedPathSegment = (role: string, pathname: string) => {
  if (!pathname) {
    return "";
  }

  const segments = pathname.split("/").filter(Boolean);

  let selectedSegment = "";
  if (segments.length > 1) {
    selectedSegment = role === "student" ? segments[1] : segments[2];
    return selectedSegment
      ? decodeURIComponent(selectedSegment.replace(/-/g, " "))
      : "";
  } else {
    selectedSegment = segments[0];
    return selectedSegment;
  }
};

export default useFormattedPathSegment;
