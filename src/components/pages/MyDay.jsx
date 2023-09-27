import { useSelector } from "react-redux";
import useFeatures from "../../hooks/useFeatures";
import useRenderTasks from "../../hooks/useRenderTasks";
import useGroupTasks from "../../hooks/useGroupTasks";
import NoTaskScreen from "../NoTaskScreen/NoTaskScreen";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import { Box, Container } from "@mui/material";
import InputField from "../inputField/InputField";
import DoneTasksList from "../DoneTasksList/DoneTasksList";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

export default function MyDay() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const stateOfInput = useSelector((state) => state.input);
  const {
    todayTasks,
    sortedAlphabeticallyTodayTasks,
    importantTodayTasks,
    sortedAlphabeticallyTodayTasksWithImportance,
  } = useGroupTasks(tasks);
  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();
  const { renderTasks } = useRenderTasks();

  return (
    <Box sx={{ bgcolor: "background.paper" }} className="app">
      <Menu />
      <div className="main">
        <Header
          text="My day"
          icon={
            <WbSunnyOutlinedIcon
              sx={{
                fontSize: 40,
                color: "icons.secondary",
              }}
            />
          }
        />

        <Container
          sx={{
            height: "86%",
            paddingLeft: 2,
            paddingRight: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {todayTasks.length || stateOfInput ? (
            <Box sx={{ height: "100%" }}>
              {sortTasksAlphabeticallyState && !showImportantTasksState
                ? renderTasks(sortedAlphabeticallyTodayTasks)
                : !sortTasksAlphabeticallyState && showImportantTasksState
                ? renderTasks(importantTodayTasks)
                : sortTasksAlphabeticallyState && showImportantTasksState
                ? renderTasks(sortedAlphabeticallyTodayTasksWithImportance)
                : renderTasks(todayTasks)}
              <DoneTasksList tasksArray={todayTasks} />
            </Box>
          ) : (
            <NoTaskScreen
              firstTitle="You have"
              secondTitle="no tasks"
              thirdTitle="for this day."
              icon={
                <AccessibilityNewIcon
                  sx={{
                    fontSize: 300,
                    display: "flex",
                    alignSelf: "center",
                    color: "icons.secondary",
                  }}
                />
              }
            />
          )}

          <InputField />
        </Container>
      </div>
    </Box>
  );
}
