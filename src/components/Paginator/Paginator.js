import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCurrentPage } from "../../redux/appSlice";
import SemiBoldFont from "../SemiBoldFont";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  columnGap: "4px",
});

const StyledButton = styled(SemiBoldFont)({
  background: (props) =>
    props.isActive
      ? props.theme.colors.decorativeBlueDark
      : props.theme.colors.decorativeBlue,
  color: (props) => props.theme.colors.white,
  border: "none",
  cursor: (props) => !props.disabled && "pointer",
  "&:hover": {
    background: (props) =>
      !props.disabled && props.theme.colors.decorativeBlueDark,
  },
  fontSize: "1.4rem",
  padding: "4px 8px",
  borderRadius: "2px",
  pointerEvent: (props) => props.disabled && "none",
});

const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
  siblingCount = 2,
}) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const totalNumberButtons = siblingCount * 2 + 3;
  const totalButtons = totalNumberButtons + 2;
  if (totalPageCount > totalButtons) {
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPageCount - 1, currentPage + siblingCount);
    let pages = range(startPage, endPage);
    /**
     * hasPrevPages: has pages to the left
     * hasNextPages: has pages to the right
     * hiddenOffset: number of pages either to the left or to the right
     */
    const hasPrevPages = startPage > 2;
    const hasNextPages = totalPageCount - endPage > 1;
    const hiddenOffset = totalNumberButtons - (pages.length + 1);
    switch (true) {
      // handle: (1) < {9 10} [11] {12 13} (14)
      case hasPrevPages && !hasNextPages: {
        const extraPages = range(startPage - hiddenOffset, startPage - 1);
        pages = ["LEFT_PAGE", ...extraPages, ...pages];
        break;
      }
      // handle: (1) {2 3} [4] {5 6} > (14)
      case !hasPrevPages && hasNextPages: {
        const extraPages = range(endPage + 1, endPage + hiddenOffset);
        pages = [...pages, ...extraPages, "RIGHT_PAGE"];
        break;
      }
      // handle: (1) < {4 5} [6] {7 8} > (14)
      case hasPrevPages && hasNextPages:
      default: {
        pages = ["LEFT_PAGE", ...pages, "RIGHT_PAGE"];
        break;
      }
    }
    return [1, ...pages, totalPageCount];
  }
  return range(1, totalPageCount);
};

const SIBLING_COUNT = 2;

const Paginator = (props) => {
  const { totalCount, buttonCount, pageSize = 10 } = props;
  const currentPage = useSelector((state) => state.app.currentPage);
  const dispatch = useDispatch();
  const pageButtons = usePagination({
    buttonCount,
    currentPage,
    pageSize,
    totalCount,
    siblingCount: SIBLING_COUNT,
  });

  const onClickNextPrevButton = ({ direction }) => {
    let nextPage = 0;
    switch (direction) {
      case "PREV": {
        nextPage = Math.max(1, currentPage - SIBLING_COUNT * 2 - 1);
        break;
      }
      case "NEXT": {
        nextPage = Math.min(
          Math.ceil(totalCount / pageSize),
          currentPage + SIBLING_COUNT * 2 + 1
        );
        break;
      }
      default: {
        return;
      }
    }
    dispatch(setCurrentPage(nextPage));
  };

  const onClickButton = (nextPage) => {
    dispatch(setCurrentPage(nextPage));
  };

  const getPageButton = () => {
    if (pageButtons.length <= 1) {
      return null;
    }
    return pageButtons.map((button, index) => {
      const isActive = button === currentPage;
      if (button === "LEFT_PAGE") {
        return (
          <StyledButton
            key={index}
            isActive={isActive}
            onClick={() => onClickNextPrevButton({ direction: "PREV" })}
          >
            &laquo;
          </StyledButton>
        );
      }
      if (button === "RIGHT_PAGE") {
        return (
          <StyledButton
            key={index}
            isActive={isActive}
            onClick={() => onClickNextPrevButton({ direction: "NEXT" })}
          >
            &raquo;
          </StyledButton>
        );
      }
      return (
        <StyledButton
          key={index}
          isActive={isActive}
          onClick={() => onClickButton(button)}
        >
          {button}
        </StyledButton>
      );
    });
  };

  return <Container>{getPageButton()}</Container>;
};

export default Paginator;
