import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  // const fetchProducts = async () => {
  //   const res = await fetch(`https://dummyjson.com/products?limit=100`);
  //   const data = await res.json();
  //   if (data && data.products) {
  //     setProducts(data.products);
  //   }
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const fetchData = async () => {
    const result = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await result.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pageHandler = (indexpage) => {
    if (
      indexpage >= 1 &&
      indexpage <= products.length / 10 &&
      indexpage !== page
    ) {
      setPage(indexpage);
    }
  };

  return (
    <div>
      <div className="product">
        {products.slice(page * 10 - 10, page * 10).map((val) => {
          return (
            <div className="product_single">
              <img src={val.thumbnail} alt={val.title} />
              <span>{val.title}</span>
            </div>
          );
        })}
      </div>

      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disable"}
            onClick={() => pageHandler(page - 1)}
          >
            ⬅
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => pageHandler(i + 1)}
                className={page === i + 1 ? "pagination_selected" : " "}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination_disable"}
            onClick={() => pageHandler(page + 1)}
          >
            ➡
          </span>
        </div>
      )}
    </div>
  );
}
