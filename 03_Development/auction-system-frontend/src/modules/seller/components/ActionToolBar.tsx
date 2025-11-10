import React from "react";
import { Search, Package, Gavel } from "lucide-react";
import "@/styles/seller.css";

type ActionToolBarProps = {
  onSearch?: (keyword: string) => void;
  onCreateProduct?: () => void;
  onCreateAuction?: () => void;
  placeholder?: string;
  defaultValue?: string;
};

const ActionToolBar: React.FC<ActionToolBarProps> = ({
  onSearch,
  onCreateProduct,
  onCreateAuction,
  placeholder = "Search products...",
  defaultValue = "",
}) => {
  const [searchValue, setSearchValue] = React.useState(defaultValue);
  const debounceRef = React.useRef<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!onSearch) return;

    // Clear the previous timer so we keep only the latest intent
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    // Debounce: trigger search 500ms after user stops typing
    debounceRef.current = window.setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  React.useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="action-toolbar">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          aria-label="Search products"
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="buttons-container">
      <button
      type="button"
      className="primary-button secondary"
      onClick={onCreateAuction}
      aria-label="Create new auction session"
      >
      <Gavel className="primary-button-icon" />
      Create Auction
      </button>
        <button
        type="button"
        className="primary-button"
        onClick={onCreateProduct}
        aria-label="Create new product"
        >
        <Package className="primary-button-icon" />
        Create Product
        </button>
       </div>
    </div>
  );
};

export default ActionToolBar;
