import './index.css'

const Menubar = props => {
  const {item, startId, onchangedish} = props
  return (
    <button
      type="button"
      className={startId ? 'red' : 'null'}
      onClick={() => onchangedish(item.menu_category_id)}
    >
      {item.menu_category}
    </button>
  )
}
export default Menubar

//       {startId ? <hr className="line" /> : null}
