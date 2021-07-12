import React, { useEffect, useState } from "react";

const Paginator = ({ itemsPerPage, totalNumberOfItems, selectPageCallback }) => {
  const [pages, setPages] = useState([]);
  // this is not zero based
  const [selectedPage, setSelectedPage] = useState(1);
  const amountOfPages = Math.ceil(totalNumberOfItems / itemsPerPage);
  const pageArray = Array.from(new Array(amountOfPages), (_, i) => i + 1);

  useEffect(() => {
    setPages(determineNumberOfPages(selectedPage, pageArray));
  }, [selectedPage]);

  const GoToNextGroup = (direction) => {
    if (direction === "asc") {
      const maxNum = Math.max(...pages);
      selectPageHandler(maxNum + 1);
    } else {
      const maxNum = Math.min(...pages);
      selectPageHandler(maxNum - 1);
    }
 }

 const selectPageHandler = (page) => {
     setSelectedPage(page);
     selectPageCallback({
         currentPage: page,
         limit: itemsPerPage,
         offset: (itemsPerPage * page) - itemsPerPage
     })
 }

  return (
    <div className="pages_container">
      {pages[0] !== 1 && <div onClick={() => GoToNextGroup('desc')}>⬅</div>}
      {pages &&
        pages.map((pageNumber, index) => <div key={index}>
            <Page selectedPage={selectedPage} pageNumber={pageNumber} selectPage={selectPageHandler}>
            </Page>
        </div>)}
      {pages[pages.length - 1] !== pageArray[pageArray.length - 1] && (
        <div onClick={() => GoToNextGroup('asc')}>➡</div>
      )}
    </div>
  );
};

export default Paginator;

const Page = ({selectedPage, pageNumber, selectPage}) => {
  const selectedClass = selectedPage === pageNumber ? "selected" : "unselected";
  return <div className={`${selectedClass}`} onClick={() => selectPage(pageNumber)}>{pageNumber}</div>;
};

const determineNumberOfPages = (selectedPage, pageArray) => {
  let searchingForCurrentGroup = true;
  let currentGroup = 5;

  while (searchingForCurrentGroup) {
    if (selectedPage <= currentGroup) {
      searchingForCurrentGroup = false;
    } else {
      currentGroup += 5;
    }
  }

  return [...pageArray.slice(currentGroup - 5, currentGroup)];
};


