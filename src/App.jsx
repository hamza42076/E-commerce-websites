import React, { useState } from "react";
import {
  useQueryClient,
  useQuery,
  keepPreviousData,
} from "@tanStack/react-query";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

const App = () => {
  const queryClient = useQueryClient();
  let [pageNum, setPageNum] = useState(1);
  let [skips, setSkips] = useState(0);
  let [search, setSearch] = useState();
  

  const PER_PAGE_LIMIT = 10;
  let fetchProduct = async () => {
    let products = await axios.get(
      search ? `https://dummyjson.com/products/search?q=${search}&limit=${PER_PAGE_LIMIT}&skip=${skips}`
      :`https://dummyjson.com/products?limit=${PER_PAGE_LIMIT}&skip=${skips}`
    );
    console.log(products);
    return products.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", pageNum, skips,search],
    queryFn: fetchProduct,
    placeholderData: keepPreviousData,
  });
  console.log(data);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>error Occurred</h2>;

  return (
    <div>
      <>
        <div className="flex justify-center mb-8 mt-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value)

              }}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 10.5a6.15 6.15 0 11-12.3 0 6.15 6.15 0 0112.3 0z"
              />
            </svg>
          </div>
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {data.products.map((item) => {
                return (
                  <div className="p-4 md:w-1/3">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={item.thumbnail}
                        alt="blog"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          {item.category}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {item.brand}
                        </h1>
                        <p className="leading-relaxed mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center flex-wrap">
                          <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                            Learn More
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                              <path d="M12 5l7 7-7 7" />
                            </svg>
                          </a>
                          <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg
                              className="w-4 h-4 mr-1"
                              stroke="currentColor"
                              strokeWidth={2}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx={12} cy={12} r={3} />
                            </svg>
                            1.2K
                          </span>
                          <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                            <svg
                              className="w-4 h-4 mr-1"
                              stroke="currentColor"
                              strokeWidth={2}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                            </svg>
                            6
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <div className="bg-red-300 w-full h-36 flex justify-center items-center" >
          <Pagination
            count={data ? Math.ceil(data.total / PER_PAGE_LIMIT) : 1}
            onChange={(e, page) => {
              setPageNum(page);
              setSkips((page - 1) * PER_PAGE_LIMIT);
            }}
          />
        </div>
      </>
    </div>
  );
};

export default App;
