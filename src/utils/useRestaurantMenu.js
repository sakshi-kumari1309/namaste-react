const useRestaurantMenu = (resID) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]); // ← re-fetch if resId changes

  const fetchMenu = async () => {
    const response = await fetch(
      `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`,
    );
    const json = await response.json();
    console.log("Menu Data:", json);
    setResInfo(json.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
