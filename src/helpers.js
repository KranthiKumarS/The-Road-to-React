// Search Component

export let Search = ({ value, onChange, children }) => 
    <form className="form">
        { children }
        <input 
            type="text"
            value= { value }
            onChange={ onChange }
        />
    </form>

// Table Component

// const Table = ({ list, pattern, onDismiss }) => 
//     <div>
//         {
//             list.filter(isSearched(pattern)).map(item => 
//             <div className="left list" key={item.objectID}>
//                 <span>
//                 <a href={item.url}>{item.title}</a>
//                 </span>
//                 <span>{item.author}</span>
//                 <span>{item.num_comments}</span>
//                 <span>{item.points}</span>
//                 <Button 
//                     onClick={() => onDismiss(item.objectID)}
//                 >
//                     Dismiss
//                 </Button>
//             </div>
//             )
//         }
//     </div>
