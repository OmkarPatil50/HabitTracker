import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../..";
import "./Archive.css";

export function Archive() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="archive-page">
      <Link to="/">
        <i className="fa-solid fa-arrow-left home-link"></i>
      </Link>
      <h2 className="empty-list">
        {state.archivedHabits.length === 0 ? "No Archived Habits Found" : ""}
      </h2>
      <ul className="habit-list">
        {state.archivedHabits.map((habit) => {
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
                      type: "RESTORE_HABIT",
                      payload: habit
                    });
                  }}
                >
                  <i className="fa-solid fa-box-archive"></i>
                </p>

                <p
                  onClick={() => {
                    dispatch({
                      type: "DELETE_HABIT_FROM_ARCHIEVE",
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
