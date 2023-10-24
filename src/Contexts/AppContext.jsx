import { useReducer } from "react";
import { AppContext } from "..";

export function AppContextProvider({ children }) {
  const habits = [
    {
      name: "meditate",
      repeat: "weekly",
      goal: "thrice-in-day",
      time: "afternoon",
      startDate: "2023-12-11"
    },
    {
      name: "exercise",
      repeat: "once-in-two-days",
      goal: "once-in-day",
      time: "morning",
      startDate: "2024-01-01"
    },
    {
      name: "read",
      repeat: "once-in-three-days",
      goal: "once-in-day",
      time: "night",
      startDate: "2024-05-06"
    }
  ];

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SHOW_HABIT_DETAILS": {
        return {
          ...state,
          showHabitDetails: true,
          habitDetails: action.payload
        };
      }

      case "CLOSE_HABIT_DETAILS": {
        return {
          ...state,
          showHabitDetails: false,
          habitDetails: {}
        };
      }

      case "SHOW_ADD_HABIT": {
        return {
          ...state,
          showAddNewHabit: action.payload
        };
      }

      case "ADD_NEW_HABIT": {
        const filteredList = state.habitList.filter(
          (habit) => habit.name !== action.payload.name
        );
        return {
          ...state,
          habitList: [...filteredList, action.payload]
        };
      }

      case "DELETE_HABIT": {
        return {
          ...state,
          habitList: state.habitList.filter(
            (habit) => habit.name !== action.payload.name
          )
        };
      }

      case "DELETE_HABIT_FROM_ARCHIEVE": {
        return {
          ...state,
          archivedHabits: state.archivedHabits.filter(
            (habit) => habit.name !== action.payload.name
          )
        };
      }

      case "ARCHIVE_HABIT": {
        return {
          ...state,
          habitList: state.habitList.filter(
            (habit) => habit.name !== action.payload.name
          ),
          archivedHabits: [...state.archivedHabits, action.payload]
        };
      }

      case "RESTORE_HABIT": {
        return {
          ...state,
          habitList: [...state.habitList, action.payload],
          archivedHabits: state.archivedHabits.filter(
            (habit) => habit.name !== action.payload.name
          )
        };
      }

      default:
        return state;
    }
  };

  const initialValue = {
    habitList: habits,
    archivedHabits: [],
    showHabitDetails: false,
    habitDetails: {
      name: "",
      repeat: "",
      goal: "",
      time: "",
      startDate: ""
    },
    showAddNewHabit: false
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
