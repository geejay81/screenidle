"use client"

import { useCombobox } from "downshift"
import { useEffect, useState } from "react"

function getOptionFilter(inputValue: string) {
  const lowerCasedInputValue = inputValue.toLowerCase()

  return function optionFilter(option: any) {
    return (
      !inputValue ||
      option.toLowerCase().includes(lowerCasedInputValue)
    )
  }
}

type ComboBoxProps = {
  selectedItem: string,
  dispatch: any,
  srcUrl: string
}

function ComboBox({selectedItem, dispatch, srcUrl}: ComboBoxProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch(srcUrl)
        .then((res) => res.json())
        .then((data) => {
          setOptions(data.movies.map((movie: any) => movie.value));
        })
  },[srcUrl]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange({inputValue}) {
      setItems(options.filter(getOptionFilter(inputValue)))
    },
    items,
    itemToString(item) {
      return item ? item : ''
    },
    selectedItem,
    onSelectedItemChange: ({selectedItem: newSelectedItem}) => {
      dispatch({ type: 'SET_SELECTED_ITEM', payload: newSelectedItem });
    },
  })
    return (
      <div>
        <div className="flex flex-col gap-1">
          <label htmlFor="search-field" className="w-fit" {...getLabelProps()}>
            Select a movie
          </label>
          <div className="flex shadow-sm bg-white gap-0.5">
            <input
              id="search-field"
              placeholder="Search movies"
              className="w-full px-1.5 py-4 border border-black focus:border-2"
              {...getInputProps()}
            />
          </div>
        </div>
        <ul
          className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item: any, index) => (
              <li className={
                `py-2 px-3 shadow-sm flex flex-col${highlightedIndex === index ? ' bg-slate-200' : ''}`}
                key={index}
                {...getItemProps({item, index})}
              >
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>
    )
  }
  
export default ComboBox;