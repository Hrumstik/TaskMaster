import { useSelector } from "react-redux";
export default function useFeatures() {
  const sortTasksAlphabeticallyState = useSelector(
    ({ features }) => features.sortTasksAlphabetically
  );
  const showImportantTasksState = useSelector(
    ({ features }) => features.showImportantTasks
  );
  return { sortTasksAlphabeticallyState, showImportantTasksState };
}
