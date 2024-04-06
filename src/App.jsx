import React, { useReducer } from "react";
import players from "../data/players";

const initailState = {
    users: players,
};

const reducer = (state, action) => {
    if (action.type === "REMOVE_ALL") {
        return { ...state, users: [] };
    }
    if (action.type === "RESET") {
        return { ...state, users: players };
    }
    if (action.type === "REMOVE") {
        const removePlayer = state.users.filter(
            (user) => user.id !== action.payload.id
        );

        return { ...state, users: removePlayer };
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initailState);

    const removeAll = () => {
        dispatch({ type: "REMOVE_ALL" });
    };

    const resetAll = () => {
        dispatch({ type: "RESET" });
    };

    const remove = (id) => {
        dispatch({ type: "REMOVE", payload: { id } });
    };

    return (
        <div className="max-w-[1280px] mx-auto px-10">
            <div className="border-b border-gray-300 sticky top-0 left-0 bg-[#E8E8E8] z-50 mb-10 pt-10">
                {state.users.length !== 0 ? (
                    <button
                        className="bg-red-700 text-white lg:py-2 md:py-2 sm:py-3 py-3 lg:px-5 md:px-5 sm:px-7 px-7 rounded-md mb-7"
                        onClick={removeAll}
                    >
                        Remove All
                    </button>
                ) : (
                    <button
                        className="bg-gray-500 text-white lg:py-2 md:py-2 sm:py-3 py-3 lg:px-5 md:px-5 sm:px-7 px-7 rounded-md mb-7"
                        onClick={resetAll}
                    >
                        Reset All
                    </button>
                )}
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
                {state.users.length !== 0 ? (
                    state.users.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="border bg-[#F5F5F7] p-5 rounded-xl"
                            >
                                <div className="">
                                    <div className="w-[150px] min-w-[150px] h-[150px] min-h-[150px] rounded-full overflow-hidden border-gray-200 border-4 mx-auto mt-5 mb-5">
                                        <img src={item.img} alt="" />
                                    </div>
                                    <p className="font-semibold lg:text-xl md:text-xl sm:text-2xl text-3xl text-center">
                                        {item.name}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-red-700 text-white lg:py-2 md:py-2 sm:py-3 py-3 lg:px-5 md:px-5 sm:px-7 px-7 rounded-md mt-10 mb-7"
                                        onClick={() => remove(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 font-semibold text-lg">
                        No Players yet in list.
                    </p>
                )}
            </div>
        </div>
    );
};

export default App;
