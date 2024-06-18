"use client"

import { headings } from "@/ui/fonts"
import { useCombobox } from "downshift"
import { useEffect, useState } from "react"
import { FaCross } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"

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
  options: string[]
}

function ComboBox({selectedItem, dispatch, options}: ComboBoxProps) {
  const [items, setItems] = useState<string[]>([]);

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
          <label htmlFor="search-field" className={`w-fit ${headings.className}`} {...getLabelProps()}>
            Select a movie
          </label>
          <div className="flex shadow-sm bg-white gap-0.5">
            <input
              autoComplete="off"
              id="search-field"
              placeholder="Search movies"
              className="w-full px-1.5 py-4 border-yellow focus:border-2 text-black mr-0 border-r-0"
              {...getInputProps()}
            />
            <button
              aria-label="clear selection"
              className="p-4 border-yellow focus:border-2 text-black ml-0 border-l-0"
              type="button"
              onClick={() => dispatch({ type: 'SET_SELECTED_ITEM', payload: '' })}
            >
              <FaXmark />
            </button>
          </div>
        </div>
        <ul
          className={`absolute max-w-30 bg-white mt-1 shadow-md max-h-40 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) ? 'hidden' : ''
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={`py-2 px-3 shadow-sm text-black flex flex-col ${
                  highlightedIndex === index ? 'bg-slate-200' : ''
                }`}
                key={index}
                {...getItemProps({ item, index })}
              >
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>
    )
  }
  
export default ComboBox;