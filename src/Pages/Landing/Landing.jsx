import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../..";
import "./Landing.css";

export function Landing() {
  const { state, dispatch } = useContext(AppContext);

  const [newHabit, setNewHabit] = useState({
    name: "",
    repeat: "",
    goal: "",
    time: "",
    startDate: ""
  });

  return (
    <div className="landing-page">
      <div className="btn-section">
        <Link to="/archive" className="archive-page-link">
          Archived Habits
        </Link>
        <button
          className="add-new-habit-btn"
          onClick={() =>
            dispatch({
              type: "SHOW_ADD_HABIT",
              payload: true
            })
          }
        >
          Add New Habit
        </button>
      </div>
      {state.showAddNewHabit ? (
        <section className="add-new-habit-section">
          <div className="new-habit-container">
            <h2 className="new-habit-header">New Habit</h2>
            <label htmlFor="habit-name">Name of Habit:</label>
            <input
              type="text"
              required
              value={newHabit.name}
              onChange={(event) => {
                setNewHabit(() => ({
                  ...newHabit,
                  name: event.target.value
                }));
              }}
            />
            <label htmlFor="repeat">Repeat :</label>
            <select
              name="repeat"
              required
              value={newHabit.repeat}
              onChange={(event) => {
                setNewHabit(() => ({
                  ...newHabit,
                  repeat: event.target.value
                }));
              }}
            >
              <option value="daily">Daily</option>
              <option value="once-in-two-days">Once in 2 days</option>
              <option value="once-in-three-days">Once in 3 days</option>
              <option value="weekly">Weekly</option>
            </select>
            <label htmlFor="goal">Goal:</label>
            <select
              name="goal"
              value={newHabit.goal}
              required
              onChange={(event) => {
                setNewHabit(() => ({
                  ...newHabit,
                  goal: event.target.value
                }));
              }}
            >
              <option value="once-in-day">1 Time Daily</option>
              <option value="twice-in-day">2 Times Daily</option>
              <option value="thrice-in-day">3 Times Daily</option>
            </select>
            <label htmlFor="time">Time of day:</label>
            <select
              name="time"
              value={newHabit.time}
              required
              onChange={(event) => {
                setNewHabit(() => ({
                  ...newHabit,
                  time: event.target.value
                }));
              }}
            >
              <option value="any-time">Any Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
            <label htmlFor="start">Start Date:</label>
            <input
              type="date"
              name="date"
              value={newHabit.startDate}
              required
              onChange={(event) => {
                setNewHabit(() => ({
                  ...newHabit,
                  startDate: event.target.value
                }));
              }}
            />
            <div className="btn-section">
              <button
                onClick={() => {
                  setNewHabit({
                    name: "",
                    repeat: "",
                    goal: "",
                    time: "",
                    startDate: ""
                  });
                  dispatch({
                    type: "SHOW_ADD_HABIT",
                    payload: false
                  });
                }}
                className="discard-btn"
              >
                Discard
              </button>
              <button
                type="submit"
                className="save-btn"
                onClick={() => {
                  if (
                    newHabit.name.length > 0 &&
                    newHabit.repeat.length > 0 &&
                    newHabit.goal.length > 0 &&
                    newHabit.time.length > 0 &&
                    newHabit.startDate.length > 0
                  ) {
                    dispatch({ type: "ADD_NEW_HABIT", payload: newHabit });
                    setNewHabit({
                      name: "",
                      repeat: "",
                      goal: "",
                      time: "",
                      startDate: ""
                    });
                    dispatch({
                      type: "SHOW_ADD_HABIT",
                      payload: false
                    });
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      <h2 className="empty-list">
        {state.habitList.length === 0 ? "No Habits Found" : ""}
      </h2>
      <ul className="habit-list">
        {state.habitList.map((habit) => {
          const { name, repeat, goal, time, startDate } = habit;
          return (
            <li className="habit-list-item">
              <section className="name">
                <h3
                  className="habit-header"
                  onClick={() =>
                    dispatch({
                      type: "SHOW_HABIT_DETAILS",
                      payload: habit
                    })
                  }
                >
                  {name.toUpperCase()}
                </h3>
              </section>
              <section className="btns">
                <p
                  onClick={() => {
                    dispatch({
                      type: "ARCHIVE_HABIT",
                      payload: habit
                    });
                  }}
                >
                  <i className="fa-solid fa-box-archive"></i>
                </p>
                <p
                  onClick={() => {
                    dispatch({
                      type: "SHOW_ADD_HABIT",
                      payload: true
                    });
                    setNewHabit(habit);
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </p>
                <p
                  onClick={() => {
                    dispatch({
                      type: "DELETE_HABIT",
                      payload: habit
                    });
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </p>
              </section>
            </li>
          );
        })}
      </ul>
      {state.showHabitDetails ? (
        <section className="habitDetails">
          <div className="habit-details-container">
            <div className="habit-details-header">
              <h2 className="habit-details-heading">
                {state.habitDetails?.name.toUpperCase()}
              </h2>
              <p
                onClick={() =>
                  dispatch({
                    type: "CLOSE_HABIT_DETAILS"
                  })
                }
              >
                <i className="fa-solid fa-xmark"></i>
              </p>
            </div>

            <p> Repeat: {state.habitDetails?.repeat.toUpperCase()}</p>
            <p> Goal:{state.habitDetails?.goal}</p>
            <p> Time: {state.habitDetails?.time.toUpperCase()}</p>
            <p>Start Date:{state.habitDetails?.startDate}</p>
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}
