import './index.css'

const Menubar = props => {
  const {item, onchangedish, green} = props
  return (
    <li>
      <button
        type="button"
        className={green ? 'red' : 'null'}
        onClick={() => onchangedish(item)}
      >
        {item.menu_category}
      </button>
      {green ? <hr className="line" /> : null}
    </li>
  )
}
export default Menubar
