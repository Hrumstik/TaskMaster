import { useSelector } from 'react-redux';
export default function useFeatures() {
    const sortTasksAlphabeticallyState = useSelector((state) => state.features.sortTasksAlphabetically);
    const showImportantTasksState = useSelector((state) => state.features.showImportantTasks);
    return { sortTasksAlphabeticallyState, showImportantTasksState }
}
