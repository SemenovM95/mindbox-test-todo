import { memo } from 'react'

import Button from 'components/ui/Button/Button.tsx'

import s from './Filter.module.scss'

export type TFilter = 'all' | 'active' | 'completed'

export interface FilterProps {
  options: TFilter[]
  incomplete: number
  currentFilter: TFilter
  onSetFilter: (filter: TFilter) => void
  onClearCompleted: () => void
}

function Filter({ options, incomplete, currentFilter, onSetFilter, onClearCompleted }: FilterProps) {
  return (
    <footer className={s.filter}>
      <span className={s.todoCount}>{incomplete} items left</span>
      <ul className={s.filterList}>
        {options.map((filter) => {
          const cls = currentFilter === filter ? `${s.filterItem} ${s.selected}` : s.filterItem
          return (
            <li key={filter} className={cls}>
              <Button onClick={() => onSetFilter(filter)} style={{ textTransform: 'capitalize' }}>
                {filter}
              </Button>
            </li>
          )
        })}
      </ul>
      <Button className={s.clearCompleted} onClick={onClearCompleted} data-testid="clear-completed">
        Clear completed
      </Button>
    </footer>
  )
}

export default memo(Filter)
