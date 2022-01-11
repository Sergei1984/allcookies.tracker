import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDecrementAction, setIncrementAction } from "./store/count/actions";
import { selectCount } from "./store/count/selectors";

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  const handleIncrement = () => {
    dispatch(setIncrementAction(1));
  };

  const handleDecrement = () => {
    dispatch(setDecrementAction(1));
  };
  return (
    <div className="App">
      <p>Test React</p>
      <p>{count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      {/* <Routes>
        {routes.map((routeProps, index) => (
          <Route {...routeProps} key={index} />
        ))}
        {privateRoutes.map((routeProps, index) => (
          <PrivateRoute {...routeProps} key={index} />
        ))}
      </Routes> */}
    </div>
  );
};

export default App;
