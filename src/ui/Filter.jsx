import styled, { css } from "styled-components";
import useURL from "../hooks/useURL";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterField, options }) {
  const { value, setValue } = useURL(filterField);
  const { remove } = useURL("page");
  const currentValue =
    value || options.find((el) => el.default).value || options.at(0).value;

  return (
    <StyledFilter>
      {options.map((el) => (
        <FilterButton
          key={el.value}
          onClick={() => {
            remove();
            setValue(el.value);
          }}
          $active={currentValue === el.value}
          disabled={currentValue === el.value}
        >
          {el.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
