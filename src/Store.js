// import React, {useState} from 'react';
//
// const init = {
//     question: {
//         id: 0,
//         q: "Question 1",
//         a1: "Answer 1",
//         a2: "Answer 2",
//         a1link: 1,
//         a2link: 1,
//         badgeEarn: [],
//         timeSet: 0
//     }
// }
//
// export const Context = React.createContext();
//
// const Store = ({ children }) => {
//     const [state, setState] = useState(init);
//
//     return(
//         <Context.Provider value={{state, setState}}>
//             {children}
//         </Context.Provider>
//     )
// }
//
// export default Store;