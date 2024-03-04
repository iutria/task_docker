import { useTask } from "../states/useTask";

const DetailsTask = () => {
  const { task } = useTask();
  return <div>{JSON.stringify(task)}</div>;
};

export default DetailsTask;
