import React from "react";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSelector, useDispatch } from "react-redux";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { handleChange } from "../feature/slice/allJobSlice";

const PageBtnContainer = () => {
  const { numOfPages, pageNumber } = useSelector((state) => state.allJobs);
  const dispatch = useDispatch();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  const onPrev = () => {
    let page = pageNumber - 1;
    if (page === 0) page = numOfPages;
    dispatch(handleChange({ name: "pageNumber", value: page }));
  };
  const onNext = () => {
    let page = pageNumber + 1;
    if (page > numOfPages) page = 1;
    dispatch(handleChange({ name: "pageNumber", value: page }));
  };

  return (
    <Wrapper>
      {pageNumber > 1 && (
        <button onClick={onPrev} className="prev-btn">
          <HiChevronDoubleLeft />
          prev
        </button>
      )}
      <div className="btn-container">
        {pages.map((page) => (
          <button
            onClick={() =>
              dispatch(handleChange({ name: "pageNumber", value: page }))
            }
            key={page}
            className={`pageBtn ${pageNumber === page ? "active" : null}`}
          >
            {page}
          </button>
        ))}
      </div>
      {pageNumber < numOfPages && (
        <button onClick={onNext} className="next-btn">
          <HiChevronDoubleRight />
          next
        </button>
      )}
    </Wrapper>
  );
};

export default PageBtnContainer;
