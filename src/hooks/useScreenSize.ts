import useMediaQuery from "@mui/material/useMediaQuery";

const useScreenSize = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(min-width:768px) and (max-width:1023px)");
  const isDesktop = useMediaQuery("(min-width:1024px)");

  return { isMobile, isTablet, isDesktop };
};

export default useScreenSize;
