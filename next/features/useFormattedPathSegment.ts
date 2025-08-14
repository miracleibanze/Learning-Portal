const useFormattedPathSegment = (role: string, pathname: string) => {
  if (!pathname) {
    return "";
  }

  const segments = pathname.split("/").filter(Boolean);

  let selectedSegment = "";
  if (segments.length > 1) {
    selectedSegment =
      role === "student"
        ? segments[1]
        : segments[1] === role
        ? segments[2]
        : segments[1];
    console.log("segment : ", selectedSegment);
    return selectedSegment
      ? decodeURIComponent(selectedSegment.replace(/-/g, " "))
      : "";
  } else {
    return "dashboard";
  }
};

export default useFormattedPathSegment;
